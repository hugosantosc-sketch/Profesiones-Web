MOD('m13','Mecánica de suelos','Geotecnia',
'Todo lo construido acaba descansando en el suelo. Este es un material natural, que no eliges, y que debes conocer antes de diseñar.',
['Das, Fundamentos de ingeniería geotécnica','Holtz, Kovacs y Sheahan, An Introduction to Geotechnical Engineering','Terzaghi, Peck y Mesri, Soil Mechanics in Engineering Practice','Juárez Badillo y Rico, Mecánica de suelos','González de Vallejo, Ingeniería geológica'],
'UNI: Geología General, Mecánica de Suelos I y II. PUCP: Geología (2CIV10), Ingeniería Geotécnica (1CIV41). MIT: 1.037 Soil Mechanics and Geotechnical Design.');
SUB('fas',{t:'Relaciones de fases',
lec:`El suelo tiene tres fases: **sólidos, agua y aire**. Casi todo lo que quieres saber se obtiene de sus proporciones.

- **Relación de vacíos:** e = V_{v}/V_{s}
- **Porosidad:** n = V_{v}/V, y n = e/(1+e)
- **Humedad:** w = W_{w}/W_{s}
- **Saturación:** S = V_{w}/V_{v}

## La relación clave
**S·e = w·G_{s}**. G_{s} ronda 2.65.

**Imagen:** una bolsa llena de canicas. El espacio entre canicas son los vacíos. Si los llenas de agua, está saturado.`,
key:['S·e = w·G_{s}','γ_{d} = [[G_{s}·γ_{w}|1+e]]','γ = [[(G_{s}+S·e)γ_{w}|1+e]]','n = [[e|1+e]]'],fig:'fases',
err:'Confundir e (se divide por sólidos) con n (se divide por el total).',
x:[['efe','El peso unitario da el esfuerzo'],['cpt','γ_{d} mide compactación'],['agr','Misma idea de humedad en agregados']],
g:[
r=>{const e=r.i(.3,1.2,.05);return{q:`e=${e}. Halla n.`,a:e/(1+e),u:'',s:[`n = e/(1+e) = ${n(e/(1+e))}`]};},
r=>{const w=r.i(5,40),G=r.p([2.6,2.65,2.7]),e=r.i(.5,1.2,.05);const S=w/100*G/e;const Sc=Math.min(S,1)===S;return{q:`w=${w} %, G_{s}=${G}, e=${e}. Halla S (puede exceder 100 % si los datos son inconsistentes).`,a:S*100,u:'%',s:[`S = wG_{s}/e = ${n(S*100)} %`]};},
r=>{const G=r.p([2.6,2.65,2.7]),e=r.i(.4,1.1,.05);return{q:`G_{s}=${G}, e=${e}. Halla γ_{d}.`,a:G/(1+e),u:'t/m³',s:[`γ_{d} = ${G}·1/(1+${e}) = ${n(G/(1+e))} t/m³`]};},
r=>{const G=r.p([2.6,2.65,2.7]),e=r.i(.4,1.1,.05);return{q:`Suelo saturado: G_{s}=${G}, e=${e}. Halla γ_{sat}.`,a:(G+e)/(1+e),u:'t/m³',s:[`γ_{sat} = (G_{s}+e)/(1+e) = ${n((G+e)/(1+e))} t/m³`]};},
r=>{const gd=r.i(1.4,1.9,.05),w=r.i(8,20),G=r.p([2.65,2.7]);const e=G/gd-1,S=w/100*G/e;return{q:`Suelo con γ_{d}=${gd} t/m³, w=${w} %, G_{s}=${G}. Halla el grado de saturación S.`,a:S*100,u:'%',s:[`e = G_{s}/γ_{d} − 1 = ${n(e)}`,`S = wG_{s}/e = ${n(S*100)} %`]};}
]});
SUB('cla',{t:'Clasificación de suelos',
lec:`Dos suelos con el mismo nombre deben comportarse igual. Para eso existe **SUCS**. Se basa en dos cosas:

**Granulometría:** ¿cuánto pasa la malla N.° 200 (0.075 mm)? Más de 50 %: grueso retenido o fino.

- C_{u} = D_{60}/D_{10}, C_{c} = D_{30}²/(D_{10}·D_{60})
- Grava bien gradada: C_{u} ≥ 4, 1≤C_{c}≤3. Arena bien gradada: C_{u} ≥ 6, 1≤C_{c}≤3

**Plasticidad:** los **límites de Atterberg** miden cómo reacciona un fino al agua. IP = LL − LP. Sobre la línea A, A = 0.73(LL − 20): arcilla. Debajo: limo.`,
key:['C_{u} = [[D_{60}|D_{10}]]','C_{c} = [[D_{30}^{2}|D_{10}·D_{60}]]','IP = LL − LP','A = 0.73(LL − 20)'],
err:'Olvidar que IP se resta LL menos LP, no al revés.',
x:[['agr','La granulometría es el mismo ensayo'],['cap','SUCS da idea del suelo'],['pav','El CBR se relaciona con la clasificación']],
g:[
r=>{const LL=r.i(25,80),LP=r.i(12,24);return{q:`LL=${LL}, LP=${LP}. Halla IP.`,a:LL-LP,u:'%',s:[`IP = ${LL-LP} %`]};},
r=>{const d10=r.p([.08,.1,.12,.15,.2,.25]),d60=r.p([.5,.8,1,1.5,2,3]);return{q:`D_{10}=${d10} mm, D_{60}=${d60} mm. Halla C_{u}.`,a:d60/d10,u:'',s:[`= ${n(d60/d10)}`]};},
r=>{const d10=r.p([.08,.1,.12,.15]),d30=r.p([.25,.3,.4,.5,.6]),d60=r.p([.8,1,1.5,2]);return{q:`D_{10}=${d10}, D_{30}=${d30}, D_{60}=${d60} mm. Halla C_{c}.`,a:d30*d30/(d10*d60),u:'',s:[`= ${d30}²/(${d10}·${d60}) = ${n(d30*d30/(d10*d60))}`]};},
r=>{const LL=r.i(25,90);return{q:`Con LL=${LL}, ¿qué IP marca la línea A?`,a:.73*(LL-20),u:'%',s:[`A = 0.73(${LL}−20) = ${n(.73*(LL-20))}`]};},
r=>{const LL=r.i(30,85),LP=r.i(15,30),w=r.i(15,70);const IP=LL-LP,IL=(w-LP)/IP;return{q:`Una arcilla tiene LL=${LL}, LP=${LP}, w natural=${w} %. Halla el índice de liquidez IL=(w−LP)/IP.`,a:IL,u:'',s:[`IP = ${IP}`,`IL = ${n(IL)}. Cerca de 1 es blanda; cerca de 0, rígida`]};}
]});
SUB('cpt',{t:'Compactación',
lec:`Compactar es sacar el aire golpeando el suelo, para que resista más y se asiente menos.

**Proctor:** se compacta con distintas humedades y se grafica γ_{d} contra w. Aparece un pico: **humedad óptima y densidad máxima**. Con poca agua, las partículas no se acomodan. Con mucha, el agua ocupa su lugar.

**En obra:** se verifica con el cono de arena. El **grado de compactación** debe ser ≥ 95 % generalmente.

En vías y rellenos, esta es la diferencia entre durar 20 años o un invierno.`,
key:['γ_{d} = [[γ|1+w]]','GC = [[γ_{d,campo}|γ_{d,máx}]]','Agua = W_{s}(w_{ópt} − w)'],
err:'Comparar la densidad húmeda de campo con la densidad seca máxima.',
x:[['fas','Relaciones de fases'],['pav','La base del pavimento se compacta'],['are','El relleno cambia de volumen']],
g:[
r=>{const g=r.i(1.7,2.2,.02),w=r.i(6,20);return{q:`γ=${g} t/m³, w=${w} %. Halla γ_{d}.`,a:g/(1+w/100),u:'t/m³',s:[`= ${g}/(1+${w/100}) = ${n(g/(1+w/100))}`]};},
r=>{const c=r.i(1.5,1.9,.01),m=r.i(1.75,2.05,.01);return{q:`γ_{d} de campo=${c}, γ_{d,máx}=${m}. Halla GC.`,a:c/m*100,u:'%',s:[`GC = ${n(c/m*100)} %`]};},
r=>{const g=r.i(1.8,2.2,.02),w=r.i(6,18),m=r.i(1.8,2.1,.01);const gd=g/(1+w/100);return{q:`Campo γ=${g} t/m³, w=${w} %. Proctor γ_{d,máx}=${m}. Halla GC.`,a:gd/m*100,u:'%',s:[`γ_{d} = ${n(gd)}`,`GC = ${n(gd/m*100)} %`]};},
r=>{const V=r.i(100,3000,50),gd=r.i(1.6,2,.05),w=r.i(3,10),o=r.i(11,18);return{q:`Se compactan ${V} m³ con γ_{d}=${gd} t/m³. La humedad pasa de ${w} a ${o} %. ¿Cuánta agua se añade?`,a:V*gd*(o-w)/100,u:'m³',s:[`W_{s} = ${n(V*gd)} t`,`Agua = ${n(V*gd*(o-w)/100)} m³`]};},
r=>{const V=r.i(500,6000,100),gd=r.i(1.8,2.05,.05),gb=r.i(1.4,1.7,.05),e=r.p([.2,.25,.3]),q=r.p([10,15]);const Vb=V*gd/gb,Vs=Vb*(1+e);return{q:`Un terraplén de ${V} m³ compactado a γ_{d}=${gd} usa préstamo con γ_{d}=${gb}, esponjamiento ${e*100} % y volquetes de ${q} m³. ¿Cuántos viajes? (decimal)`,a:Vs/q,u:'viajes',s:[`Volumen en banco = ${n(Vb)} m³`,`Suelto = ${n(Vs)} m³`,`Viajes = ${n(Vs/q)}`]};}
]});
SUB('efe',{t:'Esfuerzos efectivos',
lec:`Terzaghi descubrió el principio más importante de la geotecnia:

**σ′ = σ − u**

El suelo lo sostienen sus partículas (σ′), no el agua. Si la presión del agua sube, las partículas se separan y el suelo pierde resistencia.

**Licuación:** en un sismo, una arena saturada sube u hasta igualar σ. Entonces σ′=0 y el suelo se comporta como un líquido. Pasó en Chimbote (1970) y en Pisco (2007).

Bajo el nivel freático usa γ′ = γ_{sat} − γ_{w}.`,
key:['σ′ = σ − u','σ = Σγ_{i}·h_{i}','u = γ_{w}·h_{w}','γ′ = γ_{sat} − γ_{w}'],fig:'estrato',
err:'Usar γ_{sat} con u=0, o γ′ y restar u también.',
x:[['fas','γ viene de las fases'],['cns','σ′ controla el asentamiento'],['res','La resistencia usa σ′'],['flu','El flujo cambia u']],
g:[
r=>{const g=r.i(1.5,2.1,.05),h=r.i(1,10,.5);return{q:`Estrato γ=${g} t/m³ y ${h} m de espesor, seco. Halla σ al fondo.`,a:g*h,u:'t/m²',s:[`σ = ${n(g*h)} t/m²`]};},
r=>{const h=r.i(1,15,.5);return{q:`¿Cuál es u a ${h} m bajo el nivel freático?`,a:h,u:'t/m²',s:[`u = 1·${h} = ${h} t/m²`]};},
r=>{const g=r.i(1.8,2.2,.05),h=r.i(2,12,.5);return{q:`Suelo saturado γ_{sat}=${g}, freático en superficie. Halla σ′ a ${h} m.`,a:(g-1)*h,u:'t/m²',s:[`σ′ = γ′·h = ${n((g-1)*h)} t/m²`]};},
r=>{const g1=r.i(1.6,1.8,.05),h1=r.i(1,5,.5),g2=r.i(1.9,2.2,.05),h2=r.i(1,8,.5);const s=g1*h1+g2*h2,u=h2;return{q:`${h1} m de suelo con γ=${g1}, luego ${h2} m saturados con γ_{sat}=${g2} (freático entre ambos). Halla σ′ al fondo.`,a:s-u,u:'t/m²',s:[`σ = ${n(s)} t/m²`,`u = ${h2} t/m²`,`σ′ = ${n(s-u)} t/m²`]};},
r=>{const g1=r.i(1.6,1.8,.05),h1=r.i(1,4,.5),g2=r.i(1.9,2.1,.05),h2=r.i(3,10,.5),b=r.i(1,2.5,.5);const inicial=g1*h1+(g2-1)*h2;const d=g2-g1;const final=g1*(h1+b)+(g2-1)*(h2-b)+0;return{q:`Perfil: γ=${g1} en ${h1} m, luego γ_{sat}=${g2} en ${h2} m con freático entre ambos. Si baja ${b} m el freático y el suelo drenado mantiene γ=${g1}, ¿cuánto aumenta σ′ al fondo?`,a:final-inicial,u:'t/m²',s:[`σ′ inicial = ${n(inicial)} t/m²`,`σ′ final = ${n(final)} t/m²`,`Δσ′ = ${n(final-inicial)} t/m². Por esto bombear agua produce asentamientos`]};}
]});
SUB('flu',{t:'Flujo de agua en suelos',
lec:`El agua atraviesa el suelo. **Darcy** dijo que la velocidad es proporcional al gradiente: v = k·i, donde k es la permeabilidad.

Valores típicos de k (cm/s): grava 1, arena 10⁻², limo 10⁻⁵, arcilla 10⁻⁷. Hay un rango enorme.

## Red de flujo
Permite calcular filtración bajo presas: q = k·H·N_{f}/N_{d}.

## Tubificación
Si el agua sube con mucha fuerza, arrastra el suelo. Sucede cuando i alcanza el gradiente crítico: i_{c} = γ′/γ_{w}. Muchas presas fallaron así.`,
key:['v = k·i','Q = k·i·A','i = [[Δh|L]]','q = k·H·[[N_{f}|N_{d}]]','i_{c} = [[G_{s}−1|1+e]]'],
err:'Olvidar que la velocidad real de filtración es v/n.',
x:[['efe','La presión de flujo cambia σ′'],['cns','La arcilla consolida lento por su k pequeña'],['fbe','Es flujo como en tuberías pero muy lento']],
g:[
r=>{const dh=r.i(.5,8,.5),L=r.i(2,30,1);return{q:`Δh=${dh} m en L=${L} m. Halla i.`,a:dh/L,u:'',s:[`i = ${n(dh/L)}`]};},
r=>{const k=r.p([1e-1,1e-2,1e-3,5e-3]),i=r.i(.1,1,.05);return{q:`k=${k} cm/s, i=${i}. Halla v.`,a:k*i,u:'cm/s',tol:.02,s:[`v = k·i = ${n(k*i)} cm/s`]};},
r=>{const G=r.p([2.6,2.65,2.7]),e=r.i(.4,1,.05);return{q:`G_{s}=${G}, e=${e}. Halla el gradiente crítico.`,a:(G-1)/(1+e),u:'',s:[`i_{c} = ${n((G-1)/(1+e))}`]};},
r=>{const k=r.p([1e-3,1e-4,5e-4,5e-3]),H=r.i(2,20),Nf=r.i(3,6),Nd=r.i(8,16);return{q:`Presa: k=${k} cm/s, H=${H} m, N_{f}=${Nf}, N_{d}=${Nd}. Halla q por metro.`,a:k/100*H*Nf/Nd*86400,u:'m³/día/m',s:[`q = kHN_{f}/N_{d}`,`= ${n(k/100*86400)} m/día·${H}·${Nf}/${Nd} = ${n(k/100*H*Nf/Nd*86400)}`]};},
r=>{const G=r.p([2.65,2.7]),e=r.i(.5,.9,.05),H=r.i(2,8),Nd=r.i(8,16),L=r.i(.5,1.5,.1);const ic=(G-1)/(1+e),i=H/Nd/L;return{q:`Salida de una ataguía: H=${H} m, N_{d}=${Nd}, último cuadro L=${L} m, G_{s}=${G}, e=${e}. Halla el FS contra tubificación.`,a:ic/i,u:'',s:[`i_{salida} = (H/N_{d})/L = ${n(i)}`,`i_{c} = ${n(ic)}`,`FS = ${n(ic/i)}`]};}
]});
SUB('cns',{t:'Consolidación y asentamientos',
lec:`Al cargar arcilla saturada, el agua debe salir por poros diminutos antes de que el suelo se comprima. Puede tardar **décadas**. La Torre de Pisa se inclinó por este proceso.

## Cuánto
Para arcilla normalmente consolidada:

S = [C_{c}·H/(1+e_{0})]·log[(σ₀′+Δσ)/σ₀′]

## Cuándo
t = T_{v}·H_{d}²/c_{v}. H_{d} es la mitad del estrato si drena por ambos lados. Para U=50 %, T_{v}=0.197; U=90 %, T_{v}=0.848.

**Precarga y drenes:** técnicas para adelantar el asentamiento antes de construir.`,
key:['S = [[C_{c}·H|1+e_{0}]]·log[[σ_{0}′+Δσ|σ_{0}′]]','t = [[T_{v}·H_{d}^{2}|c_{v}]]','Δσ ≈ [[q·B·L|(B+z)(L+z)]]'],
err:'Usar el estrato completo como H_{d} con doble drenaje. Es la mitad.',
x:[['efe','Es cambio en σ′'],['edo','Terzaghi la formuló como ecuación diferencial'],['zap','El asentamiento admisible controla la zapata']],
g:[
r=>{const q=r.i(5,30),B=r.i(1,5),z=r.i(1,5);return{q:`Zapata cuadrada B=${B} m, q=${q} t/m². Con el método 2:1, halla Δσ a z=${z} m.`,a:q*B*B/(B+z)**2,u:'t/m²',s:[`Δσ = qB²/(B+z)² = ${n(q*B*B/(B+z)**2)} t/m²`]};},
r=>{const Tv=r.p([.197,.848]),H=r.i(2,10),c=r.p([1,2,3,5]);return{q:`Doble drenaje, H=${H} m, c_{v}=${c} m²/año, T_{v}=${Tv}. Halla t.`,a:Tv*(H/2)**2/c,u:'años',s:[`H_{d} = ${H/2} m`,`t = ${n(Tv*(H/2)**2/c)} años`]};},
r=>{const Cc=r.i(.2,.8,.05),H=r.i(2,10),e=r.i(.7,1.3,.05),s0=r.i(5,20),d=r.i(2,15);return{q:`Arcilla NC: C_{c}=${Cc}, H=${H} m, e₀=${e}, σ₀′=${s0}, Δσ=${d} t/m². Halla S.`,a:Cc*H/(1+e)*Math.log10((s0+d)/s0)*100,u:'cm',s:[`S = ${n(Cc*H/(1+e))} log(${n((s0+d)/s0)})`,`S = ${n(Cc*H/(1+e)*Math.log10((s0+d)/s0)*100)} cm`]};},
r=>{const t1=r.i(1,6),H1=r.i(2,8),H2=r.i(4,12);return{q:`Un estrato de ${H1} m consolida en ${t1} años. ¿Cuánto tarda uno igual de ${H2} m?`,a:t1*(H2/H1)**2,u:'años',s:[`t ∝ H²`,`t = ${t1}(${H2}/${H1})² = ${n(t1*(H2/H1)**2)} años`]};},
r=>{const q=r.i(10,25),B=r.i(2,5),z=r.i(2,8),H=r.i(2,6),Cc=r.i(.2,.6,.05),e=r.i(.8,1.2,.05),g=r.i(.7,1,.1);const zm=z+H/2,s0=g*zm,d=q*B*B/(B+zm)**2,S=Cc*H/(1+e)*Math.log10((s0+d)/s0)*100;return{q:`Zapata B=${B} m, q=${q} t/m². A ${z} m hay arcilla de ${H} m (C_{c}=${Cc}, e₀=${e}). Usa γ′=${g} t/m³ en todo. Halla el asentamiento con Δσ y σ₀′ al medio del estrato.`,a:S,u:'cm',s:[`z medio = ${zm} m`,`σ₀′ = ${n(s0)}, Δσ = ${n(d)} t/m²`,`S = ${n(S)} cm`]};}
]});
SUB('res',{t:'Resistencia al corte',
lec:`El suelo falla por cortante, deslizándose. El criterio de **Mohr-Coulomb** lo resume:

τ = c′ + σ′·tan φ′

- **c:** cohesión, como si los granos tuvieran goma
- **φ:** fricción interna, como la de un montón de arena

## Ensayos
- **Corte directo:** simple y barato
- **Triaxial:** controla el drenaje. Da resultados más fiables

## Condiciones
Arcillas cargadas rápido: no drenado, φ=0, c=c_{u}. Arenas: drenadas, c=0.

El plano de falla forma 45° + φ/2 con el plano principal mayor.`,
key:['τ = c + σ′·tan φ','σ_{1} = σ_{3}·tan^{2}(45+φ/2) + 2c·tan(45+φ/2)','θ = 45° + [[φ|2]]'],
err:'Usar c en arena suelta o φ en arcilla blanda sin drenar.',
x:[['moh','Usa el círculo de Mohr'],['fri','φ es fricción'],['cap','Con c y φ se calcula la capacidad'],['emp','El empuje depende de φ']],
g:[
r=>{const c=r.i(0,5,.5),s=r.i(5,40),p=r.i(20,40);return{q:`c=${c} t/m², σ′=${s} t/m², φ=${p}°. Halla τ.`,a:c+s*tand(p),u:'t/m²',s:[`τ = ${c} + ${s} tan ${p}° = ${n(c+s*tand(p))}`]};},
r=>{const p=r.i(0,44,2);return{q:`φ=${p}°. ¿Qué ángulo forma el plano de falla?`,a:45+p/2,u:'°',s:[`θ = 45 + ${p/2} = ${45+p/2}°`]};},
r=>{const s3=r.i(5,30),p=r.i(25,40);const a=s3*tand(45+p/2)**2;return{q:`Arena (c=0), σ₃=${s3} t/m², φ=${p}°. Halla σ₁ de falla.`,a,u:'t/m²',s:[`σ₁ = σ₃ tan²(45+φ/2) = ${n(a)}`]};},
r=>{const s1=r.i(10,30),t1=r.i(5,12),ds=r.i(10,30),p=r.i(20,38);const t2=t1+ds*tand(p);return{q:`Corte directo: con σ=${s1}, τ=${t1}; con σ=${s1+ds}, τ=${n(t2)} t/m². Halla φ.`,a:p,u:'°',s:[`tan φ = Δτ/Δσ = ${n((t2-t1)/ds)}`,`φ = ${p}°`]};},
r=>{const s3=r.i(5,25),dev=r.i(10,40);return{q:`Triaxial no drenado en arcilla: σ₃=${s3}, esfuerzo desviador en falla=${dev} t/m². Halla c_{u}.`,a:dev/2,u:'t/m²',s:[`c_{u} = (σ₁−σ₃)/2 = ${dev/2}`,`Es el radio del círculo de Mohr`]};}
]});

