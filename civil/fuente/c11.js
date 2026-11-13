/* Subtemas adicionales: vías, gestión y proyectos integradores */
EXT('m19');
SUB('cvs',{t:'Capacidad vial y nivel de servicio',
lec:`¿Cuántos vehículos caben en una vía antes de que se atore? La respuesta viene del **Highway Capacity Manual** (HCM).

## Relación fundamental
q = k·v: flujo (veh/h) = densidad (veh/km) × velocidad (km/h).

Con el modelo de Greenshields, la velocidad baja linealmente con la densidad: v = v_{f}(1 − k/k_{j}). El flujo máximo es q_{máx} = v_{f}k_{j}/4.

## Flujo equivalente
Los camiones ocupan más que un auto: v_{p} = V/(FHP·N·f_{HV}), con f_{HV} = 1/[1 + P_{T}(E_{T} − 1)] y FHP el factor de hora pico.

## Nivel de servicio (LOS)
De A (flujo libre) a F (congestión), según la densidad o la relación volumen/capacidad (v/c).`,
key:['q = k·v','q_{máx} = [[v_{f}k_{j}|4]]','f_{HV} = [[1|1+P_{T}(E_{T}−1)]]','v_{p} = [[V|FHP·N·f_{HV}]]'],
err:'Diseñar con el tráfico diario promedio sin pasarlo a la hora pico.',
x:[['trf','Tráfico y ejes'],['sem','Intersecciones semaforizadas'],['vis','Velocidad de diseño']],
g:[
r=>{const k=r.i(5,120,1),v=r.i(15,100,1);return{q:`k=${k} veh/km y v=${v} km/h. Halla q.`,a:k*v,u:'veh/h',s:[`q = ${k*v} veh/h`]};},
r=>{const vf=r.i(50,120,5),kj=r.i(100,180,5);return{q:`v_{f}=${vf} km/h, k_{j}=${kj} veh/km. Halla q_{máx} (Greenshields).`,a:vf*kj/4,u:'veh/h',s:[`= ${vf}·${kj}/4 = ${n(vf*kj/4)} veh/h`]};},
r=>{const P=r.i(.05,.4,.01),E=r.p([1.5,2,2.5,3]);return{q:`P_{T}=${P}, E_{T}=${E}. Halla f_{HV}.`,a:1/(1+P*(E-1)),u:'',s:[`= ${n(1/(1+P*(E-1)))}`]};},
r=>{const V=r.i(500,4000,50),FHP=r.i(.8,.95,.01),N=r.i(1,3,1),P=r.i(.05,.3,.01),E=r.p([1.5,2]);const f=1/(1+P*(E-1));return{q:`V=${V} veh/h, FHP=${FHP}, ${N} carriles, ${P*100} % camiones (E_{T}=${E}). Halla v_{p}.`,a:V/(FHP*N*f),u:'auto/h/carril',s:[`f_{HV} = ${n(f)}`,`v_{p} = ${n(V/(FHP*N*f))}`]};},
r=>{const IMD=r.i(20000,90000,1000),K=r.i(.08,.12,.005),D=r.i(.5,.65,.05),FHP=r.i(.85,.95,.01),P=r.i(.1,.3,.01),c=r.p([1700,1900,2100]);const V=IMD*K*D,f=1/(1+P*(2-1)),N=Math.ceil(V/(FHP*f*c*.85));return{q:`Autopista con IMD=${IMD} veh/día, K=${K}, distribución direccional ${D}, FHP=${FHP}, ${Math.round(P*100)} % camiones (E_{T}=2). Capacidad ${c} auto/h/carril y se quiere v/c ≤ 0.85. ¿Cuántos carriles por sentido?`,a:N,u:'carriles',tol:0,s:[`V = IMD·K·D = ${n(V)} veh/h`,`f_{HV} = ${n(f)}`,`N = ⌈${n(V/(FHP*f))}/(${c}·0.85)⌉ = ${N}`]};}
]});
SUB('sem',{t:'Semáforos',
lec:`Una intersección semaforizada reparte el tiempo entre flujos que se cruzan. El método de **Webster** da el ciclo óptimo.

## Pasos
1. Flujo de saturación de cada acceso: s ≈ 1800 a 1900 veh/h/carril
2. Relación de flujo de la fase: y = q/s (se toma el acceso crítico)
3. Y = Σy de las fases críticas. Debe ser menor que 1, si no la intersección no tiene capacidad
4. Tiempo perdido: L = Σ(pérdida por fase) ≈ 4 s por fase más el todo rojo
5. **Ciclo óptimo:** C_{0} = (1.5L + 5)/(1 − Y)
6. Verde efectivo de cada fase: g_{i} = (C_{0} − L)·y_{i}/Y

Ciclos entre 40 y 120 s. Un ciclo demasiado largo aumenta la espera.`,
key:['y = [[q|s]]','C_{0} = [[1.5L + 5|1 − Y]]','g_{i} = (C_{0} − L)[[y_{i}|Y]]'],
err:'Sumar las relaciones de flujo de todos los accesos en vez de solo las críticas de cada fase.',
x:[['cvs','Capacidad vial'],['trf','Conteos de tráfico'],['pert','Tiempos y probabilidades']],
g:[
r=>{const q=r.i(200,1500,10),s=r.p([1700,1800,1900]);return{q:`q=${q} veh/h y s=${s} veh/h. Halla y.`,a:q/s,u:'',s:[`y = ${n(q/s)}`]};},
r=>{const y1=r.i(.1,.45,.01),y2=r.i(.1,.4,.01),L=r.i(8,16,1);return{q:`Dos fases con y₁=${y1}, y₂=${y2} y L=${L} s. Halla C₀.`,a:(1.5*L+5)/(1-y1-y2),u:'s',s:[`Y = ${n(y1+y2)}`,`C₀ = ${n(1.5*L+5)}/${n(1-y1-y2)} = ${n((1.5*L+5)/(1-y1-y2))} s`]};},
r=>{const C=r.i(50,120,1),L=r.i(8,16,1),y1=r.i(.15,.4,.01),y2=r.i(.15,.4,.01);return{q:`C=${C} s, L=${L} s, y₁=${y1}, y₂=${y2}. Halla g₁.`,a:(C-L)*y1/(y1+y2),u:'s',s:[`g₁ = ${C-L}·${y1}/${n(y1+y2)} = ${n((C-L)*y1/(y1+y2))} s`]};},
r=>{const nf=r.i(2,4,1),pf=r.i(3,5,.5),ar=r.i(0,2,.5);return{q:`${nf} fases con ${pf} s perdidos cada una y ${ar} s de todo rojo por fase. Halla L.`,a:nf*(pf+ar),u:'s',s:[`L = ${nf}(${pf}+${ar}) = ${n(nf*(pf+ar))} s`]};},
r=>{const q=[r.i(300,800,10),r.i(200,700,10),r.i(200,600,10),r.i(150,500,10)],s=1800,L=r.i(10,14,1);const y1=Math.max(q[0],q[1])/s,y2=Math.max(q[2],q[3])/s,Y=y1+y2,C=(1.5*L+5)/(1-Y);return{q:`Cruce de dos fases. Fase 1: accesos norte ${q[0]} y sur ${q[1]} veh/h/carril; fase 2: este ${q[2]} y oeste ${q[3]}. s=1800, L=${L} s. Halla C₀ y el verde efectivo de la fase 1. Escribe g₁.`,a:(C-L)*y1/Y,u:'s',s:[`y₁ = ${n(y1)}, y₂ = ${n(y2)} (accesos críticos)`,`C₀ = ${n(C)} s`,`g₁ = ${n((C-L)*y1/Y)} s`]};}
]});
SUB('fer',{t:'Ferrocarriles',
lec:`El tren es muy eficiente porque el acero sobre acero tiene poca resistencia a la rodadura. Pero no tolera pendientes ni curvas fuertes.

## Resistencias al avance (por tonelada)
- Rodadura: unos 2 a 4 kg/t en recta
- Pendiente: 10 kg/t por cada 1 % (i en ‰ → i kg/t)
- Curva: R_{c} ≈ 700/R kg/t (R en metros, trocha estándar)

## Esfuerzo de tracción
F = W·(r_{0} + i + 700/R), con W el peso del tren en t.

Potencia: P = F·v.

## Peralte de vías férreas
h = 11.8·V²/R (mm, V en km/h, R en m, trocha 1435 mm). Se limita a unos 150 mm.

El Ferrocarril Central del Perú llega a 4782 m de altitud con zigzags porque no podía subir directamente.`,
key:['F = W(r_{0} + i + [[700|R]])','P = Fv','h = 11.8[[V^{2}|R]]'],
err:'Olvidar que una curva en pendiente suma ambas resistencias.',
x:[['prl','Peralte en carreteras'],['ene','Potencia'],['hor','Curvas horizontales']],
g:[
r=>{const i=r.i(2,40,1),W=r.i(200,5000,50);return{q:`Tren de ${W} t en pendiente de ${i} ‰. Halla la resistencia por pendiente.`,a:W*i/1000,u:'t',s:[`= ${W}·${i}/1000 = ${n(W*i/1000)} t`]};},
r=>{const R=r.i(100,1500,10);return{q:`Curva de R=${R} m. Halla la resistencia por curva en kg/t.`,a:700/R,u:'kg/t',s:[`= 700/${R} = ${n(700/R)} kg/t`]};},
r=>{const V=r.i(40,160,5),R=r.i(300,3000,50);return{q:`V=${V} km/h, R=${R} m. Halla el peralte teórico.`,a:11.8*V*V/R,u:'mm',s:[`h = ${n(11.8*V*V/R)} mm`]};},
r=>{const W=r.i(300,4000,50),r0=r.i(2,4,.5),i=r.i(5,35,1),R=r.i(150,1000,10);return{q:`Tren de ${W} t, r₀=${r0} kg/t, pendiente ${i} ‰, curva R=${R} m. Halla la fuerza de tracción.`,a:W*(r0+i+700/R)/1000,u:'t',s:[`= ${W}(${r0}+${i}+${n(700/R)})/1000 = ${n(W*(r0+i+700/R)/1000)} t`]};},
r=>{const W=r.i(300,3000,50),r0=3,i=r.i(10,40,1),R=r.i(150,600,10),v=r.i(15,50,5),eta=r.p([.8,.85]);const F=W*(r0+i+700/R)*9.81,P=F*v/3.6/eta/1000;return{q:`Tren de ${W} t subiendo ${i} ‰ en curva R=${R} m a ${v} km/h (r₀=3 kg/t, rendimiento ${eta}). ¿Qué potencia necesita la locomotora en kW?`,a:P,u:'kW',s:[`F = ${n(F/1000)} kN`,`P = Fv/η = ${n(P)} kW`]};}
]});
SUB('aer',{t:'Aeropuertos',
lec:`La pista de un aeropuerto se diseña para el avión crítico, corregida por las condiciones del lugar. En el Perú esto pesa mucho: Cusco, Juliaca y Andahuaylas están a gran altitud, donde el aire es menos denso y los aviones necesitan más pista.

## Correcciones de longitud (OACI)
- Por altitud: +7 % por cada 300 m sobre el nivel del mar
- Por temperatura: +1 % por cada °C que la temperatura de referencia supera a la estándar a esa altitud (15 − 0.0065H)
- Por pendiente: +10 % por cada 1 % de pendiente longitudinal

Las correcciones se aplican en ese orden y una sobre otra.

## Orientación
La pista se orienta según el viento: la componente transversal V·sen θ no debe superar el límite del avión (por ejemplo 20 nudos).`,
key:['L_{1} = L_{0}(1 + 0.07[[H|300]])','L_{2} = L_{1}[1 + 0.01(T − (15 − 0.0065H))]','L_{3} = L_{2}(1 + 0.10·pendiente%)','V_{t} = V sen θ'],
err:'Aplicar las correcciones de temperatura sobre la longitud básica en vez de sobre la ya corregida por altitud.',
x:[['cvs','Capacidad del sistema de transporte'],['pav','Pavimentos de pista'],['tri','Componente transversal del viento']],
g:[
r=>{const L=r.i(1500,3000,50),H=r.i(0,4000,50);return{q:`L₀=${L} m y altitud ${H} m. Halla L corregida por altitud.`,a:L*(1+.07*H/300),u:'m',s:[`= ${L}(1 + 0.07·${H}/300) = ${n(L*(1+.07*H/300))} m`]};},
r=>{const H=r.i(0,4000,50);return{q:`Halla la temperatura estándar a ${H} m.`,a:15-.0065*H,u:'°C',s:[`= 15 − 0.0065·${H} = ${n(15-.0065*H)} °C`]};},
r=>{const L=r.i(1800,3500,50),H=r.i(0,4000,50),T=r.i(10,35,1);const Ts=15-.0065*H;return{q:`Longitud ya corregida por altitud ${L} m, altitud ${H} m y temperatura de referencia ${T} °C. Corrige por temperatura.`,a:L*(1+.01*(T-Ts)),u:'m',s:[`T estándar = ${n(Ts)} °C`,`= ${L}(1 + 0.01·${n(T-Ts)}) = ${n(L*(1+.01*(T-Ts)))} m`]};},
r=>{const V=r.i(10,40,1),t=r.i(5,80,5);return{q:`Viento de ${V} nudos a ${t}° del eje de la pista. Halla la componente transversal.`,a:V*Math.sin(t*PI/180),u:'nudos',s:[`= ${V}·sen ${t}° = ${n(V*Math.sin(t*PI/180))} nudos`]};},
r=>{const L0=r.i(1800,2600,50),H=r.i(2500,4000,50),T=r.i(15,25,1),p=r.i(.2,1,.1);const L1=L0*(1+.07*H/300),L2=L1*(1+.01*(T-(15-.0065*H))),L3=L2*(1+.1*p);return{q:`Aeropuerto andino a ${H} m de altitud, temperatura de referencia ${T} °C y pendiente longitudinal ${p} %. El avión crítico necesita ${L0} m a nivel del mar en condiciones estándar. Halla la longitud de pista.`,a:L3,u:'m',s:[`Altitud: ${n(L1)} m`,`Temperatura: ${n(L2)} m`,`Pendiente: ${n(L3)} m`]};}
]});
SUB('acc',{t:'Seguridad vial',
lec:`En el Perú mueren cerca de tres mil personas al año en siniestros de tránsito. Muchos tramos peligrosos tienen causas de ingeniería: curvas sin peralte, falta de visibilidad, bermas inexistentes.

## Índices
- Tasa por tramo: TA = N·10⁸/(IMD·365·años·L), siniestros por cada 100 millones de veh·km
- Tasa en intersección: N·10⁶/(IMD·365·años), por millón de vehículos que entran
- **Punto negro:** un sitio cuya tasa supera claramente al promedio de la red

## Beneficio de una medida
Siniestros evitados = N_{anual}·FRA, con FRA el factor de reducción (por ejemplo 30 % por iluminar un cruce). El beneficio se compara con el costo para priorizar.

## Energía de impacto
La energía cinética crece con el cuadrado de la velocidad: por eso reducir de 60 a 50 km/h salva tantas vidas.`,
key:['TA = [[N·10^{8}|IMD·365·años·L]]','Evitados = N·FRA','E ∝ V^{2}'],
err:'Comparar tramos por número de siniestros sin dividir entre el tráfico y la longitud.',
x:[['vis','Visibilidad'],['prl','Peralte'],['vpn','Beneficio/costo de las medidas']],
g:[
r=>{const N=r.i(5,80,1),IMD=r.i(2000,30000,500),a=r.i(1,5,1),L=r.i(1,20,.5);return{q:`${N} siniestros en ${a} años en ${L} km con IMD=${IMD}. Halla TA (por 10⁸ veh·km).`,a:N*1e8/(IMD*365*a*L),u:'',s:[`= ${n(N*1e8/(IMD*365*a*L))}`]};},
r=>{const N=r.i(3,40,1),IMD=r.i(5000,50000,500),a=r.i(1,5,1);return{q:`Intersección con ${N} siniestros en ${a} años e IMD entrante ${IMD}. Halla la tasa por millón de vehículos.`,a:N*1e6/(IMD*365*a),u:'',s:[`= ${n(N*1e6/(IMD*365*a))}`]};},
r=>{const v1=r.i(50,120,5),v2=r.i(30,v1-5,5);return{q:`Si la velocidad baja de ${v1} a ${v2} km/h, ¿en qué % baja la energía de impacto?`,a:(1-(v2/v1)**2)*100,u:'%',s:[`= 1 − (${v2}/${v1})² = ${n((1-(v2/v1)**2)*100)} %`]};},
r=>{const N=r.i(5,40,1),F=r.i(.15,.6,.05);return{q:`Un tramo tiene ${N} siniestros por año. Una medida tiene FRA=${F}. ¿Cuántos se evitan al año?`,a:N*F,u:'',s:[`= ${n(N*F)}`]};},
r=>{const N=r.i(4,25,1),F=r.i(.2,.5,.05),Cs=r.i(50,300,10)*1000,I=r.i(100,2000,50)*1000,vu=r.p([5,8,10]),i=.08;const B=N*F*Cs,fa=(1-(1+i)**-vu)/i;return{q:`Un punto negro tiene ${N} siniestros al año con costo social medio S/${Cs}. Una medida de S/${I} con FRA=${F} dura ${vu} años. Con tasa 8 %, halla la relación beneficio/costo.`,a:B*fa/I,u:'',s:[`Beneficio anual = S/ ${n(B)}`,`Factor de valor presente = ${n(fa)}`,`B/C = ${n(B*fa/I)}`]};}
]});
EXT('m35');
SUB('sbr',{t:'Subrasante y estabilización',
lec:`El pavimento es tan bueno como el suelo en que se apoya. La **subrasante** se caracteriza con el CBR o con el módulo resiliente.

## Clasificación del MTC (Manual de Carreteras)
- S0: CBR < 3 % (inadecuada, hay que mejorarla)
- S1: 3–6 % · S2: 6–10 % · S3: 10–20 % · S4: 20–30 % · S5: > 30 %

## Módulo resiliente
M_{r} (psi) ≈ 2555·CBR^{0.64}

## Si el suelo es malo
- Reemplazo con material granular
- **Estabilización con cal** en arcillas: reduce la plasticidad. Dosis por peso seco
- **Estabilización con cemento** en suelos granulares
- Geosintéticos

Cantidad de estabilizante: P = % × γ_{d} × volumen.`,
key:['M_{r} = 2555·CBR^{0.64}','P = %·γ_{d}·V','S0: CBR < 3 %'],
err:'Diseñar el pavimento con el CBR de la cantera en vez del de la subrasante saturada.',
x:[['cbr','Ensayo CBR'],['pav','Diseño de pavimentos'],['mej','Mejoramiento de suelos']],
g:[
r=>{const c=r.i(1,40,.5);return{q:`CBR=${c} %. Halla M_{r} en psi.`,a:2555*c**.64,u:'psi',s:[`= 2555·${c}^{0.64} = ${n(2555*c**.64)} psi`]};},
r=>{const c=r.i(1,40,.5);const k=c<3?0:c<6?1:c<10?2:c<20?3:c<30?4:5;return{q:`CBR=${c} %. ¿Qué categoría S (escribe el número)?`,a:k,u:'',tol:0,s:[`S${k}`]};},
r=>{const L=r.i(100,5000,100),a=r.i(6,12,.5),e=r.i(.15,.3,.05),gd=r.i(1.5,1.9,.05),p=r.i(2,8,.5);return{q:`Estabilizar ${L} m de vía de ${a} m de ancho y ${e} m de espesor con ${p} % de cal. γ_{d}=${gd} t/m³. Halla las toneladas de cal.`,a:L*a*e*gd*p/100,u:'t',s:[`V = ${n(L*a*e)} m³`,`P = ${n(L*a*e*gd*p/100)} t`]};},
r=>{const c1=r.i(1,3,.1),c2=r.i(8,30,1);return{q:`Una arcilla pasa de CBR ${c1} % a ${c2} % al estabilizarla. ¿Cuántas veces sube M_{r}?`,a:(c2/c1)**.64,u:'veces',s:[`= (${c2}/${c1})^{0.64} = ${n((c2/c1)**.64)}`]};},
r=>{const L=r.i(1000,8000,100),a=r.i(6,10,.5),e=.25,gd=r.i(1.6,1.8,.05),p=r.i(3,6,.5),cc=r.i(400,700,10),cr=r.i(35,60,1),ec=r.i(10,25,1);const Cc=L*a*e*gd*p/100*cc+L*a*e*ec,Cr=L*a*e*cr;return{q:`Subrasante S0 en ${L} m de vía de ${a} m. Opción A: estabilizar 25 cm con ${p} % de cal (γ_{d}=${gd}, cal a S/${cc}/t, mezclado y compactado S/${ec}/m³). Opción B: reemplazar 25 cm con granular a S/${cr}/m³. Halla el ahorro de la opción más barata.`,a:Math.abs(Cr-Cc),u:'S/',s:[`A: S/ ${n(Cc)}`,`B: S/ ${n(Cr)}`,`Ahorro = S/ ${n(Math.abs(Cr-Cc))} (${Cc<Cr?'cal':'reemplazo'})`]};}
]});
SUB('cbr',{t:'Ensayo CBR',
lec:`El **CBR** (California Bearing Ratio) compara la resistencia del suelo a la penetración de un pistón con la de una piedra chancada patrón.

## Cálculo
CBR = (carga en el suelo / carga patrón)·100

Cargas patrón: 1000 psi a 0.1″ de penetración y 1500 psi a 0.2″. Se usa el mayor, normalmente el de 0.1″.

## Procedimiento
- Se compactan especímenes con 56, 25 y 10 golpes por capa
- Se sumergen 4 días (condición crítica) y se mide el hinchamiento
- Se grafica CBR vs densidad seca y se lee el CBR al 95 % de la máxima densidad seca del Proctor modificado

## Hinchamiento
% = Δh/h·100. Más de 2 % indica un suelo expansivo problemático.`,
key:['CBR = [[carga|carga patrón]]·100','Patrón: 1000 psi (0.1″), 1500 psi (0.2″)','Hinch. = [[Δh|h]]·100'],
err:'Reportar el CBR de la muestra sin sumergir.',
x:[['sbr','Uso en subrasante'],['cpt','Proctor modificado'],['reg','Interpolar entre datos']],
g:[
r=>{const c=r.i(20,900,5);return{q:`A 0.1″ el pistón soporta ${c} psi. Halla el CBR.`,a:c/10,u:'%',s:[`= ${c}/1000·100 = ${n(c/10)} %`]};},
r=>{const c=r.i(20,1300,5);return{q:`A 0.2″ soporta ${c} psi. Halla el CBR a 0.2″.`,a:c/15,u:'%',s:[`= ${c}/1500·100 = ${n(c/15)} %`]};},
r=>{const c1=r.i(20,900,5),c2=r.i(c1,c1*1.8,5);const a=c1/10,b=c2/15;return{q:`0.1″: ${c1} psi; 0.2″: ${c2} psi. ¿Qué CBR se reporta? (el mayor)`,a:Math.max(a,b),u:'%',s:[`0.1″ → ${n(a)}; 0.2″ → ${n(b)}`,`CBR = ${n(Math.max(a,b))} %`]};},
r=>{const h=r.i(110,120,.1),d=r.i(.1,5,.05);return{q:`Muestra de ${h} mm que se hincha ${d} mm. Halla el hinchamiento.`,a:d/h*100,u:'%',s:[`= ${n(d/h*100)} %`]};},
r=>{const gm=r.i(1.9,2.2,.01),d1=+(gm*.9).toFixed(3),d2=+(gm*.97).toFixed(3),c1=r.i(5,20,.5),c2=c1+r.i(5,30,.5);const g95=.95*gm,cbr=c1+(c2-c1)*(g95-d1)/(d2-d1);return{q:`Proctor modificado: γ_{d,máx}=${gm} g/cm³. Especímenes: γ_{d}=${d1} con CBR ${c1} % y γ_{d}=${d2} con CBR ${c2} %. Halla el CBR al 95 %.`,a:cbr,u:'%',s:[`γ al 95 % = ${n(g95,4)}`,`Interpolando: ${n(cbr)} %`]};}
]});
EXT('m20');
SUB('pert',{t:'PERT: plazos con incertidumbre',
lec:`El CPM supone que cada actividad dura un tiempo fijo. El **PERT** reconoce la incertidumbre usando tres estimaciones:

- a: optimista · m: más probable · b: pesimista
- Duración esperada: t_{e} = (a + 4m + b)/6
- Varianza: σ² = ((b − a)/6)²

## Probabilidad de cumplir el plazo
Para la ruta crítica: T = Σt_{e} y σ_{T} = √(Σσ²).

z = (plazo − T)/σ_{T}, y la probabilidad se lee en la tabla normal: z = 0 → 50 %, z = 1 → 84 %, z = 1.645 → 95 %, z = 2 → 97.7 %.

Así se decide cuánto plazo pedir en una oferta o cuánta holgura dejar en un cronograma.`,
key:['t_{e} = [[a+4m+b|6]]','σ^{2} = ([[b−a|6]])^{2}','z = [[plazo − T|σ_{T}]]'],
err:'Sumar las desviaciones estándar en vez de las varianzas.',
x:[['cpm','Ruta crítica'],['conf','Distribución normal'],['pen','Penalidad por atraso']],
g:[
r=>{const a=r.i(2,20,1),m=a+r.i(1,10,1),b=m+r.i(1,20,1);return{q:`a=${a}, m=${m}, b=${b} días. Halla t_{e}.`,a:(a+4*m+b)/6,u:'días',s:[`= (${a}+${4*m}+${b})/6 = ${n((a+4*m+b)/6)} días`]};},
r=>{const a=r.i(2,20,1),b=a+r.i(3,40,1);return{q:`a=${a} y b=${b} días. Halla σ².`,a:((b-a)/6)**2,u:'días²',s:[`= (${b-a}/6)² = ${n(((b-a)/6)**2)}`]};},
r=>{const v=[r.i(1,15,.5),r.i(1,15,.5),r.i(1,15,.5),r.i(1,15,.5)];return{q:`Varianzas de la ruta crítica: ${v.join(', ')}. Halla σ_{T}.`,a:sq(v.reduce((s,x)=>s+x)),u:'días',s:[`σ_{T} = √${v.reduce((s,x)=>s+x)} = ${n(sq(v.reduce((s,x)=>s+x)))} días`]};},
r=>{const T=r.i(60,300,1),s=r.i(3,20,.5),z=r.p([0,1,1.645,2]);return{q:`T=${T} días, σ_{T}=${s}. ¿Qué plazo da ${({0:'50',1:'84','1.645':'95',2:'97.7'})[z]} % de probabilidad (z=${z})?`,a:T+z*s,u:'días',s:[`= ${T} + ${z}·${s} = ${n(T+z*s)} días`]};},
r=>{const act=[0,1,2,3].map(()=>{const a=r.i(5,30,1),m=a+r.i(2,15,1),b=m+r.i(3,30,1);return[a,m,b];});const T=act.reduce((s,[a,m,b])=>s+(a+4*m+b)/6,0),V=act.reduce((s,[a,,b])=>s+((b-a)/6)**2,0);return{q:`Ruta crítica de cuatro actividades (a, m, b en días): ${act.map(x=>'('+x.join(', ')+')').join('; ')}. ¿Qué plazo pedir para 95 % de confianza (z=1.645)?`,a:T+1.645*sq(V),u:'días',s:[`T = ${n(T)} días`,`σ_{T} = ${n(sq(V))} días`,`Plazo = ${n(T+1.645*sq(V))} días`]};}
]});
SUB('flc',{t:'Flujo de caja de obra',
lec:`Una obra puede ser rentable y aun así quebrar a la empresa si se queda sin dinero a mitad de camino. El **flujo de caja** compara cuándo entra y cuándo sale el dinero.

## Ingresos
Valorizaciones mensuales, que se cobran uno o dos meses después, menos la amortización del adelanto y retenciones.

## Egresos
Materiales, mano de obra, equipos y gastos generales, que se pagan al momento.

## Indicadores
- Saldo acumulado mes a mes: S_{k} = Σ(ingresos − egresos)
- **Máxima necesidad de financiamiento:** el saldo más negativo
- Costo financiero ≈ saldo negativo × tasa mensual

## Curva S
El avance acumulado tiene forma de S: lento al inicio, rápido al medio, lento al final.`,
key:['S_{k} = Σ(I − E)','Necesidad = mín(S_{k})','Costo fin. = Σ|S_{k}<0|·i'],
err:'Programar los ingresos en el mes en que se ejecuta el trabajo, no en el que se cobra.',
x:[['val','Valorizaciones'],['evm','Curva S y valor ganado'],['vpn','Valor del dinero en el tiempo']],
g:[
r=>{const I=r.i(50,500,10),E=r.i(50,500,10);return{q:`Ingresos S/${I} mil y egresos S/${E} mil en el mes. Halla el saldo del mes.`,a:I-E,u:'S/ mil',s:[`= ${I-E}`]};},
r=>{const s=[r.i(-300,-50,10),r.i(-200,100,10),r.i(-100,200,10)];let a=0;const ac=s.map(v=>a+=v);return{q:`Saldos mensuales: ${s.join(', ')} mil. Halla el saldo acumulado al mes 3.`,a:ac[2],u:'S/ mil',s:[`Acumulado: ${ac.join(', ')}`]};},
r=>{const s=[r.i(-300,-50,10),r.i(-200,50,10),r.i(-150,150,10),r.i(0,250,10)];let a=0;const ac=s.map(v=>a+=v);return{q:`Saldos mensuales: ${s.join(', ')} mil. Halla la máxima necesidad de financiamiento (escribe un número positivo).`,a:-Math.min(...ac,0),u:'S/ mil',s:[`Acumulado: ${ac.join(', ')}`,`Necesidad = ${-Math.min(...ac,0)} mil`]};},
r=>{const N=r.i(50,800,10),i=r.i(1,3,.1),m=r.i(1,6,1);return{q:`Saldo negativo de S/${N} mil durante ${m} meses a ${i} % mensual. Halla el costo financiero aproximado.`,a:N*i/100*m,u:'S/ mil',s:[`= ${N}·${i/100}·${m} = ${n(N*i/100*m)} mil`]};},
r=>{const C=r.i(1000,5000,100),pe=[.15,.3,.35,.2],ad=r.p([0,.1]),m=r.i(.9,.95,.01);const val=pe.map(p=>p*C),eg=val.map(v=>v*m);let a=ad*C,mn=Math.min(a,0);const am=val.map(v=>v*ad);for(let k=0;k<5;k++){const ing=k>=1?val[k-1]-am[k-1]:0,e=k<4?eg[k]:0;a+=ing-e;mn=Math.min(mn,a);}return{q:`Obra de S/${C} mil en 4 meses con avance ${pe.map(x=>x*100+'%').join(', ')}. Costos = ${m*100} % de lo valorizado, pagados en el mes. Cada valorización se cobra al mes siguiente. Adelanto inicial ${ad*100} % (amortizado en proporción a cada valorización). Halla la máxima necesidad de financiamiento.`,a:-mn,u:'S/ mil',s:[`Mes 1 sale ${n(eg[0])} y aún no entra nada (salvo el adelanto)`,`Recorre los meses acumulando ingresos − egresos`,`Necesidad máxima = ${n(-mn)} mil`]};}
]});
SUB('lean',{t:'Lean Construction y Last Planner',
lec:`En obra, gran parte del tiempo se pierde esperando materiales, información o que otro termine. **Lean Construction** busca eliminar esas pérdidas.

## Tipos de trabajo
- Productivo (TP): agrega valor (vaciar, asentar ladrillo)
- Contributorio (TC): necesario pero no agrega valor (transportar, limpiar)
- No contributorio (TNC): pérdida (esperar, rehacer)

En el Perú, los estudios de nivel general suelen dar TP de 25 a 40 %.

## Last Planner System
- Plan maestro → plan intermedio (lookahead, 4 a 6 semanas, liberar restricciones) → plan semanal
- **PPC** (porcentaje de plan cumplido) = tareas completadas / tareas programadas
- Se registran las causas de no cumplimiento para mejorar

## Tren de trabajo
Se divide la obra en sectores iguales y cada cuadrilla pasa de uno a otro: duración = (N_{sectores} + N_{actividades} − 1)·ciclo.`,
key:['PPC = [[completadas|programadas]]·100','TP + TC + TNC = 100 %','T = (N_{s} + N_{a} − 1)·c'],
err:'Medir solo el avance físico sin preguntar por qué no se cumplió lo planeado.',
x:[['cpm','Programación'],['prd','Productividad'],['evm','Control del avance']],
g:[
r=>{const p=r.i(10,60,1),c=r.i(5,p,1);return{q:`${p} tareas programadas y ${c} completadas. Halla el PPC.`,a:c/p*100,u:'%',s:[`= ${n(c/p*100)} %`]};},
r=>{const TP=r.i(20,50,1),TC=r.i(20,45,1);return{q:`TP=${TP} % y TC=${TC} %. Halla el TNC.`,a:100-TP-TC,u:'%',s:[`= ${100-TP-TC} %`]};},
r=>{const Ns=r.i(4,20,1),Na=r.i(3,10,1),c=r.i(1,3,1);return{q:`Tren de trabajo con ${Ns} sectores, ${Na} actividades y ciclo de ${c} día(s). Halla la duración.`,a:(Ns+Na-1)*c,u:'días',s:[`= (${Ns}+${Na}−1)·${c} = ${(Ns+Na-1)*c} días`]};},
r=>{const obs=r.i(200,600,10),tp=r.i(.2,.45,.01),tc=r.i(.25,.4,.01);const a=Math.round(obs*tp),b=Math.round(obs*tc);return{q:`Muestreo de ${obs} observaciones: ${a} TP, ${b} TC y el resto TNC. Halla el % de TNC.`,a:(obs-a-b)/obs*100,u:'%',s:[`TNC = ${obs-a-b} obs = ${n((obs-a-b)/obs*100)} %`]};},
r=>{const Na=r.i(4,8,1),d=r.i(3,8,1),Ns=r.i(4,8,1);return{q:`Un piso típico tiene ${Na} actividades de ${d} días cada una si se hacen una tras otra en todo el piso. Con ${Ns} sectores por piso, cada actividad tarda ${n(d/Ns)} días por sector. ¿Cuántos días se ahorran en un piso usando el tren? (Secuencial = N_{a}·d; tren = (N_{s}+N_{a}−1)·d/N_{s})`,a:Na*d-(Ns+Na-1)*d/Ns,u:'días',s:[`Secuencial: ${Na*d} días`,`Tren: ${n((Ns+Na-1)*d/Ns)} días`,`Ahorro = ${n(Na*d-(Ns+Na-1)*d/Ns)} días por piso`]};}
]});
SUB('bim',{t:'BIM en la gestión de obra',
lec:`**BIM** (Building Information Modeling) es un modelo 3D donde cada elemento tiene información: material, costo, fecha. En el Perú el **Plan BIM Perú** hace obligatorio su uso progresivo en la inversión pública.

## Dimensiones
- 3D: geometría y detección de interferencias (choques entre ductos, vigas y tuberías)
- 4D: tiempo (simulación del cronograma)
- 5D: costo (metrados automáticos)
- 6D y 7D: sostenibilidad y operación

## Por qué ahorra
Una interferencia detectada en el modelo cuesta casi nada; en obra cuesta demolición, rehacer y días de atraso.

Ahorro = N_{interferencias}·(costo en obra − costo en diseño).

Los metrados salen del modelo: la cantidad depende de qué tan bien se modeló, así que el modelo se revisa como se revisa un plano.`,
key:['Ahorro = N(C_{obra} − C_{diseño})','ROI = [[ahorro − inversión|inversión]]','3D · 4D · 5D'],
err:'Creer que el software reemplaza el criterio: un modelo mal hecho da metrados mal hechos.',
x:[['dib5','Modelado y planos'],['met','Metrados'],['cpm','Cronograma 4D']],
g:[
r=>{const N=r.i(10,500,5),co=r.i(500,8000,100),cd=r.i(20,300,10);return{q:`${N} interferencias detectadas. Cada una cuesta S/${co} en obra y S/${cd} en diseño. Halla el ahorro.`,a:N*(co-cd),u:'S/',s:[`= ${N}(${co}−${cd}) = S/ ${n(N*(co-cd))}`]};},
r=>{const A=r.i(20000,400000,5000),I=r.i(10000,150000,5000);return{q:`Ahorro S/${A} con inversión BIM de S/${I}. Halla el ROI en %.`,a:(A-I)/I*100,u:'%',s:[`= ${n((A-I)/I*100)} %`]};},
r=>{const C=r.i(1,50,.5),p=r.i(.5,3,.1);return{q:`Obra de S/${C} millones. El BIM cuesta ${p} % del presupuesto. Halla su costo.`,a:C*1e6*p/100,u:'S/',s:[`= S/ ${n(C*1e6*p/100)}`]};},
r=>{const m=r.i(100,2000,10),e=r.i(1,10,.5);return{q:`El modelo da ${m} m³ de concreto; el metrado manual da ${n(m*(1+e/100))}. Halla la diferencia en %.`,a:e,u:'%',s:[`= ${e} %`]};},
r=>{const C=r.i(5,80,1),p=r.i(.8,2,.1),Cd=r.i(5,40,1)*1000,ad=r.i(3,10,1),ch=r.i(.5,3,.1);const inv=C*1e6*p/100;const ahorro=C*1e6*ch/100+ad*Cd;return{q:`Obra de S/${C} millones. El BIM cuesta ${p} % del presupuesto, reduce los adicionales por interferencias en ${ch} % del presupuesto y evita ${ad} días de atraso que cuestan S/${Cd} por día. Halla el ROI en %.`,a:(ahorro-inv)/inv*100,u:'%',s:[`Inversión = S/ ${n(inv)}`,`Ahorro = S/ ${n(C*1e6*ch/100)} + S/ ${n(ad*Cd)} = S/ ${n(ahorro)}`,`ROI = ${n((ahorro-inv)/inv*100)} %`]};}
]});
SUB('rsg',{t:'Gestión de riesgos',
lec:`Toda obra tiene riesgos: lluvia, suelo distinto al esperado, alza de precios, conflictos sociales. Gestionarlos es decidir qué hacer antes de que pasen.

## Análisis cualitativo
Exposición = probabilidad × impacto (escala 1 a 5): 1–4 bajo, 5–12 medio, 15–25 alto.

## Análisis cuantitativo
- Valor monetario esperado: VME = Σp_{i}·C_{i}
- La **reserva de contingencia** cubre el VME de los riesgos identificados

## Respuestas
- Evitar (cambiar el diseño), mitigar (reducir p o C), transferir (seguro, subcontrato), aceptar (reserva)

## Árbol de decisión
Se compara el VME de cada alternativa, incluyendo el costo de la respuesta.

En la contratación pública peruana, el contrato asigna riesgos a cada parte: leerlo antes de ofertar.`,
key:['E = p × I','VME = Σp_{i}C_{i}','VME_{respuesta} = costo + p′C'],
err:'Gastar en mitigar un riesgo más de lo que cuesta su VME.',
x:[['pert','Incertidumbre de plazo'],['vpn','Evaluación económica'],['seg','Riesgos de seguridad']],
g:[
r=>{const p=r.i(1,5,1),I=r.i(1,5,1);return{q:`Probabilidad ${p} e impacto ${I}. Halla la exposición.`,a:p*I,u:'',tol:0,s:[`= ${p*I} (${p*I<=4?'bajo':p*I<=12?'medio':'alto'})`]};},
r=>{const p=r.i(.05,.6,.05),C=r.i(10,500,10)*1000;return{q:`Riesgo con p=${p} y costo S/${C}. Halla el VME.`,a:p*C,u:'S/',s:[`= S/ ${n(p*C)}`]};},
r=>{const R=[[r.i(.05,.5,.05),r.i(10,300,10)*1000],[r.i(.05,.5,.05),r.i(10,300,10)*1000],[r.i(.05,.5,.05),r.i(10,300,10)*1000]];return{q:`Tres riesgos (p, costo): ${R.map(x=>'('+x[0]+', S/'+x[1]+')').join('; ')}. Halla la reserva de contingencia.`,a:R.reduce((s,[p,c])=>s+p*c,0),u:'S/',s:[`= S/ ${n(R.reduce((s,[p,c])=>s+p*c,0))}`]};},
r=>{const p=r.i(.1,.6,.05),C=r.i(50,800,10)*1000,pp=+(p*r.i(.1,.6,.1)).toFixed(3),cm=r.i(5,100,5)*1000;const v1=p*C,v2=cm+pp*C;return{q:`Riesgo con p=${p} y costo S/${C}. Mitigarlo cuesta S/${cm} y baja p a ${pp}. Halla el ahorro esperado de mitigar (negativo si no conviene).`,a:v1-v2,u:'S/',s:[`Sin mitigar: S/ ${n(v1)}`,`Mitigando: S/ ${n(v2)}`,`Ahorro = S/ ${n(v1-v2)}`]};},
r=>{const p=r.i(.2,.6,.05),Cl=r.i(100,600,10)*1000,Cs=r.i(20,120,5)*1000,ded=r.i(10,50,5)*1000;const A=p*Cl,B=Cs+p*ded;const Cc=r.i(30,150,10)*1000,pc=+(p*.4).toFixed(3),Cv=Cc+pc*Cl;const best=Math.min(A,B,Cv);return{q:`Lluvias atípicas: p=${p}, daño S/${Cl}. Opciones: (A) aceptar; (B) seguro con prima S/${Cs} y deducible S/${ded}; (C) obras de protección por S/${Cc} que bajan p a ${pc}. Halla el VME de la mejor opción.`,a:best,u:'S/',s:[`A: S/ ${n(A)}`,`B: S/ ${n(B)}`,`C: S/ ${n(Cv)}`,`Mejor: S/ ${n(best)}`]};}
]});
EXT('m37');
SUB('mov',{t:'Movimiento de tierras y curva masa',
lec:`En una carretera se corta en unos tramos y se rellena en otros. La **curva masa** decide de dónde llevar la tierra y hasta dónde conviene transportarla.

## Volúmenes entre secciones
Método de las áreas medias: V = (A_{1} + A_{2})/2·d

## Factor de compactación
Un m³ de corte no da un m³ de relleno compactado: el relleno se corrige con un factor (por ejemplo 1.15 a 1.30 de corte por cada m³ compactado).

## Curva masa
Ordenada acumulada: cortes con signo +, rellenos con signo −. Donde la curva sube hay corte; donde baja, relleno. Una horizontal (compensadora) corta la curva en puntos que se compensan.

## Distancia libre de transporte
Hasta cierta distancia (por ejemplo 120 m) el transporte está incluido en el precio de la partida; más allá se paga **sobreacarreo** en m³·km.`,
key:['V = [[A_{1}+A_{2}|2]]d','V_{corte} = V_{relleno}·f','Sobreacarreo = V(d − d_{libre})'],
err:'Compensar corte y relleno en m³ geométricos sin el factor de compactación.',
x:[['met','Metrados'],['prd','Productividad de equipos'],['cn','Secciones desde curvas de nivel']],
g:[
r=>{const A1=r.i(2,80,.5),A2=r.i(2,80,.5),d=r.p([10,20,25,50]);return{q:`Secciones de ${A1} y ${A2} m² a ${d} m. Halla el volumen.`,a:(A1+A2)/2*d,u:'m³',s:[`= ${n((A1+A2)/2*d)} m³`]};},
r=>{const V=r.i(100,20000,50),f=r.i(1.1,1.35,.01);return{q:`Relleno compactado de ${V} m³ con factor ${f}. ¿Cuánto corte necesita?`,a:V*f,u:'m³',s:[`= ${n(V*f)} m³`]};},
r=>{const a=[r.i(10,60,1),r.i(10,60,1),r.i(-60,-10,1),r.i(-60,-10,1)],d=20;let s=0;const v=[];for(let i=0;i<3;i++){s+=(a[i]+a[i+1])/2*d;v.push(s);}return{q:`Áreas netas (+ corte, − relleno) cada 20 m: ${a.join(', ')} m². Halla la ordenada de la curva masa al final (ya corregidos los factores).`,a:s,u:'m³',s:[`Acumulado: ${v.map(x=>n(x)).join(', ')}`]};},
r=>{const V=r.i(500,20000,100),d=r.i(150,3000,10),dl=r.p([100,120,150]);return{q:`${V} m³ se transportan a una distancia media de ${d} m con distancia libre ${dl} m. Halla el sobreacarreo en m³·km.`,a:V*(d-dl)/1000,u:'m³·km',s:[`= ${V}(${d}−${dl})/1000 = ${n(V*(d-dl)/1000)} m³·km`]};},
r=>{const Vr=r.i(2000,30000,500),f=r.i(1.15,1.3,.01),Vc=r.i(1000,Vr*f,100),dm=r.i(300,2500,50),dl=120,ps=r.i(3,8,.5),pp=r.i(15,35,1),pt=r.i(8,20,1);const deficit=Math.max(Vr*f-Vc,0),Cs=Vc*(dm-dl)/1000*ps,Cp=deficit*(pp+pt);return{q:`Un tramo necesita ${Vr} m³ de relleno compactado (factor ${f}). Del corte vecino salen ${Vc} m³, transportados a ${dm} m (libre 120 m) a S/${ps}/m³·km. El faltante viene de cantera a S/${pp}/m³ más S/${pt}/m³ de transporte. Halla el costo de sobreacarreo más préstamo.`,a:Cs+Cp,u:'S/',s:[`Sobreacarreo: S/ ${n(Cs)}`,`Faltante: ${n(deficit)} m³ → S/ ${n(Cp)}`,`Total S/ ${n(Cs+Cp)}`]};}
]});
SUB('izq',{t:'Izaje y grúas',
lec:`El izaje es una de las maniobras más peligrosas en obra. Se planifica con números, no a ojo.

## Capacidad de la grúa
Cada grúa tiene una **tabla de carga**: la capacidad baja cuando aumenta el radio. Se verifica: carga total ≤ capacidad al radio de trabajo (en la práctica, ≤ 75–85 %).

Carga total = pieza + aparejos (eslingas, grilletes, balancín) + gancho.

## Eslingas
Con dos ramales a un ángulo θ respecto a la horizontal: T = W/(2 sen θ). Con ángulos menores a 45° la tensión se dispara.

## Estabilidad (momento de vuelco)
El momento de la carga W·R debe ser menor que el estabilizador dividido entre un factor de seguridad.

## Viento
Se suspende el izaje por encima de unos 40 km/h, o lo que indique el fabricante.`,
key:['Carga ≤ 0.75·Cap(R)','T = [[W|2 sen θ]]','W·R ≤ [[M_{est}|FS]]'],
err:'Olvidar el peso de los aparejos y del gancho.',
x:[['par','Equilibrio en un punto'],['seg','Seguridad en obra'],['esp3','Fuerzas en 3D']],
g:[
r=>{const W=r.i(1,30,.5),t=r.i(30,80,5);return{q:`Pieza de ${W} t con dos eslingas a ${t}° de la horizontal. Halla la tensión en cada una.`,a:W/(2*Math.sin(t*PI/180)),u:'t',s:[`T = ${W}/(2 sen ${t}°) = ${n(W/(2*Math.sin(t*PI/180)))} t`]};},
r=>{const P=r.i(1,40,.5),a=r.i(.1,1.5,.05),g=r.i(.2,1.5,.1);return{q:`Pieza de ${P} t, aparejos ${a} t, gancho ${g} t. Halla la carga total.`,a:P+a+g,u:'t',s:[`= ${n(P+a+g)} t`]};},
r=>{const C=r.i(5,80,1),L=r.i(1,60,.5);return{q:`Capacidad al radio de trabajo ${C} t y carga total ${L} t. Halla el % de uso.`,a:L/C*100,u:'%',s:[`= ${n(L/C*100)} % ${L/C<=.75?'(aceptable)':'(excede 75 %)'}`]};},
r=>{const W=r.i(1,30,.5),R=r.i(5,40,1),M=r.i(100,1500,10),FS=r.p([1.33,1.5]);return{q:`Carga de ${W} t a ${R} m. Momento estabilizador ${M} t·m, FS=${FS}. Halla W·R/(M/FS).`,a:W*R/(M/FS),u:'',s:[`= ${W*R}/${n(M/FS)} = ${n(W*R/(M/FS))}`]};},
r=>{const tab=[[10,r.i(30,40,1)],[15,r.i(18,25,1)],[20,r.i(12,16,1)],[25,r.i(8,11,1)],[30,r.i(5,7,.5)]];const R=r.i(11,29,1);let i=tab.findIndex(x=>x[0]>=R);const [r1,c1]=tab[i-1],[r2,c2]=tab[i];const C=c1+(c2-c1)*(R-r1)/(r2-r1);const P=r.i(2,12,.5),a=.4,g=.6;const L=P+a+g;return{q:`Tabla de carga: ${tab.map(x=>x[0]+' m → '+x[1]+' t').join('; ')}. Se iza una pieza de ${P} t (aparejos 0.4 t, gancho 0.6 t) a ${R} m. Interpola la capacidad y halla el % de uso.`,a:L/C*100,u:'%',s:[`Capacidad a ${R} m = ${n(C)} t`,`Carga total = ${n(L)} t`,`Uso = ${n(L/C*100)} % ${L/C<=.75?'(aceptable)':'(no: acercar la grúa o usar una mayor)'}`]};}
]});
EXT('m38');
SUB('gfz',{t:'Garantías y adelantos',
lec:`En los contratos de obra pública el contratista debe respaldar sus obligaciones con **garantías** (cartas fianza bancarias o pólizas de caución).

## Garantías usuales
- **Fiel cumplimiento:** 10 % del monto del contrato, vigente hasta la conformidad de la liquidación
- **Por adelantos:** por el monto del adelanto entregado. Se puede reducir a medida que se amortiza

## Adelantos
- Directo: hasta 10 % del contrato
- Para materiales: hasta 20 % del contrato
- Se amortizan en cada valorización: amortización = valorización × (adelanto/contrato)

## Costo de una carta fianza
Comisión ≈ tasa anual × monto × tiempo. Se incluye en los gastos generales.

Las cifras exactas dependen de la Ley 32069 y su reglamento: verifica el texto vigente al ofertar.`,
key:['GFC = 0.10·Contrato','Amort. = Val·[[Adelanto|Contrato]]','Costo = tasa·monto·[[meses|12]]'],
err:'Dejar vencer una carta fianza: la entidad puede ejecutarla.',
x:[['val','Valorizaciones'],['flc','Flujo de caja'],['adi','Liquidación']],
g:[
r=>{const C=r.i(500,50000,100)*1000;return{q:`Contrato de S/${C}. Halla la garantía de fiel cumplimiento (10 %).`,a:.1*C,u:'S/',s:[`= S/ ${n(.1*C)}`]};},
r=>{const C=r.i(500,50000,100)*1000,a=r.p([.05,.1]),V=r.i(20,C/1000*.2,10)*1000;return{q:`Contrato de S/${C} con adelanto directo de ${a*100} %. Valorización de S/${V}. Halla la amortización.`,a:V*a,u:'S/',s:[`= ${V}·${a} = S/ ${n(V*a)}`]};},
r=>{const M=r.i(50,5000,10)*1000,t=r.i(1,4,.1),m=r.i(3,24,1);return{q:`Carta fianza de S/${M} a ${t} % anual durante ${m} meses. Halla su costo.`,a:M*t/100*m/12,u:'S/',s:[`= S/ ${n(M*t/100*m/12)}`]};},
r=>{const C=r.i(1000,30000,100)*1000,a=.1,v=[r.i(5,20,1),r.i(5,20,1),r.i(5,20,1)];const am=v.reduce((s,x)=>s+x,0)/100*C*a;return{q:`Contrato de S/${C} con adelanto del 10 %. Se valorizan ${v.join(' %, ')} % del contrato. ¿Qué saldo de adelanto queda por amortizar (= monto de la garantía por adelanto)?`,a:a*C-am,u:'S/',s:[`Amortizado = S/ ${n(am)}`,`Saldo = S/ ${n(a*C-am)}`]};},
r=>{const C=r.i(2000,20000,100)*1000,m=r.i(6,18,1),t=r.i(1.5,3.5,.1),ad=r.p([.1,.3]);const gfc=.1*C*t/100*(m+3)/12,gad=ad*C/2*t/100*m/12;return{q:`Contrato de S/${C} y ${m} meses. Fianza de fiel cumplimiento por ${m+3} meses; fianza por adelantos de ${ad*100} % que se reduce linealmente hasta cero en el plazo (usa el promedio). Tasa ${t} % anual. Halla el costo total de fianzas.`,a:gfc+gad,u:'S/',s:[`Fiel cumplimiento: S/ ${n(gfc)}`,`Adelantos: S/ ${n(gad)}`,`Total S/ ${n(gfc+gad)}`]};}
]});
EXT('m43');
SUB('ilu',{t:'Iluminación',
lec:`Una buena iluminación hace segura una obra, un aula o una vía. La norma **EM.010** del RNE fija los niveles mínimos.

## Magnitudes
- Flujo luminoso Φ (lúmenes): luz que emite la lámpara
- Iluminancia E (lux): luz que llega a una superficie: E = Φ/A
- Eficacia (lm/W): un LED da 100 a 160 lm/W; un fluorescente, unos 70

## Método de los lúmenes (interiores)
N = E·A/(Φ·CU·FM)

- CU: coeficiente de utilización (0.4–0.8, según el local)
- FM: factor de mantenimiento (0.7–0.8)

## Niveles típicos
Aulas 300–500 lux, oficinas 500, almacenes 150–200, pasillos 100.

## Ahorro con LED
ΔE = N·(P_{antes} − P_{LED})·horas.`,
key:['E = [[Φ|A]]','N = [[EA|Φ·CU·FM]]','ΔE = N(P_{1} − P_{2})h'],
err:'Calcular las luminarias sin el factor de mantenimiento: al año el local queda oscuro.',
x:[['ie1','Potencia y energía'],['ie2','Máxima demanda'],['dim','Dimensiones del local']],
g:[
r=>{const F=r.i(1000,20000,100),A=r.i(5,200,1);return{q:`${F} lm sobre ${A} m². Halla E.`,a:F/A,u:'lux',s:[`= ${n(F/A)} lux`]};},
r=>{const P=r.i(5,200,1),e=r.i(70,160,5);return{q:`Lámpara de ${P} W con eficacia ${e} lm/W. Halla Φ.`,a:P*e,u:'lm',s:[`= ${P*e} lm`]};},
r=>{const E=r.p([100,150,200,300,500]),A=r.i(20,600,5),F=r.i(2000,8000,100),CU=r.i(.4,.8,.05),FM=r.p([.7,.75,.8]);return{q:`E=${E} lux, A=${A} m², Φ=${F} lm por luminaria, CU=${CU}, FM=${FM}. Halla N (redondea arriba).`,a:Math.ceil(E*A/(F*CU*FM)),u:'luminarias',tol:0,s:[`N = ${n(E*A/(F*CU*FM))} → ${Math.ceil(E*A/(F*CU*FM))}`]};},
r=>{const N=r.i(10,500,5),P1=r.i(36,120,2),P2=r.i(10,40,1),h=r.i(1000,5000,100);return{q:`${N} lámparas de ${P1} W se cambian por LED de ${P2} W. Encendidas ${h} h/año. Halla el ahorro en kWh/año.`,a:N*(P1-P2)*h/1000,u:'kWh',s:[`= ${n(N*(P1-P2)*h/1000)} kWh/año`]};},
r=>{const a=r.i(6,12,.5),b=r.i(7,15,.5),E=r.p([300,500]),F=r.p([3600,4000,4400]),CU=r.i(.5,.7,.05),FM=.8,Pa=r.p([72,80]),Pl=r.p([30,36]),h=r.i(1500,3000,100),t=r.i(.5,.9,.05),Cl=r.i(150,400,10);const N=Math.ceil(E*a*b/(F*CU*FM)),ah=N*(Pa-Pl)*h/1000*t;return{q:`Aula de ${a}×${b} m que necesita ${E} lux con luminarias de ${F} lm (CU=${CU}, FM=0.8). Cambiar de fluorescentes de ${Pa} W a LED de ${Pl} W cuesta S/${Cl} por luminaria. Con ${h} h/año y S/${t}/kWh, ¿en cuántos años se recupera la inversión?`,a:N*Cl/ah,u:'años',s:[`N = ${N} luminarias`,`Ahorro = S/ ${n(ah)} por año`,`Recuperación = ${n(N*Cl/ah)} años`]};}
]});
EXT('m21');
SUB('pvi',{t:'Carretera rural: del tráfico al pavimento',
lec:`Sigue el diseño de un tramo de carretera afirmada que se va a pavimentar. Cada nivel usa un tema anterior:

- **Tráfico:** de IMD a ESAL de diseño
- **Subrasante:** CBR y módulo resiliente
- **Pavimento:** número estructural y espesores
- **Geometría:** una curva del trazo
- **Presupuesto:** metrado y costo de la carpeta

Un error en el primer paso arrastra a todos los demás: por eso un buen ingeniero revisa el orden de magnitud en cada etapa.`,
key:['ESAL = IMD_{c}·365·FC·Fd·Fc·factor','M_{r} = 2555·CBR^{0.64}','SN = a_{1}D_{1} + a_{2}m_{2}D_{2} + a_{3}m_{3}D_{3}'],
err:'Saltarse el paso del crecimiento del tráfico: el pavimento falla a la mitad de su vida.',
x:[['trf','Ejes equivalentes'],['sbr','Subrasante'],['pav','Diseño AASHTO'],['hor','Curvas horizontales'],['met','Metrados']],
g:[
r=>{const IMD=r.i(100,2000,10),pc=r.i(.1,.4,.01),fe=r.i(1,4,.1);return{q:`IMD=${IMD} con ${Math.round(pc*100)} % de camiones y factor camión ${fe} EE/vehículo. Halla los EE diarios.`,a:IMD*pc*fe,u:'EE/día',s:[`= ${IMD}·${pc}·${fe} = ${n(IMD*pc*fe)} EE/día`]};},
r=>{const EE=r.i(50,3000,10),rr=r.i(2,6,.5),Nn=r.p([10,15,20]),fd=.5;const FC=((1+rr/100)**Nn-1)/(rr/100),W=EE*365*FC*fd;return{q:`${EE} EE/día totales, crecimiento ${rr} % anual, ${Nn} años, factor direccional 0.5 y un carril por sentido. Halla el ESAL de diseño.`,a:W,u:'EE',s:[`FC = ${n(FC)}`,`ESAL = ${EE}·365·${n(FC)}·0.5 = ${n(W)}`]};},
r=>{const c=r.i(3,20,.5);return{q:`La subrasante tiene CBR=${c} %. Halla M_{r} en psi.`,a:2555*c**.64,u:'psi',s:[`= ${n(2555*c**.64)} psi`]};},
r=>{const a1=.42,D1=r.i(2,4,.5),a2=.14,m2=1,a3=.11,m3=1,D2=r.i(6,10,1),SN=+(a1*D1+a2*D2+a3*r.i(4,12,.5)).toFixed(2);const D3=(SN-a1*D1-a2*m2*D2)/(a3*m3);return{q:`SN requerido ${SN}. Carpeta de ${D1}" (a₁=0.42) y base de ${D2}" (a₂=0.14, m=1). Halla el espesor de subbase (a₃=0.11, m=1) en pulgadas.`,a:Math.max(D3,0),u:'pulg',s:[`D₃ = (${SN} − ${n(a1*D1)} − ${n(a2*D2)})/0.11 = ${n(Math.max(D3,0))}"`]};},
r=>{const L=r.i(2,20,.5),a=r.p([6,6.6,7.2]),e=r.p([.05,.075]),ga=2.35,p=r.i(380,650,10),R=r.i(80,300,10),V=r.i(40,70,5),f=.15;const ec=Math.max(V*V/(127*R)-f,0);const C=L*1000*a*e*ga*p;return{q:`Tramo de ${L} km con carpeta asfáltica de ${a} m de ancho y ${e*100} cm de espesor (γ=2.35 t/m³) a S/${p}/t. Halla el costo de la carpeta. (Revisa además: una curva de R=${R} m a ${V} km/h con f=0.15 necesita peralte ${n(ec*100)} %.)`,a:C,u:'S/',s:[`Volumen = ${n(L*1000*a*e)} m³`,`Peso = ${n(L*1000*a*e*ga)} t`,`Costo = S/ ${n(C)}`]};}
]});
SUB('psr',{t:'Agua y saneamiento rural',
lec:`Un centro poblado de sierra sin agua potable. El proyecto completo sigue la norma técnica de saneamiento rural del MVCS:

- **Población futura:** crecimiento aritmético
- **Demanda:** dotación rural (por ejemplo 50 a 80 L/hab/día según la zona y si hay arrastre hidráulico)
- **Caudales:** Q_{p}, Q_{md} = 1.3Q_{p}, Q_{mh} = 2Q_{p}
- **Captación y línea de conducción:** diámetro por Hazen-Williams
- **Reservorio:** 25 % del consumo diario
- **Saneamiento:** unidades básicas de saneamiento (UBS) con biodigestor o arrastre hidráulico

La sostenibilidad depende también de la JASS (junta de usuarios) que operará el sistema.`,
key:['P_{f} = P_{0}(1 + rt)','Q_{p} = [[P·dot|86400]]','V_{res} = 0.25·Q_{p}·86400'],
err:'Diseñar la línea de conducción con el caudal promedio en vez del máximo diario.',
x:[['pob','Población de diseño'],['fpe','Hazen-Williams'],['res2','Reservorio'],['tse','Tanques sépticos']],
g:[
r=>{const P=r.i(100,3000,10),rr=r.i(.5,3,.1),t=r.p([20]);return{q:`Población actual ${P} hab, crecimiento aritmético ${rr} % anual, 20 años. Halla P_{f}.`,a:P*(1+rr/100*20),u:'hab',s:[`= ${P}(1 + ${rr/100}·20) = ${n(P*(1+rr/100*20))} hab`]};},
r=>{const P=r.i(150,4000,10),d=r.p([50,60,70,80,90,100]);return{q:`P=${P} hab y dotación ${d} L/hab/día. Halla Q_{p} en L/s.`,a:P*d/86400,u:'L/s',s:[`= ${n(P*d/86400)} L/s`]};},
r=>{const Q=r.i(.2,8,.05);return{q:`Q_{p}=${Q} L/s. Halla Q_{md} (1.3) y Q_{mh} (2.0). Escribe Q_{md}.`,a:1.3*Q,u:'L/s',s:[`Q_{md} = ${n(1.3*Q)} L/s; Q_{mh} = ${n(2*Q)} L/s`]};},
r=>{const Q=r.i(.5,8,.05),L=r.i(300,5000,50),H=r.i(10,150,1),C=140;const D=(10.67*L*(Q/1000)**1.852/(C**1.852*H))**(1/4.87);return{q:`Línea de conducción por gravedad: Q_{md}=${Q} L/s, L=${L} m, desnivel disponible ${H} m, C=140. Halla el diámetro teórico en mm.`,a:D*1000,u:'mm',s:[`D = (10.67LQ^{1.852}/(C^{1.852}H))^{1/4.87} = ${n(D*1000)} mm`,`Se elige el diámetro comercial superior`]};},
r=>{const P=r.i(200,2500,10),rr=r.i(.8,2,.1),d=r.p([60,70,80]),hab=r.i(4,6,1),Cu=r.i(2500,4500,100);const Pf=P*(1+rr/100*20),Qp=Pf*d/86400,V=Math.ceil(.25*Qp*86400/1000),N=Math.ceil(Pf/hab);return{q:`Centro poblado de ${P} hab (aritmético ${rr} %, 20 años), dotación ${d} L/hab/día, ${hab} hab por vivienda. Halla el volumen del reservorio (25 %, redondea arriba en m³) y el costo de las UBS a S/${Cu} cada una. Escribe el costo de las UBS.`,a:N*Cu,u:'S/',s:[`P_{f} = ${n(Pf)} hab`,`V = ${V} m³`,`Viviendas = ${N} → S/ ${n(N*Cu)}`]};}
]});
SUB('pmc',{t:'Muro de contención: del suelo al acero',
lec:`Un muro de contención en voladizo para un desnivel en una ladera. El proyecto encadena:

- **Suelo:** ángulo de fricción y peso específico del relleno
- **Empuje:** coeficiente de Rankine K_{a} = (1 − sen φ)/(1 + sen φ)
- **Estabilidad:** volteo (FS ≥ 2), deslizamiento (FS ≥ 1.5)
- **Presión en la base:** excentricidad dentro del tercio central
- **Pantalla:** momento en la base y acero de flexión

El drenaje (lloraderos y filtro) es parte del diseño: un muro sin drenaje recibe además el empuje del agua y puede duplicar la fuerza.`,
key:['K_{a} = [[1 − sen φ|1 + sen φ]]','E_{a} = ½K_{a}γH^{2}','FS_{v} = [[M_{r}|M_{v}]] ≥ 2','A_{s} = [[M_{u}|φf_{y}(d − a/2)]]'],
err:'Olvidar el empuje del agua cuando no hay drenaje.',
x:[['emp','Empuje de tierras'],['flx2','Carga excéntrica en la base'],['fle','Acero de flexión'],['cz1','Presión bajo zapatas']],
g:[
r=>{const f=r.i(25,40,1);return{q:`Relleno con φ=${f}°. Halla K_{a}.`,a:(1-sind(f))/(1+sind(f)),u:'',s:[`K_{a} = ${n((1-sind(f))/(1+sind(f)))}`]};},
r=>{const f=r.i(25,40,1),g=r.i(16,20,.5),H=r.i(2,7,.25);const Ka=(1-sind(f))/(1+sind(f));return{q:`φ=${f}°, γ=${g} kN/m³, H=${H} m. Halla E_{a} por metro.`,a:.5*Ka*g*H*H,u:'kN/m',s:[`K_{a} = ${n(Ka)}`,`E_{a} = ${n(.5*Ka*g*H*H)} kN/m`]};},
r=>{const Ea=r.i(30,250,5),H=r.i(2,7,.25),Mr=r.i(100,1500,10);return{q:`E_{a}=${Ea} kN/m aplicado a H/3 con H=${H} m. M_{r}=${Mr} kN·m/m. Halla FS al volteo.`,a:Mr/(Ea*H/3),u:'',s:[`M_{v} = ${n(Ea*H/3)}`,`FS = ${n(Mr/(Ea*H/3))}`]};},
r=>{const W=r.i(100,600,10),mu=r.i(.45,.6,.01),Ea=r.i(30,250,5);return{q:`Peso vertical total ${W} kN/m, μ=${mu}, E_{a}=${Ea} kN/m. Halla FS al deslizamiento.`,a:mu*W/Ea,u:'',s:[`= ${mu}·${W}/${Ea} = ${n(mu*W/Ea)}`]};},
r=>{const f=r.i(28,36,1),g=r.i(17,19,.5),H=r.i(3,6,.25),t=r.i(.25,.4,.05),fc=210;const Ka=(1-sind(f))/(1+sind(f)),Hp=H-.5,Mu=1.6*Ka*g*Hp**3/6,d=t*100-6,b=100,fy=4200;let As=Mu*1e5/9.81/(.9*fy*.9*d);for(let i=0;i<5;i++){const a=As*fy/(.85*fc*b);As=Mu*1e5/9.81/(.9*fy*(d-a/2));}return{q:`Muro en voladizo de H=${H} m con zapata de 0.5 m (pantalla de ${n(Hp)} m). Relleno drenado: φ=${f}°, γ=${g} kN/m³. Pantalla de ${t*100} cm, d=${n(d)} cm, f'_{c}=210, f_{y}=4200, factor de carga 1.6. Halla el acero vertical en la base de la pantalla por metro.`,a:As,u:'cm²/m',s:[`K_{a} = ${n(Ka)}`,`M_{u} = 1.6·K_{a}γh³/6 = ${n(Mu)} kN·m/m`,`A_{s} = ${n(As)} cm²/m`]};}
]});
