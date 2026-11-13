/* Subtemas adicionales: bases, mecánica y estructuras */
EXT('m01');
SUB('geoan',{t:'Geometría analítica',
lec:`Los planos topográficos y los ejes de una obra son geometría con coordenadas.

- Pendiente entre dos puntos: m = (y_{2} − y_{1})/(x_{2} − x_{1})
- Distancia: d = √(Δx² + Δy²)
- Recta: y = mx + b
- Distancia de un punto (x_{0}, y_{0}) a la recta Ax + By + C = 0: d = |Ax_{0} + By_{0} + C|/√(A² + B²)
- Intersección de dos rectas: igualar sus ecuaciones

**Uso real:** saber a qué distancia queda un poste del eje de una vía, o dónde se cruzan dos ejes de cimentación.`,
key:['m = [[y_{2}−y_{1}|x_{2}−x_{1}]]','d = √{Δx^{2}+Δy^{2}}','d = [[|Ax_{0}+By_{0}+C||√{A^{2}+B^{2}}]]'],
err:'Olvidar el valor absoluto en la distancia punto-recta.',
x:[['pol','Coordenadas de poligonales'],['hor','Ejes de vías'],['tri','Triángulos rectángulos']],
g:[
r=>{const x1=r.i(-20,20,1),y1=r.i(-20,20,1),x2=x1+r.i(1,30,1),y2=r.i(-20,20,1);return{q:`Halla la pendiente entre (${x1}, ${y1}) y (${x2}, ${y2}).`,a:(y2-y1)/(x2-x1),u:'',s:[`m = ${y2-y1}/${x2-x1} = ${n((y2-y1)/(x2-x1))}`]};},
r=>{const x1=r.i(-50,50,1),y1=r.i(-50,50,1),x2=r.i(-50,50,1),y2=r.i(-50,50,1);return{q:`Distancia entre (${x1}, ${y1}) y (${x2}, ${y2}).`,a:Math.hypot(x2-x1,y2-y1),u:'',s:[`d = √(${x2-x1}² + ${y2-y1}²) = ${n(Math.hypot(x2-x1,y2-y1))}`]};},
r=>{const m=r.i(-3,3,.5)||1,b=r.i(-10,10,1),x=r.i(-10,10,1);return{q:`La recta y = ${m}x + ${b}. ¿Cuánto vale y en x=${x}?`,a:m*x+b,u:'',s:[`y = ${m}·${x} + ${b} = ${m*x+b}`]};},
r=>{const A=r.i(1,6,1),B=r.i(-6,6,1)||2,C=r.i(-30,30,1),x=r.i(-20,20,1),y=r.i(-20,20,1);return{q:`Distancia del punto (${x}, ${y}) a la recta ${A}x + ${B}y + ${C} = 0.`,a:Math.abs(A*x+B*y+C)/Math.hypot(A,B),u:'',s:[`= |${A*x+B*y+C}|/√(${A*A+B*B}) = ${n(Math.abs(A*x+B*y+C)/Math.hypot(A,B))}`]};},
r=>{const m1=r.i(-3,3,.5),m2=r.i(-3,3,.5),b1=r.i(-20,20,1),b2=r.i(-20,20,1);const mm=m1===m2?m1+1:m1;const x=(b2-b1)/(mm-m2);return{q:`Halla la abscisa donde se cruzan y = ${mm}x + ${b1} e y = ${m2}x + ${b2}.`,a:x,u:'',s:[`${mm}x + ${b1} = ${m2}x + ${b2}`,`x = ${n(x)}`]};}
]});
SUB('vec3',{t:'Vectores en el espacio',
lec:`Torres atirantadas, cubiertas y tuberías trabajan en 3D. Un vector se escribe F = (F_{x}, F_{y}, F_{z}).

- Magnitud: |F| = √(F_{x}² + F_{y}² + F_{z}²)
- Vector unitario de A a B: u = (B − A)/|B − A|. Una fuerza T a lo largo de un cable es T·u
- Producto punto: A·B = |A||B|cos θ. Sirve para hallar ángulos y proyecciones
- Producto cruz: M = r × F. Da el momento de una fuerza en 3D

El momento respecto a un eje es la proyección de M sobre ese eje.`,
key:['|F| = √{F_{x}^{2}+F_{y}^{2}+F_{z}^{2}}','u = [[B − A||B − A|]]','cos θ = [[A·B||A||B|]]','M = r × F'],
err:'Usar las coordenadas del punto como dirección del cable sin restar el punto de inicio.',
x:[['vec','Extiende los vectores planos'],['esp3','Equilibrio en 3D'],['dib2','Verdadera magnitud']],
g:[
r=>{const a=r.i(-20,20,1),b=r.i(-20,20,1),c=r.i(-20,20,1);return{q:`F = (${a}, ${b}, ${c}) kN. Halla |F|.`,a:Math.hypot(a,b,c),u:'kN',s:[`|F| = ${n(Math.hypot(a,b,c))} kN`]};},
r=>{const x=r.i(1,10,1),y=r.i(1,10,1),z=r.i(1,15,1),T=r.i(5,100,5);const L=Math.hypot(x,y,z);return{q:`Un cable va de (0,0,0) a (${x}, ${y}, ${z}) m con tensión ${T} kN. Halla la componente T_{z}.`,a:T*z/L,u:'kN',s:[`L = ${n(L)} m`,`T_{z} = ${T}·${z}/${n(L)} = ${n(T*z/L)} kN`]};},
r=>{const A=[r.i(-5,5,1),r.i(-5,5,1),r.i(1,5,1)],B=[r.i(-5,5,1),r.i(1,5,1),r.i(-5,5,1)];const d=A[0]*B[0]+A[1]*B[1]+A[2]*B[2];return{q:`Halla el ángulo entre A = (${A.join(', ')}) y B = (${B.join(', ')}).`,a:Math.acos(d/(Math.hypot(...A)*Math.hypot(...B)))*180/PI,u:'°',s:[`A·B = ${d}`,`θ = ${n(Math.acos(d/(Math.hypot(...A)*Math.hypot(...B)))*180/PI)}°`]};},
r=>{const r1=[r.i(-5,5,1),r.i(-5,5,1),r.i(-5,5,1)],F=[r.i(-10,10,1),r.i(-10,10,1),r.i(-10,10,1)];const M=[r1[1]*F[2]-r1[2]*F[1],r1[2]*F[0]-r1[0]*F[2],r1[0]*F[1]-r1[1]*F[0]];return{q:`F = (${F.join(', ')}) kN actúa en r = (${r1.join(', ')}) m. Halla la componente M_{z} del momento respecto al origen.`,a:M[2],u:'kN·m',s:[`M_{z} = xF_{y} − yF_{x} = ${r1[0]}·${F[1]} − ${r1[1]}·${F[0]} = ${M[2]} kN·m`]};},
r=>{const r1=[r.i(-5,5,1),r.i(-5,5,1),r.i(-5,5,1)],F=[r.i(-10,10,1),r.i(-10,10,1),r.i(-10,10,1)];const M=[r1[1]*F[2]-r1[2]*F[1],r1[2]*F[0]-r1[0]*F[2],r1[0]*F[1]-r1[1]*F[0]];return{q:`F = (${F.join(', ')}) kN en r = (${r1.join(', ')}) m. Halla la magnitud del momento respecto al origen.`,a:Math.hypot(...M),u:'kN·m',s:[`M = r × F = (${M.join(', ')})`,`|M| = ${n(Math.hypot(...M))} kN·m`]};}
]});
EXT('m02');
SUB('mvar',{t:'Cálculo en varias variables',
lec:`Un terreno tiene cota z(x, y): depende de dos variables. Aparecen nuevas herramientas:

- **Derivada parcial** ∂z/∂x: pendiente en la dirección x, dejando y fija
- **Gradiente** ∇z = (∂z/∂x, ∂z/∂y): apunta hacia donde el terreno sube más rápido. Su magnitud es la pendiente máxima
- **Integral doble** ∫∫z dA: volumen bajo una superficie, como el volumen de una excavación

Para un plano z = a + bx + cy sobre un rectángulo de L_{x}·L_{y}: V = L_{x}L_{y}(a + bL_{x}/2 + cL_{y}/2). Es el área por la altura media.

El agua corre en la dirección contraria al gradiente: por eso el gradiente define el drenaje de una plataforma.`,
key:['∇z = ([[∂z|∂x]], [[∂z|∂y]])','|∇z| = √{z_{x}^{2}+z_{y}^{2}}','V = ∫∫z dA'],
err:'Calcular la pendiente máxima sumando las pendientes en x e y en vez de componerlas.',
x:[['der','Derivadas de una variable'],['int','Integrales simples'],['cn','Curvas de nivel']],
g:[
r=>{const a=r.i(1,5,1),b=r.i(1,5,1),x=r.i(1,4,1),y=r.i(1,4,1);return{q:`z = ${a}x²y + ${b}y³. Halla ∂z/∂x en (${x}, ${y}).`,a:2*a*x*y,u:'',s:[`∂z/∂x = ${2*a}xy = ${2*a*x*y}`]};},
r=>{const b=r.i(.5,8,.5),c=r.i(.5,8,.5);return{q:`Una plataforma tiene z = 100 + ${b/100}x + ${c/100}y (m). Halla la pendiente máxima en %.`,a:Math.hypot(b,c),u:'%',s:[`|∇z| = √(${b/100}² + ${c/100}²) = ${n(Math.hypot(b,c))} %`]};},
r=>{const b=r.i(.5,8,.5),c=r.i(.5,8,.5);return{q:`z = 100 + ${b/100}x + ${c/100}y. ¿Qué ángulo, medido desde el eje x, tiene la dirección de máxima subida?`,a:atand(c/b),u:'°',s:[`θ = arctan(${c}/${b}) = ${n(atand(c/b))}°`]};},
r=>{const a=r.i(1,4,.1),b=r.i(.01,.1,.01),c=r.i(.01,.1,.01),Lx=r.i(10,60,5),Ly=r.i(10,40,5);return{q:`Excavación sobre ${Lx}×${Ly} m con profundidad z = ${a} + ${b}x + ${c}y (m). Halla el volumen.`,a:Lx*Ly*(a+b*Lx/2+c*Ly/2),u:'m³',s:[`Profundidad media = ${n(a+b*Lx/2+c*Ly/2)} m`,`V = ${n(Lx*Ly*(a+b*Lx/2+c*Ly/2))} m³`]};},
r=>{const c=r.i(2,10,.5),a=r.i(.001,.01,.001),b=r.i(.001,.01,.001);return{q:`Un montículo tiene z = ${c} − ${a}x² − ${b}y² (m), sobre el terreno z ≥ 0. Halla su volumen (V = πc²/(2√(ab))).`,a:PI*c*c/(2*sq(a*b)),u:'m³',s:[`V = π·${c}²/(2√(${a}·${b})) = ${n(PI*c*c/(2*sq(a*b)))} m³`]};}
]});
SUB('ser',{t:'Aproximaciones y series',
lec:`Muchas fórmulas de ingeniería son aproximaciones de una serie de Taylor:

- e^{x} ≈ 1 + x + x²/2
- √(1 + x) ≈ 1 + x/2 (si x es pequeño)
- sen x ≈ x y tan x ≈ x para ángulos pequeños en radianes
- ln(1 + x) ≈ x

Ejemplos: la longitud de un cable con flecha f es L(1 + 8f²/(3L²)); la corrección por pendiente de una cinta es −h²/(2L). Ambas vienen de √(1 + x) ≈ 1 + x/2.

## Series de Fourier
Una señal periódica se descompone en senos. Una onda cuadrada de amplitud A tiene armónicos impares con amplitud 4A/(nπ). Así se analiza la vibración de máquinas.`,
key:['e^{x} ≈ 1 + x + [[x^{2}|2]]','√{1+x} ≈ 1 + [[x|2]]','sen x ≈ x','a_{n} = [[4A|nπ]]'],
err:'Usar la aproximación sen x ≈ x con el ángulo en grados.',
x:[['cin','Corrección por pendiente'],['cab','Longitud de cables'],['vf','Vibraciones armónicas']],
g:[
r=>{const x=r.i(.01,.3,.01);return{q:`Aproxima e^{${x}} con 1 + x + x²/2.`,a:1+x+x*x/2,u:'',tol:.0005,s:[`= ${n(1+x+x*x/2,6)} (exacto ${n(Math.exp(x),6)})`]};},
r=>{const x=r.i(.001,.2,.001);return{q:`Aproxima √(1 + ${x}) con 1 + x/2.`,a:1+x/2,u:'',tol:.0005,s:[`= ${n(1+x/2,6)} (exacto ${n(sq(1+x),6)})`]};},
r=>{const d=r.i(1,30,1);const xr=d*PI/180;return{q:`¿Qué error en % comete sen x ≈ x para x=${d}°?`,a:(xr-Math.sin(xr))/Math.sin(xr)*100,u:'%',s:[`x = ${n(xr,5)} rad; sen x = ${n(Math.sin(xr),5)}`,`Error = ${n((xr-Math.sin(xr))/Math.sin(xr)*100)} %`]};},
r=>{const L=r.i(20,300,10),f=r.i(.5,20,.5);return{q:`Cable de luz ${L} m con flecha ${f} m. Halla su longitud aproximada L(1 + 8f²/(3L²)).`,a:L*(1+8*f*f/(3*L*L)),u:'m',tol:.0001,s:[`= ${n(L*(1+8*f*f/(3*L*L)),7)} m`]};},
r=>{const A=r.i(1,20,.5),nn=r.p([1,3,5,7,9]);return{q:`Onda cuadrada de amplitud ${A} kN. Halla la amplitud del armónico n=${nn}.`,a:4*A/(nn*PI),u:'kN',s:[`a = 4·${A}/(${nn}π) = ${n(4*A/(nn*PI))} kN`]};}
]});
EXT('m03');
SUB('reg',{t:'Regresión y correlación',
lec:`A menudo quieres una relación entre dos variables medidas: resistencia y edad del concreto, caudal y área de cuenca. La **regresión lineal** ajusta la recta y = a + bx que mejor representa los datos.

- b = S_{xy}/S_{xx}, con S_{xy} = Σ(x − x̄)(y − ȳ) y S_{xx} = Σ(x − x̄)²
- a = ȳ − b·x̄
- Coeficiente de correlación: r = S_{xy}/√(S_{xx}S_{yy}). Cerca de ±1, la relación lineal es fuerte

Una correlación alta no prueba causa. Y la recta solo vale dentro del rango de los datos: extrapolar es arriesgado.`,
key:['b = [[S_{xy}|S_{xx}]]','a = ȳ − bx̄','r = [[S_{xy}|√{S_{xx}S_{yy}}]]'],
err:'Usar la recta fuera del rango de los datos medidos.',
x:[['est','Media y desviación'],['spt','Las correlaciones del SPT salen así'],['gum','Ajuste de distribuciones']],
g:[
r=>{const x=[1,2,3,4,5],b=r.i(.5,5,.5),a=r.i(-5,10,1),e=[r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5)];const y=x.map((v,i)=>+(a+b*v+e[i]).toFixed(1));const ym=y.reduce((s,v)=>s+v)/5;return{q:`Datos y: ${y.join(', ')} para x = 1 a 5. Halla ȳ.`,a:ym,u:'',s:[`ȳ = ${n(ym)}`]};},
r=>{const x=[1,2,3,4,5],b=r.i(.5,5,.5),a=r.i(-5,10,1),e=[r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5)];const y=x.map((v,i)=>+(a+b*v+e[i]).toFixed(1));const ym=y.reduce((s,v)=>s+v)/5,Sxy=x.reduce((s,v,i)=>s+(v-3)*(y[i]-ym),0);return{q:`x = 1, 2, 3, 4, 5 e y = ${y.join(', ')}. Halla la pendiente b.`,a:Sxy/10,u:'',s:[`S_{xx} = 10, S_{xy} = ${n(Sxy)}`,`b = ${n(Sxy/10)}`]};},
r=>{const x=[1,2,3,4,5],b=r.i(.5,5,.5),a=r.i(-5,10,1),e=[r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5)];const y=x.map((v,i)=>+(a+b*v+e[i]).toFixed(1));const ym=y.reduce((s,v)=>s+v)/5,Sxy=x.reduce((s,v,i)=>s+(v-3)*(y[i]-ym),0),bb=Sxy/10;return{q:`x = 1 a 5 e y = ${y.join(', ')}. Halla la ordenada al origen a.`,a:ym-bb*3,u:'',s:[`b = ${n(bb)}`,`a = ȳ − b·3 = ${n(ym-bb*3)}`]};},
r=>{const x=[1,2,3,4,5],b=r.i(.5,5,.5),a=r.i(-5,10,1),e=[r.i(-2,2,.5),r.i(-2,2,.5),r.i(-2,2,.5),r.i(-2,2,.5),r.i(-2,2,.5)];const y=x.map((v,i)=>+(a+b*v+e[i]).toFixed(1));const ym=y.reduce((s,v)=>s+v)/5,Sxy=x.reduce((s,v,i)=>s+(v-3)*(y[i]-ym),0),Syy=y.reduce((s,v)=>s+(v-ym)**2,0);return{q:`x = 1 a 5 e y = ${y.join(', ')}. Halla r.`,a:Sxy/sq(10*Syy),u:'',s:[`S_{xy} = ${n(Sxy)}, S_{yy} = ${n(Syy)}`,`r = ${n(Sxy/sq(10*Syy))}`]};},
r=>{const d=[3,7,14,28],k=r.i(20,40,1),c=r.i(60,120,1);const y=d.map(t=>+(c+k*Math.log(t)).toFixed(0));const x=d.map(t=>Math.log(t)),xm=x.reduce((s,v)=>s+v)/4,ym=y.reduce((s,v)=>s+v)/4;const b=x.reduce((s,v,i)=>s+(v-xm)*(y[i]-ym),0)/x.reduce((s,v)=>s+(v-xm)**2,0),a=ym-b*xm;const t=r.p([56,90]);return{q:`Resistencias a 3, 7, 14 y 28 días: ${y.join(', ')} kg/cm². Ajusta f = a + b·ln(t) y estima f a ${t} días.`,a:a+b*Math.log(t),u:'kg/cm²',s:[`Con x = ln t: b = ${n(b)}, a = ${n(a)}`,`f(${t}) = ${n(a+b*Math.log(t))} kg/cm² (extrapolación: úsala con cuidado)`]};}
]});
SUB('conf',{t:'Intervalos de confianza y muestreo',
lec:`Con pocas muestras no conoces el valor real, solo una estimación. El **intervalo de confianza** dice dónde está probablemente.

- Media: x̄ ± t·s/√n, con t de la distribución t de Student (por ejemplo, t ≈ 2.78 para n = 5 al 95 %)
- Con muchos datos se usa z = 1.96 al 95 %

## Tamaño de muestra
Para estimar una media con error máximo E: n = (z·s/E)²

Más muestras reducen el error, pero con raíz cuadrada: para la mitad del error necesitas cuatro veces más muestras.

Así se decide cuántos ensayos de suelos o cuántas probetas tomar.`,
key:['IC = x̄ ± t[[s|√{n}]]','n = ([[z·s|E]])^{2}','z_{95%} = 1.96'],
err:'Dar un resultado con muchos decimales y sin su incertidumbre.',
x:[['est','Media y desviación'],['cal','Muestreo de concreto'],['pci','Muestreo de pavimentos']],
g:[
r=>{const s=r.i(5,40,1),nn=r.i(3,50,1);return{q:`s=${s} y n=${nn}. Halla el error estándar s/√n.`,a:s/sq(nn),u:'',s:[`= ${n(s/sq(nn))}`]};},
r=>{const m=r.i(150,350,1),s=r.i(5,40,1),nn=r.i(30,100,5);return{q:`Media ${m}, s=${s}, n=${nn} (z=1.96). Halla el límite superior del IC al 95 %.`,a:m+1.96*s/sq(nn),u:'',s:[`= ${m} + 1.96·${s}/√${nn} = ${n(m+1.96*s/sq(nn))}`]};},
r=>{const m=r.i(150,350,1),s=r.i(5,40,1),t=r.p([[3,4.303],[5,2.776],[10,2.262]]);return{q:`Con n=${t[0]} probetas: media ${m} kg/cm², s=${s}, t=${t[1]}. Halla el límite inferior del IC al 95 %.`,a:m-t[1]*s/sq(t[0]),u:'kg/cm²',s:[`= ${m} − ${t[1]}·${s}/√${t[0]} = ${n(m-t[1]*s/sq(t[0]))}`]};},
r=>{const s=r.i(5,40,1),E=r.i(1,10,.5);return{q:`s=${s}, error deseado ${E}, z=1.96. Halla n (redondea arriba).`,a:Math.ceil((1.96*s/E)**2),u:'',tol:0,s:[`n = (1.96·${s}/${E})² = ${n((1.96*s/E)**2)} → ${Math.ceil((1.96*s/E)**2)}`]};},
r=>{const nn=r.i(4,40,1),f=r.p([2,3]);return{q:`Con ${nn} ensayos el error es E. ¿Cuántos ensayos necesitas para un error ${f} veces menor?`,a:nn*f*f,u:'',tol:0,s:[`n ∝ 1/E² → ${nn}·${f}² = ${nn*f*f}`]};}
]});
EXT('m04');
SUB('calor',{t:'Transferencia de calor en edificios',
lec:`El calor atraviesa muros y techos por **conducción**: q = k·A·ΔT/L, con k la conductividad del material.

## Resistencia térmica
- De una capa: R = L/k (m²·K/W)
- Capas en serie: R_{total} = ΣR_{i} + resistencias superficiales
- Transmitancia: U = 1/R_{total}
- Pérdida o ganancia de calor: Q = U·A·ΔT

Valores de k (W/m·K): concreto 1.6–2.0, ladrillo 0.7–0.9, madera 0.13, poliestireno 0.035.

En la sierra peruana el problema es el frío nocturno: aislar techos y muros reduce el friaje dentro de las viviendas. La norma EM.110 trata el confort térmico.`,
key:['q = [[kAΔT|L]]','R = [[L|k]]','U = [[1|ΣR]]','Q = UAΔT'],
err:'Sumar las conductividades de las capas: lo que se suma en serie son las resistencias.',
x:[['qm3','Dilatación térmica'],['ene','Energía y potencia'],['tv','Los techos verdes aíslan']],
g:[
r=>{const k=r.p([.035,.13,.8,1.7]),L=r.i(.02,.3,.01);return{q:`Capa de ${L*100} cm con k=${k} W/m·K. Halla R.`,a:L/k,u:'m²K/W',s:[`R = ${L}/${k} = ${n(L/k)}`]};},
r=>{const k=r.p([.13,.8,1.7]),L=r.i(.05,.3,.01),A=r.i(5,100,1),dT=r.i(5,25,1);return{q:`Muro de ${A} m², ${L*100} cm de espesor, k=${k}, ΔT=${dT} °C. Halla q (sin resistencias superficiales).`,a:k*A*dT/L,u:'W',s:[`q = ${k}·${A}·${dT}/${L} = ${n(k*A*dT/L)} W`]};},
r=>{const L1=r.i(.1,.25,.01),L2=r.i(.02,.08,.01),Rs=.17;const R=L1/.8+L2/.035+Rs;return{q:`Muro de ladrillo de ${L1*100} cm (k=0.8) con ${L2*100} cm de poliestireno (k=0.035) y resistencias superficiales 0.17 m²K/W. Halla U.`,a:1/R,u:'W/m²K',s:[`R = ${n(L1/.8)} + ${n(L2/.035)} + 0.17 = ${n(R)}`,`U = ${n(1/R)} W/m²K`]};},
r=>{const U=r.i(.3,4,.1),A=r.i(10,200,5),dT=r.i(5,25,1),h=r.i(4,12,1);return{q:`U=${U}, A=${A} m², ΔT=${dT} °C durante ${h} h. ¿Cuántos kWh se pierden?`,a:U*A*dT*h/1000,u:'kWh',s:[`Q = ${n(U*A*dT)} W`,`E = ${n(U*A*dT*h/1000)} kWh`]};},
r=>{const A=r.i(40,150,5),L=.12,dT=r.i(10,20,1),La=r.p([.03,.05,.08]),h=r.i(8,12,1),d=r.i(60,150,10),t=r.i(.5,.8,.05);const U1=1/(L/1.7+.17),U2=1/(L/1.7+La/.035+.17);const ah=(U1-U2)*A*dT*h*d/1000*t;return{q:`Techo de concreto de 12 cm (k=1.7) y ${A} m², ΔT=${dT} °C durante ${h} h por noche, ${d} noches al año. Si se agregan ${La*100} cm de poliestireno, ¿cuánto se ahorra al año en calefacción a S/${t}/kWh? (R_{s}=0.17)`,a:ah,u:'S/',s:[`U antes = ${n(U1)}, después = ${n(U2)}`,`Ahorro = ${n((U1-U2)*A*dT*h*d/1000)} kWh`,`= S/ ${n(ah)}`]};}
]});
SUB('ondas',{t:'Ondas y acústica',
lec:`El sonido es una onda de presión. Su frecuencia f, longitud λ y velocidad c (≈ 343 m/s en aire) cumplen c = λf.

## Decibeles
- Nivel sonoro: L = 10 log(I/I_{0})
- Suma de fuentes: L = 10 log(Σ10^{L_{i}/10}). Dos fuentes iguales suman 3 dB, no el doble
- Al alejarse de una fuente puntual: ΔL = 20 log(r_{2}/r_{1}); al duplicar la distancia baja 6 dB

## Aislamiento (ley de masa)
TL ≈ 20 log(m·f) − 47 dB, con m la masa por m² del muro. Duplicar la masa gana unos 6 dB.

En obra, el ruido de maquinaria tiene límites municipales y de seguridad (85 dB por 8 horas).`,
key:['c = λf','L = 10 log Σ10^{L_{i}/10}','ΔL = 20 log[[r_{2}|r_{1}]]','TL ≈ 20 log(mf) − 47'],
err:'Sumar decibeles aritméticamente.',
x:[['osc','Ondas y frecuencia'],['sis2','Las ondas sísmicas'],['seg','Ruido y salud ocupacional']],
g:[
r=>{const f=r.i(50,8000,10);return{q:`Sonido de ${f} Hz en aire (c=343 m/s). Halla λ.`,a:343/f,u:'m',s:[`λ = 343/${f} = ${n(343/f)} m`]};},
r=>{const L1=r.i(60,100,1),L2=r.i(60,100,1);return{q:`Dos máquinas de ${L1} y ${L2} dB. Halla el nivel combinado.`,a:10*Math.log10(10**(L1/10)+10**(L2/10)),u:'dB',s:[`= 10 log(10^{${L1/10}} + 10^{${L2/10}}) = ${n(10*Math.log10(10**(L1/10)+10**(L2/10)))} dB`]};},
r=>{const L=r.i(80,110,1),r1=r.i(1,10,1),r2=r.i(15,200,5);return{q:`Una fuente da ${L} dB a ${r1} m. ¿Cuánto da a ${r2} m?`,a:L-20*Math.log10(r2/r1),u:'dB',s:[`= ${L} − 20 log(${r2}/${r1}) = ${n(L-20*Math.log10(r2/r1))} dB`]};},
r=>{const m=r.i(20,500,10),f=r.p([125,250,500,1000,2000]);return{q:`Muro de ${m} kg/m² a ${f} Hz. Halla TL con la ley de masa.`,a:20*Math.log10(m*f)-47,u:'dB',s:[`TL = 20 log(${m*f}) − 47 = ${n(20*Math.log10(m*f)-47)} dB`]};},
r=>{const L=r.i(90,110,1),r1=1,lim=r.p([55,60,65,70]);const d=10**((L-lim)/20);return{q:`Un compresor da ${L} dB a 1 m. ¿A qué distancia se cumple el límite vecinal de ${lim} dB (sin barreras)?`,a:d,u:'m',s:[`20 log(r) = ${L} − ${lim}`,`r = 10^{${n((L-lim)/20)}} = ${n(d)} m`]};}
]});
EXT('m05');
SUB('cab',{t:'Cables',
lec:`Un cable solo resiste tensión y toma la forma que le dan las cargas.

## Carga uniforme en la horizontal (cable parabólico)
Con luz L y flecha f, apoyos al mismo nivel:
- Componente horizontal: H = wL²/(8f)
- Reacción vertical: V = wL/2
- Tensión máxima (en los apoyos): T_{máx} = √(H² + V²)
- Longitud: S ≈ L[1 + (8/3)(f/L)²]

Observa la analogía: H·f = wL²/8, el momento de una viga simple. El cable resiste el momento con una fuerza por un brazo.

Puentes colgantes, cables de teleférico y líneas eléctricas se diseñan así.`,
key:['H = [[wL^{2}|8f]]','V = [[wL|2]]','T_{máx} = √{H^{2}+V^{2}}','S ≈ L[1 + [[8|3]]([[f|L]])^{2}]'],
err:'Pensar que un cable más tenso (menos flecha) es más seguro: la tensión se dispara.',
x:[['par','Equilibrio de un punto colgado'],['vm','H·f es el momento de viga'],['arc','El arco es el cable invertido']],
g:[
r=>{const w=r.i(.5,20,.5),L=r.i(20,300,10),f=r.i(1,30,.5);return{q:`Cable con w=${w} kN/m, L=${L} m, f=${f} m. Halla H.`,a:w*L*L/(8*f),u:'kN',s:[`H = ${n(w*L*L/(8*f))} kN`]};},
r=>{const w=r.i(.5,20,.5),L=r.i(20,300,10),f=r.i(1,30,.5);const H=w*L*L/(8*f),V=w*L/2;return{q:`w=${w} kN/m, L=${L} m, f=${f} m. Halla T_{máx}.`,a:Math.hypot(H,V),u:'kN',s:[`H = ${n(H)}, V = ${n(V)}`,`T = ${n(Math.hypot(H,V))} kN`]};},
r=>{const L=r.i(20,300,10),f=r.i(1,30,.5);return{q:`L=${L} m y f=${f} m. Halla la longitud del cable.`,a:L*(1+8/3*(f/L)**2),u:'m',tol:.0005,s:[`S = ${n(L*(1+8/3*(f/L)**2),6)} m`]};},
r=>{const w=r.i(.5,10,.5),L=r.i(20,200,10),T=Math.round(w*L/2*r.i(1.2,4,.1)/10)*10;let f=w*L*L/(8*sq(T*T-(w*L/2)**2));return{q:`Un cable de w=${w} kN/m y L=${L} m tiene T_{máx} admisible ${T} kN. ¿Qué flecha mínima necesita?`,a:isFinite(f)?f:0,u:'m',s:[`H = √(T² − V²) = ${n(sq(T*T-(w*L/2)**2))} kN`,`f = wL²/(8H) = ${n(f)} m`]};},
r=>{const w=r.i(1,8,.5),L=r.i(50,200,10),f=r.i(3,20,1),A=r.p([5,10,15,20]),fy=r.p([1100,1300]);const T=Math.hypot(w*L*L/(8*f),w*L/2);return{q:`Cable de acero de alta resistencia (esfuerzo admisible ${fy} MPa), w=${w} kN/m, L=${L} m, f=${f} m. ¿Qué área mínima necesita en cm²?`,a:T*1000/(fy*100),u:'cm²',s:[`T_{máx} = ${n(T)} kN`,`A = T/σ = ${n(T*1000/(fy*100))} cm²`]};}
]});
SUB('esp3',{t:'Equilibrio en el espacio',
lec:`En 3D hay seis ecuaciones de equilibrio: ΣF_{x} = ΣF_{y} = ΣF_{z} = 0 y ΣM_{x} = ΣM_{y} = ΣM_{z} = 0.

## Método para cables y puntales
- Escribe cada fuerza como magnitud × vector unitario (de las coordenadas)
- Suma por componentes y resuelve

## Trípode simétrico
Tres patas iguales que llegan a un punto a altura h desde una circunferencia de radio r: cada una lleva F = W/(3 sen θ), con sen θ = h/√(h² + r²).

Torres atirantadas, cimbras y grúas se analizan así. Siempre dibuja el diagrama de cuerpo libre en 3D antes de escribir ecuaciones.`,
key:['ΣF_{x} = ΣF_{y} = ΣF_{z} = 0','F = T·u','F_{pata} = [[W|3 sen θ]]'],
err:'Proyectar mal: el ángulo con la horizontal no es el ángulo con cada eje.',
x:[['par','Equilibrio en el plano'],['vec3','Vectores en 3D'],['cab','Cables']],
g:[
r=>{const h=r.i(1,6,.25),rr=r.i(.5,4,.25),W=r.i(1,50,1);const s=h/Math.hypot(h,rr);return{q:`Trípode simétrico de altura ${h} m y patas que llegan a una circunferencia de radio ${rr} m. Carga ${W} kN. Halla la fuerza en cada pata.`,a:W/(3*s),u:'kN',s:[`sen θ = ${n(s)}`,`F = ${W}/(3·${n(s)}) = ${n(W/(3*s))} kN`]};},
r=>{const x=r.i(1,8,1),y=r.i(1,8,1),z=r.i(2,12,1),T=r.i(5,80,5);const L=Math.hypot(x,y,z);return{q:`Cable de (0,0,0) a (${x},${y},${z}) m con T=${T} kN. Halla T_{x}.`,a:T*x/L,u:'kN',s:[`T_{x} = ${T}·${x}/${n(L)} = ${n(T*x/L)} kN`]};},
r=>{const H=r.i(10,60,1),d=r.i(5,40,1),P=r.i(5,50,1);const L=Math.hypot(H,d);return{q:`Un mástil de ${H} m recibe una fuerza horizontal ${P} kN en la punta y la equilibra un viento (cable) anclado a ${d} m de la base. Halla la tensión del cable.`,a:P*L/d,u:'kN',s:[`T_{h} = P → T = P·L/d = ${n(P*L/d)} kN`,`L = ${n(L)} m`]};},
r=>{const H=r.i(10,60,1),d=r.i(5,40,1),P=r.i(5,50,1);return{q:`Mismo esquema: mástil ${H} m, fuerza ${P} kN, cable anclado a ${d} m. Halla la compresión adicional en el mástil.`,a:P*H/d,u:'kN',s:[`T_{v} = P·H/d = ${n(P*H/d)} kN`]};},
r=>{const W=r.i(10,100,5),a=r.i(1,4,.5),h=r.i(2,6,.5);const A=[-a,0,h],B=[a/2,a*sq(3)/2,h],C=[a/2,-a*sq(3)/2,h];const T=W/(3*h/Math.hypot(a,h));return{q:`Un peso ${W} kN cuelga del origen con tres cables que llegan a (${n(-a)}, 0, ${h}), (${n(a/2)}, ${n(a*sq(3)/2)}, ${h}) y (${n(a/2)}, ${n(-a*sq(3)/2)}, ${h}). Halla la tensión en cada cable.`,a:T,u:'kN',s:[`Por simetría las tres son iguales`,`Cada una: T·h/L = W/3, L = ${n(Math.hypot(a,h))} m`,`T = ${n(T)} kN`]};}
]});
EXT('m06');
SUB('tci',{t:'Recipientes y tanques',
lec:`Tuberías, tanques y silos con paredes delgadas (t < r/10) soportan presión interna con esfuerzos simples:

- **Anular (circunferencial):** σ_{θ} = p·r/t. Es el mayor: por eso las tuberías revientan a lo largo
- **Longitudinal:** σ_{L} = p·r/(2t)

## Tanques de agua de concreto
A una profundidad h, p = γ_{w}h. La pared circular trabaja como un anillo en tensión: T = p·r por metro de altura. El acero horizontal necesario es A_{s} = T/f_{s}, con un esfuerzo bajo para controlar fisuras.`,
key:['σ_{θ} = [[pr|t]]','σ_{L} = [[pr|2t]]','T = γ_{w}h·r','A_{s} = [[T|f_{s}]]'],
err:'Usar el diámetro en vez del radio.',
x:[['fhi','Presión hidrostática'],['res2','Reservorios'],['axi','Esfuerzo axial']],
g:[
r=>{const p=r.i(2,40,1),D=r.i(10,200,5),t=r.i(.3,2,.1);return{q:`Tubería de D=${D} cm, t=${t} cm, p=${p} kg/cm². Halla σ_{θ}.`,a:p*D/2/t,u:'kg/cm²',s:[`σ = p·r/t = ${p}·${D/2}/${t} = ${n(p*D/2/t)} kg/cm²`]};},
r=>{const p=r.i(2,40,1),D=r.i(10,200,5),t=r.i(.3,2,.1);return{q:`Misma idea: D=${D} cm, t=${t} cm, p=${p} kg/cm². Halla σ_{L}.`,a:p*D/4/t,u:'kg/cm²',s:[`σ_{L} = ${n(p*D/4/t)} kg/cm²`]};},
r=>{const p=r.i(2,40,1),D=r.i(10,200,5),s=r.p([1000,1400,1500]);return{q:`D=${D} cm, p=${p} kg/cm², esfuerzo admisible ${s} kg/cm². Halla t mínimo.`,a:p*D/2/s,u:'cm',s:[`t = pr/σ = ${n(p*D/2/s)} cm`]};},
r=>{const h=r.i(1,8,.25),R=r.i(2,15,.5);return{q:`Tanque circular de radio ${R} m. Halla la tensión anular por metro a ${h} m de profundidad.`,a:h*R,u:'t/m',s:[`T = γ_{w}hr = 1·${h}·${R} = ${n(h*R)} t/m`]};},
r=>{const H=r.i(2,8,.25),R=r.i(3,12,.5),fs=r.p([1400,1500,1700]);const T=H*R*1000;return{q:`Tanque de radio ${R} m y ${H} m de agua. Con f_{s}=${fs} kg/cm², halla el acero anular por metro en el fondo.`,a:T/fs,u:'cm²/m',s:[`T = ${n(T)} kg/m`,`A_{s} = ${n(T/fs)} cm²/m (repartido en ambas caras)`]};}
]});
SUB('ter',{t:'Esfuerzos térmicos y por montaje',
lec:`Si un elemento no puede dilatarse libremente, aparece un esfuerzo aunque no tenga carga.

- Totalmente restringido: σ = E·α·ΔT
- Con una holgura δ_{0}: primero se cierra la holgura y después aparece esfuerzo: σ = E(αΔT·L − δ_{0})/L, si αΔT·L > δ_{0}
- Fuerza: F = σ·A

Lo mismo pasa por **errores de montaje**: una barra fabricada más corta que el espacio debe estirarse para colocarla y queda tensionada.

Rieles, tuberías empotradas y puentes integrales se diseñan considerando estos esfuerzos.`,
key:['σ = EαΔT','σ = [[E(αΔTL − δ_{0})|L]]','F = σA'],
err:'Calcular el esfuerzo aunque la holgura no se cierre.',
x:[['qm3','Dilatación térmica'],['axi','Hooke'],['pu4','Juntas de puentes']],
g:[
r=>{const E=r.p([200000,25000,70000]),a=r.p([12,10,23]),dT=r.i(10,60,1);return{q:`Barra restringida: E=${E} MPa, α=${a}×10⁻⁶, ΔT=${dT} °C. Halla σ.`,a:E*a*1e-6*dT,u:'MPa',s:[`σ = ${n(E*a*1e-6*dT)} MPa`]};},
r=>{const s=r.i(10,200,1),A=r.i(5,100,1);return{q:`σ=${s} MPa en una barra de ${A} cm². Halla la fuerza.`,a:s*A/10,u:'kN',s:[`F = ${s}·${A*100} mm² = ${n(s*A/10)} kN`]};},
r=>{const L=r.i(5,30,1),dT=r.i(20,60,1),d0=r.i(1,6,.5);const dl=12e-6*L*dT*1000;return{q:`Riel de acero de ${L} m (α=12×10⁻⁶), ΔT=${dT} °C y holgura ${d0} mm. ¿Cuánto se alarga libre? (luego compara con la holgura)`,a:dl,u:'mm',s:[`ΔL = ${n(dl)} mm ${dl>d0?'> holgura: aparece esfuerzo':'≤ holgura: no hay esfuerzo'}`]};},
r=>{const L=r.i(5,30,1),dT=r.i(30,60,1),d0=r.i(.5,3,.5);const dl=12e-6*L*dT*1000,s=Math.max(200000*(dl-d0)/(L*1000),0);return{q:`Riel de acero (E=200 000 MPa, α=12×10⁻⁶) de ${L} m, ΔT=${dT} °C, holgura ${d0} mm. Halla σ.`,a:s,u:'MPa',s:[`ΔL libre = ${n(dl)} mm`,`σ = E(ΔL − δ₀)/L = ${n(s)} MPa`]};},
r=>{const L=r.i(2,6,.5),e=r.i(.5,3,.5),A=r.i(5,30,1);const s=200000*e/(L*1000);return{q:`Una diagonal de acero se fabricó ${e} mm más corta que el espacio de ${L} m. Se fuerza su montaje. Halla la fuerza que queda (A=${A} cm²).`,a:s*A/10,u:'kN',s:[`σ = E·δ/L = ${n(s)} MPa`,`F = ${n(s*A/10)} kN`]};}
]});
SUB('cmp',{t:'Vigas de dos materiales',
lec:`Si una viga combina materiales (madera con platinas de acero, concreto con acero), se usa la **sección transformada**: se reemplaza un material por el otro multiplicando su ancho por n = E_{2}/E_{1}.

- Se calcula el eje neutro y la inercia de la sección transformada
- Esfuerzo en el material base: σ_{1} = M·y/I_{t}
- Esfuerzo en el material transformado: σ_{2} = n·M·y/I_{t}

Así funcionan las **vigas compuestas** de acero y losa de concreto unidas con conectores: la losa trabaja como ala de la viga de acero y la sección es mucho más rígida.`,
key:['n = [[E_{2}|E_{1}]]','b_{t} = n·b','σ_{1} = [[My|I_{t}]]','σ_{2} = n[[My|I_{t}]]'],
err:'Transformar el ancho en la dirección equivocada: se multiplica el ancho, no la altura.',
x:[['cen','Inercia y ejes paralelos'],['flx','Esfuerzo por flexión'],['axi','Sección transformada en columnas']],
g:[
r=>{const E1=r.i(70000,160000,2500),E2=r.p([2e6,2.1e6]);return{q:`Madera de E=${E1} kg/cm² reforzada con acero (E=${E2}). Halla n.`,a:E2/E1,u:'',s:[`n = ${n(E2/E1)}`]};},
r=>{const nn=r.i(10,21,1),b=r.i(5,20,1);return{q:`Platina de ${b} cm de ancho con n=${nn}. Halla su ancho transformado a madera.`,a:nn*b,u:'cm',s:[`= ${nn*b} cm`]};},
r=>{const b=r.i(8,15,1),h=r.i(20,40,2),bp=b,tp=r.p([.6,.8,1]),nn=r.p([16,21]);const I=b*h**3/12+nn*2*(bp*tp**3/12+bp*tp*(h/2+tp/2)**2);return{q:`Viga de madera ${b}×${h} cm con platinas de acero de ${bp}×${tp} cm arriba y abajo, n=${nn}. Halla I transformada.`,a:I,u:'cm⁴',s:[`Madera: ${n(b*h**3/12)} cm⁴`,`Platinas: ${n(nn*2*(bp*tp**3/12+bp*tp*(h/2+tp/2)**2))} cm⁴`,`I_{t} = ${n(I,6)} cm⁴`]};},
r=>{const b=r.i(8,15,1),h=r.i(20,40,2),tp=r.p([.6,.8,1]),nn=r.p([16,21]),M=r.i(1,8,.5);const I=b*h**3/12+nn*2*(b*tp**3/12+b*tp*(h/2+tp/2)**2);return{q:`Con esa viga (madera ${b}×${h}, platinas ${b}×${tp} cm, n=${nn}) y M=${M} t·m, halla σ en la madera en su fibra extrema.`,a:M*1e5*(h/2)/I,u:'kg/cm²',s:[`I_{t} = ${n(I,6)} cm⁴`,`σ = M(h/2)/I_{t} = ${n(M*1e5*(h/2)/I)} kg/cm²`]};},
r=>{const b=r.i(8,15,1),h=r.i(20,40,2),tp=r.p([.6,.8,1]),nn=r.p([16,21]),M=r.i(1,8,.5);const I=b*h**3/12+nn*2*(b*tp**3/12+b*tp*(h/2+tp/2)**2);return{q:`Misma sección (madera ${b}×${h}, platinas ${b}×${tp} cm, n=${nn}), M=${M} t·m. Halla σ en la fibra extrema del acero.`,a:nn*M*1e5*(h/2+tp)/I,u:'kg/cm²',s:[`σ = n·M·(h/2+t)/I_{t} = ${n(nn*M*1e5*(h/2+tp)/I)} kg/cm²`]};}
]});
SUB('flx2',{t:'Carga excéntrica y flexión biaxial',
lec:`Una carga P aplicada fuera del centroide produce compresión más flexión: σ = P/A ± M/S.

## Núcleo central
En un rectángulo, si la excentricidad es menor que b/6 en cada dirección, toda la sección queda comprimida. Es la misma idea que en zapatas.

## Flexión biaxial
Si hay excentricidad en ambas direcciones:

σ = P/A ± M_{x}/S_{x} ± M_{y}/S_{y}

El esfuerzo máximo está en la esquina donde los tres términos se suman.

Esto explica por qué los muros de albañilería y los pedestales de concreto simple deben tener la carga dentro del núcleo: no resisten tensión.`,
key:['σ = [[P|A]] ± [[Pe|S]]','e ≤ [[b|6]]','σ = [[P|A]] ± [[M_{x}|S_{x}]] ± [[M_{y}|S_{y}]]'],
err:'Revisar solo una dirección cuando la carga es excéntrica en las dos.',
x:[['cz1','Zapatas con momento'],['flx','Flexión'],['fcp','Flexocompresión en concreto']],
g:[
r=>{const b=r.i(20,100,5);return{q:`Sección rectangular de ancho ${b} cm. Halla la excentricidad límite del núcleo.`,a:b/6,u:'cm',s:[`e = b/6 = ${n(b/6)} cm`]};},
r=>{const b=r.i(20,60,5),h=r.i(20,60,5),P=r.i(5,100,5),e=r.i(1,8,.5);const A=b*h,S=h*b*b/6;return{q:`Columna ${b}×${h} cm (b en la dirección de e), P=${P} t, e=${e} cm. Halla σ_{máx}.`,a:P*1000/A+P*1000*e/S,u:'kg/cm²',s:[`P/A = ${n(P*1000/A)}; Pe/S = ${n(P*1000*e/S)}`,`σ = ${n(P*1000/A+P*1000*e/S)} kg/cm²`]};},
r=>{const b=r.i(20,60,5),h=r.i(20,60,5),P=r.i(5,100,5),e=r.i(1,15,.5);const A=b*h,S=h*b*b/6;return{q:`Columna ${b}×${h} cm, P=${P} t, e=${e} cm en la dirección de b. Halla σ_{mín} (negativo = tensión).`,a:P*1000/A-P*1000*e/S,u:'kg/cm²',s:[`σ = ${n(P*1000/A-P*1000*e/S)} kg/cm²`]};},
r=>{const b=r.i(20,60,5),h=r.i(20,60,5),P=r.i(10,100,5),ex=r.i(1,6,.5),ey=r.i(1,6,.5);const A=b*h,Sx=b*h*h/6,Sy=h*b*b/6;const s=P*1000*(1/A+ex/Sy+ey/Sx);return{q:`Pedestal ${b}×${h} cm, P=${P} t con e_{x}=${ex} cm (sobre b) y e_{y}=${ey} cm (sobre h). Halla σ en la esquina más cargada.`,a:s,u:'kg/cm²',s:[`P/A = ${n(P*1000/A)}`,`M_{y}/S_{y} = ${n(P*1000*ex/Sy)}; M_{x}/S_{x} = ${n(P*1000*ey/Sx)}`,`σ = ${n(s)} kg/cm²`]};},
r=>{const b=r.i(20,60,5),h=r.i(20,60,5),ex=r.i(1,8,.5),ey=r.i(1,8,.5);const v=6*ex/b+6*ey/h;return{q:`Sección ${b}×${h} cm con e_{x}=${ex} cm y e_{y}=${ey} cm. Comprueba si queda toda comprimida: halla 6e_{x}/b + 6e_{y}/h (debe ser ≤ 1).`,a:v,u:'',s:[`= ${n(6*ex/b)} + ${n(6*ey/h)} = ${n(v)} ${v<=1?'(toda comprimida)':'(aparece tensión)'}`]};}
]});
EXT('m07');
SUB('adt',{t:'Aditivos y concretos especiales',
lec:`Los aditivos cambian el concreto sin cambiar mucho el costo:

- **Plastificantes y superplastificantes:** reducen el agua de 5 a 30 % manteniendo la trabajabilidad. Bajan a/c y suben la resistencia
- **Incorporadores de aire:** crean burbujas que protegen contra el congelamiento (sierra alta). Cada 1 % de aire baja la resistencia cerca de 5 %
- **Aceleradores y retardantes:** controlan el fraguado en frío o calor
- **Impermeabilizantes:** para reservorios y sótanos

## Concretos especiales
- Alta resistencia (más de 420 kg/cm²): a/c bajos, microsílice y superplastificante
- Autocompactante: fluye sin vibrar
- Lanzado (shotcrete): túneles y taludes`,
key:['A_{nueva} = A(1 − r)','a/c = [[A_{nueva}|C]]','f\'_{c,aire} ≈ f\'_{c}(1 − 0.05·%aire)'],
err:'Agregar más agua en obra a un concreto con superplastificante porque "está espeso".',
x:[['mez','Diseño de mezclas'],['qm1','La hidratación con menos agua'],['tun','Shotcrete en túneles']],
g:[
r=>{const A=r.i(170,220,5),rr=r.i(5,30,1);return{q:`Agua de ${A} L/m³ con un aditivo que la reduce ${rr} %. Halla el agua nueva.`,a:A*(1-rr/100),u:'L/m³',s:[`= ${A}·${1-rr/100} = ${n(A*(1-rr/100))} L/m³`]};},
r=>{const A=r.i(170,220,5),rr=r.i(5,30,1),C=r.i(300,500,10);return{q:`C=${C} kg, agua ${A} L, aditivo reductor de ${rr} %. Halla la nueva a/c manteniendo el cemento.`,a:A*(1-rr/100)/C,u:'',tol:.01,s:[`a/c = ${n(A*(1-rr/100))}/${C} = ${n(A*(1-rr/100)/C)}`]};},
r=>{const A=r.i(180,215,5),rr=r.i(8,25,1),ac=r.p([.45,.5,.55,.6]),p=r.i(28,38,1);const C0=A/ac,C1=A*(1-rr/100)/ac;return{q:`Mezcla con agua ${A} L y a/c=${ac}. Con un aditivo que reduce ${rr} % el agua, manteniendo a/c, ¿cuántas bolsas de cemento se ahorran por m³?`,a:(C0-C1)/42.5,u:'bolsas',s:[`Antes ${n(C0)} kg; después ${n(C1)} kg`,`Ahorro = ${n((C0-C1)/42.5)} bolsas`]};},
r=>{const fc=r.p([210,280,350]),a=r.i(2,7,.5);return{q:`Concreto de ${fc} kg/cm² con ${a} % de aire incorporado. Estima la resistencia.`,a:fc*(1-.05*a),u:'kg/cm²',s:[`≈ ${fc}(1 − 0.05·${a}) = ${n(fc*(1-.05*a))}`]};},
r=>{const fc=r.p([280,350]),a=r.i(3,6,.5),pa=r.i(5,15,1);const f2=fc*(1-.05*a)*(1+pa/100);return{q:`Concreto de ${fc} kg/cm² en sierra alta con ${a} % de aire. Un superplastificante sube la resistencia ${pa} % por menor a/c. Estima la resistencia final.`,a:f2,u:'kg/cm²',s:[`Por aire: ${n(fc*(1-.05*a))}`,`Con aditivo: ${n(f2)} kg/cm²`]};}
]});
SUB('alb2',{t:'Ensayos de albañilería',
lec:`La resistencia de un muro no es la del ladrillo solo: depende del ladrillo, del mortero y de la mano de obra. Por eso se ensayan **pilas** (prismas) y **muretes**.

## Norma E.070
- f′_{m}: resistencia a compresión de pilas. Se toma el promedio menos una desviación estándar: f′_{m} = x̄ − s
- Se corrige por esbeltez de la pila con un factor de la norma
- v′_{m}: resistencia al corte diagonal de muretes, también x̄ − s

## Unidades
- Ladrillo King Kong industrial (18 huecos): sólido para muros portantes si el área de huecos es menor a 30 %
- Pandereta: solo para tabiques, no para muros portantes en zona sísmica

La clasificación se hace por resistencia, variación dimensional y alabeo.`,
key:['f\'_{m} = x̄ − s','f\'_{m,corr} = f′_{m}·factor','%huecos = [[A_{huecos}|A_{bruta}]]·100'],
err:'Usar el promedio de las pilas sin restar la desviación estándar.',
x:[['alb','Diseño de albañilería confinada'],['est','Promedio y desviación'],['ref','Control de materiales']],
g:[
r=>{const v=[r.i(50,90,1),r.i(50,90,1),r.i(50,90,1)];return{q:`Pilas: ${v.join(', ')} kg/cm². Halla el promedio.`,a:(v[0]+v[1]+v[2])/3,u:'kg/cm²',s:[`= ${n((v[0]+v[1]+v[2])/3)}`]};},
r=>{const v=[r.i(50,90,1),r.i(50,90,1),r.i(50,90,1),r.i(50,90,1)];const m=v.reduce((a,b)=>a+b)/4,s=sq(v.reduce((a,b)=>a+(b-m)**2,0)/3);return{q:`Pilas: ${v.join(', ')} kg/cm². Halla f′_{m} = x̄ − s.`,a:m-s,u:'kg/cm²',s:[`x̄ = ${n(m)}, s = ${n(s)}`,`f′_{m} = ${n(m-s)}`]};},
r=>{const f=r.i(40,90,1),k=r.p([.75,.8,.85,.91,.95,1]);return{q:`f′_{m} sin corregir ${f} kg/cm² y factor de esbeltez ${k}. Halla f′_{m} corregido.`,a:f*k,u:'kg/cm²',s:[`= ${n(f*k)} kg/cm²`]};},
r=>{const L=r.p([23,24]),b=r.p([12.5,13]),h=r.i(2,4,.5),nh=r.p([10,14,18]);const Ah=nh*h,Ab=L*b;return{q:`Ladrillo de ${L}×${b} cm con ${nh} huecos de ${h} cm² cada uno. Halla el % de huecos.`,a:Ah/Ab*100,u:'%',s:[`= ${Ah}/${Ab} = ${n(Ah/Ab*100)} % ${Ah/Ab<.3?'(sólido)':'(hueco)'}`]};},
r=>{const v=[r.i(6,12,.1),r.i(6,12,.1),r.i(6,12,.1),r.i(6,12,.1)];const m=v.reduce((a,b)=>a+b)/4,s=sq(v.reduce((a,b)=>a+(b-m)**2,0)/3);const L=r.i(2,5,.5),t=13,P=r.i(5,20);const V=.5*(m-s)*t*L*100/1000+.23*P;return{q:`Muretes: ${v.join(', ')} kg/cm². Con v′_{m} = x̄ − s, halla V_{m} de un muro de ${L} m, t=13 cm, P_{g}=${P} t, α=1.`,a:V,u:'t',s:[`v′_{m} = ${n(m-s)}`,`V_{m} = 0.5v′_{m}tL + 0.23P_{g} = ${n(V)} t`]};}
]});
SUB('abr',{t:'Calidad de agregados',
lec:`Un agregado puede tener buena granulometría y aun así ser malo. Se revisa:

- **Abrasión Los Ángeles:** desgaste en un tambor con esferas de acero. Desgaste = (P_{1} − P_{2})/P_{1} × 100. Para concreto suele exigirse ≤ 50 %; para pavimentos, menos
- **Equivalente de arena:** proporción de arena frente a finos arcillosos: EA = h_{arena}/h_{arcilla} × 100. Mientras más alto, más limpia la arena
- **Material que pasa la malla N.° 200:** finos que aumentan la demanda de agua
- **Durabilidad (sulfatos):** pérdida tras ciclos de inmersión, importante en sierra con heladas
- **Partículas chatas y alargadas**

Las canteras de río suelen ser mejores que las de cerro, pero hay que ensayarlas siempre.`,
key:['Desgaste = [[P_{1}−P_{2}|P_{1}]]·100','EA = [[h_{arena}|h_{arcilla}]]·100','%finos = [[W_{lav}|W_{0}]]·100'],
err:'Aceptar una cantera sin ensayos porque "siempre se usó".',
x:[['agr','Granulometría'],['mez','Diseño de mezclas'],['pav','Agregados para pavimentos']],
g:[
r=>{const P1=r.p([5000]),P2=r.i(2500,4500,10);return{q:`Abrasión: P₁=5000 g y P₂=${P2} g (retenido en N.° 12). Halla el desgaste.`,a:(P1-P2)/P1*100,u:'%',s:[`= ${n((P1-P2)/P1*100)} %`]};},
r=>{const ha=r.i(2,5,.1),hc=r.i(4,10,.1);return{q:`Equivalente de arena: h_{arena}=${ha}, h_{arcilla}=${hc} pulg. Halla EA.`,a:ha/hc*100,u:'%',s:[`= ${n(ha/hc*100)} %`]};},
r=>{const W0=r.i(500,2000,10),f=r.i(1,10,.1);const W1=+(W0*(1-f/100)).toFixed(1);return{q:`Muestra de ${W0} g que tras lavar sobre la malla N.° 200 pesa ${W1} g. Halla el % de finos.`,a:(W0-W1)/W0*100,u:'%',s:[`= ${n((W0-W1)/W0*100)} %`]};},
r=>{const P=r.i(500,2000,10),p=r.i(2,25,.5);const P2=+(P*(1-p/100)).toFixed(0);return{q:`Ensayo de sulfatos: ${P} g antes y ${P2} g después de 5 ciclos. Halla la pérdida.`,a:(P-P2)/P*100,u:'%',s:[`= ${n((P-P2)/P*100)} %`]};},
r=>{const P2=r.i(2700,4200,10),ha=r.i(2.5,4.5,.1),hc=r.i(4,7,.1),lim=r.p([[40,50],[50,60]]);const d=(5000-P2)/50,ea=ha/hc*100,ok=d<=lim[0]&&ea>=lim[1];return{q:`Cantera: abrasión con P₂=${P2} g de 5000 g; EA con h_{arena}=${ha} y h_{arcilla}=${hc}. Límites: desgaste ≤ ${lim[0]} % y EA ≥ ${lim[1]} %. Escribe el desgaste.`,a:d,u:'%',s:[`Desgaste = ${n(d)} %; EA = ${n(ea)} %`,ok?'Cumple ambos':'No cumple: buscar otra cantera o tratar el material']};}
]});
EXT('m09');
SUB('li',{t:'Líneas de influencia',
lec:`Una **línea de influencia** muestra cómo cambia una reacción o un esfuerzo en un punto fijo cuando una carga unitaria recorre la estructura. Es la herramienta para cargas móviles: camiones, grúas puente, trenes.

## Viga simple de luz L
- Reacción en A: ordenada (L − x)/L
- Momento en una sección a una distancia a de A: triángulo con máximo a(L − a)/L bajo la sección
- Cortante en la sección: salta de −a/L a (L − a)/L

## Uso
- Carga puntual P: efecto = P × ordenada
- Carga repartida w: efecto = w × área de la línea de influencia en la zona cargada

**Müller-Breslau:** la línea de influencia tiene la forma de la estructura deformada cuando se quita la restricción y se impone un desplazamiento unitario.`,
key:['y_{RA} = [[L−x|L]]','y_{máx,M} = [[a(L−a)|L]]','M = P·y','M = w·Área'],
err:'Cargar toda la viga para el cortante máximo: solo se carga la zona de ordenadas positivas.',
x:[['pu1','Cargas móviles en puentes'],['vm','Diagramas de momento'],['mom','Reacciones']],
g:[
r=>{const L=r.i(4,30,1),x=r.i(0,L,1);return{q:`Viga simple de ${L} m. Halla la ordenada de la línea de influencia de R_{A} en x=${x} m.`,a:(L-x)/L,u:'',s:[`= (${L}−${x})/${L} = ${n((L-x)/L)}`]};},
r=>{const L=r.i(6,30,1),a=r.i(1,L-1,1);return{q:`Viga de ${L} m. Halla la ordenada máxima de la línea de influencia del momento en a=${a} m.`,a:a*(L-a)/L,u:'m',s:[`= ${a}·${L-a}/${L} = ${n(a*(L-a)/L)} m`]};},
r=>{const L=r.i(6,30,1),a=r.i(1,L-1,1),w=r.i(5,40,5);return{q:`Viga de ${L} m, carga uniforme w=${w} kN/m en toda la luz. Halla el momento en a=${a} m con el área de la línea de influencia.`,a:w*a*(L-a)/2,u:'kN·m',s:[`Área = ½·L·a(L−a)/L = ${n(a*(L-a)/2)}`,`M = ${n(w*a*(L-a)/2)} kN·m`]};},
r=>{const L=r.i(6,30,1),a=r.i(1,L-1,1),w=r.i(5,40,5);const A=(L-a)*(L-a)/L/2;return{q:`Viga de ${L} m. ¿Qué cortante positivo máximo produce w=${w} kN/m en la sección a=${a} m? (carga solo a la derecha)`,a:w*A,u:'kN',s:[`Ordenada máxima = (L−a)/L = ${n((L-a)/L)}`,`Área = ½(L−a)·(L−a)/L = ${n(A)}`,`V = ${n(w*A)} kN`]};},
r=>{const L=r.i(10,30,1),a=r.i(3,L-3,1),P1=r.i(50,150,10),P2=r.i(50,150,10),d=r.i(2,4,.5);const y=x=>x<0||x>L?0:x<=a?x*(L-a)/L:a*(L-x)/L;const M1=P1*y(a)+P2*y(a+d),M2=P2*y(a)+P1*y(a-d);return{q:`Dos cargas móviles P₁=${P1} y P₂=${P2} kN separadas ${d} m cruzan una viga de ${L} m. Halla el momento máximo en a=${a} m (prueba cada carga sobre la sección).`,a:Math.max(M1,M2),u:'kN·m',s:[`P₁ en la sección: ${n(M1)} kN·m`,`P₂ en la sección: ${n(M2)} kN·m`,`Máximo = ${n(Math.max(M1,M2))} kN·m`]};}
]});
SUB('pdf',{t:'Pendiente-deflexión y asentamientos',
lec:`El método de **pendiente-deflexión** escribe el momento en cada extremo de una barra en función de los giros θ y del desplazamiento relativo Δ:

M_{AB} = (2EI/L)(2θ_{A} + θ_{B} − 3Δ/L) + FEM_{AB}

## Casos útiles
- Giro de un extremo con el otro empotrado: M = 4EIθ/L, y el lejano recibe 2EIθ/L
- Asentamiento Δ de un apoyo en una viga biempotrada: M = 6EIΔ/L² en cada extremo
- Asentamiento en una viga empotrada-articulada: M = 3EIΔ/L²

**Por qué importa:** un asentamiento diferencial de pocos centímetros puede generar momentos grandes en un edificio rígido. Por eso el estudio de suelos limita los asentamientos diferenciales.`,
key:['M_{AB} = [[2EI|L]](2θ_{A}+θ_{B}−3[[Δ|L]]) + FEM','M = [[6EIΔ|L^{2}]]','M = [[3EIΔ|L^{2}]]'],
err:'Ignorar el signo del desplazamiento relativo.',
x:[['crs','Cross resuelve lo mismo'],['mk2','Matriz del elemento viga'],['cns','Los asentamientos vienen del suelo']],
g:[
r=>{const EI=r.i(5000,80000,1000),L=r.i(3,10),t=r.i(.0005,.005,.0005);return{q:`EI=${EI} kN·m², L=${L} m, θ_{A}=${t} rad, B empotrado. Halla M_{AB}.`,a:4*EI*t/L,u:'kN·m',s:[`M = 4EIθ/L = ${n(4*EI*t/L)} kN·m`]};},
r=>{const EI=r.i(5000,80000,1000),L=r.i(3,10),t=r.i(.0005,.005,.0005);return{q:`Con el mismo giro (EI=${EI}, L=${L}, θ_{A}=${t}), halla el momento transmitido a B.`,a:2*EI*t/L,u:'kN·m',s:[`M_{BA} = 2EIθ/L = ${n(2*EI*t/L)} kN·m`]};},
r=>{const EI=r.i(20000,200000,5000),L=r.i(4,10),D=r.i(5,40,1);return{q:`Viga biempotrada (EI=${EI} kN·m², L=${L} m) con asentamiento de ${D} mm en un extremo. Halla el momento inducido.`,a:6*EI*D/1000/(L*L),u:'kN·m',s:[`M = 6EIΔ/L² = ${n(6*EI*D/1000/(L*L))} kN·m`]};},
r=>{const EI=r.i(20000,200000,5000),L=r.i(4,10),D=r.i(5,40,1);return{q:`Viga empotrada-articulada (EI=${EI}, L=${L} m), el apoyo articulado baja ${D} mm. Halla el momento en el empotre.`,a:3*EI*D/1000/(L*L),u:'kN·m',s:[`M = 3EIΔ/L² = ${n(3*EI*D/1000/(L*L))} kN·m`]};},
r=>{const EI=r.i(20000,150000,5000),L=r.i(5,9),w=r.i(10,40,5),D=r.i(5,30,1);const M=w*L*L/12+6*EI*D/1000/(L*L);return{q:`Viga biempotrada (EI=${EI}, L=${L} m) con w=${w} kN/m. Su apoyo derecho baja ${D} mm. Halla el momento en el empotre izquierdo (valor absoluto; ambos efectos se suman ahí).`,a:M,u:'kN·m',s:[`Por carga: wL²/12 = ${n(w*L*L/12)}`,`Por asentamiento: 6EIΔ/L² = ${n(6*EI*D/1000/(L*L))}`,`Total = ${n(M)} kN·m`]};}
]});
SUB('arc',{t:'Arcos',
lec:`Un arco trabaja principalmente en **compresión**. Si su forma sigue la línea de presiones de las cargas, casi no tiene flexión: por eso los puentes de piedra romanos siguen en pie.

## Arco triarticulado de luz L y flecha f
Con carga uniforme w en la horizontal, la forma ideal es una parábola:
- Reacción vertical: V = wL/2
- Empuje horizontal: H = wL²/(8f)
- Fuerza en la clave: H (horizontal)
- Fuerza en los arranques: √(H² + V²)

Con carga puntual P en la clave: H = PL/(4f).

El empuje horizontal debe ser tomado por los apoyos o por un tirante. Mientras más rebajado el arco (f pequeña), mayor el empuje.`,
key:['V = [[wL|2]]','H = [[wL^{2}|8f]]','H = [[PL|4f]] (P en la clave)','N_{arranque} = √{H^{2}+V^{2}}'],
err:'Olvidar que el empuje horizontal empuja los apoyos hacia afuera.',
x:[['cab','El cable invertido'],['vm','H·f = momento de viga'],['pu3','Puentes de arco']],
g:[
r=>{const w=r.i(5,80,5),L=r.i(10,80,1);return{q:`Arco con w=${w} kN/m y L=${L} m. Halla V.`,a:w*L/2,u:'kN',s:[`V = ${n(w*L/2)} kN`]};},
r=>{const w=r.i(5,80,5),L=r.i(10,80,1),f=r.i(2,20,.5);return{q:`Arco parabólico con w=${w} kN/m, L=${L} m, f=${f} m. Halla H.`,a:w*L*L/(8*f),u:'kN',s:[`H = ${n(w*L*L/(8*f))} kN`]};},
r=>{const w=r.i(5,80,5),L=r.i(10,80,1),f=r.i(2,20,.5);const H=w*L*L/(8*f),V=w*L/2;return{q:`w=${w} kN/m, L=${L} m, f=${f} m. Halla la fuerza en el arranque.`,a:Math.hypot(H,V),u:'kN',s:[`H = ${n(H)}, V = ${n(V)}`,`N = ${n(Math.hypot(H,V))} kN`]};},
r=>{const P=r.i(50,500,10),L=r.i(10,60,1),f=r.i(2,15,.5);return{q:`Arco triarticulado con P=${P} kN en la clave, L=${L} m, f=${f} m. Halla H.`,a:P*L/(4*f),u:'kN',s:[`H = PL/(4f) = ${n(P*L/(4*f))} kN`]};},
r=>{const w=r.i(10,60,5),L=r.i(20,60,1),f=r.i(3,15,.5),fs=r.p([1500,1700,2100]);const H=w*L*L/(8*f);return{q:`Arco con tirante: w=${w} kN/m, L=${L} m, f=${f} m. El tirante de acero toma el empuje con σ_{adm}=${fs} kg/cm². Halla su área.`,a:H*1000/9.81/fs,u:'cm²',s:[`H = ${n(H)} kN = ${n(H*1000/9.81)} kg`,`A = ${n(H*1000/9.81/fs)} cm²`]};}
]});
EXT('m10');
SUB('tcr',{t:'Torsión en concreto armado',
lec:`Las vigas de borde que reciben losas en voladizo o escaleras sufren torsión. El concreto se fisura en espiral.

## Umbral (ACI 318, MPa y mm)
Si T_{u} < φ·0.083·√f′_{c}·(A_{cp}²/p_{cp}), con φ = 0.75, la torsión se puede despreciar.

- A_{cp}: área encerrada por el perímetro exterior
- p_{cp}: perímetro exterior

El momento de fisuración por torsión es unas 4 veces ese umbral: T_{cr} ≈ 0.33√f′_{c}·A_{cp}²/p_{cp}.

## Si no se puede despreciar
Se colocan **estribos cerrados** (con ganchos de 135°) y acero longitudinal repartido en el perímetro. La torsión necesita estribos cerrados: un estribo en U no la resiste.`,
key:['T_{th} = φ·0.083√{f\'_{c}}[[A_{cp}^{2}|p_{cp}]]','T_{cr} = 0.33√{f\'_{c}}[[A_{cp}^{2}|p_{cp}]]','φ = 0.75'],
err:'Usar estribos abiertos en vigas con torsión.',
x:[['tor','Torsión en resistencia de materiales'],['cte','Se combina con el cortante'],['pmat','La torsión en planta del edificio']],
g:[
r=>{const b=r.i(250,500,50),h=r.i(400,800,50);return{q:`Viga de ${b}×${h} mm. Halla A_{cp}²/p_{cp} en mm³.`,a:(b*h)**2/(2*(b+h)),u:'mm³',s:[`A_{cp} = ${b*h} mm², p_{cp} = ${2*(b+h)} mm`,`= ${n((b*h)**2/(2*(b+h)),6)} mm³`]};},
r=>{const b=r.i(250,500,50),h=r.i(400,800,50),fc=r.p([21,28,35]);const T=.75*.083*sq(fc)*(b*h)**2/(2*(b+h))/1e6;return{q:`Viga de ${b}×${h} mm, f′_{c}=${fc} MPa. Halla el umbral φT_{th}.`,a:T,u:'kN·m',s:[`= 0.75·0.083·√${fc}·${n((b*h)**2/(2*(b+h)),6)} N·mm = ${n(T)} kN·m`]};},
r=>{const b=r.i(250,500,50),h=r.i(400,800,50),fc=r.p([21,28,35]);const T=.33*sq(fc)*(b*h)**2/(2*(b+h))/1e6;return{q:`Viga de ${b}×${h} mm, f′_{c}=${fc} MPa. Halla T_{cr}.`,a:T,u:'kN·m',s:[`T_{cr} = 0.33√f′_{c}A²/p = ${n(T)} kN·m`]};},
r=>{const w=r.i(5,30,1),e=r.i(.5,2,.25),L=r.i(3,8,.5);return{q:`Un voladizo transmite a una viga de borde un momento repartido de w·e, con w=${w} kN/m y e=${e} m. La viga mide ${L} m y está empotrada a torsión en ambos extremos. Halla T_{u} en el apoyo.`,a:w*e*L/2,u:'kN·m',s:[`t = w·e = ${n(w*e)} kN·m/m`,`T = tL/2 = ${n(w*e*L/2)} kN·m`]};},
r=>{const b=r.i(250,400,50),h=r.i(500,700,50),fc=r.p([21,28]),w=r.i(5,30,1),e=r.i(.5,2,.25),L=r.i(3,8,.5);const Tu=w*e*L/2,Tth=.75*.083*sq(fc)*(b*h)**2/(2*(b+h))/1e6;return{q:`Viga de borde ${b}×${h} mm, f′_{c}=${fc} MPa, L=${L} m, recibe w=${w} kN/m con brazo ${e} m. Halla T_{u}/φT_{th} (si es mayor a 1, hay que diseñar por torsión).`,a:Tu/Tth,u:'',s:[`T_{u} = ${n(Tu)} kN·m`,`φT_{th} = ${n(Tth)} kN·m`,`Relación = ${n(Tu/Tth)}`]};}
]});
SUB('dfc',{t:'Deflexiones en concreto',
lec:`El concreto se fisura y deja de trabajar con toda su sección: la rigidez real está entre la sección bruta I_{g} y la fisurada I_{cr}.

## Inercia efectiva (Branson)
I_{e} = (M_{cr}/M_{a})³I_{g} + [1 − (M_{cr}/M_{a})³]I_{cr} ≤ I_{g}

- M_{cr} = f_{r}·I_{g}/y_{t}, con f_{r} = 2√f′_{c} (kg/cm²)
- M_{a}: momento de servicio

## Deflexión diferida
El flujo plástico y la contracción aumentan la flecha con los años:

λ = ξ/(1 + 50ρ′), con ξ = 2.0 a 5 años o más, y ρ′ la cuantía de acero en compresión.

Flecha total = inmediata × (1 + λ) para cargas permanentes. Por eso el acero en compresión reduce la flecha a largo plazo.`,
key:['M_{cr} = [[f_{r}I_{g}|y_{t}]]','I_{e} = ([[M_{cr}|M_{a}]])^{3}I_{g} + [1−([[M_{cr}|M_{a}]])^{3}]I_{cr}','λ = [[ξ|1+50ρ′]]'],
err:'Calcular la flecha con I_{g} en una viga fisurada: subestima mucho.',
x:[['def','Fórmulas de flecha'],['flx','M_{cr} viene de la flexión'],['fle','I_{cr} depende del acero']],
g:[
r=>{const b=r.i(20,40,5),h=r.i(40,80,5),fc=r.p([210,280]);const Ig=b*h**3/12;return{q:`Viga ${b}×${h} cm, f'_{c}=${fc}. Halla M_{cr}.`,a:2*sq(fc)*Ig/(h/2)/1e5,u:'t·m',s:[`I_{g} = ${n(Ig,6)} cm⁴`,`M_{cr} = 2√f'_{c}·I_{g}/(h/2) = ${n(2*sq(fc)*Ig/(h/2)/1e5)} t·m`]};},
r=>{const Mcr=r.i(2,15,.5),Ma=r.i(5,40,.5),Ig=r.i(100000,800000,10000),f=r.i(.25,.5,.05);const R=Math.min(Mcr/Ma,1)**3,Icr=f*Ig;return{q:`M_{cr}=${Mcr}, M_{a}=${Ma} t·m, I_{g}=${Ig} cm⁴, I_{cr}=${n(Icr,6)} cm⁴. Halla I_{e}.`,a:Math.min(R*Ig+(1-R)*Icr,Ig),u:'cm⁴',s:[`(M_{cr}/M_{a})³ = ${n(R)}`,`I_{e} = ${n(Math.min(R*Ig+(1-R)*Icr,Ig),6)} cm⁴`]};},
r=>{const rp=r.i(0,.015,.001),xi=r.p([1,1.2,1.4,2]);return{q:`ξ=${xi} y ρ′=${rp}. Halla λ.`,a:xi/(1+50*rp),u:'',s:[`λ = ${xi}/(1 + ${n(50*rp)}) = ${n(xi/(1+50*rp))}`]};},
r=>{const d=r.i(.2,2,.05),rp=r.i(0,.01,.001);return{q:`Flecha inmediata por carga permanente ${d} cm, ξ=2 y ρ′=${rp}. Halla la flecha total a largo plazo.`,a:d*(1+2/(1+50*rp)),u:'cm',s:[`λ = ${n(2/(1+50*rp))}`,`δ = ${d}(1+λ) = ${n(d*(1+2/(1+50*rp)))} cm`]};},
r=>{const b=r.i(25,35,5),h=r.i(50,70,5),fc=210,L=r.i(5,8,.5),w=r.i(1,3,.25),f=r.p([.3,.35,.4]);const Ig=b*h**3/12,Mcr=2*sq(fc)*Ig/(h/2),Ma=w*10*(L*100)**2/8,R=Math.min(Mcr/Ma,1)**3,Ie=Math.min(R*Ig+(1-R)*f*Ig,Ig),E=15000*sq(fc),d=5*w*10*(L*100)**4/(384*E*Ie);return{q:`Viga simple ${b}×${h} cm, f'_{c}=210, L=${L} m, w de servicio ${w} t/m, I_{cr}=${f}I_{g}. Halla la flecha inmediata con I_{e}.`,a:d,u:'cm',s:[`M_{cr} = ${n(Mcr/1e5)} t·m; M_{a} = ${n(Ma/1e5)} t·m`,`I_{e} = ${n(Ie,6)} cm⁴`,`δ = ${n(d)} cm`]};}
]});
SUB('fis',{t:'Control de fisuración',
lec:`Las fisuras finas son normales en concreto armado, pero si son anchas dejan entrar agua y corroen el acero. Se controlan **repartiendo el acero** en varias varillas delgadas en vez de pocas gruesas.

## Espaciamiento máximo (ACI 318, mm)
s ≤ 380(280/f_{s}) − 2.5c_{c} y s ≤ 300(280/f_{s})

- f_{s}: esfuerzo en el acero en servicio, aproximadamente 2/3 f_{y} (280 MPa para f_{y} = 420)
- c_{c}: recubrimiento libre a la cara de la varilla

## Acero de temperatura
Losas y muros llevan acero mínimo para controlar fisuras por contracción: 0.0018·b·h con f_{y} = 420 MPa.`,
key:['f_{s} ≈ [[2|3]]f_{y}','s ≤ 380[[280|f_{s}]] − 2.5c_{c}','s ≤ 300[[280|f_{s}]]','A_{s,temp} = 0.0018bh'],
err:'Reemplazar varias varillas delgadas por una gruesa equivalente "porque es igual".',
x:[['fle','Acero de flexión'],['l2d','Acero mínimo en losas'],['pt1','Fisuras y corrosión']],
g:[
r=>{const fy=r.i(250,550,5);return{q:`f_{y}=${fy} MPa. Halla f_{s} aproximado.`,a:2*fy/3,u:'MPa',s:[`= ${n(2*fy/3)} MPa`]};},
r=>{const fs=r.i(200,330,10),cc=r.i(25,75,5);return{q:`f_{s}=${fs} MPa, c_{c}=${cc} mm. Halla 380(280/f_{s}) − 2.5c_{c}.`,a:380*280/fs-2.5*cc,u:'mm',s:[`= ${n(380*280/fs)} − ${2.5*cc} = ${n(380*280/fs-2.5*cc)} mm`]};},
r=>{const fs=r.i(200,330,10),cc=r.i(25,75,5);const s=Math.min(380*280/fs-2.5*cc,300*280/fs);return{q:`f_{s}=${fs} MPa, c_{c}=${cc} mm. Halla el espaciamiento máximo.`,a:s,u:'mm',s:[`Límite 1 = ${n(380*280/fs-2.5*cc)}`,`Límite 2 = ${n(300*280/fs)}`,`s = ${n(s)} mm`]};},
r=>{const h=r.i(10,40,1);return{q:`Losa o muro de ${h} cm. Halla el acero de temperatura por metro.`,a:.0018*100*h,u:'cm²/m',s:[`= 0.0018·100·${h} = ${n(.0018*100*h)} cm²/m`]};},
r=>{const b=r.i(250,600,50),cc=r.p([40,50]),cs=r.p([50,60]),fs=280;const s=Math.min(380-2.5*cc,300);const nb=Math.ceil((b-2*cs)/s)+1;return{q:`Viga de ${b} mm de ancho, f_{s}=280 MPa, c_{c}=${cc} mm y varillas extremas a ${cs} mm de las caras. ¿Cuántas varillas como mínimo en la cara traccionada?`,a:nb,u:'varillas',tol:0,s:[`s_{máx} = ${n(s)} mm`,`Ancho entre extremas = ${b-2*cs} mm`,`n = ⌈${b-2*cs}/${n(s)}⌉ + 1 = ${nb}`]};}
]});
EXT('m11');
SUB('lft',{t:'Pandeo lateral-torsional',
lec:`Una viga de acero sin arriostrar puede fallar girando y desplazándose hacia el costado: el ala comprimida pandea como una columna.

## AISC 360
- Si la longitud no arriostrada L_{b} ≤ L_{p} = 1.76·r_{y}·√(E/F_{y}), la viga alcanza su momento plástico M_{p} = F_{y}Z_{x}
- Si L_{p} < L_{b} ≤ L_{r}, la resistencia baja linealmente:
M_{n} = C_{b}[M_{p} − (M_{p} − 0.7F_{y}S_{x})(L_{b} − L_{p})/(L_{r} − L_{p})] ≤ M_{p}
- Si L_{b} > L_{r}, el pandeo es elástico

φ = 0.90. C_{b} ≥ 1 premia diagramas de momento no uniformes.

**Solución práctica:** arriostrar el ala comprimida con correas, viguetas o la propia losa.`,
key:['L_{p} = 1.76r_{y}√{[[E|F_{y}]]}','M_{p} = F_{y}Z_{x}','M_{n} = C_{b}[M_{p} − (M_{p}−0.7F_{y}S_{x})[[L_{b}−L_{p}|L_{r}−L_{p}]]]'],
err:'Diseñar con M_{p} una viga de nave industrial larga y sin arriostrar.',
x:[['vac','Vigas de acero'],['pan','Es pandeo, como en columnas'],['com','Mismo E y F_{y}']],
g:[
r=>{const ry=r.i(2,8,.1),Fy=r.p([2530,3515]);return{q:`r_{y}=${ry} cm, F_{y}=${Fy} kg/cm², E=2 040 000. Halla L_{p}.`,a:1.76*ry*sq(2.04e6/Fy)/100,u:'m',s:[`L_{p} = 1.76·${ry}·√(${n(2.04e6/Fy)}) = ${n(1.76*ry*sq(2.04e6/Fy))} cm`]};},
r=>{const Z=r.i(200,3000,50),Fy=r.p([2530,3515]);return{q:`Z_{x}=${Z} cm³, F_{y}=${Fy}. Halla M_{p}.`,a:Fy*Z/1e5,u:'t·m',s:[`= ${n(Fy*Z/1e5)} t·m`]};},
r=>{const Mp=r.i(10,80,1),Sx=r.i(200,2500,50),Fy=2530,Lp=r.i(1,2.5,.1),Lr=r.i(4,9,.5),Cb=r.p([1,1.14,1.3]);const Lb=r.i(Lp+.2,Lr-.2,.1);const Mr=.7*Fy*Sx/1e5;const Mn=Math.min(Cb*(Mp-(Mp-Mr)*(Lb-Lp)/(Lr-Lp)),Mp);return{q:`M_{p}=${Mp} t·m, 0.7F_{y}S_{x}=${n(Mr)} t·m, L_{p}=${Lp} m, L_{r}=${Lr} m, L_{b}=${n(Lb)} m, C_{b}=${Cb}. Halla M_{n}.`,a:Mn,u:'t·m',s:[`M_{n} = ${Cb}[${Mp} − (${Mp}−${n(Mr)})(${n(Lb)}−${Lp})/(${Lr}−${Lp})] = ${n(Mn)} t·m (≤ M_{p})`]};},
r=>{const Mn=r.i(10,80,.5);return{q:`M_{n}=${Mn} t·m. Halla φM_{n}.`,a:.9*Mn,u:'t·m',s:[`= ${n(.9*Mn)} t·m`]};},
r=>{const Z=r.i(500,1500,50),Sx=+(Z/1.12).toFixed(0),ry=r.i(3,5,.1),Fy=2530,Lr=r.i(5,8,.5),Lb=r.i(3,Lr-.5,.5),Mu=r.i(5,30,1);const Lp=1.76*ry*sq(2.04e6/Fy)/100,Mp=Fy*Z/1e5,Mr=.7*Fy*Sx/1e5;const Mn=Lb<=Lp?Mp:Math.min(Mp-(Mp-Mr)*(Lb-Lp)/(Lr-Lp),Mp);return{q:`Perfil A36 con Z_{x}=${Z}, S_{x}=${Sx} cm³, r_{y}=${ry} cm, L_{r}=${Lr} m, L_{b}=${Lb} m, C_{b}=1. Halla φM_{n} y compáralo con M_{u}=${Mu} t·m. Escribe φM_{n}.`,a:.9*Mn,u:'t·m',s:[`L_{p} = ${n(Lp)} m`,Lb<=Lp?`L_{b} ≤ L_{p}: M_{n} = M_{p}`:`Interpolación inelástica`,`φM_{n} = ${n(.9*Mn)} t·m ${.9*Mn>=Mu?'≥':'<'} ${Mu}`]};}
]});
SUB('bc',{t:'Flexocompresión en acero',
lec:`Las columnas de pórticos de acero reciben carga axial y momento. AISC usa ecuaciones de interacción:

- Si P_{r}/P_{c} ≥ 0.2: P_{r}/P_{c} + (8/9)(M_{rx}/M_{cx} + M_{ry}/M_{cy}) ≤ 1.0
- Si P_{r}/P_{c} < 0.2: P_{r}/(2P_{c}) + (M_{rx}/M_{cx} + M_{ry}/M_{cy}) ≤ 1.0

donde P_{r}, M_{r} son las demandas (P_{u}, M_{u}) y P_{c}, M_{c} las resistencias de diseño (φP_{n}, φM_{n}).

Los momentos de la ecuación deben incluir los **efectos de segundo orden** (P-Δ): la carga axial actuando sobre la columna deformada aumenta el momento.`,
key:['[[P_{r}|P_{c}]] + [[8|9]]([[M_{rx}|M_{cx}]] + [[M_{ry}|M_{cy}]]) ≤ 1','[[P_{r}|2P_{c}]] + [[M_{rx}|M_{cx}]] + [[M_{ry}|M_{cy}]] ≤ 1'],
err:'Usar la primera ecuación cuando la carga axial es pequeña.',
x:[['com','Resistencia a compresión'],['vac','Resistencia a flexión'],['pdl','Efecto P-Delta']],
g:[
r=>{const P=r.i(10,200,5),Pc=r.i(100,500,10);return{q:`P_{u}=${P} t y φP_{n}=${Pc} t. Halla P_{r}/P_{c}.`,a:P/Pc,u:'',s:[`= ${n(P/Pc)}`]};},
r=>{const Pc=r.i(100,400,10),P=Math.round(Pc*r.i(.25,.7,.05)),Mc=r.i(10,60,1),M=+(Mc*r.i(.1,.5,.05)).toFixed(1);return{q:`P_{u}=${P}, φP_{n}=${Pc} t; M_{ux}=${M}, φM_{nx}=${Mc} t·m. Halla la interacción.`,a:P/Pc+8/9*M/Mc,u:'',s:[`P/P_{c} = ${n(P/Pc)} ≥ 0.2`,`= ${n(P/Pc)} + 8/9·${n(M/Mc)} = ${n(P/Pc+8/9*M/Mc)}`]};},
r=>{const Pc=r.i(100,400,10),P=Math.round(Pc*r.i(.05,.18,.01)),Mc=r.i(10,60,1),M=+(Mc*r.i(.3,.8,.05)).toFixed(1);return{q:`P_{u}=${P}, φP_{n}=${Pc} t; M_{ux}=${M}, φM_{nx}=${Mc} t·m. Halla la interacción.`,a:P/(2*Pc)+M/Mc,u:'',s:[`P/P_{c} = ${n(P/Pc)} < 0.2`,`= ${n(P/(2*Pc))} + ${n(M/Mc)} = ${n(P/(2*Pc)+M/Mc)}`]};},
r=>{const Pc=r.i(150,400,10),P=Math.round(Pc*r.i(.3,.6,.05)),Mcx=r.i(20,60,1),Mcy=r.i(8,25,1),Mx=+(Mcx*r.i(.1,.3,.05)).toFixed(1),My=+(Mcy*r.i(.1,.3,.05)).toFixed(1);return{q:`Columna biaxial: P_{u}=${P}, φP_{n}=${Pc} t; M_{ux}=${Mx}/${Mcx}, M_{uy}=${My}/${Mcy} t·m (demanda/capacidad). Halla la interacción.`,a:P/Pc+8/9*(Mx/Mcx+My/Mcy),u:'',s:[`= ${n(P/Pc)} + 8/9(${n(Mx/Mcx)} + ${n(My/Mcy)}) = ${n(P/Pc+8/9*(Mx/Mcx+My/Mcy))}`]};},
r=>{const Pc=r.i(150,400,10),P=Math.round(Pc*r.i(.3,.6,.05)),Mc=r.i(20,60,1);const Mmax=(1-P/Pc)*9/8*Mc;return{q:`Columna con P_{u}=${P}, φP_{n}=${Pc} t y φM_{nx}=${Mc} t·m. ¿Qué momento máximo puede tomar?`,a:Mmax,u:'t·m',s:[`P/P_{c} = ${n(P/Pc)} ≥ 0.2`,`M = (1 − P/P_{c})·9/8·M_{c} = ${n(Mmax)} t·m`]};}
]});
SUB('cfs',{t:'Perfiles de pared delgada',
lec:`Los perfiles **plegados en frío** (correas, viguetas tipo C, Z y drywall estructural) son muy livianos, pero sus placas delgadas pandean localmente antes de fluir.

## Ancho efectivo (Winter, AISI)
- Esbeltez de la placa: λ = (1.052/√k)·(w/t)·√(f/E)
- Si λ ≤ 0.673, toda la placa es efectiva
- Si λ > 0.673: ρ = (1 − 0.22/λ)/λ y el ancho efectivo es b_{e} = ρ·w

k = 4 para placas apoyadas en ambos bordes (alma, ala con labio) y 0.43 para bordes libres.

La sección efectiva es menor que la bruta: con ella se calculan las resistencias. Por eso los labios rigidizadores son tan importantes.`,
key:['λ = [[1.052|√{k}]][[w|t]]√{[[f|E]]}','ρ = [[1 − 0.22/λ|λ]]','b_{e} = ρw'],
err:'Usar la sección bruta de una correa delgada.',
x:[['pan','Pandeo de placas'],['com','Columnas de acero'],['vac','Vigas de acero']],
g:[
r=>{const w=r.i(40,200,5),t=r.p([.9,1.2,1.5,2,2.5,3]);return{q:`Placa de w=${w} mm y t=${t} mm. Halla w/t.`,a:w/t,u:'',s:[`= ${n(w/t)}`]};},
r=>{const w=r.i(40,200,5),t=r.p([1.2,1.5,2,2.5]),k=r.p([4,.43]),f=r.p([230,345]);return{q:`w=${w} mm, t=${t} mm, k=${k}, f=${f} MPa, E=203 000 MPa. Halla λ.`,a:1.052/sq(k)*w/t*sq(f/203000),u:'',s:[`λ = ${n(1.052/sq(k)*w/t*sq(f/203000))}`]};},
r=>{const l=r.i(.7,3,.05);return{q:`λ=${l}. Halla ρ.`,a:(1-.22/l)/l,u:'',s:[`ρ = (1 − 0.22/${l})/${l} = ${n((1-.22/l)/l)}`]};},
r=>{const w=r.i(60,200,5),t=r.p([1.2,1.5,2]),f=r.p([230,345]),k=4;const l=1.052/2*w/t*sq(f/203000),rho=l<=.673?1:(1-.22/l)/l;return{q:`Ala rigidizada (k=4) de w=${w} mm, t=${t} mm, f=${f} MPa. Halla el ancho efectivo.`,a:rho*w,u:'mm',s:[`λ = ${n(l)}`,`ρ = ${n(rho)}`,`b_{e} = ${n(rho*w)} mm`]};},
r=>{const w=r.i(80,200,5),t=r.p([1.5,2,2.5]),f=r.p([230,345]),h=r.i(100,250,10);const l=1.052/2*w/t*sq(f/203000),rho=l<=.673?1:(1-.22/l)/l;const Ab=(2*w+h)*t,Ae=(2*rho*w+h)*t;return{q:`Sección cajón simplificada: dos alas de ${w} mm (k=4) y un alma de ${h} mm totalmente efectiva, t=${t} mm, f=${f} MPa. ¿Qué % del área bruta es efectiva?`,a:Ae/Ab*100,u:'%',s:[`ρ alas = ${n(rho)}`,`A_{e}/A_{b} = ${n(Ae/Ab*100)} %`]};}
]});
EXT('m12');
SUB('irr',{t:'Irregularidades estructurales',
lec:`Un edificio irregular concentra el daño. La E.030 lo penaliza reduciendo R:

R = R_{0}·I_{a}·I_{p}

- I_{a}: factor de irregularidad en altura (piso blando, masa, geometría vertical, discontinuidad de sistemas)
- I_{p}: factor de irregularidad en planta (torsión, esquinas entrantes, diafragma)
- Valores de 0.5 a 1.0 según el tipo; se usa el más crítico en cada caso

## Piso blando
Hay irregularidad de rigidez si un piso tiene rigidez menor al 70 % del piso superior, o menor al 80 % del promedio de los tres superiores.

Un R menor significa fuerzas sísmicas mayores. Además, algunas irregularidades están **prohibidas** en edificaciones esenciales o en zona 4.`,
key:['R = R_{0}·I_{a}·I_{p}','k_{i} < 0.7k_{i+1}','k_{i} < 0.8·[[k_{i+1}+k_{i+2}+k_{i+3}|3]]'],
err:'Usar R₀ directamente en un edificio con primer piso de cocheras sin muros.',
x:[['esp','Afecta V'],['pmat','Torsión en planta'],['rig','Rigidez de entrepiso']],
g:[
r=>{const R0=r.p([8,7,6,3]),Ia=r.p([1,.9,.75,.5]),Ip=r.p([1,.9,.85,.75]);return{q:`R₀=${R0}, I_{a}=${Ia}, I_{p}=${Ip}. Halla R.`,a:R0*Ia*Ip,u:'',s:[`R = ${n(R0*Ia*Ip)}`]};},
r=>{const k1=r.i(5000,40000,1000),k2=r.i(10000,60000,1000);return{q:`k₁=${k1} t/m y k₂=${k2} t/m. Halla k₁/k₂ (piso blando si < 0.7).`,a:k1/k2,u:'',s:[`= ${n(k1/k2)} ${k1/k2<.7?'(irregular)':'(regular)'}`]};},
r=>{const k=[r.i(5000,30000,1000),r.i(10000,40000,1000),r.i(10000,40000,1000),r.i(10000,40000,1000)];const av=(k[1]+k[2]+k[3])/3;return{q:`Rigideces: piso 1 = ${k[0]}, pisos 2-4 = ${k.slice(1).join(', ')} t/m. Halla k₁/promedio(2-4).`,a:k[0]/av,u:'',s:[`Promedio = ${n(av)}`,`= ${n(k[0]/av)} ${k[0]/av<.8?'(irregular)':'(regular)'}`]};},
r=>{const R0=8,Ia=r.p([.75,.9]),Ip=r.p([.75,.85,1]),f=r.i(.06,.15,.005);return{q:`Un edificio regular tiene V/P = ${f} con R₀=8. Si resulta irregular con I_{a}=${Ia}, I_{p}=${Ip}, halla el nuevo V/P (respetando C/R ≥ 0.11 no aplica aquí).`,a:f/(Ia*Ip),u:'',tol:.01,s:[`R = ${n(8*Ia*Ip)}`,`V/P = ${f}/(${Ia}·${Ip}) = ${n(f/(Ia*Ip))}`]};},
r=>{const P=r.i(500,4000,100),Z=.45,U=1,S=r.p([1,1.05]),R0=r.p([8,7,6]),Ia=r.p([.75,.9,1]),Ip=r.p([.75,.85,1]);const R=R0*Ia*Ip,V=Z*U*2.5*S/R*P;return{q:`Edificio en Lima (Z=0.45, U=1, S=${S}, C=2.5) de ${P} t, R₀=${R0}, I_{a}=${Ia}, I_{p}=${Ip}. Halla V.`,a:V,u:'t',s:[`R = ${n(R)}`,`V = ${n(Z*2.5*S/R)}·${P} = ${n(V)} t`]};}
]});
SUB('ais',{t:'Aislamiento sísmico',
lec:`Un **aislador** es un apoyo flexible entre la cimentación y el edificio. Alarga el periodo del sistema (2 a 3 s) y lo aleja de las frecuencias fuertes del sismo, así la aceleración sobre el edificio baja mucho.

## Periodo del sistema aislado
T = 2π√(m/K_{aisl}), con K_{aisl} la rigidez total de los aisladores.

## Desplazamiento
Como el periodo es largo, el edificio se mueve mucho sobre los aisladores: D = S_{a}·T²/(4π²). Hay que dejar una holgura alrededor para que pueda moverse.

En el Perú la norma **E.031** regula el aislamiento sísmico, y hospitales nuevos en zonas de alta sismicidad deben aislarse.

El amortiguamiento de los aisladores (10 a 30 %) reduce aún más la respuesta.`,
key:['T = 2π√{[[m|K]]}','K = N·k_{aislador}','D = [[S_{a}T^{2}|4π^{2}]]','S_{a} = [[2.5ZUS·T_{P}|T]]g'],
err:'Olvidar la junta perimetral: el edificio aislado choca con lo que lo rodea.',
x:[['vf','Alejarse de la resonancia'],['osc','Periodo y rigidez'],['esp','Espectro de diseño']],
g:[
r=>{const m=r.i(500,10000,100),K=r.i(5000,80000,1000);return{q:`Edificio de ${m} t sobre aisladores de rigidez total ${K} kN/m. Halla T.`,a:2*PI*sq(m/K),u:'s',s:[`T = 2π√(${m}/${K}) = ${n(2*PI*sq(m/K))} s`]};},
r=>{const N=r.i(10,80,1),k=r.i(500,2000,50);return{q:`${N} aisladores de ${k} kN/m cada uno. Halla K total.`,a:N*k,u:'kN/m',s:[`= ${N*k} kN/m`]};},
r=>{const m=r.i(1000,10000,100),T=r.i(2,3.5,.1);return{q:`Edificio de ${m} t que se quiere aislar con T=${T} s. Halla la rigidez total necesaria.`,a:m*(2*PI/T)**2,u:'kN/m',s:[`K = m(2π/T)² = ${n(m*(2*PI/T)**2)} kN/m`]};},
r=>{const Sa=r.i(.1,.4,.01),T=r.i(2,3.5,.1);return{q:`S_{a}=${Sa}g y T=${T} s. Halla el desplazamiento.`,a:Sa*G*T*T/(4*PI*PI)*100,u:'cm',s:[`D = ${n(Sa*G*T*T/(4*PI*PI)*100)} cm`]};},
r=>{const Z=.45,S=r.p([1,1.05]),TP=r.p([.4,.6]),TL=2.5,Tf=r.i(.3,.6,.05),Ti=r.i(2,3,.1),B=r.p([1.5,1.7]);const C=t=>t<=TP?2.5:t<TL?2.5*TP/t:2.5*TP*TL/t/t;const r1=Z*1*C(Tf)*S,r2=Z*1*C(Ti)*S/B;return{q:`Edificio con T=${Tf} s en base fija; aislado tendrá T=${Ti} s y un factor de reducción por amortiguamiento B=${B}. Z=0.45, U=1, S=${S}, T_{P}=${TP}, T_{L}=2.5. ¿Cuántas veces menor es la aceleración espectral elástica?`,a:r1/r2,u:'veces',s:[`Base fija: C = ${n(C(Tf))} → S_{a} = ${n(r1)}g`,`Aislado: C = ${n(C(Ti))}, /B → ${n(r2)}g`,`Reducción = ${n(r1/r2)} veces`]};}
]});
SUB('jsis',{t:'Junta sísmica',
lec:`Durante un sismo, edificios vecinos se balancean y pueden **chocar**. Muchos daños en Lima y en Pisco vinieron de golpes entre edificios pegados.

## Separación según la E.030
- Entre edificios: s ≥ 2/3 de la suma de los desplazamientos máximos de ambos edificios en el nivel considerado
- Además, s ≥ 0.006·h, con h la altura del nivel desde el terreno, y no menor a 3 cm
- El edificio debe retirarse del lindero al menos 2/3 de su desplazamiento máximo, o s/2 si es mayor

Los desplazamientos son los inelásticos (0.75R o 0.85R veces los elásticos).

La junta se cubre con tapajuntas flexibles, nunca se rellena con material rígido. Verifica los valores en la versión vigente de la norma.`,
key:['s ≥ [[2|3]](Δ_{1} + Δ_{2})','s ≥ 0.006h ≥ 3 cm','Retiro ≥ máx([[2|3]]Δ_{máx}, s/2)'],
err:'Rellenar la junta con ladrillo o concreto al terminar la obra.',
x:[['dri','Desplazamientos inelásticos'],['esp','Fuerzas sísmicas'],['par2','Retiros y parámetros urbanos']],
g:[
r=>{const h=r.i(3,90,1);return{q:`Edificio de ${h} m de altura. Halla 0.006h (mínimo 3 cm).`,a:Math.max(.006*h*100,3),u:'cm',s:[`= ${n(Math.max(.006*h*100,3))} cm`]};},
r=>{const d1=r.i(2,30,.5),d2=r.i(2,30,.5);return{q:`Desplazamientos máximos ${d1} y ${d2} cm. Halla 2/3 de la suma.`,a:2/3*(d1+d2),u:'cm',s:[`= ${n(2/3*(d1+d2))} cm`]};},
r=>{const d1=r.i(2,25,.5),d2=r.i(2,25,.5),h=r.i(10,60,1);const s=Math.max(2/3*(d1+d2),.006*h*100,3);return{q:`Edificios con desplazamientos ${d1} y ${d2} cm, altura ${h} m. Halla la junta.`,a:s,u:'cm',s:[`2/3·suma = ${n(2/3*(d1+d2))}`,`0.006h = ${n(.006*h*100)}`,`s = ${n(s)} cm`]};},
r=>{const de=r.i(.5,4,.1),R=r.p([8,7,6]),f=r.p([.75,.85]);return{q:`Desplazamiento elástico del techo ${de} cm, R=${R}, factor ${f}. Halla el desplazamiento inelástico.`,a:f*R*de,u:'cm',s:[`= ${f}·${R}·${de} = ${n(f*R*de)} cm`]};},
r=>{const de=r.i(.5,4,.1),R=r.p([8,7,6]),h=r.i(10,60,1);const D=.75*R*de,s=Math.max(.006*h*100,3),ret=Math.max(2/3*D,s/2);return{q:`Edificio regular nuevo junto a un terreno libre: desplazamiento elástico en el techo ${de} cm, R=${R}, altura ${h} m. ¿Cuánto debe retirarse del lindero?`,a:ret,u:'cm',s:[`Δ = 0.75R·Δ_{e} = ${n(D)} cm`,`s = 0.006h = ${n(s)} cm`,`Retiro = máx(2/3Δ, s/2) = ${n(ret)} cm`]};}
]});
EXT('m26');
SUB('pdl',{t:'Efecto P-Delta',
lec:`Cuando un edificio se desplaza Δ, las cargas de gravedad P actúan desplazadas y generan un momento adicional P·Δ. Si el edificio es flexible y pesado, ese momento hace que se desplace más, y así sucesivamente.

## Coeficiente de estabilidad
θ = P·Δ/(V·h)

- P: carga de gravedad sobre el piso
- Δ: desplazamiento relativo del piso
- V: cortante del piso; h: altura del piso

## Amplificación
Los efectos de primer orden se multiplican por 1/(1 − θ).

Si θ es pequeño (menos de 0.1 en la mayoría de normas), se puede despreciar. Si se acerca a 0.25 a 0.3, la estructura es inestable y hay que rigidizarla.`,
key:['θ = [[PΔ|Vh]]','A = [[1|1 − θ]]','M_{2} = A·M_{1}'],
err:'Ignorar el P-Delta en edificios altos y flexibles de acero.',
x:[['bc','Columnas de acero con segundo orden'],['dri','Desplazamientos de entrepiso'],['pan','Pérdida de rigidez']],
g:[
r=>{const P=r.i(500,10000,100),D=r.i(.5,8,.1),V=r.i(50,1000,10),h=r.i(2.8,4,.1);return{q:`P=${P} t, Δ=${D} cm, V=${V} t, h=${h} m. Halla θ.`,a:P*D/100/(V*h),u:'',tol:.01,s:[`θ = ${P}·${D/100}/(${V}·${h}) = ${n(P*D/100/(V*h))}`]};},
r=>{const t=r.i(.01,.25,.01);return{q:`θ=${t}. Halla el factor de amplificación.`,a:1/(1-t),u:'',s:[`= 1/(1−${t}) = ${n(1/(1-t))}`]};},
r=>{const t=r.i(.02,.2,.01),M=r.i(10,200,5);return{q:`θ=${t} y momento de primer orden ${M} t·m. Halla el momento amplificado.`,a:M/(1-t),u:'t·m',s:[`= ${M}/(1−${t}) = ${n(M/(1-t))} t·m`]};},
r=>{const P=r.i(1000,8000,100),V=r.i(100,800,10),h=r.i(3,4,.1);return{q:`P=${P} t, V=${V} t, h=${h} m. ¿Qué Δ máximo mantiene θ ≤ 0.1?`,a:.1*V*h/P*100,u:'cm',s:[`Δ = 0.1·V·h/P = ${n(.1*V*h/P*100)} cm`]};},
r=>{const P=r.i(1000,6000,100),V=r.i(100,600,10),h=r.i(3,4,.1),k=r.i(10000,80000,1000);const D1=V/k,t=P*D1/(V*h),D2=D1/(1-t);return{q:`Piso con rigidez ${k} t/m, cortante ${V} t, carga de gravedad ${P} t y h=${h} m. Halla el desplazamiento incluyendo P-Delta.`,a:D2*100,u:'cm',s:[`Primer orden: Δ = V/k = ${n(D1*100)} cm`,`θ = ${n(t)}`,`Δ₂ = Δ/(1−θ) = ${n(D2*100)} cm`]};}
]});