MOD('m14','Cimentaciones y obras de tierra','Geotecnia',
'Aquí se unen las estructuras con el suelo: zapatas, muros, taludes y pilotes. Una falla aquí es invisible hasta que ya es tarde.',
['Das, Principios de ingeniería de cimentaciones','Bowles, Foundation Analysis and Design','Harmsen, capítulo de zapatas','Norma E.050 Suelos y Cimentaciones (RNE)'],
'UNI: Mecánica de Suelos II. PUCP: Ingeniería Geotécnica (1CIV41). MIT: 1.364 Advanced Geotechnical Engineering como avance.');
SUB('cap',{t:'Capacidad portante',
lec:`¿Cuánta carga aguanta el suelo antes de fallar? Terzaghi dedujo una fórmula con tres aportes:

- **c·N_{c}:** cohesión
- **q·N_{q}:** el peso del suelo a los lados (profundidad)
- **½γ·B·N_{γ}:** el ancho y el peso bajo la zapata

La E.050 pide **FS = 3** para condiciones estáticas. Enterrar la zapata sube mucho la capacidad.

Factores para φ: 0→N_{c}=5.7, N_{q}=1, N_{γ}=0. 20°→17.7, 7.4, 5. 25°→25.1, 12.7, 9.7. 30°→37.2, 22.5, 19.7. 35°→57.8, 41.4, 42.4.

**Cuidado:** si el freático sube, γ baja a γ′ y la capacidad cae hasta la mitad.`,
key:['q_{u} = c·N_{c} + q·N_{q} + 0.5·γ·B·N_{γ}','q_{u,cuad} = 1.3c·N_{c} + q·N_{q} + 0.4γ·B·N_{γ}','q_{a} = [[q_{u}|FS]]'],
err:'Olvidar que q = γ·D_{f} y no la carga de la zapata.',
x:[['res','c y φ vienen del ensayo'],['efe','Usa esfuerzos efectivos'],['zap','q_{a} dimensiona la zapata']],
g:[
r=>{const q=r.i(30,150,5);return{q:`q_{u}=${q} t/m², FS=3. Halla q_{a} en kg/cm².`,a:q/3/10,u:'kg/cm²',s:[`q_{a} = ${n(q/3)} t/m² = ${n(q/30)} kg/cm²`]};},
r=>{const g=r.i(1.5,2,.05),D=r.i(.8,3,.1);return{q:`γ=${g} t/m³, D_{f}=${D} m. Halla q.`,a:g*D,u:'t/m²',s:[`q = ${n(g*D)} t/m²`]};},
r=>{const cu=r.i(2,15,.5),g=r.i(1.6,1.9,.05),D=r.i(1,2.5,.5);const qu=1.3*cu*5.7+g*D;return{q:`Zapata cuadrada en arcilla (φ=0): c_{u}=${cu} t/m², γ=${g}, D_{f}=${D} m. Halla q_{u}.`,a:qu,u:'t/m²',s:[`q_{u} = 1.3c·5.7 + q·1`,`= ${n(qu)} t/m²`]};},
r=>{const F=r.p([[25,25.1,12.7,9.7],[30,37.2,22.5,19.7],[35,57.8,41.4,42.4]]),g=r.i(1.6,1.9,.05),D=r.i(1,2.5,.5),B=r.i(1,3,.5);const qu=g*D*F[2]+.4*g*B*F[3];return{q:`Zapata cuadrada B=${B} m en arena φ=${F[0]}° (N_{q}=${F[2]}, N_{γ}=${F[3]}), γ=${g}, D_{f}=${D} m. Halla q_{u}.`,a:qu,u:'t/m²',s:[`qN_{q} = ${n(g*D*F[2])}`,`0.4γBN_{γ} = ${n(.4*g*B*F[3])}`,`q_{u} = ${n(qu)} t/m²`]};},
r=>{const F=r.p([[25,25.1,12.7,9.7],[30,37.2,22.5,19.7]]),gs=r.i(1.8,2,.05),D=r.i(1,2,.5),B=r.i(1.5,3,.5);const q1=gs*D*F[2]+.4*gs*B*F[3],q2=gs*D*F[2]+.4*(gs-1)*B*F[3];return{q:`Zapata cuadrada B=${B} m, φ=${F[0]}° (N_{q}=${F[2]}, N_{γ}=${F[3]}), γ=${gs}, D_{f}=${D} m. Si el freático sube hasta la base, ¿qué % de capacidad se pierde? (γ′=γ−1 bajo la zapata)`,a:(q1-q2)/q1*100,u:'%',s:[`Seco: ${n(q1)} t/m²`,`Con agua: ${n(q2)} t/m²`,`Pérdida = ${n((q1-q2)/q1*100)} %`]};}
]});
SUB('zap',{t:'Diseño de zapatas',
lec:`La zapata reparte la carga de la columna en un área suficiente.

## Pasos
- **Área** con cargas de servicio: A = P/q_{a}
- **Punzonamiento:** la columna quiere atravesar la zapata. Se revisa a d/2 de la columna y suele definir el peralte
- **Cortante** a d de la cara
- **Flexión:** el suelo empuja hacia arriba, con voladizo en cada lado. El acero va **abajo**

## Presión última
q_{u} = P_{u}/A. Para flexión con volado m: M_{u} = q_{u}·B·m²/2.

Para punzonamiento: V_{c} = 1.06√f'_{c}·b_{o}·d (φ=0.85).`,
key:['A = [[P|q_{a}]]','m = [[B−c|2]]','M_{u} = [[q_{u}·B·m^{2}|2]]','φV_{c} = 0.85·1.06√{f\'_{c}}·b_{o}·d','b_{o} = 4(c+d)'],fig:'zapata',
err:'Dimensionar el área con P_{u}. Se usan cargas de servicio contra q_{a}.',
x:[['col','La columna manda la carga'],['cap','q_{a} del estudio de suelos'],['fle','La flexión usa la misma fórmula de vigas'],['cns','Asentamiento admisible']],
g:[
r=>{const P=r.i(30,300,10),qa=r.i(1,4.5,.5);return{q:`P=${P} t, q_{a}=${qa} kg/cm². Halla el área.`,a:P/(qa*10),u:'m²',s:[`q_{a} = ${qa*10} t/m²`,`A = ${n(P/(qa*10))} m²`]};},
r=>{const P=r.i(30,300,10),qa=r.i(1,4.5,.5);return{q:`Zapata cuadrada: P=${P} t, q_{a}=${qa} kg/cm². Halla B.`,a:sq(P/(qa*10)),u:'m',s:[`B = √(P/q_{a}) = ${n(sq(P/(qa*10)))} m`]};},
r=>{const B=r.i(1.2,3.5,.1),c=r.p([.3,.4,.5,.6]),Pu=r.i(50,400,10);const qu=Pu/(B*B),m=(B-c)/2;return{q:`Zapata B=${B} m, columna ${c*100} cm, P_{u}=${Pu} t. Halla M_{u} por metro de ancho.`,a:qu*m*m/2,u:'t·m/m',s:[`q_{u} = ${n(qu)} t/m²`,`m = ${n(m)} m`,`M_{u} = q_{u}m²/2 = ${n(qu*m*m/2)} t·m/m`]};},
r=>{const c=r.i(30,70,5),d=r.i(30,70,5),fc=r.p([210,280]);const bo=4*(c+d);return{q:`Columna ${c} cm cuadrada, d=${d} cm, f'_{c}=${fc}. Halla φV_{c} por punzonamiento.`,a:.85*1.06*sq(fc)*bo*d/1000,u:'t',s:[`b_{o} = ${bo} cm`,`φV_{c} = ${n(.85*1.06*sq(fc)*bo*d/1000)} t`]};},
r=>{const P=r.i(60,250,10),qa=r.i(1.5,4,.5),c=r.p([40,50,60]),Pu=P*1.45,d=r.i(35,70,5),fc=r.p([210,280]);const B=sq(P/(qa*10)),qu=Pu/(B*B),bo=4*(c+d),Ap=((c+d)/100)**2,Vu=Pu-qu*Ap,Vc=.85*1.06*sq(fc)*bo*d/1000;return{q:`Zapata cuadrada: P=${P} t, P_{u}=${n(Pu)} t, q_{a}=${qa} kg/cm², columna ${c} cm, d=${d} cm, f'_{c}=${fc}. Halla V_{u}/φV_{c} por punzonamiento.`,a:Vu/Vc,u:'',s:[`B = ${n(B)} m, q_{u} = ${n(qu)} t/m²`,`V_{u} = P_{u} − q_{u}(c+d)² = ${n(Vu)} t`,`φV_{c} = ${n(Vc)} t`,`Relación = ${n(Vu/Vc)}`]};}
]});
SUB('emp',{t:'Empuje y muros de contención',
lec:`La tierra empuja. Rankine dio coeficientes muy simples:

- **Activo** (el muro se aleja): K_{a} = tan²(45−φ/2)
- **Pasivo** (el muro empuja): K_{p} = tan²(45+φ/2)
- **Reposo:** K_{0} ≈ 1 − sen φ

La presión crece con la profundidad, formando un triángulo: E_{a} = ½K_{a}·γ·H², aplicado a H/3.

## Verificaciones del muro
- Deslizamiento: FS ≥ 1.5
- Volteo: FS ≥ 2
- Presión en suelo: menor a q_{a}, resultante en el tercio central

**El agua es el peor enemigo:** por eso los muros llevan drenes o lloraderos.`,
key:['K_{a} = tan^{2}(45−[[φ|2]])','E_{a} = ½K_{a}γH^{2}','FS_{d} = [[μ·W|E_{a}]]','FS_{v} = [[M_{r}|E_{a}·H/3]]'],fig:'muro',
err:'Colocar el empuje a H/2. Es triangular: va a H/3 de la base.',
x:[['res','φ del ensayo'],['fri','FS al deslizamiento'],['int','La resultante es una integral'],['fhi','Igual idea que empuje de agua']],
g:[
r=>{const p=r.i(20,40,1);return{q:`φ=${p}°. Halla K_{a}.`,a:tand(45-p/2)**2,u:'',s:[`K_{a} = tan²(${45-p/2}°) = ${n(tand(45-p/2)**2)}`]};},
r=>{const p=r.i(25,40),g=r.i(1.6,2,.05),H=r.i(2,8,.5);const Ka=tand(45-p/2)**2;return{q:`Muro H=${H} m, φ=${p}°, γ=${g}. Halla E_{a}.`,a:.5*Ka*g*H*H,u:'t/m',s:[`K_{a} = ${n(Ka)}`,`E_{a} = ${n(.5*Ka*g*H*H)} t/m`]};},
r=>{const E=r.i(2,20,.5),H=r.i(3,8,.5);return{q:`E_{a}=${E} t/m en muro de H=${H} m. Halla el momento volcador.`,a:E*H/3,u:'t·m/m',s:[`M = E·H/3 = ${n(E*H/3)}`]};},
r=>{const p=r.i(28,38,2),g=r.i(1.7,1.9,.1),H=r.i(3,6,.5),W=r.i(10,35,1),m=r.p([.45,.5,.55]);const E=.5*tand(45-p/2)**2*g*H*H;return{q:`Muro H=${H} m, φ=${p}°, γ=${g}, peso W=${W} t/m, μ=${m}. Halla FS al deslizamiento.`,a:m*W/E,u:'',s:[`E_{a} = ${n(E)} t/m`,`FS = ${n(m*W/E)}`]};},
r=>{const p=r.i(28,38,2),g=r.i(1.7,1.9,.1),H=r.i(3,6,.5),W=r.i(15,35,1),x=r.i(1,2.5,.25),q=r.i(1,3,.5);const Ka=tand(45-p/2)**2,E1=.5*Ka*g*H*H,E2=Ka*q*H;const Mv=E1*H/3+E2*H/2;return{q:`Muro H=${H} m, φ=${p}°, γ=${g}, sobrecarga ${q} t/m², peso W=${W} t/m con brazo ${x} m desde la punta. Halla FS al volteo.`,a:W*x/Mv,u:'',s:[`Empuje suelo: ${n(E1)} t/m a H/3`,`Empuje sobrecarga: ${n(E2)} t/m a H/2`,`M_{v} = ${n(Mv)}`,`FS = ${n(W*x)}/${n(Mv)} = ${n(W*x/Mv)}`]};}
]});
SUB('tal',{t:'Estabilidad de taludes',
lec:`¿Se cae el cerro? El factor de seguridad es la razón entre lo que resiste y lo que empuja.

## Talud infinito
- Sin agua, sin cohesión: FS = tan φ / tan β
- Con flujo paralelo a la superficie: FS = (γ′/γ_{sat})·tan φ / tan β

Es decir, el agua reduce el FS casi a la mitad. Por eso los huaicos llegan con las lluvias.

## Métodos de dovelas
Fellenius y Bishop dividen la masa en rebanadas. Lo hacen programas como Slide o GeoStudio.

Valores mínimos típicos: FS = 1.5 estático, 1.25 pseudoestático.`,
key:['FS = [[tan φ|tan β]]','FS = [[c|γ·z·sen β·cos β]] + [[tan φ|tan β]]','FS_{flujo} = [[γ′|γ_{sat}]]·[[tan φ|tan β]]'],
err:'No considerar el agua. Es la causa número uno de deslizamientos.',
x:[['fri','Es un bloque en plano inclinado'],['efe','El agua baja σ′'],['tri','La geometría del corte']],
g:[
r=>{const p=r.i(25,40),b=r.i(15,30);return{q:`Talud seco c=0, φ=${p}°, β=${b}°. Halla FS.`,a:tand(p)/tand(b),u:'',s:[`FS = ${n(tand(p)/tand(b))}`]};},
r=>{const p=r.i(25,40),FS=r.p([1.2,1.3,1.5]);return{q:`φ=${p}°, FS=${FS}. Halla β máximo.`,a:atand(tand(p)/FS),u:'°',s:[`tan β = tan φ/FS`,`β = ${n(atand(tand(p)/FS))}°`]};},
r=>{const c=r.i(.5,3,.5),p=r.i(20,35),g=r.i(1.7,2,.05),z=r.i(2,6),b=r.i(20,35);const f=c/(g*z*sind(b)*cosd(b))+tand(p)/tand(b);return{q:`Talud infinito c=${c} t/m², φ=${p}°, γ=${g}, z=${z} m, β=${b}°. Halla FS.`,a:f,u:'',s:[`Cohesión: ${n(c/(g*z*sind(b)*cosd(b)))}`,`Fricción: ${n(tand(p)/tand(b))}`,`FS = ${n(f)}`]};},
r=>{const p=r.i(25,38),b=r.i(15,25),g=r.i(1.9,2.1,.05);return{q:`Talud con flujo paralelo, c=0, φ=${p}°, β=${b}°, γ_{sat}=${g}. Halla FS.`,a:(g-1)/g*tand(p)/tand(b),u:'',s:[`γ′/γ_{sat} = ${n((g-1)/g)}`,`FS = ${n((g-1)/g*tand(p)/tand(b))}`]};},
r=>{const c=r.i(.5,2.5,.5),p=r.i(25,35),gs=r.i(1.9,2.1,.05),z=r.i(2,5),b=r.i(20,30);const d=c/(gs*z*sind(b)*cosd(b))+tand(p)/tand(b),w=c/(gs*z*sind(b)*cosd(b))+(gs-1)/gs*tand(p)/tand(b);return{q:`Talud c=${c}, φ=${p}°, γ=${gs}, z=${z} m, β=${b}°. ¿Qué % de FS pierde al saturarse con flujo paralelo?`,a:(d-w)/d*100,u:'%',s:[`Seco: ${n(d)}`,`Saturado: ${n(w)}`,`Pérdida = ${n((d-w)/d*100)} %`]};}
]});
SUB('pil',{t:'Pilotes',
lec:`Si el suelo superficial es blando, se lleva la carga a profundidad con pilotes. Trabajan por **punta** y por **fricción lateral**:

Q_{u} = Q_{p} + Q_{s}

- Arcilla: Q_{p} = 9c_{u}·A_{p}, fricción f = α·c_{u}
- Arena: Q_{p} = q′·N_{q}·A_{p}, fricción f = K·σ′·tan δ

**Grupo:** los pilotes juntos interfieren. La eficiencia puede ser menor que 1 en arcillas.

FS usual: 2 a 3. Se valida con ensayos de carga en obra.`,
key:['Q_{u} = Q_{p} + Q_{s}','Q_{p} = 9c_{u}A_{p}','Q_{s} = α·c_{u}·π·d·L','Q_{a} = [[Q_{u}|FS]]'],
err:'Usar el perímetro como área de punta o viceversa.',
x:[['cap','Comparte factores N'],['res','c_{u} del ensayo'],['col','El pilote es columna enterrada']],
g:[
r=>{const d=r.i(.3,2,.05);return{q:`Pilote d=${d} m. Halla A_{p}.`,a:PI*d*d/4,u:'m²',s:[`A_{p} = ${n(PI*d*d/4)} m²`]};},
r=>{const c=r.i(3,15,.5),d=r.p([.4,.5,.6,.8,1]);return{q:`c_{u}=${c} t/m², d=${d} m. Halla Q_{p}.`,a:9*c*PI*d*d/4,u:'t',s:[`Q_{p} = 9c_{u}A_{p} = ${n(9*c*PI*d*d/4)} t`]};},
r=>{const c=r.i(3,12,.5),d=r.p([.4,.5,.6,.8]),L=r.i(8,30),al=r.p([.5,.6,.7,.8,.9]);return{q:`c_{u}=${c}, α=${al}, d=${d} m, L=${L} m. Halla Q_{s}.`,a:al*c*PI*d*L,u:'t',s:[`Q_{s} = α·c_{u}·πd·L = ${n(al*c*PI*d*L)} t`]};},
r=>{const c=r.i(3,12,.5),d=r.p([.4,.5,.6,.8]),L=r.i(8,30),al=r.p([.5,.7,.9]),FS=r.p([2,2.5,3]);const Q=9*c*PI*d*d/4+al*c*PI*d*L;return{q:`Pilote en arcilla c_{u}=${c}, α=${al}, d=${d}, L=${L}, FS=${FS}. Halla Q_{a}.`,a:Q/FS,u:'t',s:[`Q_{u} = ${n(Q)} t`,`Q_{a} = ${n(Q/FS)} t`]};},
r=>{const P=r.i(100,800,50),c=r.i(4,10,.5),d=r.p([.5,.6,.8]),L=r.i(12,30),al=.7;const Q=(9*c*PI*d*d/4+al*c*PI*d*L)/2.5;return{q:`Columna con P=${P} t sobre pilotes en arcilla: c_{u}=${c}, α=0.7, d=${d}, L=${L}, FS=2.5, eficiencia 1. ¿Cuántos pilotes (decimal)?`,a:P/Q,u:'pilotes',s:[`Q_{a} = ${n(Q)} t/pilote`,`N = ${n(P/Q)}`]};}
]});

MOD('m15','Mecánica de fluidos','Agua',
'Agua en reposo que empuja presas, y agua en movimiento que pierde energía. Dos ideas: presión crece con la profundidad, y la energía se conserva.',
['Çengel y Cimbala, Mecánica de fluidos','White, Mecánica de fluidos','Rocha Felices, Hidráulica de tuberías y canales (UNI)','Streeter y Wylie, Mecánica de fluidos'],
'UNI: Mecánica de Fluidos I y II (HH-223, HH-224). PUCP: Mecánica de Fluidos (CIV274).');
SUB('fhi',{t:'Hidrostática',
lec:`La presión del agua depende solo de la profundidad. Una presa soporta lo mismo si el embalse mide 1 km o 100 km de largo; lo que importa es la altura.

**p = γ·h**. Con γ = 1 t/m³ = 9.81 kN/m³.

## Fuerza en superficies
- Es F = γ·h_{c}·A, donde h_{c} es la profundidad del centroide
- Se aplica más abajo que el centroide: en un muro vertical, a 2H/3 desde el nivel de agua

## Empuje de Arquímedes
Un cuerpo sumergido recibe una fuerza hacia arriba igual al peso del agua desalojada. También aplica a tanques enterrados vacíos, que pueden flotar.`,
key:['p = γ·h','F = γ·h_{c}·A','y_{p} = h_{c} + [[I_{c}|h_{c}·A]]','E = γ·V_{des}'],
err:'Aplicar F en el centroide en vez del centro de presiones.',
x:[['int','Es la integral de la presión'],['emp','Mismo triángulo que el empuje de suelo'],['res2','Los reservorios enfrentan esta presión']],
g:[
r=>{const h=r.i(1,40,.5);return{q:`Halla la presión a ${h} m de profundidad de agua.`,a:9.81*h,u:'kPa',s:[`p = 9.81·${h} = ${n(9.81*h)} kPa`]};},
r=>{const H=r.i(2,15,.5);return{q:`Pared vertical con ${H} m de agua. Halla F por metro de ancho.`,a:H*H/2,u:'t/m',s:[`F = ½γH² = ${n(H*H/2)} t/m`]};},
r=>{const b=r.i(1,5,.5),h=r.i(1,4,.5),H=r.i(2,10,.5);const hc=H+h/2,F=hc*b*h;return{q:`Compuerta vertical ${b}×${h} m con borde superior a ${H} m de profundidad. Halla la fuerza.`,a:F,u:'t',s:[`h_{c} = ${n(hc)} m`,`F = ${n(F)} t`]};},
r=>{const b=r.i(1,5,.5),h=r.i(1,4,.5),H=r.i(2,10,.5);const hc=H+h/2,y=hc+h*h/(12*hc);return{q:`Para esa compuerta (${b}×${h} m, borde a ${H} m), halla la profundidad del centro de presiones.`,a:y,u:'m',s:[`y_{p} = h_{c} + I_{c}/(h_{c}A) = ${n(hc)} + h²/(12h_{c})`,`= ${n(y)} m`]};},
r=>{const L=r.i(4,12),B=r.i(3,8),H=r.i(2.5,5,.5),e=.25,nf=r.i(1,2,.5);const Vc=2.4*2*e*(L*H+B*H)+2.4*L*B*.3*2;const E=L*B*(H-(H-nf<0?0:0));const emp=L*B*nf;return{q:`Tanque enterrado vacío de ${L}×${B} m en planta. Paredes, losa y techo pesan ${n(Vc)} t. Si el agua subterránea sube ${nf} m sobre su fondo, ¿cuál es el FS contra flotación?`,a:Vc/emp,u:'',s:[`Empuje = γ·${L}·${B}·${nf} = ${n(emp)} t`,`FS = ${n(Vc)}/${n(emp)} = ${n(Vc/emp)}`]};}
]});
SUB('fbe',{t:'Continuidad y Bernoulli',
lec:`**Continuidad:** lo que entra, sale. Si la tubería se angosta, el agua acelera: Q = A·V.

**Bernoulli:** la energía por unidad de peso se conserva entre dos puntos:

z + p/γ + V²/2g = constante

Los tres sumandos se miden en metros, por eso se llaman alturas: de posición, de presión y de velocidad. Es como una cuenta bancaria: puedes pasar de una a otra, pero el total se conserva.

Con pérdidas, se añade h_{f}.`,
key:['Q = A·V','z_{1} + [[p_{1}|γ]] + [[V_{1}^{2}|2g]] = z_{2} + [[p_{2}|γ]] + [[V_{2}^{2}|2g]] + h_{f}','V = √{2gh}'],fig:'bernoulli',
err:'Olvidar la altura de velocidad cuando la tubería cambia de diámetro.',
x:[['ene','Es conservación de energía'],['fpe','Agrega pérdidas'],['man','En canales, se reduce a energía específica'],['fbo','La bomba añade H']],
g:[
r=>{const d=r.p([.1,.15,.2,.25,.3,.4,.5]),V=r.i(.5,3,.1);return{q:`Tubería d=${d} m, V=${V} m/s. Halla Q.`,a:PI*d*d/4*V*1000,u:'L/s',s:[`A = ${n(PI*d*d/4)} m²`,`Q = ${n(PI*d*d/4*V*1000)} L/s`]};},
r=>{const d1=r.p([.2,.25,.3,.4]),d2=r.p([.1,.15]),V=r.i(.5,2.5,.1);return{q:`Reducción de d=${d1} a d=${d2} m con V₁=${V} m/s. Halla V₂.`,a:V*(d1/d2)**2,u:'m/s',s:[`V₂ = V₁(d₁/d₂)² = ${n(V*(d1/d2)**2)} m/s`]};},
r=>{const h=r.i(1,30,.5);return{q:`Un tanque descarga libre a ${h} m bajo el nivel. Halla V (Torricelli).`,a:sq(2*G*h),u:'m/s',s:[`V = √(2gh) = ${n(sq(2*G*h))} m/s`]};},
r=>{const z=r.i(5,50),V=r.i(1,3,.5),hf=r.i(1,5,.5);return{q:`De un reservorio a un punto ${z} m abajo, con V=${V} m/s y h_{f}=${hf} m. Halla la presión en el punto.`,a:z-V*V/(2*G)-hf,u:'m.c.a.',s:[`p/γ = z − V²/2g − h_{f}`,`= ${z} − ${n(V*V/(2*G))} − ${hf} = ${n(z-V*V/(2*G)-hf)} m`]};},
r=>{const d1=r.p([.3,.4,.5]),d2=r.p([.15,.2]),Q=r.i(30,150,10),p1=r.i(10,40);const V1=Q/1000/(PI*d1*d1/4),V2=Q/1000/(PI*d2*d2/4),p2=p1+(V1*V1-V2*V2)/(2*G);return{q:`Venturi horizontal: d₁=${d1}, d₂=${d2} m, Q=${Q} L/s, presión en 1 = ${p1} m.c.a. Halla la presión en 2.`,a:p2,u:'m.c.a.',s:[`V₁ = ${n(V1)}, V₂ = ${n(V2)} m/s`,`p₂/γ = p₁/γ + (V₁²−V₂²)/2g = ${n(p2)} m`]};}
]});
SUB('fpe',{t:'Pérdidas en tuberías',
lec:`El agua roza la tubería y pierde energía.

**Reynolds** dice si el flujo es tranquilo o turbulento: Re = V·D/ν. Con Re < 2300 es laminar; arriba de 4000, turbulento. El agua de una ciudad es casi siempre turbulenta.

## Darcy-Weisbach
Es la fórmula rigurosa: h_{f} = f·(L/D)·V²/2g. El factor f se saca del diagrama de **Moody** o de Colebrook.

## Hazen-Williams
Muy usada en redes de agua: C = 150 para PVC, 100–130 para fierro.

## Pérdidas locales
Codos y válvulas: h_{l} = K·V²/2g.`,
key:['Re = [[V·D|ν]]','h_{f} = f[[L|D]][[V^{2}|2g]]','Q = 0.2785·C·D^{2.63}·S^{0.54}','h_{l} = K[[V^{2}|2g]]'],
err:'Olvidar los decimales de Hazen-Williams: D en m, S en m/m.',
x:[['fbe','Se suman a Bernoulli'],['fbo','Con pérdidas se elige la bomba'],['res2','Se dimensiona la línea de aducción'],['num','Colebrook se itera']],
g:[
r=>{const V=r.i(.5,3,.1),D=r.p([.05,.1,.15,.2,.3]);return{q:`V=${V} m/s, D=${D} m, ν=10⁻⁶ m²/s. Halla Re.`,a:V*D/1e-6,u:'',s:[`Re = ${n(V*D/1e-6)}`,`Turbulento`]};},
r=>{const K=r.p([.3,.5,.75,1,2,5]),V=r.i(1,3.5,.5);return{q:`K=${K}, V=${V} m/s. Halla h_{l}.`,a:K*V*V/(2*G),u:'m',s:[`h_{l} = ${n(K*V*V/(2*G))} m`]};},
r=>{const f=r.p([.015,.018,.02,.025,.03]),L=r.i(50,2000,50),D=r.p([.1,.15,.2,.25,.3]),V=r.i(.8,2.5,.1);return{q:`f=${f}, L=${L} m, D=${D} m, V=${V} m/s. Halla h_{f}.`,a:f*L/D*V*V/(2*G),u:'m',s:[`h_{f} = ${f}·(${L}/${D})·${n(V*V/(2*G))} = ${n(f*L/D*V*V/(2*G))} m`]};},
r=>{const C=r.p([100,120,130,140,150]),D=r.p([.1,.15,.2,.25,.3]),S=r.p([.002,.005,.01,.015,.02]);return{q:`Hazen-Williams: C=${C}, D=${D} m, S=${S}. Halla Q.`,a:.2785*C*D**2.63*S**.54*1000,u:'L/s',s:[`Q = 0.2785·C·D^{2.63}·S^{0.54}`,`= ${n(.2785*C*D**2.63*S**.54*1000)} L/s`]};},
r=>{const Q=r.i(10,120,5),C=r.p([130,140,150]),L=r.i(200,3000,100),H=r.i(10,60,5);const S=H/L;const D=(Q/1000/(.2785*C*S**.54))**(1/2.63);return{q:`Una línea de ${L} m debe llevar ${Q} L/s con ${H} m de desnivel disponible (C=${C}). Halla el diámetro teórico.`,a:D*1000,u:'mm',s:[`S = ${n(S)} m/m`,`D = [Q/(0.2785·C·S^{0.54})]^{1/2.63}`,`D = ${n(D*1000)} mm. Elige el comercial superior`]};}
]});
SUB('fbo',{t:'Bombas',
lec:`Una bomba agrega energía. La altura que debe dar:

H = H_{estática} + pérdidas

La potencia que consume: **P = γ·Q·H/η**.

En obra se compara la **curva del sistema** con la curva de la bomba: se cruzan en el punto de operación.

**Cavitación:** si la presión en la succión baja mucho, el agua hierve en frío y destruye el rodete. Por eso se revisa el NPSH disponible.`,
key:['H = H_{e} + h_{f}','P = [[γ·Q·H|η]]','1 HP = 0.746 kW','NPSH_{d} = 10.33 − z_{s} − h_{fs} − h_{v}'],
err:'Olvidar la eficiencia, o mezclar L/s con m³/s.',
x:[['ene','Es potencia'],['fpe','Las pérdidas definen H'],['res2','Eleva agua al reservorio']],
g:[
r=>{const he=r.i(10,60,5),hf=r.i(1,15);return{q:`H estática ${he} m y pérdidas ${hf} m. Halla H.`,a:he+hf,u:'m',s:[`H = ${he+hf} m`]};},
r=>{const Q=r.i(5,100,5),H=r.i(10,80,5);return{q:`Q=${Q} L/s, H=${H} m. Halla la potencia hidráulica.`,a:9.81*Q/1000*H,u:'kW',s:[`P = γQH = ${n(9.81*Q/1000*H)} kW`]};},
r=>{const Q=r.i(5,100,5),H=r.i(10,80,5),e=r.p([.6,.65,.7,.75,.8]);return{q:`Q=${Q} L/s, H=${H} m, η=${e*100} %. Halla la potencia en HP.`,a:9.81*Q/1000*H/e/.746,u:'HP',s:[`P = ${n(9.81*Q/1000*H/e)} kW`,`= ${n(9.81*Q/1000*H/e/.746)} HP`]};},
r=>{const zs=r.i(1,6,.5),hf=r.i(.2,1.5,.1),hv=.24;return{q:`Succión: z_{s}=${zs} m, h_{fs}=${hf} m, h_{v}=0.24 m. Halla el NPSH disponible a nivel del mar.`,a:10.33-zs-hf-hv,u:'m',s:[`NPSH = 10.33 − ${zs} − ${hf} − 0.24 = ${n(10.33-zs-hf-hv)} m`]};},
r=>{const Q=r.i(10,60,5),D=r.p([.1,.15,.2]),L=r.i(100,800,50),he=r.i(15,50,5),f=.02,e=.7,hor=r.i(4,16,2),c=r.p([.5,.6,.7]);const V=Q/1000/(PI*D*D/4),hf=f*L/D*V*V/(2*G),H=he+hf,kW=9.81*Q/1000*H/e;return{q:`Bombeo: ${Q} L/s por D=${D} m, L=${L} m, f=0.02, H estática ${he} m, η=70 %. Trabaja ${hor} h/día y la energía cuesta S/${c}/kWh. Halla el costo diario.`,a:kW*hor*c,u:'S/',s:[`V = ${n(V)} m/s; h_{f} = ${n(hf)} m`,`H = ${n(H)} m; P = ${n(kW)} kW`,`Costo = ${n(kW*hor*c)} S/día`]};}
]});

MOD('m16','Hidráulica de canales','Agua',
'Agua con superficie libre: canales, ríos y alcantarillas. Sin presión, solo la gravedad. Fundamental para irrigación, drenaje y defensa ribereña.',
['Chow, Hidráulica de canales abiertos','Rocha Felices, Hidráulica de tuberías y canales','Villón Béjar, Hidráulica de canales','French, Open-Channel Hydraulics'],
'UNI: Mecánica de Fluidos II. PUCP: Hidráulica de Canales Abiertos (2CIV03).');
SUB('man',{t:'Flujo uniforme: Manning',
lec:`En un canal largo y recto, la gravedad y la fricción se equilibran: el tirante no cambia. Manning lo resume:

Q = (1/n)·A·R^{2/3}·S^{1/2}

- **n:** rugosidad. Concreto 0.013–0.015, tierra 0.025, río natural 0.035 o más.
- **R:** radio hidráulico = A/P.
- **S:** pendiente.

La sección más eficiente tiene máximo R. Para rectángulo b = 2y; para trapecio, medio hexágono.

Si el dato es Q y buscas el tirante, debes iterar: es el **tirante normal**. Usa el laboratorio para sentir cómo reacciona.`,
key:['Q = [[1|n]]·A·R^{2/3}·S^{1/2}','R = [[A|P]]','A = (b+zy)y','P = b + 2y√{1+z^{2}}'],lab:'manning',
err:'Usar la pendiente en % en lugar de m/m.',
x:[['der','La sección óptima se deriva'],['num','El tirante normal se itera'],['rac','Q viene de la hidrología'],['alc','Las redes de desagüe usan Manning']],
g:[
r=>{const b=r.i(.5,5,.5),y=r.i(.3,2.5,.1);return{q:`Canal rectangular b=${b} m, y=${y} m. Halla R.`,a:b*y/(b+2*y),u:'m',s:[`A = ${n(b*y)}, P = ${n(b+2*y)}`,`R = ${n(b*y/(b+2*y))} m`]};},
r=>{const b=r.i(.5,5,.5),y=r.i(.3,2.5,.1),nn=r.p([.013,.014,.015,.025]),S=r.p([.0005,.001,.002,.005]);const A=b*y,R=A/(b+2*y);return{q:`Rectangular b=${b}, y=${y} m, n=${nn}, S=${S}. Halla Q.`,a:A*R**(2/3)*sq(S)/nn,u:'m³/s',s:[`R = ${n(R)} m`,`Q = ${n(A*R**(2/3)*sq(S)/nn)} m³/s`]};},
r=>{const b=r.i(.5,4,.5),y=r.i(.4,2.5,.1),z=r.p([1,1.5,2]),nn=r.p([.015,.025,.03]),S=r.p([.0005,.001,.002]);const A=(b+z*y)*y,P=b+2*y*sq(1+z*z),R=A/P;return{q:`Trapezoidal b=${b}, y=${y}, z=${z}, n=${nn}, S=${S}. Halla Q.`,a:A*R**(2/3)*sq(S)/nn,u:'m³/s',s:[`A = ${n(A)}, P = ${n(P)}`,`Q = ${n(A*R**(2/3)*sq(S)/nn)} m³/s`]};},
r=>{const b=r.i(.5,4,.5),y=r.i(.4,2,.1),nn=r.p([.014,.015,.025]),Q=r.i(.5,6,.5);const A=b*y,R=A/(b+2*y),S=(Q*nn/(A*R**(2/3)))**2;return{q:`Rectangular b=${b}, y=${y}, n=${nn}, Q=${Q} m³/s. Halla S en ‰.`,a:S*1000,u:'‰',s:[`S = [Qn/(AR^{2/3})]²`,`S = ${n(S*1000)} ‰`]};},
r=>{const b=r.i(1,4,.5),nn=r.p([.014,.015,.025]),S=r.p([.001,.002,.003]),Q=r.i(1,8,.5);let y=1;for(let i=0;i<60;i++){const A=b*y,R=A/(b+2*y),f=A*R**(2/3)*sq(S)/nn;y*=(Q/f)**.6;}return{q:`Rectangular b=${b}, n=${nn}, S=${S}, Q=${Q} m³/s. Halla el tirante normal.`,a:y,u:'m',s:[`Prueba valores de y en Manning hasta que Q coincida`,`y_{n} = ${n(y)} m`]};}
]});
SUB('ene2',{t:'Energía específica y Froude',
lec:`Energía específica: E = y + V²/2g, medida desde el fondo. Un mismo caudal y una misma energía admiten **dos tirantes**: uno lento (subcrítico) y otro rápido (supercrítico).

El número de **Froude** los separa: Fr = V/√(gy).

- Fr < 1: subcrítico. Ríos tranquilos. Las perturbaciones suben.
- Fr = 1: crítico. Mínima energía.
- Fr > 1: supercrítico. Rápidas. Las perturbaciones no suben.

Para rectángulo, y_{c} = (q²/g)^{1/3}, con q = Q/b.`,
key:['E = y + [[V^{2}|2g]]','Fr = [[V|√{g·y}]]','y_{c} = ([[q^{2}|g]])^{1/3}','E_{mín} = 1.5·y_{c}'],
err:'Confundir Q con q (caudal por ancho).',
x:[['fbe','Es Bernoulli medido desde el fondo'],['sal','El salto ocurre al pasar de rápido a lento'],['man','Compara y_{n} con y_{c}']],
g:[
r=>{const V=r.i(.5,6,.25),y=r.i(.3,3,.1);return{q:`V=${V} m/s, y=${y} m. Halla Fr.`,a:V/sq(G*y),u:'',s:[`Fr = ${n(V/sq(G*y))}`]};},
r=>{const V=r.i(.5,5,.25),y=r.i(.3,3,.1);return{q:`V=${V} m/s, y=${y} m. Halla E.`,a:y+V*V/(2*G),u:'m',s:[`E = ${y} + ${n(V*V/(2*G))} = ${n(y+V*V/(2*G))} m`]};},
r=>{const Q=r.i(1,20),b=r.i(1,6,.5);const q=Q/b;return{q:`Q=${Q} m³/s, b=${b} m. Halla y_{c}.`,a:Math.cbrt(q*q/G),u:'m',s:[`q = ${n(q)} m²/s`,`y_{c} = ${n(Math.cbrt(q*q/G))} m`]};},
r=>{const Q=r.i(1,20),b=r.i(1,6,.5);const yc=Math.cbrt((Q/b)**2/G);return{q:`Q=${Q} m³/s, b=${b} m. Halla E_{mín}.`,a:1.5*yc,u:'m',s:[`y_{c} = ${n(yc)} m`,`E_{mín} = ${n(1.5*yc)} m`]};},
r=>{const q=r.i(1,5,.5),y=r.i(.8,2.5,.1),dz=r.i(.1,.5,.05);const E=y+q*q/(2*G*y*y);const yc=Math.cbrt(q*q/G),Em=1.5*yc;const lim=E-Em;return{q:`Canal rectangular q=${q} m²/s, y=${y} m. ¿Qué altura máxima puede tener una grada en el fondo sin alterar el flujo aguas arriba?`,a:lim,u:'m',s:[`E = ${n(E)} m`,`E_{mín} = ${n(Em)} m`,`Δz_{máx} = ${n(lim)} m`]};}
]});
SUB('sal',{t:'Resalto hidráulico',
lec:`Abre el caño sobre el lavadero: alrededor del chorro hay un anillo donde el agua pasa de rápida a lenta. Eso es un **resalto**, y disipa mucha energía.

En presas y rápidas se fuerza a propósito dentro de una poza de concreto. Si no se controla, el chorro socava y destruye la obra.

La fórmula de Bélanger relaciona los tirantes conjugados y sale de cantidad de movimiento, no de energía.

Longitud práctica: L ≈ 6(y₂ − y₁).`,
key:['y_{2} = [[y_{1}|2]](√{1+8Fr_{1}^{2}} − 1)','ΔE = [[(y_{2}−y_{1})^{3}|4y_{1}y_{2}]]','L ≈ 6(y_{2}−y_{1})'],
err:'Aplicar Bernoulli a través del resalto. Hay pérdida de energía grande.',
x:[['ene2','Requiere Fr>1'],['fbo','La energía disipada se calcula como potencia'],['can2','Forma parte del diseño de obras hidráulicas']],
g:[
r=>{const y1=r.i(.2,.9,.05),y2=r.i(1.5,4,.1);return{q:`y₁=${y1} m, y₂=${y2} m. Halla L.`,a:6*(y2-y1),u:'m',s:[`L = 6(${n(y2-y1)}) = ${n(6*(y2-y1))} m`]};},
r=>{const y1=r.i(.2,.9,.05),F=r.i(2,8,.5);return{q:`y₁=${y1} m, Fr₁=${F}. Halla y₂.`,a:y1/2*(sq(1+8*F*F)-1),u:'m',s:[`y₂ = ${y1}/2(√(1+8·${F}²)−1) = ${n(y1/2*(sq(1+8*F*F)-1))} m`]};},
r=>{const y1=r.i(.2,.8,.05),y2=r.i(1.5,4,.1);return{q:`y₁=${y1}, y₂=${y2} m. Halla ΔE.`,a:(y2-y1)**3/(4*y1*y2),u:'m',s:[`ΔE = ${n((y2-y1)**3/(4*y1*y2))} m`]};},
r=>{const q=r.i(2,10,.5),y1=r.i(.2,.7,.05);const V=q/y1,F=V/sq(G*y1),y2=y1/2*(sq(1+8*F*F)-1);return{q:`q=${q} m²/s, y₁=${y1} m. Halla y₂.`,a:y2,u:'m',s:[`V₁ = ${n(V)}, Fr₁ = ${n(F)}`,`y₂ = ${n(y2)} m`]};},
r=>{const q=r.i(2,8,.5),y1=r.i(.2,.7,.05),b=r.i(3,10,1);const V=q/y1,F=V/sq(G*y1),y2=y1/2*(sq(1+8*F*F)-1),dE=(y2-y1)**3/(4*y1*y2),P=9.81*q*b*dE;return{q:`Poza de ${b} m de ancho, q=${q} m²/s, y₁=${y1} m. Halla la potencia disipada.`,a:P,u:'kW',s:[`y₂ = ${n(y2)} m; ΔE = ${n(dE)} m`,`P = γQΔE = ${n(P)} kW`]};}
]});
SUB('can2',{t:'Vertederos, orificios y alcantarillas',
lec:`Medir y controlar el agua en canales usa dispositivos simples:

- **Vertedero rectangular:** Q = 1.84·L·H^{3/2} (sistema métrico, sin contracciones laterales)
- **Vertedero triangular de 90°:** Q = 1.4·H^{5/2}
- **Orificio:** Q = C_{d}·A·√(2gh), C_{d} ≈ 0.6

## Alcantarillas de carretera
Una tubería que cruza bajo la vía. Puede trabajar llena o parcial. Se revisa que el agua no pase por encima del terraplén. Son de las obras más sencillas y una de las causas más comunes de falla en vías cuando se tapan.`,
key:['Q = 1.84·L·H^{3/2}','Q = 1.4·H^{5/2}','Q = C_{d}·A·√{2gh}'],
err:'Medir H justo en la cresta. Debe medirse aguas arriba.',
x:[['fbe','El orificio es Torricelli'],['rac','La alcantarilla se dimensiona con el caudal de la cuenca'],['hor','Forma parte del drenaje de vías']],
g:[
r=>{const L=r.i(.5,5,.5),H=r.i(.1,1,.05);return{q:`Vertedero L=${L} m, H=${H} m. Halla Q.`,a:1.84*L*H**1.5*1000,u:'L/s',s:[`Q = 1.84·${L}·${H}^{1.5} = ${n(1.84*L*H**1.5*1000)} L/s`]};},
r=>{const H=r.i(.05,.5,.01);return{q:`Vertedero triangular 90°, H=${H} m. Halla Q.`,a:1.4*H**2.5*1000,u:'L/s',s:[`Q = ${n(1.4*H**2.5*1000)} L/s`]};},
r=>{const d=r.i(5,50,1),h=r.i(.5,10,.5);const A=PI*(d/100)**2/4;return{q:`Orificio d=${d} cm, h=${h} m, C_{d}=0.6. Halla Q.`,a:.6*A*sq(2*G*h)*1000,u:'L/s',s:[`A = ${n(A)} m²`,`Q = ${n(.6*A*sq(2*G*h)*1000)} L/s`]};},
r=>{const Q=r.i(100,3000,50),L=r.i(1,6,.5);const H=(Q/1000/(1.84*L))**(2/3);return{q:`Un vertedero de L=${L} m debe pasar ${Q} L/s. Halla H.`,a:H,u:'m',s:[`H = (Q/(1.84L))^{2/3} = ${n(H)} m`]};},
r=>{const Q=r.i(1,8,.5),H=r.i(1,3,.25);const A=Q/(.6*sq(2*G*H)),d=sq(4*A/PI);return{q:`Una alcantarilla con entrada controlada (C_{d}=0.6) debe pasar ${Q} m³/s con carga ${H} m. Halla el diámetro.`,a:d,u:'m',s:[`A = Q/(C_{d}√(2gH)) = ${n(A)} m²`,`d = ${n(d)} m`]};}
]});

MOD('m17','Hidrología','Agua',
'De dónde sale el agua y cuánta llega. El caudal de diseño para puentes, canales y drenajes viene de aquí.',
['Chow, Maidment y Mays, Hidrología aplicada','Villón Béjar, Hidrología','Aparicio Mijares, Fundamentos de hidrología de superficie','Linsley, Kohler y Paulhus, Hydrology for Engineers'],
'UNI: Hidrología General (HH-113), Recursos Hidráulicos. PUCP: Hidrología (2CIV08).');
SUB('cue',{t:'Cuencas y precipitación',
lec:`Una **cuenca** es el área que drena a un punto. Es el embudo de la lluvia. Se delimita sobre un plano siguiendo las divisorias.

## Lluvia promedio
Las estaciones no están distribuidas igual. Tres métodos:

- **Media aritmética:** promedio simple, solo si es plana
- **Thiessen:** pondera por áreas de influencia
- **Isoyetas:** el más preciso, requiere criterio

**Tiempo de concentración:** cuánto tarda la gota más lejana en llegar. Kirpich: t_{c} = 0.0195·(L³/H)^{0.385} minutos, con L y H en metros.`,
key:['P̄ = [[ΣA_{i}P_{i}|A_{T}]]','t_{c} = 0.0195([[L^{3}|H]])^{0.385}','S = [[H|L]]'],
err:'Usar el método aritmético en cuencas de sierra, con gran variación.',
x:[['rac','t_{c} define la intensidad'],['are','El área se obtiene con coordenadas'],['pol','Usa la topografía de la cuenca']],
g:[
r=>{const v=[r.i(5,60),r.i(5,60),r.i(5,60)];return{q:`Lluvias: ${v.join(', ')} mm. Halla la media aritmética.`,a:(v[0]+v[1]+v[2])/3,u:'mm',s:[`= ${n((v[0]+v[1]+v[2])/3)} mm`]};},
r=>{const P=[r.i(10,80),r.i(10,80),r.i(10,80)],A=[r.i(5,40),r.i(5,40),r.i(5,40)];const s=A[0]*P[0]+A[1]*P[1]+A[2]*P[2],T=A[0]+A[1]+A[2];return{q:`Thiessen: lluvias ${P.join(', ')} mm con áreas ${A.join(', ')} km². Halla la lluvia media.`,a:s/T,u:'mm',s:[`ΣAP = ${s}`,`P̄ = ${s}/${T} = ${n(s/T)} mm`]};},
r=>{const L=r.i(500,10000,100),H=r.i(20,800,10);return{q:`L=${L} m, H=${H} m. Halla t_{c} con Kirpich.`,a:.0195*(L**3/H)**.385,u:'min',s:[`t_{c} = ${n(.0195*(L**3/H)**.385)} min`]};},
r=>{const P=r.i(10,120),A=r.i(5,200,5);return{q:`Cae ${P} mm sobre ${A} km². ¿Qué volumen de agua es?`,a:P/1000*A*1e6,u:'m³',s:[`V = ${P/1000}·${A*1e6} = ${n(P/1000*A*1e6,6)} m³`]};},
r=>{const P=r.i(20,120),A=r.i(5,200,5),t=r.i(2,24),C=r.p([.3,.4,.5,.6]);return{q:`Una lluvia de ${P} mm sobre ${A} km² con coeficiente ${C} escurre en ${t} h. Halla el caudal medio.`,a:P/1000*A*1e6*C/(t*3600),u:'m³/s',s:[`V efectivo = ${n(P/1000*A*1e6*C,6)} m³`,`Q = ${n(P/1000*A*1e6*C/(t*3600))} m³/s`]};}
]});
SUB('rac',{t:'Método racional',
lec:`Para cuencas pequeñas (menos de unos 13 km²):

**Q = C·i·A/3.6** (Q en m³/s, i en mm/h, A en km²)

- **C:** coeficiente de escorrentía. Techo 0.9, pavimento 0.85, parque 0.2.
- **i:** intensidad con duración igual a t_{c}, se lee de curvas IDF según el periodo de retorno.

**Idea:** el pico se alcanza cuando toda la cuenca aporta a la salida, es decir, tras t_{c}.

Si urbanizas, C sube y los caudales se disparan. Por eso una ciudad se inunda más que un campo con la misma lluvia.`,
key:['Q = [[C·i·A|3.6]]','C̄ = [[ΣC_{i}A_{i}|ΣA_{i}]]','i = [[K·T^{m}|t^{n}]]'],
err:'Mezclar unidades: la fórmula con 3.6 pide km² y mm/h.',
x:[['pro','T define el riesgo'],['cue','t_{c} define la duración'],['man','Q dimensiona el canal'],['can2','Q dimensiona la alcantarilla']],
g:[
r=>{const C=r.p([.2,.3,.5,.7,.9]),i=r.i(10,150,5),A=r.i(.1,12,.1);return{q:`C=${C}, i=${i} mm/h, A=${A} km². Halla Q.`,a:C*i*A/3.6,u:'m³/s',s:[`Q = ${n(C*i*A/3.6)} m³/s`]};},
r=>{const C1=r.p([.9,.85]),A1=r.i(1,6),C2=r.p([.2,.3]),A2=r.i(1,6);return{q:`${A1} ha con C=${C1} y ${A2} ha con C=${C2}. Halla C̄.`,a:(C1*A1+C2*A2)/(A1+A2),u:'',s:[`C̄ = ${n((C1*A1+C2*A2)/(A1+A2))}`]};},
r=>{const K=r.p([300,400,500,600]),T=r.p([10,25,50,100]),m=.15,t=r.i(10,120,5),nn=.6;return{q:`IDF: i=${K}·T^{0.15}/t^{0.6} (mm/h, t en min). T=${T} años, t=${t} min. Halla i.`,a:K*T**m/t**nn,u:'mm/h',s:[`i = ${n(K*T**m/t**nn)} mm/h`]};},
r=>{const C=r.p([.3,.4,.5,.6]),K=r.p([300,400,500]),T=r.p([10,25,50]),L=r.i(800,4000,100),H=r.i(20,200,10),A=r.i(.5,8,.5);const tc=.0195*(L**3/H)**.385,i=K*T**.15/tc**.6;return{q:`Cuenca A=${A} km², C=${C}, L=${L} m, H=${H} m. IDF: i=${K}T^{0.15}/t^{0.6}, T=${T}. Halla Q.`,a:C*i*A/3.6,u:'m³/s',s:[`t_{c} = ${n(tc)} min`,`i = ${n(i)} mm/h`,`Q = ${n(C*i*A/3.6)} m³/s`]};},
r=>{const C1=r.p([.25,.3]),C2=r.p([.75,.85]),i=r.i(40,120,5),A=r.i(1,8,.5);return{q:`Una cuenca de ${A} km² con C=${C1} se urbaniza y sube a C=${C2}, con i=${i} mm/h. ¿Cuánto aumenta Q?`,a:(C2-C1)*i*A/3.6,u:'m³/s',s:[`ΔQ = (C₂−C₁)iA/3.6 = ${n((C2-C1)*i*A/3.6)} m³/s`]};}
]});
SUB('scs',{t:'Número de curva y SCS',
lec:`No toda la lluvia escurre: parte se infiltra. El método SCS calcula la lluvia efectiva con un número de curva CN (0–100).

- **S = 25400/CN − 254** (mm)
- **Pe = (P − 0.2S)²/(P + 0.8S)**, si P > 0.2S

CN depende del suelo y su uso: bosque en suelo arenoso 30, pavimento 98.

Con la lluvia efectiva y un **hidrograma unitario** obtienes cómo varía el caudal en el tiempo. El pico triangular: q_{p} = 0.208·A·Pe/t_{p}, con A en km², Pe en mm y t_{p} en h.`,
key:['S = [[25400|CN]] − 254','P_{e} = [[(P−0.2S)^{2}|P+0.8S]]','q_{p} = [[0.208·A·P_{e}|t_{p}]]'],
err:'Aplicar la fórmula si P < 0.2S. No hay escorrentía.',
x:[['cue','Usa cuenca y lluvia'],['rac','Alternativa para cuencas grandes'],['pro','Asociado al periodo de retorno']],
g:[
r=>{const c=r.i(40,98,2);return{q:`CN=${c}. Halla S.`,a:25400/c-254,u:'mm',s:[`S = 25400/${c} − 254 = ${n(25400/c-254)} mm`]};},
r=>{const c=r.i(40,98,2);return{q:`CN=${c}. Halla la abstracción inicial 0.2S.`,a:.2*(25400/c-254),u:'mm',s:[`= ${n(.2*(25400/c-254))} mm`]};},
r=>{const c=r.i(60,95,5),P=r.i(40,150,5);const S=25400/c-254,Pe=(P-.2*S)**2/(P+.8*S);return{q:`P=${P} mm, CN=${c}. Halla P_{e}.`,a:Pe,u:'mm',s:[`S = ${n(S)} mm`,`P_{e} = ${n(Pe)} mm`]};},
r=>{const A=r.i(5,200,5),Pe=r.i(5,60),tp=r.i(.5,6,.5);return{q:`A=${A} km², P_{e}=${Pe} mm, t_{p}=${tp} h. Halla q_{p}.`,a:.208*A*Pe/tp,u:'m³/s',s:[`q_{p} = ${n(.208*A*Pe/tp)} m³/s`]};},
r=>{const c=r.i(65,90,5),P=r.i(50,150,5),A=r.i(10,300,10),tc=r.i(1,6,.5),D=1;const S=25400/c-254,Pe=(P-.2*S)**2/(P+.8*S),tp=D/2+.6*tc;return{q:`Cuenca A=${A} km², CN=${c}, P=${P} mm, t_{c}=${tc} h, duración 1 h. Con t_{p}=D/2+0.6t_{c}, halla el caudal pico.`,a:.208*A*Pe/tp,u:'m³/s',s:[`P_{e} = ${n(Pe)} mm`,`t_{p} = ${n(tp)} h`,`q_{p} = ${n(.208*A*Pe/tp)} m³/s`]};}
]});

MOD('m18','Agua potable y saneamiento','Agua',
'La ingeniería civil que más salud ha dado. Del río a la casa, y de la casa a la planta de tratamiento.',
['Agüero Pittman, Agua potable para poblaciones rurales (Perú)','Metcalf & Eddy, Ingeniería de aguas residuales','Vierendel, Abastecimiento de agua y alcantarillado (UNI)','Normas OS.050, OS.070, OS.100, IS.010 (RNE)'],
'UNI: Abastecimiento de Agua y Alcantarillado (SA-253). PUCP: Fundamentos de Ingeniería Ambiental (CIV229).');
SUB('pob',{t:'Población y caudales de diseño',
lec:`Diseñas para el futuro. El sistema debe servir por unos 20 años, así que necesitas proyectar la población.

- **Aritmético:** P = P₀(1 + r·t)
- **Geométrico:** P = P₀(1 + r)^{t}

Con la **dotación** (L/hab/día, según clima y población) obtienes caudales:

- **Q_{p}:** promedio = P·D/86400
- **Q_{md}:** máximo diario = k₁·Q_{p}, k₁ = 1.3
- **Q_{mh}:** máximo horario = k₂·Q_{p}, k₂ = 1.8 a 2.5

Captación y línea de conducción usan Q_{md}. La red de distribución usa Q_{mh}.`,
key:['Q_{p} = [[P·D|86400]]','Q_{md} = 1.3·Q_{p}','Q_{mh} = k_{2}·Q_{p}','P = P_{0}(1+r)^{t}'],
err:'Dimensionar la red con Q_{md}: se quedaría corta en horas pico.',
x:[['edo','Crecimiento geométrico'],['res2','Los caudales dimensionan el tanque'],['alc','El desagüe es 80 % del agua'],['fpe','Las tuberías se calculan con Q']],
g:[
r=>{const P=r.i(500,20000,100),D=r.p([120,150,180,200,220,250]);return{q:`${P} hab con D=${D} L/hab/día. Halla Q_{p}.`,a:P*D/86400,u:'L/s',s:[`Q_{p} = ${n(P*D/86400)} L/s`]};},
r=>{const P=r.i(500,20000,100),rr=r.i(.5,3,.5),t=r.p([10,15,20]);return{q:`P₀=${P}, r=${rr} % anual, t=${t} años, método aritmético. Halla P.`,a:P*(1+rr/100*t),u:'hab',s:[`P = ${n(P*(1+rr/100*t),6)} hab`]};},
r=>{const P=r.i(500,20000,100),rr=r.i(.5,3,.5),t=r.p([10,15,20]);return{q:`P₀=${P}, r=${rr} % anual, t=${t} años, método geométrico. Halla P.`,a:P*(1+rr/100)**t,u:'hab',s:[`P = ${n(P*(1+rr/100)**t,6)} hab`]};},
r=>{const P=r.i(1000,30000,500),D=r.p([150,180,220]),k=r.p([1.8,2,2.5]);const q=P*D/86400;return{q:`P=${P} hab, D=${D}, k₂=${k}. Halla Q_{mh}.`,a:k*q,u:'L/s',s:[`Q_{p} = ${n(q)} L/s`,`Q_{mh} = ${n(k*q)} L/s`]};},
r=>{const P=r.i(1000,15000,500),rr=r.i(1,3,.5),D=r.p([150,180,220]),C=150,L=r.i(500,5000,500),H=r.i(20,120,10);const Pf=P*(1+rr/100)**20,Q=1.3*Pf*D/86400,S=H/L,d=(Q/1000/(.2785*C*S**.54))**(1/2.63);return{q:`Conducción por gravedad: P₀=${P}, r=${rr} %, 20 años, D=${D}. Línea PVC (C=150) de ${L} m con ${H} m de desnivel. Halla el diámetro con Q_{md}.`,a:d*1000,u:'mm',s:[`P_{f} = ${n(Pf,6)} hab`,`Q_{md} = ${n(Q)} L/s`,`S = ${n(S)}`,`D = ${n(d*1000)} mm`]};}
]});
SUB('res2',{t:'Reservorios y redes',
lec:`Un reservorio guarda agua en la noche para las horas pico. Su volumen tiene tres partes:

- **Regulación:** 25 % del consumo promedio diario (norma peruana)
- **Contra incendio:** según población
- **Reserva**

## Redes
- **Velocidad:** entre 0.6 y 3 m/s (mínima para limpiar, máxima para evitar golpes)
- **Presión mínima:** 10 m.c.a. en redes urbanas, según norma (OS.050)
- **Presión máxima:** 50 m.c.a. Si es más, se usan cámaras rompe-presión

**Método de Hardy Cross:** las mallas se balancean igual que Cross balancea momentos: el mismo ingeniero, la misma idea.`,
key:['V_{reg} = 0.25·Q_{p}·86400','P_{nudo} = Cota_{res} − h_{f} − Cota_{nudo}','Δ_{Q} = −[[Σh_{f}|1.85·Σ(h_{f}/Q)]]'],
err:'Olvidar pasar de L/s a m³/día.',
x:[['pob','Usa Q_{p}'],['fhi','La altura da la presión'],['crs','Hardy Cross es la misma técnica'],['fpe','Pérdidas']],
g:[
r=>{const Q=r.i(2,80,2);return{q:`Q_{p}=${Q} L/s. Halla el volumen de regulación (25 %).`,a:.25*Q*86.4,u:'m³',s:[`Volumen diario = ${n(Q*86.4)} m³`,`Regulación = ${n(.25*Q*86.4)} m³`]};},
r=>{const cr=r.i(120,600,5),d=r.i(15,60,1),hf=r.i(1,12,.5);return{q:`Reservorio con nivel de agua en cota ${cr} m. Nudo en cota ${cr-d} m. Pérdidas hasta el nudo: ${hf} m. Halla la presión.`,a:d-hf,u:'m.c.a.',s:[`P = Cota_{res} − h_{f} − Cota_{nudo}`,`P = ${cr} − ${hf} − ${cr-d} = ${n(d-hf)} m.c.a.`,`Debe estar entre 10 y 50 m.c.a.`]};},
r=>{const Q=r.i(5,80,5),D=r.p([.075,.1,.15,.2,.25]);return{q:`Q=${Q} L/s, D=${D} m. Halla V.`,a:Q/1000/(PI*D*D/4),u:'m/s',s:[`V = ${n(Q/1000/(PI*D*D/4))} m/s`,`Verifica entre 0.6 y 3 m/s`]};},
r=>{const Q=r.i(5,80,5),V=r.p([1,1.2,1.5,2]);return{q:`Q=${Q} L/s, V objetivo=${V} m/s. Halla D.`,a:sq(4*Q/1000/(PI*V))*1000,u:'mm',s:[`D = √(4Q/πV) = ${n(sq(4*Q/1000/(PI*V))*1000)} mm`]};},
r=>{const a=r.i(2,10),b=r.i(2,10),Qa=r.i(10,40,5),Qb=r.i(5,30,5);const num=a-b;const dQ=-num/(1.85*(a/Qa+b/Qb));return{q:`Hardy Cross, una malla: tramo horario h_{f}=${a} m con Q=${Qa} L/s; antihorario h_{f}=${b} m con Q=${Qb} L/s. Halla la corrección ΔQ.`,a:dQ,u:'L/s',s:[`Σh_{f} = ${a} − ${b} = ${num}`,`1.85Σ(h_{f}/Q) = ${n(1.85*(a/Qa+b/Qb))}`,`ΔQ = ${n(dQ)} L/s`]};}
]});
SUB('alc',{t:'Alcantarillado',
lec:`Las aguas residuales van por gravedad. Son canales circulares, por lo que se usa Manning (n≈0.010–0.013 en PVC).

- **Caudal de contribución:** 80 % del agua usada
- **Tensión tractiva:** τ = γ·R·S debe ser ≥ 1 Pa para arrastrar sólidos
- **Tubería llena:** Q = 0.312·D^{8/3}·S^{1/2}/n
- **Relleno:** normalmente hasta y/D = 0.75, para que respire

Buzones cada 80 a 100 m, en cambios de dirección o pendiente.`,
key:['Q_{d} = 0.80·Q_{mh}','Q_{ll} = [[0.312·D^{8/3}·S^{1/2}|n]]','τ = γ·R·S','R_{ll} = [[D|4]]'],
err:'Dimensionar por caudal y no revisar la autolimpieza.',
x:[['man','Es Manning en un círculo'],['pob','Caudal viene del consumo'],['pta','Llega a la planta']],
g:[
r=>{const Q=r.i(5,100,5);return{q:`Q_{mh}=${Q} L/s de agua. Halla el caudal de desagüe.`,a:.8*Q,u:'L/s',s:[`Q = 0.8·${Q} = ${n(.8*Q)} L/s`]};},
r=>{const D=r.p([.16,.2,.25,.3,.315,.35,.4,.45,.5,.6,.7,.8,.9,1]);return{q:`D=${D} m lleno. Halla R.`,a:D/4,u:'m',s:[`R = D/4 = ${n(D/4)} m`]};},
r=>{const D=r.p([.2,.25,.315,.4,.5]),S=r.p([.005,.008,.01,.015,.02]),nn=r.p([.01,.013]);return{q:`D=${D} m, S=${S}, n=${nn}. Halla Q a sección llena.`,a:.312*D**(8/3)*sq(S)/nn*1000,u:'L/s',s:[`Q = ${n(.312*D**(8/3)*sq(S)/nn*1000)} L/s`]};},
r=>{const D=r.p([.2,.25,.315,.4]),S=r.p([.004,.006,.008,.01,.02]);return{q:`D=${D} m lleno, S=${S}. Halla la tensión tractiva.`,a:9810*D/4*S,u:'Pa',s:[`τ = γRS = 9810·${D/4}·${S} = ${n(9810*D/4*S)} Pa`]};},
r=>{const P=r.i(1000,20000,500),Dt=r.p([150,180,220]),S=r.p([.005,.008,.01,.015]),nn=.013;const Q=.8*2*P*Dt/86400/1000;const D=(Q*nn/(.312*sq(S)))**(3/8);return{q:`${P} hab, D=${Dt} L/hab/día, k₂=2, contribución 80 %. Colector S=${S}, n=0.013. Halla el diámetro teórico a sección llena.`,a:D*1000,u:'mm',s:[`Q = ${n(Q*1000)} L/s`,`D = [Qn/(0.312√S)]^{3/8} = ${n(D*1000)} mm`]};}
]});
SUB('pta',{t:'Tratamiento de aguas',
lec:`El agua residual consume oxígeno al descomponerse. Se mide con la **DBO**. Si llega cruda a un río, lo mata.

## Agua residual: etapas
- **Preliminar:** rejas y desarenador
- **Primaria:** sedimentación
- **Secundaria:** lodos activados, lagunas
- **Terciaria:** desinfección

## Agua potable
Coagulación, floculación, sedimentación, filtración y cloración.

**Parámetros:**

- Eficiencia = (S₀−S)/S₀
- Tiempo de retención t = V/Q
- Carga superficial = Q/A`,
key:['E = [[S_{0}−S|S_{0}]]','t = [[V|Q]]','CS = [[Q|A]]','DBO_{t} = L_{0}(1−e^{−kt})','Carga = Q·S_{0}'],
err:'Confundir DBO ejercida con remanente.',
x:[['edo','El decaimiento es exponencial'],['alc','Recibe el desagüe'],['pob','Los caudales son los mismos']],
g:[
r=>{const a=r.i(200,500,10),b=r.i(10,80,5);return{q:`Entra DBO=${a} y sale ${b} mg/L. Halla la eficiencia.`,a:(a-b)/a*100,u:'%',s:[`E = ${n((a-b)/a*100)} %`]};},
r=>{const V=r.i(50,3000,50),Q=r.i(5,100,5);return{q:`V=${V} m³, Q=${Q} L/s. Halla t.`,a:V/(Q*3.6),u:'h',s:[`Q = ${n(Q*3.6)} m³/h`,`t = ${n(V/(Q*3.6))} h`]};},
r=>{const Q=r.i(5,100,5),A=r.i(10,500,10);return{q:`Q=${Q} L/s, área ${A} m². Halla la carga superficial en m³/m²/día.`,a:Q*86.4/A,u:'m³/m²/d',s:[`= ${n(Q*86.4/A)}`]};},
r=>{const L=r.i(150,400,10),k=r.p([.1,.15,.2,.23]),t=r.p([1,3,5,7]);return{q:`L₀=${L} mg/L, k=${k} 1/día. Halla DBO a ${t} días.`,a:L*(1-Math.exp(-k*t)),u:'mg/L',s:[`= ${L}(1−e^{−${n(k*t)}}) = ${n(L*(1-Math.exp(-k*t)))}`]};},
r=>{const P=r.i(1000,30000,1000),co=.05,Cs=r.p([150,200,250,300]),d=r.p([1,1.5,2]);const C=P*co,A=C/Cs*10000,V=A*d;return{q:`Laguna facultativa para ${P} hab (0.05 kg DBO/hab/día), carga superficial ${Cs} kg/ha/día, profundidad ${d} m. Halla el volumen.`,a:V,u:'m³',s:[`Carga = ${n(C)} kg/día`,`A = ${n(A)} m²`,`V = ${n(V)} m³`]};}
]});

MOD('m19','Vías y transportes','Vías',
'Una carretera es geometría, tráfico y suelo combinados. Sigue los manuales del MTC y métodos internacionales como AASHTO.',
['Garber y Hoel, Ingeniería de tránsito y carreteras','Huang, Pavement Analysis and Design','AASHTO, A Policy on Geometric Design','MTC, Manual de Carreteras: Diseño Geométrico DG-2018 (Perú)','MTC, Manual de Suelos y Pavimentos (Perú)'],
'UNI: Ingeniería de Transportes (TV-661), Diseño Vial (TV-761). PUCP: Ingeniería de Transporte (2CIV12).');
SUB('hor',{t:'Curvas horizontales',
lec:`Un vehículo en curva tiende a salirse. Lo sostienen el **peralte** (inclinación) y la fricción.

R_{mín} = V²/[127(e + f)], con V en km/h.

## Geometría de curva circular
- Tangente T = R·tan(Δ/2)
- Longitud L = π·R·Δ/180
- Externa E = R·(sec(Δ/2) − 1)
- Ordenada media M = R(1 − cos(Δ/2))

**Progresivas:** PC = PI − T. PT = PC + L.

**Imagen:** en un velódromo, las pistas muy inclinadas permiten curvas cerradas a gran velocidad.`,
key:['R_{mín} = [[V^{2}|127(e+f)]]','T = R·tan[[Δ|2]]','L = [[π·R·Δ|180]]','PC = PI − T'],
err:'Sumar T a PI para obtener el PT. Se avanza por la curva, no por la tangente.',
x:[['new','La fuerza centrífuga es Newton'],['tri','Geometría de tangentes'],['pol','Los PI salen de la poligonal']],
g:[
r=>{const R=r.i(50,600,10),D=r.i(10,90,5);return{q:`R=${R} m, Δ=${D}°. Halla T.`,a:R*tand(D/2),u:'m',s:[`T = ${R} tan(${D/2}°) = ${n(R*tand(D/2))} m`]};},
r=>{const R=r.i(50,600,10),D=r.i(10,90,5);return{q:`R=${R} m, Δ=${D}°. Halla L.`,a:PI*R*D/180,u:'m',s:[`L = πRΔ/180 = ${n(PI*R*D/180)} m`]};},
r=>{const V=r.i(30,120,10),e=r.p([.04,.06,.08]),f=r.p([.12,.15,.17]);return{q:`V=${V} km/h, e=${e}, f=${f}. Halla R_{mín}.`,a:V*V/(127*(e+f)),u:'m',s:[`R = ${V}²/(127·${n(e+f)}) = ${n(V*V/(127*(e+f)))} m`]};},
r=>{const PI2=r.i(1000,9000,10),R=r.i(100,500,50),D=r.i(15,60,5);const T=R*tand(D/2),L=PI*R*D/180;return{q:`PI en progresiva ${PI2} m, R=${R} m, Δ=${D}°. Halla la progresiva del PT.`,a:PI2-T+L,u:'m',tol:.002,s:[`T = ${n(T)}, L = ${n(L)}`,`PC = ${n(PI2-T,6)}`,`PT = PC + L = ${n(PI2-T+L,6)} m`]};},
r=>{const V=r.i(40,100,10),f=r.p([.12,.15]);const Rm=Math.ceil(V*V/(127*(f+.08))/10)*10;const R=Rm+r.i(0,120,10);const e=V*V/(127*R)-f;return{q:`Curva R=${R} m, V=${V} km/h, f=${f}. ¿Qué peralte en % se necesita? (si sale negativo, no requiere)`,a:e*100,u:'%',s:[`e = V²/(127R) − f`,`e = ${n(e*100)} %`]};}
]});
SUB('ver',{t:'Curvas verticales',
lec:`En el perfil, las curvas suavizan los cambios de pendiente. Se usa una **parábola** porque su pendiente cambia uniformemente: la sensación de quien maneja es constante.

- **A = |g₂ − g₁|:** diferencia de pendientes en %
- **Convexa (cresta):** limita la visibilidad
- **Cóncava (columpio):** limita la comodidad y la visibilidad nocturna

**Cota en curva:** y = y_{PCV} + g₁·x + (g₂ − g₁)·x²/(2L)

**Punto alto:** x = −g₁·L/(g₂ − g₁).`,
key:['A = |g_{2} − g_{1}|','y = y_{0} + g_{1}x + [[(g_{2}−g_{1})x^{2}|2L]]','x_{max} = [[−g_{1}·L|g_{2}−g_{1}]]','L = K·A'],
err:'Usar pendientes en % sin dividir entre 100 en la fórmula.',
x:[['der','Pendiente es la derivada'],['niv','Cotas vienen de la nivelación'],['vis','Longitud según visibilidad']],
g:[
r=>{const g1=r.i(-5,5,.5),g2=r.i(-5,5,.5);return{q:`g₁=${g1} %, g₂=${g2} %. Halla A.`,a:Math.abs(g2-g1),u:'%',s:[`A = |${g2} − (${g1})| = ${Math.abs(g2-g1)} %`]};},
r=>{const K=r.i(10,80,5),g1=r.i(1,6,.5),g2=r.i(-6,-1,.5);return{q:`K=${K}, g₁=${g1} %, g₂=${g2} %. Halla L.`,a:K*(g1-g2),u:'m',s:[`A = ${g1-g2} %`,`L = ${K*(g1-g2)} m`]};},
r=>{const y0=r.i(100,3000,10),g1=r.i(1,6,.5),g2=r.i(-6,-1,.5),L=r.i(100,400,20),x=r.i(20,80,10);const y=y0+g1/100*x+(g2-g1)/100*x*x/(2*L);return{q:`PCV cota ${y0}, g₁=${g1} %, g₂=${g2} %, L=${L} m. Halla la cota a x=${x} m.`,a:y,u:'m',tol:.0005,s:[`y = ${y0} + ${g1/100}·${x} + (${(g2-g1)/100})·${x}²/(2·${L})`,`y = ${n(y,7)} m`]};},
r=>{const g1=r.i(1,6,.5),g2=r.i(-6,-1,.5),L=r.i(100,400,20);return{q:`g₁=${g1} %, g₂=${g2} %, L=${L} m. ¿A qué distancia del PCV está el punto alto?`,a:g1*L/(g1-g2),u:'m',s:[`x = g₁L/(g₁−g₂) = ${n(g1*L/(g1-g2))} m`]};},
r=>{const y0=r.i(100,3000,10),g1=r.i(1,6,.5),g2=r.i(-6,-1,.5),L=r.i(100,400,20);const x=g1*L/(g1-g2),y=y0+g1/100*x+(g2-g1)/100*x*x/(2*L);return{q:`PCV cota ${y0}, g₁=${g1} %, g₂=${g2} %, L=${L} m. Halla la cota máxima de la curva.`,a:y,u:'m',tol:.0005,s:[`x = ${n(x)} m`,`y = ${n(y,7)} m`]};}
]});
SUB('vis',{t:'Distancia de visibilidad',
lec:`El conductor debe ver a tiempo para frenar.

**Distancia de frenado:** D = V·t_{r}/3.6 + V²/[254(f ± i)]

- V en km/h
- t_{r}: tiempo de reacción, cerca de 2.5 s
- f: fricción longitudinal
- i: pendiente, positiva de subida

Bajando se necesita más distancia.

**En curva:** un talud puede tapar la vista. Se libera M = R(1 − cos(28.65·D/R)).

Velocidad de operación y visibilidad determinan si la vía es segura.`,
key:['D = [[V·t|3.6]] + [[V^{2}|254(f±i)]]','M = R(1 − cos(28.65·[[D|R]]))'],
err:'Olvidar pasar la velocidad a m/s en el tramo de reacción (por eso el 3.6).',
x:[['new','Frenar es energía y fricción'],['ver','La visibilidad da la longitud'],['hor','La curva limita la visibilidad']],
g:[
r=>{const V=r.i(30,120,10),t=r.p([2,2.5]);return{q:`V=${V} km/h, t=${t} s. Halla la distancia de reacción.`,a:V*t/3.6,u:'m',s:[`= ${n(V*t/3.6)} m`]};},
r=>{const V=r.i(30,120,10),f=r.p([.3,.35,.4]);return{q:`V=${V} km/h, f=${f}, plano. Halla la distancia de frenado sin reacción.`,a:V*V/(254*f),u:'m',s:[`= ${n(V*V/(254*f))} m`]};},
r=>{const V=r.i(30,110,10),f=r.p([.3,.35,.4]);return{q:`V=${V} km/h, t=2.5 s, f=${f}, plano. Halla la distancia total.`,a:V*2.5/3.6+V*V/(254*f),u:'m',s:[`D = ${n(V*2.5/3.6)} + ${n(V*V/(254*f))} = ${n(V*2.5/3.6+V*V/(254*f))} m`]};},
r=>{const V=r.i(40,110,10),f=r.p([.3,.35]),i=r.p([.03,.05,.06,.08]);return{q:`V=${V} km/h, t=2.5 s, f=${f}, bajada ${i*100} %. Halla D.`,a:V*2.5/3.6+V*V/(254*(f-i)),u:'m',s:[`f−i = ${n(f-i)}`,`D = ${n(V*2.5/3.6+V*V/(254*(f-i)))} m`]};},
r=>{const V=r.i(40,90,10),f=.35,R=r.i(150,500,50);const D=V*2.5/3.6+V*V/(254*f),M=R*(1-cosd(28.65*D/R));return{q:`V=${V} km/h, t=2.5 s, f=0.35, curva R=${R} m. Halla el despeje lateral M.`,a:M,u:'m',s:[`D = ${n(D)} m`,`M = R(1 − cos(28.65D/R)) = ${n(M)} m`]};}
]});
SUB('trf',{t:'Tráfico y ejes equivalentes',
lec:`El pavimento se daña por cada eje que pasa. Pero el daño no es lineal: sigue aproximadamente la **ley de la cuarta potencia**. Un camión con el doble de carga daña 16 veces más.

Todo se convierte a ejes equivalentes de 8.2 t (ESAL).

- **Daño relativo:** (P/8.2)⁴
- **ESAL diseño = IMD·365·FCE·FD·FC·FCA**

Factor de crecimiento: G = [(1+r)^{n} − 1]/r.

## Capacidad
Flujo q = k·v (veh/h = veh/km × km/h). Tres variables básicas de ingeniería de tráfico.`,
key:['FCE ≈ ([[P|8.2]])^{4}','G = [[(1+r)^{n} − 1|r]]','ESAL = IMD·365·FCE·FD·FC·G','q = k·v'],
err:'Olvidar el factor direccional y de carril.',
x:[['pav','Los ESAL definen el espesor'],['edo','Crecimiento compuesto']],
g:[
r=>{const P=r.i(4,18,.5);return{q:`Eje de ${P} t. Halla FCE ≈ (P/8.2)⁴.`,a:(P/8.2)**4,u:'',s:[`= ${n((P/8.2)**4)}`]};},
r=>{const k=r.i(5,80,5),v=r.i(20,90,10);return{q:`Densidad ${k} veh/km y velocidad ${v} km/h. Halla el flujo.`,a:k*v,u:'veh/h',s:[`q = ${k*v} veh/h`]};},
r=>{const rr=r.p([2,3,4,5,6]),nn=r.p([10,15,20]);return{q:`r=${rr} %, n=${nn} años. Halla G.`,a:((1+rr/100)**nn-1)/(rr/100),u:'años',s:[`G = ${n(((1+rr/100)**nn-1)/(rr/100))}`]};},
r=>{const IMD=r.i(100,2000,50),F=r.i(1.5,4,.5),rr=r.p([2,3,4]),nn=r.p([10,20]);const Gg=((1+rr/100)**nn-1)/(rr/100);return{q:`IMD pesados=${IMD}, FCE=${F}, FD=0.5, FC=1, r=${rr} %, ${nn} años. Halla ESAL en millones.`,a:IMD*365*F*.5*Gg/1e6,u:'M',s:[`G = ${n(Gg)}`,`ESAL = ${n(IMD*365*F*.5*Gg,6)}`]};},
r=>{const P1=r.i(12,18,.5);const n2=(P1/8.2)**4;return{q:`Un camión con ejes sobrecargados a ${P1} t reemplaza ejes legales de 8.2 t. ¿Cuántos ejes legales equivale cada uno?`,a:n2,u:'ejes',s:[`(${P1}/8.2)⁴ = ${n(n2)}`,`Por esto importan las balanzas`]};}
]});
SUB('pav',{t:'Diseño de pavimentos',
lec:`Un pavimento reparte la carga en capas, de mejor a peor material hacia abajo.

## Flexible, AASHTO 93
Se busca el **número estructural** SN y se cubre con capas:

SN = a₁D₁ + a₂D₂m₂ + a₃D₃m₃

- Coef. a: asfalto ≈ 0.17/cm (0.44/pulg), base ≈ 0.052/cm, subbase ≈ 0.043/cm
- m: drenaje ≈ 1

## Subrasante
CBR: el suelo comparado con piedra chancada. M_{r} ≈ 1500·CBR (psi), usado para CBR < 10.

## Rígido
Losas de concreto. Espesor por AASHTO o PCA. Reparte tanto la carga que la subbase pesa poco.

Importante: Manual de Suelos y Pavimentos MTC para Perú.`,
key:['SN = Σa_{i}D_{i}m_{i}','M_{r} = 1500·CBR (psi)','D_{1} = [[SN − a_{2}D_{2} − a_{3}D_{3}|a_{1}]]'],
err:'Olvidar el drenaje. Un pavimento saturado dura menos de la mitad.',
x:[['trf','ESAL es el dato'],['cpt','Base y subbase se compactan'],['cla','Subrasante según suelo'],['met','Metrado por capas']],
g:[
r=>{const c=r.i(2,10,.5);return{q:`CBR=${c} %. Halla M_{r}.`,a:1500*c,u:'psi',s:[`M_{r} = ${n(1500*c)} psi`]};},
r=>{const d1=r.i(4,20,1);return{q:`Carpeta D₁=${d1} cm, a₁=0.17/cm. Halla su aporte al SN.`,a:.17*d1,u:'',s:[`= ${n(.17*d1)}`]};},
r=>{const d1=r.i(5,12,1),d2=r.i(15,30,5),d3=r.i(15,30,5);return{q:`Capas: ${d1} cm asfalto (0.17), ${d2} cm base (0.052), ${d3} cm subbase (0.043), m=1. Halla SN.`,a:.17*d1+.052*d2+.043*d3,u:'',s:[`SN = ${n(.17*d1)} + ${n(.052*d2)} + ${n(.043*d3)}`,`= ${n(.17*d1+.052*d2+.043*d3)}`]};},
r=>{const SN=r.i(2.5,5,.25),d2=r.i(15,30,5),d3=r.i(15,30,5);const d1=(SN-.052*d2-.043*d3)/.17;return{q:`SN requerido=${SN}. Base ${d2} cm (0.052), subbase ${d3} cm (0.043). Halla D₁ de asfalto (0.17/cm).`,a:d1,u:'cm',s:[`D₁ = (SN − ${n(.052*d2+.043*d3)})/0.17`,`= ${n(d1)} cm`]};},
r=>{const A=r.i(5,8,.5),L=r.i(1,10,1),d=r.i(5,10,1),b=r.i(15,25,5),s=r.i(15,25,5),c1=r.p([700,800]),c2=r.p([120,140]),c3=r.p([90,100]);const c=A*L*1000*(d/100*c1+b/100*c2+s/100*c3);return{q:`Vía ${A} m × ${L} km: ${d} cm asfalto a S/${c1}/m³, ${b} cm base a S/${c2}/m³, ${s} cm subbase a S/${c3}/m³. Halla el costo de pavimento en miles de soles.`,a:c/1000,u:'mil S/',s:[`Área = ${A*L*1000} m²`,`Costo por m² = ${n(d/100*c1+b/100*c2+s/100*c3)} S/`,`Total = ${n(c/1000)} mil S/`]};}
]});

MOD('m20','Construcción y gestión','Gestión',
'Un proyecto no se termina con planos. Hay que metrar, presupuestar, programar, controlar y justificar la inversión.',
['Halpin, Construction Management','Hendrickson, Project Management for Construction','Ibáñez, Costos y tiempos en carreteras (Perú)','Blank y Tarquin, Ingeniería económica','Ramos Salazar, Costos y presupuestos en edificación (CAPECO, Perú)','PMI, Guía PMBOK'],
'UNI: Gestión de Proyectos de Construcción I y II. PUCP: Planeamiento de Proyectos de Edificación (2CIV13), Evaluación Económica de Proyectos (2CIV09).');
SUB('met',{t:'Metrados',
lec:`Metrar es medir sobre plano lo que se va a construir. Es la base del presupuesto. Se ordena por partidas: movimiento de tierras, concreto, encofrado, acero, albañilería, acabados.

- **Concreto:** m³
- **Encofrado:** m² de contacto
- **Acero:** kg, sumando longitudes y traslapes
- **Muros:** m²

**Buena práctica:** planilla ordenada y por ejes, con cálculo revisable. Un error aquí se multiplica en plata. Para fierro, se suele sumar 5 a 7 % de desperdicio.`,
key:['V_{viga} = b·h·L','Enc_{viga} = (b + 2h)·L','Enc_{col} = 2(a+b)·H'],
err:'Duplicar el concreto en cruces de vigas con columnas.',
x:[['ref','Pesos de acero'],['apu','El metrado multiplica al costo unitario'],['are','Movimiento de tierras']],
g:[
r=>{const b=r.i(25,40,5),h=r.i(40,80,5),L=r.i(3,12,.5);return{q:`Viga ${b}×${h} cm y ${L} m. Halla el concreto.`,a:b*h/1e4*L,u:'m³',s:[`V = ${n(b*h/1e4*L)} m³`]};},
r=>{const b=r.i(25,40,5),h=r.i(40,80,5),L=r.i(3,12,.5);return{q:`Misma viga ${b}×${h}, ${L} m (fondo y dos costados). Halla el encofrado.`,a:(b+2*h)/100*L,u:'m²',s:[`Enc = (${b}+2·${h})/100·${L} = ${n((b+2*h)/100*L)} m²`]};},
r=>{const a=r.i(25,70,5),b=r.i(25,70,5),H=r.i(2.6,4,.2),N=r.i(4,20);return{q:`${N} columnas ${a}×${b} cm de ${H} m. Halla el encofrado total.`,a:2*(a+b)/100*H*N,u:'m²',s:[`Una: ${n(2*(a+b)/100*H)} m²`,`Total = ${n(2*(a+b)/100*H*N)} m²`]};},
r=>{const nb=r.i(4,10),L=r.i(4,9,.5),tr=r.p([.4,.6,.75]),w=r.p([1.55,2.24,3.97]),d=r.p([.05,.07]);return{q:`${nb} varillas de ${L} m con ${tr} m de traslape cada una, ${w} kg/m, desperdicio ${d*100} %. Halla el peso.`,a:nb*(L+tr)*w*(1+d),u:'kg',s:[`L total = ${n(nb*(L+tr))} m`,`Peso = ${n(nb*(L+tr)*w*(1+d))} kg`]};},
r=>{const A=r.i(80,300,10),h=r.p([.2,.25]);const lad=A*8.33;const con=A*(h===.2?.0875:.1);return{q:`Aligerado de ${h*100} cm y ${A} m². Con 8.33 ladrillos/m² y ${h===.2?0.0875:0.1} m³ de concreto por m². Halla el concreto.`,a:con,u:'m³',s:[`Ladrillos = ${n(lad)} u`,`Concreto = ${n(con)} m³`]};}
]});
SUB('apu',{t:'Análisis de precios unitarios',
lec:`¿Cuánto cuesta un m³ de concreto? Se suma:

- **Mano de obra:** rendimiento, cuadrilla, jornal
- **Materiales:** cantidades por unidad
- **Equipos y herramientas:** 3 a 5 % de la mano de obra

Cantidad de mano de obra: **HH = (cuadrilla × 8 h)/rendimiento**.

**Presupuesto:** CD + GG + Utilidad + IGV (18 %).

Gastos generales ≈ 10 %; utilidad ≈ 5–10 %.

**Dato:** los rendimientos se toman de CAPECO. Conocerlos permite negociar mejor.`,
key:['HH = [[C·8|R]]','PU = MO + Mat + Eq','Ppto = (CD + GG + U)·1.18'],
err:'Aplicar IGV sobre el costo directo solo. Va sobre el subtotal con GG y utilidad.',
x:[['mez','Cantidades de cemento'],['met','Multiplicado por metrado'],['cpm','El rendimiento da duración'],['vpn','Costo total alimenta la evaluación']],
g:[
r=>{const c=r.i(1,5),R=r.i(5,40,5);return{q:`Cuadrilla de ${c} obrero(s), rendimiento ${R} u/día. Halla HH/u.`,a:c*8/R,u:'HH/u',s:[`= ${c}·8/${R} = ${n(c*8/R)}`]};},
r=>{const c=r.i(1,5),R=r.i(5,40,5),j=r.i(15,30);return{q:`Cuadrilla de ${c} persona(s), R=${R} u/día, S/${j}/h. Halla el costo de mano de obra por unidad.`,a:c*8/R*j,u:'S/',s:[`HH = ${n(c*8/R)}`,`= ${n(c*8/R*j)} S/`]};},
r=>{const b=r.i(7,10,.25),pb=r.i(25,35),ar=r.i(.4,.6,.05),pa=r.i(50,80,5),pi=r.i(.7,.9,.05),pp=r.i(60,90,5),ag=.2,pg=5;return{q:`m³ de concreto: ${b} bolsas a S/${pb}, ${ar} m³ arena a S/${pa}, ${pi} m³ piedra a S/${pp}, 0.2 m³ de agua a S/5. Halla el costo de materiales.`,a:b*pb+ar*pa+pi*pp+ag*pg,u:'S/',s:[`= ${n(b*pb)} + ${n(ar*pa)} + ${n(pi*pp)} + 1 = ${n(b*pb+ar*pa+pi*pp+ag*pg)} S/`]};},
r=>{const CD=r.i(100,5000,50),gg=r.p([.08,.1,.12]),u=r.p([.05,.07,.1]);return{q:`CD=${CD} mil S/, GG=${gg*100} %, utilidad ${u*100} %, IGV 18 %. Halla el presupuesto.`,a:CD*(1+gg+u)*1.18,u:'mil S/',s:[`Subtotal = ${n(CD*(1+gg+u))}`,`Total = ${n(CD*(1+gg+u)*1.18)} mil S/`]};},
r=>{const V=r.i(50,400,10),mo=r.i(80,160,10),mat=r.i(280,420,10),eq=r.i(30,70,5),gg=.1,u=.08;const CD=V*(mo+mat+eq);return{q:`${V} m³ de concreto: MO S/${mo}, materiales S/${mat}, equipo S/${eq} por m³. GG 10 %, U 8 %, IGV 18 %. Halla el total.`,a:CD*1.18*1.18,u:'S/',s:[`PU = ${mo+mat+eq} S/m³`,`CD = ${n(CD,6)} S/`,`Total = ${n(CD*1.18*1.18,6)} S/`]};}
]});
SUB('cpm',{t:'Programación CPM',
lec:`CPM encuentra la **ruta crítica**: la cadena de actividades más larga. Si una de ellas se atrasa, se atrasa todo.

## Cálculo
- **Ida:** ES = máximo EF de las predecesoras; EF = ES + D
- **Vuelta:** LF = mínimo LS de las sucesoras; LS = LF − D
- **Holgura total:** H = LS − ES

Actividades con H = 0 son críticas.

**Duración:** D = Metrado / (Rendimiento × N.º cuadrillas).

**Last Planner / Lean:** se complementa con metas semanales y restricciones.`,
key:['EF = ES + D','H = LS − ES','D = [[Metrado|R·N]]'],
err:'Sumar todas las actividades. Las paralelas no se suman: gana la más larga.',
x:[['apu','Rendimientos'],['evm','El avance se mide contra esto'],['met','Metrados dan la duración']],
g:[
r=>{const M=r.i(50,1000,10),R=r.i(5,50,5),N=r.i(1,5);return{q:`Metrado ${M}, R=${R}/día, ${N} cuadrillas. Halla D.`,a:M/(R*N),u:'días',s:[`D = ${n(M/(R*N))} días`]};},
r=>{const a=r.i(2,10),b=r.i(2,10),c=r.i(2,10);return{q:`Tres actividades en serie: ${a}, ${b} y ${c} días. Halla el total.`,a:a+b+c,u:'días',s:[`= ${a+b+c} días`]};},
r=>{const A=r.i(2,8),B=r.i(3,12),C=r.i(3,12),D=r.i(2,8);return{q:`A (${A} d) precede a B (${B} d) y C (${C} d), que preceden a D (${D} d). Halla la duración del proyecto.`,a:A+Math.max(B,C)+D,u:'días',s:[`Rutas: A-B-D = ${A+B+D}; A-C-D = ${A+C+D}`,`Ruta crítica = ${A+Math.max(B,C)+D} días`]};},
r=>{const A=r.i(2,8),B=r.i(3,12),C=r.i(3,12),D=r.i(2,8);return{q:`En esa red, A=${A}, B=${B}, C=${C}, D=${D}. Halla la holgura de la actividad más corta entre B y C.`,a:Math.abs(B-C),u:'días',s:[`H = |${B} − ${C}| = ${Math.abs(B-C)} días`]};},
r=>{const M=r.i(200,1200,50),R=r.i(10,30,5),co=r.i(800,2000,100),Nmin=r.i(1,3),H=r.i(5,15),pen=r.i(500,3000,500);const D1=M/(R*Nmin),D2=M/(R*(Nmin+1));const ah=D1-D2,ce=(Nmin+1)*co*D2-Nmin*co*D1,neto=ce-ah*pen;return{q:`Partida crítica: ${M} u, R=${R}/día por cuadrilla, cuadrilla cuesta S/${co}/día. Pasas de ${Nmin} a ${Nmin+1} cuadrillas. Penalidad por día de atraso S/${pen}. Halla el ahorro neto (negativo = costo).`,a:ah*pen-ce,u:'S/',s:[`D₁ = ${n(D1)} d, D₂ = ${n(D2)} d`,`Días ganados = ${n(ah)}`,`Cambio de costo MO = ${n(ce)} S/ (solo es tiempo)`,`Ahorro neto = ${n(ah*pen-ce)} S/`]};}
]});
SUB('evm',{t:'Valor ganado',
lec:`¿Vas bien? No basta ver cuánto gastaste. El **valor ganado** responde con tres números:

- **PV:** lo planeado a la fecha
- **EV:** lo realmente ejecutado, valorizado al precio planeado
- **AC:** lo realmente gastado

## Indicadores
- CPI = EV/AC: cada sol gastado rinde CPI soles
- SPI = EV/PV: ritmo respecto al plan
- Si son menores a 1, hay problema
- **EAC = BAC/CPI:** cuánto costará al final

Imagina una maratón: PV es dónde deberías estar, EV dónde estás, AC cuánta energía usaste.`,
key:['CPI = [[EV|AC]]','SPI = [[EV|PV]]','CV = EV − AC','EAC = [[BAC|CPI]]','ETC = EAC − AC'],
err:'Confundir PV con EV. Si dudas, EV siempre viene del avance físico medido.',
x:[['cpm','PV viene del cronograma'],['apu','BAC viene del presupuesto']],
g:[
r=>{const E=r.i(100,1000,10),A=r.i(100,1000,10);return{q:`EV=${E}, AC=${A} mil S/. Halla CPI.`,a:E/A,u:'',s:[`CPI = ${n(E/A)}`]};},
r=>{const E=r.i(100,1000,10),P=r.i(100,1000,10);return{q:`EV=${E}, PV=${P} mil S/. Halla SPI.`,a:E/P,u:'',s:[`SPI = ${n(E/P)}`]};},
r=>{const B=r.i(500,9000,100),av=r.i(10,90,5);return{q:`BAC=${B} mil S/ con avance físico ${av} %. Halla EV.`,a:B*av/100,u:'mil S/',s:[`EV = ${n(B*av/100)}`]};},
r=>{const B=r.i(500,9000,100),av=r.i(20,80,5),f=r.i(90,125,5);const EV=B*av/100,AC=EV*f/100,CPI=EV/AC;return{q:`BAC=${B} mil S/, avance ${av} %, gastado ${n(AC)} mil S/. Halla EAC.`,a:B/CPI,u:'mil S/',s:[`EV = ${n(EV)}`,`CPI = ${n(CPI)}`,`EAC = ${n(B/CPI)}`]};},
r=>{const B=r.i(500,9000,100),av=r.i(20,70,5),f=r.i(105,130,5),t=r.i(6,24);const pv=r.i(av+2,av+20,2);const EV=B*av/100,AC=EV*f/100,PV=B*pv/100,CPI=EV/AC,SPI=EV/PV;return{q:`BAC=${B} mil S/, plazo ${t} meses. Avance real ${av} %, planeado ${pv} %, gastado ${n(AC)} mil S/. Halla el plazo estimado (t/SPI).`,a:t/SPI,u:'meses',s:[`SPI = ${n(SPI)}`,`CPI = ${n(CPI)}`,`Plazo = ${n(t/SPI)} meses`]};}
]});
SUB('vpn',{t:'Evaluación económica',
lec:`¿Conviene hacer la obra? Un sol hoy vale más que un sol mañana. Por eso se **descuenta**.

- **VP:** F/(1+i)^{n}
- **VAN:** suma de flujos descontados menos inversión. Si > 0, conviene
- **TIR:** la tasa i que hace VAN = 0
- **B/C:** beneficios entre costos

En proyectos públicos peruanos: **Invierte.pe** usa tasa social de descuento.

**Anualidad:** para costo de mantenimiento constante: VP = A·[(1+i)^{n}−1]/[i(1+i)^{n}]`,
key:['VP = [[F|(1+i)^{n}]]','VAN = −I + Σ[[F_{t}|(1+i)^{t}]]','VP = A·[[(1+i)^{n}−1|i(1+i)^{n}]]','B/C = [[VP_{ben}|VP_{cos}]]'],
err:'Usar tasas anuales con flujos mensuales sin convertirlas.',
x:[['edo','Es crecimiento exponencial'],['apu','La inversión es el presupuesto'],['pro','Riesgo en decisiones']],
g:[
r=>{const F=r.i(100,9000,50),i=r.p([.05,.08,.1,.12]),t=r.i(1,15);return{q:`F=${F} mil S/, i=${i*100} %, n=${t} años. Halla VP.`,a:F/(1+i)**t,u:'mil S/',s:[`VP = ${n(F/(1+i)**t)}`]};},
r=>{const P=r.i(100,5000,50),i=r.p([.05,.08,.1,.12]),t=r.i(1,15);return{q:`P=${P} mil S/ hoy, i=${i*100} %, n=${t} años. Halla F.`,a:P*(1+i)**t,u:'mil S/',s:[`F = ${n(P*(1+i)**t)}`]};},
r=>{const A=r.i(10,500,10),i=r.p([.05,.08,.1,.12]),t=r.i(5,30,5);const f=((1+i)**t-1)/(i*(1+i)**t);return{q:`Mantenimiento de ${A} mil S/ anual por ${t} años, i=${i*100} %. Halla VP.`,a:A*f,u:'mil S/',s:[`Factor = ${n(f)}`,`VP = ${n(A*f)}`]};},
r=>{const I=r.i(200,2000,100),F=r.i(50,600,10),i=r.p([.08,.1,.12]),t=r.i(5,25,5);const f=((1+i)**t-1)/(i*(1+i)**t);return{q:`Inversión ${I} mil S/, beneficio ${F} mil S/ al año, ${t} años, i=${i*100} %. Halla VAN.`,a:F*f-I,u:'mil S/',s:[`VP beneficios = ${n(F*f)}`,`VAN = ${n(F*f-I)}`]};},
r=>{const I=r.i(200,2000,100),A=r.i(5,30,5),B=r.i(100,500,50),i=r.p([.08,.1,.12]),t=r.i(10,25,5);const f=((1+i)**t-1)/(i*(1+i)**t);return{q:`Inversión ${I}, operación ${A} y beneficios ${B} mil S/ por año; ${t} años, i=${i*100} %. Halla B/C.`,a:B*f/(I+A*f),u:'',s:[`Factor = ${n(f)}`,`VP ben = ${n(B*f)}`,`VP cos = ${n(I+A*f)}`,`B/C = ${n(B*f/(I+A*f))}`]};}
]});

MOD('m21','Proyectos integradores','Proyecto',
'Hora de unirlo todo. Cada reto cruza varios módulos, como en la vida real. Si los resuelves sin mirar, ya piensas como ingeniero.',
['Blanco Blasco, Estructuración y diseño de edificaciones de concreto armado','Ottazzi, Apuntes del curso Concreto Armado 1','Rocha Felices, Hidráulica de tuberías y canales','RNE (E.020, E.030, E.050, E.060)'],
'PUCP: Proyecto Integrador en Ingeniería Civil (2CIV16). UNI: Taller de Competencia Profesional (TE-910).');
SUB('edi',{t:'Edificio de concreto: del suelo al presupuesto',
lec:`Sigue un edificio de vivienda en Lima, de principio a fin. Cada nivel del ejercicio usa lo que aprendiste:

- **Cargas (E.020):** peso por piso
- **Sismo (E.030):** cortante basal
- **Columna (E.060):** dimensión
- **Zapata (E.050):** cimentación
- **Costos:** metrado y presupuesto

Aquí se ve cómo una decisión repercute. Si agregas un piso, cambia el peso, luego el sismo, luego la columna, luego la zapata, luego el costo. Todo está conectado.

Los supuestos están simplificados para aprender el camino, no para firmar planos.`,
key:['P ≈ 1 t/m²·A·N','V = [[ZUCS|R]]·P','A_{g} = [[P|0.45f\'_{c}]]','A_{z} = [[P|q_{a}]]'],
err:'Pensar cada especialidad por separado. Las especialidades se coordinan: esa es la tarea del ingeniero.',
x:[['car','Paso 1'],['esp','Paso 2'],['col','Paso 3'],['zap','Paso 4'],['apu','Paso 5']],
g:[
r=>{const A=r.i(120,500,10),N=r.i(4,10);return{q:`Planta ${A} m², ${N} pisos, 1 t/m². Halla el peso total.`,a:A*N,u:'t',s:[`P = ${A*N} t`]};},
r=>{const A=r.i(120,500,10),N=r.i(4,10),S=r.p([1,1.05]);const P=A*N,V=.45*1*2.5*S/8*P;return{q:`Edificio ${N} pisos, ${A} m², 1 t/m², Lima (Z=0.45), vivienda (U=1), S=${S}, pórticos R=8, T<T_{P}. Halla V.`,a:V,u:'t',s:[`P = ${P} t`,`V = 0.45·1·2.5·${S}/8·${P} = ${n(V)} t`]};},
r=>{const At=r.i(16,36,1),N=r.i(4,10),fc=r.p([210,280]);const P=At*N;return{q:`Columna central A_{t}=${At} m², ${N} pisos, 1 t/m², f'_{c}=${fc}. Halla el lado de una columna cuadrada.`,a:sq(P*1000/(.45*fc)),u:'cm',s:[`P = ${P} t`,`A_{g} = ${n(P*1000/(.45*fc))} cm²`,`Lado = ${n(sq(P*1000/(.45*fc)))} cm`]};},
r=>{const At=r.i(16,36,1),N=r.i(4,10),qa=r.p([3,3.5,4,4.5]);const P=At*N*1.05;return{q:`Misma columna A_{t}=${At} m², ${N} pisos, 1 t/m², +5 % por peso de zapata, en grava de Lima q_{a}=${qa} kg/cm². Halla B de zapata cuadrada.`,a:sq(P/(qa*10)),u:'m',s:[`P = ${n(P)} t`,`B = √(P/q_{a}) = ${n(sq(P/(qa*10)))} m`]};},
r=>{const At=r.i(16,36,1),N=r.i(4,10),qa=r.p([3,4]),h=r.p([.5,.6,.7]),c=r.i(300,450,10),e=r.i(60,90,5);const P=At*N*1.05,B=sq(P/(qa*10)),Vc=B*B*h,kg=Vc*e,cost=Vc*c+kg*5;return{q:`Zapata del caso: A_{t}=${At}, ${N} pisos, 1 t/m², +5 %, q_{a}=${qa} kg/cm², peralte ${h} m, ${e} kg de acero/m³. Concreto S/${c}/m³, acero S/5/kg. Halla su costo directo.`,a:cost,u:'S/',s:[`B = ${n(B)} m`,`V = ${n(Vc)} m³`,`Acero = ${n(kg)} kg`,`Costo = S/ ${n(cost)}`]};}
]});
SUB('hid',{t:'Sistema hidráulico: de la lluvia a la canaleta',
lec:`Sigue una gota: la lluvia cae en una cuenca, escurre, llega a un canal, y lo debe transportar sin desbordarse.

- **Hidrología:** t_{c}, intensidad, caudal
- **Hidráulica:** tirante normal y Froude
- **Obras:** poza disipadora si hay rápida
- **Costos:** volumen de concreto del revestimiento

También aquí cada cifra alimenta a la siguiente. Observa cómo un periodo de retorno mayor cuesta más concreto, pero reduce el riesgo.`,
key:['t_{c} = 0.0195([[L^{3}|H]])^{0.385}','Q = [[CiA|3.6]]','Q = [[1|n]]AR^{2/3}S^{1/2}','Fr = [[V|√{gy}]]'],
err:'Diseñar el canal justo al tirante: siempre agrega borde libre.',
x:[['cue','Paso 1'],['rac','Paso 2'],['man','Paso 3'],['ene2','Paso 4'],['sal','Paso 5']],
g:[
r=>{const L=r.i(800,5000,100),H=r.i(30,300,10);return{q:`Cuenca con L=${L} m y H=${H} m. Halla t_{c}.`,a:.0195*(L**3/H)**.385,u:'min',s:[`t_{c} = ${n(.0195*(L**3/H)**.385)} min`]};},
r=>{const C=r.p([.4,.5,.6]),i=r.i(40,120,5),A=r.i(1,10,.5);return{q:`C=${C}, i=${i} mm/h, A=${A} km². Halla Q.`,a:C*i*A/3.6,u:'m³/s',s:[`Q = ${n(C*i*A/3.6)} m³/s`]};},
r=>{const C=r.p([.4,.5,.6]),i=r.i(40,120,5),A=r.i(1,6,.5),nn=.015,S=r.p([.001,.002,.003]);const Q=C*i*A/3.6,y=(Q*nn/(2*.5**(2/3)*sq(S)))**(3/8);return{q:`Ese caudal (C=${C}, i=${i} mm/h, A=${A} km²) va por un canal rectangular de máxima eficiencia (b=2y), n=0.015, S=${S}. Halla y.`,a:y,u:'m',s:[`Q = ${n(Q)} m³/s`,`Con b=2y: A=2y², R=y/2`,`y = [Qn/(2·0.5^{2/3}·√S)]^{3/8} = ${n(y)} m`]};},
r=>{const C=r.p([.4,.5,.6]),i=r.i(40,120,5),A=r.i(1,6,.5),nn=.015,S=r.p([.001,.002,.003,.005]);const Q=C*i*A/3.6,y=(Q*nn/(2*.5**(2/3)*sq(S)))**(3/8),V=Q/(2*y*y),F=V/sq(G*y);return{q:`Canal b=2y con C=${C}, i=${i} mm/h, A=${A} km², n=0.015, S=${S}. Halla el número de Froude.`,a:F,u:'',s:[`Q = ${n(Q)} m³/s, y = ${n(y)} m`,`V = Q/(2y²) = ${n(V)} m/s`,`Fr = ${n(F)}`]};},
r=>{const L=r.i(1000,5000,100),H=r.i(40,300,10),K=r.p([300,400,500]),T=r.p([10,25,50]),C=r.p([.4,.5,.6]),A=r.i(1,6,.5),S=r.p([.001,.002,.003]),c=r.i(280,420,10),Lc=r.i(100,800,50);const tc=.0195*(L**3/H)**.385,i=K*T**.15/tc**.6,Q=C*i*A/3.6,y=(Q*.015/(2*.5**(2/3)*sq(S)))**(3/8),b=2*y,V=.15*(b+2*(y+.3))*Lc;return{q:`Proyecto: cuenca L=${L} m, H=${H} m, A=${A} km², C=${C}. IDF i=${K}T^{0.15}/t^{0.6}, T=${T}. Canal b=2y, n=0.015, S=${S}, ${Lc} m, revestido con 15 cm, borde libre 0.30 m, a S/${c}/m³. Halla el costo del concreto.`,a:V*c,u:'S/',s:[`t_{c} = ${n(tc)} min, i = ${n(i)} mm/h`,`Q = ${n(Q)} m³/s`,`y = ${n(y)} m, b = ${n(b)} m`,`Perímetro revestido = b + 2(y+0.3) = ${n(b+2*(y+.3))} m`,`V = ${n(V)} m³; costo = S/ ${n(V*c)}`]};}
]});
