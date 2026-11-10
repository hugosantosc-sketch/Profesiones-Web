MOD('m01','Matemática de obra','Bases',
'Antes de calcular una viga necesitas moverte sin miedo entre unidades, ángulos, vectores y sistemas de ecuaciones. Aquí cada herramienta aparece con un problema de obra.',
['Stewart, Cálculo de una variable','Kreyszig, Matemáticas avanzadas para ingeniería','Lay, Álgebra lineal y sus aplicaciones'],
'UNI: Cálculo Diferencial, Álgebra Lineal, Dibujo de Ingeniería. Equivale a los primeros ciclos de cualquier malla.');
SUB('uni',{t:'Unidades y conversiones',
lec:`Un error de unidades puede tumbar un edificio. La regla es simple: **multiplica por fracciones que valen 1**. Si 1 m = 100 cm, entonces 100 cm/1 m vale 1 y puedes usarla para cancelar metros.

En el Perú verás dos sistemas a la vez: las normas de concreto trabajan en **kg/cm²** y **toneladas**, mientras los libros modernos usan **MPa** y **kN**. Debes pasar de uno a otro sin dudar.

## Equivalencias que usarás toda la carrera
- 1 tonelada-fuerza = 1000 kgf ≈ 9.81 kN
- 1 kg/cm² ≈ 0.0981 MPa, y 1 MPa ≈ 10.2 kg/cm²
- 1 m² = 10 000 cm², así que al pasar áreas el factor se eleva al cuadrado
- Concreto armado: 2400 kg/m³. Agua: 1000 kg/m³

**Hábito de ingeniero:** antes de confiar en un resultado, pregúntate si tiene sentido. Una zapata con 200 kg/cm² sobre el suelo es imposible; el suelo de Lima resiste cerca de 4 kg/cm².`,
key:['1 kg/cm^{2} = 0.0981 MPa','1 t = 9.81 kN','1 m^{2} = 10^{4} cm^{2}'],
err:'Convertir longitudes bien pero olvidar elevar el factor en áreas y volúmenes: 1 m³ son 1 000 000 cm³, no 100 cm³.',
x:[['car','Toda carga de la norma E.020 se convierte a kg/m² o kN/m²'],['fle','El diseño de vigas mezcla kg/cm², cm y t·m']],
g:[
r=>{const fc=r.i(140,700,5);const a=fc*0.0981;return{q:`Un concreto tiene f'_{c} = ${fc} kg/cm². Exprésalo en MPa.`,a,u:'MPa',s:[`Usa el factor: 1 kg/cm² = 0.0981 MPa`,`${fc} × 0.0981 = ${n(a)} MPa`]};},
r=>{const q=r.i(1,12,0.25);const a=q*1000/9.81;return{q:`Una sobrecarga vale ${q} kN/m². ¿Cuántos kg/m² son?`,a,u:'kg/m²',s:[`1 kN = 1000/9.81 kgf = 101.9 kgf`,`${q} × 101.9 = ${n(a)} kg/m²`]};},
r=>{const L=r.i(4,15,.5),B=r.i(3,10,.5),e=r.p([.15,.17,.2,.25]);const V=L*B*e,a=V*2.4;return{q:`Una losa maciza mide ${L} m × ${B} m × ${e*100} cm de espesor. ¿Cuánto pesa? (concreto armado 2.4 t/m³)`,a,u:'t',s:[`Pasa el espesor a metros: ${e} m`,`Volumen = ${L} × ${B} × ${e} = ${n(V)} m³`,`Peso = ${n(V)} × 2.4 = ${n(a)} t`]};},
r=>{const P=r.i(40,300,5),B=r.i(1.2,3.5,.1);const a=P*1000/(B*B*1e4);return{q:`Una columna transmite ${P} t a una zapata cuadrada de ${B} m de lado. Calcula la presión sobre el suelo.`,a,u:'kg/cm²',s:[`Fuerza: ${P} t = ${P*1000} kg`,`Área: (${B*100} cm)² = ${n(B*B*1e4,6)} cm²`,`q = P/A = ${n(a)} kg/cm²`]};},
r=>{const L=r.i(6,20,1),B=r.i(4,10,.5),e=r.p([.1,.15,.2]),c=r.p([300,340,380,420]);const V=L*B*e,a=V*c/42.5;return{q:`Se vaciará un piso de ${L} m × ${B} m y ${e*100} cm de espesor con una mezcla de ${c} kg de cemento por m³. ¿Cuántas bolsas de 42.5 kg se necesitan (sin desperdicio)?`,a,u:'bolsas',s:[`Volumen = ${n(V)} m³`,`Cemento = ${n(V)} × ${c} = ${n(V*c)} kg`,`Bolsas = ${n(V*c)} / 42.5 = ${n(a)}`]};}
]});
SUB('tri',{t:'Trigonometría y triángulos',
lec:`Topografía, armaduras, taludes y fuerzas inclinadas usan lo mismo: un triángulo. Con un ángulo y un lado conoces todo el triángulo rectángulo.

## Las tres razones
- Seno = opuesto / hipotenusa
- Coseno = adyacente / hipotenusa
- Tangente = opuesto / adyacente

La pendiente es una tangente disfrazada: un 8 % significa que subes 8 m por cada 100 m horizontales. Para triángulos sin ángulo recto usa la **ley de senos** o la **ley de cosenos**.

**Imagen mental:** una escalera apoyada en una pared. La pared es el cateto opuesto, el piso el adyacente, la escalera la hipotenusa.`,
key:['sen θ = [[op|hip]], cos θ = [[ady|hip]], tan θ = [[op|ady]]','c^{2} = a^{2} + b^{2} − 2ab·cos C','[[a|sen A]] = [[b|sen B]]'],fig:'triangulo',
err:'Calculadora en radianes. Si sen 30° no te da 0.5, cambia a modo DEG.',
x:[['par','Descomponer fuerzas es usar seno y coseno'],['pol','Las poligonales son triángulos encadenados'],['tal','El ángulo de un talud gobierna su estabilidad']],
g:[
r=>{const h=r.i(3,40,.5),t=r.i(15,70,5);const a=h/tand(t);return{q:`Un talud de ${h} m de altura forma ${t}° con la horizontal. ¿Cuánto mide su proyección horizontal?`,a,u:'m',s:[`tan θ = h / x, entonces x = h / tan θ`,`x = ${h} / tan ${t}° = ${n(a)} m`]};},
r=>{const p=r.i(2,12,.5),L=r.i(50,500,10);const a=p/100*L;return{q:`Una vía tiene pendiente de ${p} % a lo largo de ${L} m horizontales. ¿Cuánto sube?`,a,u:'m',s:[`Pendiente = desnivel / horizontal`,`Δh = ${p/100} × ${L} = ${n(a)} m`]};},
r=>{const d=r.i(20,120,5),t=r.i(10,50,1),e=r.p([1.5,1.6,1.7]);const a=d*tand(t)+e;return{q:`Desde un teodolito a ${e} m de altura, a ${d} m de un edificio, se mide ${t}° hasta su azotea. ¿Qué altura tiene el edificio?`,a,u:'m',s:[`Altura sobre el instrumento = ${d} × tan ${t}° = ${n(a-e)} m`,`Total = ${n(a-e)} + ${e} = ${n(a)} m`]};},
r=>{const A=r.i(40,120,5),b=r.i(30,120,5),c=r.i(40,160,5);const a=sq(b*b+c*c-2*b*c*cosd(A));return{q:`Un lote triangular tiene lados de ${b} m y ${c} m que forman ${A}°. ¿Cuánto mide el tercer lado?`,a,u:'m',s:[`Ley de cosenos: a² = b² + c² − 2bc cos A`,`a² = ${b*b} + ${c*c} − 2(${b})(${c}) cos ${A}° = ${n(a*a)}`,`a = ${n(a)} m`]};},
r=>{const A=r.i(40,70,2),B=r.i(35,65,2),b=r.i(60,300,10);const C=180-A-B,ac=b*sind(B)/sind(C),h=ac*sind(A);return{q:`Para medir el ancho de un río se fija una base AB = ${b} m en una orilla. Hacia un árbol C en la otra orilla se miden los ángulos A = ${A}° y B = ${B}°. ¿Cuál es el ancho del río (distancia perpendicular de C a la base)?`,a:h,u:'m',s:[`Ángulo en C = 180 − ${A} − ${B} = ${C}°`,`Ley de senos: AC = AB·sen B / sen C = ${n(ac)} m`,`Ancho = AC·sen A = ${n(h)} m`]};}
]});
SUB('vec',{t:'Vectores y fuerzas',
lec:`Una fuerza no es solo un número: tiene **dirección**. Por eso se representa con un vector y se separa en componentes.

Si un cable tira con fuerza F a un ángulo θ de la horizontal:

- Componente horizontal: F·cos θ
- Componente vertical: F·sen θ

Para sumar fuerzas, suma las x con las x y las y con las y. Al final recompones: la resultante es la hipotenusa.

**Producto cruz:** el momento es r × F. Solo la parte de la fuerza perpendicular al brazo hace girar, igual que cuando empujas una puerta: cerca de la bisagra cuesta más.`,
key:['F_{x} = F cos θ, F_{y} = F sen θ','R = √{F_{x}^{2} + F_{y}^{2}}','θ = arctan([[F_{y}|F_{x}]])','M = x·F_{y} − y·F_{x}'],
err:'Usar siempre coseno para x. Depende de desde qué eje mides el ángulo.',
x:[['par','El equilibrio es exigir que la suma de vectores sea cero'],['mom','El momento nace del producto cruz'],['rig','Las matrices de rigidez rotan componentes con coseno y seno']],
g:[
r=>{const F=r.i(5,100,5),t=r.i(15,75,5);const a=F*cosd(t);return{q:`Una fuerza de ${F} kN forma ${t}° con el eje x. Calcula F_{x}.`,a,u:'kN',s:[`F_{x} = F cos θ = ${F} × cos ${t}° = ${n(a)} kN`]};},
r=>{const x=r.i(3,60,1),y=r.i(4,80,1);const a=sq(x*x+y*y);return{q:`Una fuerza tiene componentes F_{x} = ${x} kN y F_{y} = ${y} kN. ¿Cuál es su magnitud?`,a,u:'kN',s:[`R = √(${x}² + ${y}²) = ${n(a)} kN`]};},
r=>{const F1=r.i(10,60,5),t1=r.i(10,40,5),F2=r.i(10,60,5),t2=r.i(50,85,5);const X=F1*cosd(t1)+F2*cosd(t2),Y=F1*sind(t1)+F2*sind(t2),a=sq(X*X+Y*Y);return{q:`Dos cables tiran de un gancho: ${F1} kN a ${t1}° y ${F2} kN a ${t2}°, medidos desde el eje x. Calcula la resultante.`,a,u:'kN',s:[`ΣF_{x} = ${n(X)} kN`,`ΣF_{y} = ${n(Y)} kN`,`R = √(${n(X)}² + ${n(Y)}²) = ${n(a)} kN`]};},
r=>{const F1=r.i(10,60,5),t1=r.i(10,40,5),F2=r.i(10,60,5),t2=r.i(100,170,5);const X=F1*cosd(t1)+F2*cosd(t2),Y=F1*sind(t1)+F2*sind(t2);let a=Math.atan2(Y,X)*180/PI;return{q:`Se suman ${F1} kN a ${t1}° y ${F2} kN a ${t2}°. ¿Qué ángulo forma la resultante con el eje x?`,a,u:'°',s:[`ΣF_{x} = ${n(X)}, ΣF_{y} = ${n(Y)}`,`θ = atan2(ΣF_{y}, ΣF_{x}) = ${n(a)}°`]};},
r=>{const F=r.i(10,80,5),t=r.i(20,70,5),x=r.i(1,6,.5),y=r.i(1,5,.5);const Fx=F*cosd(t),Fy=F*sind(t),a=x*Fy-y*Fx;return{q:`Una fuerza de ${F} kN a ${t}° actúa en el punto (${x}, ${y}) m. Calcula su momento respecto al origen (positivo antihorario).`,a,u:'kN·m',s:[`F_{x} = ${n(Fx)}, F_{y} = ${n(Fy)}`,`M = x·F_{y} − y·F_{x} = ${x}(${n(Fy)}) − ${y}(${n(Fx)}) = ${n(a)} kN·m`]};}
]});
SUB('sis',{t:'Sistemas de ecuaciones y matrices',
lec:`Una estructura real se resuelve con cientos de ecuaciones simultáneas. Los programas como ETABS arman la matriz y la resuelven. Tú debes entender qué hacen.

Un sistema [A]{x} = {b} se resuelve por eliminación: combinas filas hasta dejar una sola incógnita por ecuación. En 2×2 se usa rápido la **regla de Cramer** con el determinante.

**Ejemplo mental:** dos resortes en serie comparten fuerzas. Cada nudo da una ecuación; cada desplazamiento es una incógnita. Eso es exactamente el método de rigidez.

Si el determinante vale cero, la estructura es un **mecanismo**: se mueve sin resistir. El álgebra te avisa de un colapso.`,
key:['det = ad − bc','x = [[(d·e − b·f)|det]], y = [[(a·f − c·e)|det]]'],
err:'Intercambiar el orden de las incógnitas al armar la matriz y no reordenar el vector de resultados.',
x:[['rig','El método matricial de rigidez es [K]{d} = {F}'],['arm','Los nudos de una armadura forman un sistema'],['crs','Cross resuelve iterativamente el mismo sistema']],
g:[
r=>{const a=r.i(1,9),b=r.i(1,9),c=r.i(1,9),d=r.i(1,9);const D=a*d-b*c;return{q:`Calcula el determinante de la matriz con filas (${a}, ${b}) y (${c}, ${d}).`,a:D,u:'',s:[`det = ${a}·${d} − ${b}·${c} = ${D}`]};},
r=>{const x=r.i(1,9),y=r.i(1,9),a=r.i(1,5),b=r.i(1,5);const e=x+y,f=a*x+b*y;if(a===b)return{q:`Si x + y = ${e} y x − y = ${x-y}, ¿cuánto vale x?`,a:x,u:'',s:[`Suma ambas ecuaciones: 2x = ${2*x}`,`x = ${x}`]};return{q:`Resuelve: x + y = ${e}; ${a}x + ${b}y = ${f}. ¿Cuánto vale x?`,a:x,u:'',s:[`De la primera: y = ${e} − x`,`${a}x + ${b}(${e} − x) = ${f}`,`x = ${x}`]};},
r=>{const P=r.i(10,60,2),L=r.i(4,12),aa=r.i(1,L-1);const Rb=P*aa/L;return{q:`Una viga simple de ${L} m lleva ${P} kN a ${aa} m del apoyo A. Plantea R_{A}+R_{B}=P y ΣM_{A}=0 y halla R_{B}.`,a:Rb,u:'kN',s:[`Momentos en A: R_{B}·${L} = ${P}·${aa}`,`R_{B} = ${n(Rb)} kN`]};},
r=>{const k1=r.i(100,500,50),k2=r.i(100,500,50),F=r.i(5,50,5);const d2=F/k1+F/k2;return{q:`Dos resortes en serie (k_{1}=${k1} kN/m fijo al muro, k_{2}=${k2} kN/m) reciben F=${F} kN en el extremo libre. Con [K]{d}={F}, halla el desplazamiento del extremo en mm.`,a:d2*1000,u:'mm',s:[`Ambos resortes llevan F: d_{1} = F/k_{1} = ${n(F/k1)} m`,`d_{2} = d_{1} + F/k_{2} = ${n(d2)} m`,`= ${n(d2*1000)} mm`]};},
r=>{const x=r.i(1,6),y=r.i(1,6),z=r.i(1,6);const A=[[2,1,1],[1,3,2],[1,0,2]];const b=A.map(f=>f[0]*x+f[1]*y+f[2]*z);return{q:`Tres nudos cumplen: 2x + y + z = ${b[0]}; x + 3y + 2z = ${b[1]}; x + 2z = ${b[2]}. ¿Cuánto vale z?`,a:z,u:'',s:[`De la tercera: x = ${b[2]} − 2z`,`En la primera: y = ${b[0]} − 2x − z = ${b[0]} − 2(${b[2]}−2z) − z`,`Sustituye en la segunda y despeja: z = ${z}, x = ${x}, y = ${y}`]};}
]});

MOD('m02','Cálculo aplicado','Bases',
'El cálculo es el idioma de las estructuras: la carga se integra para dar cortante, el cortante para dar momento, y el momento para dar la deflexión.',
['Stewart, Cálculo de una variable','Zill, Ecuaciones diferenciales','Kreyszig, Matemáticas avanzadas para ingeniería'],
'UNI: Cálculo Diferencial, Cálculo Integral, Matemática III y IV.');
SUB('der',{t:'Derivadas y optimización',
lec:`Una derivada mide **qué tan rápido cambia algo**. Si M(x) es el momento en una viga, su derivada es el cortante V(x). Donde V = 0 el momento es máximo. Esa es la idea más útil del curso.

## Reglas básicas
- d(x^{n})/dx = n·x^{n−1}
- La derivada de una constante es 0
- Para optimizar: deriva, iguala a cero y despeja

**Ejemplo didáctico:** quieres el canal de mayor sección con la misma cantidad de concreto. Escribes el área en función de una sola variable, derivas e igualas a cero.`,
key:['[[dM|dx]] = V, [[dV|dx]] = −w','Máximo: f′(x) = 0'],
err:'Olvidar comprobar si el punto hallado es máximo o mínimo.',
x:[['vm','V es la derivada de M: de aquí sale el punto de momento máximo'],['man','La sección hidráulica óptima se obtiene derivando'],['ver','La curva vertical es una parábola: su derivada da la pendiente']],
g:[
r=>{const a=r.i(2,9),b=r.i(2,4),x=r.i(1,6);const v=a*b*x**(b-1);return{q:`Si f(x) = ${a}x^{${b}}, calcula f′(${x}).`,a:v,u:'',s:[`f′(x) = ${a*b}x^{${b-1}}`,`f′(${x}) = ${v}`]};},
r=>{const w=r.i(2,30),L=r.i(4,12),x=r.i(1,L-1);const V=w*L/2-w*x;return{q:`En una viga simple con w=${w} kN/m y L=${L} m, M(x) = ${w*L/2}x − ${w/2}x². Calcula V(${x}) = dM/dx.`,a:V,u:'kN',s:[`V(x) = ${w*L/2} − ${w}x`,`V(${x}) = ${V} kN`]};},
r=>{const w=r.i(2,30),L=r.i(4,12);const x=L/2,M=w*L*L/8;return{q:`Para M(x) = ${w*L/2}x − ${w/2}x², halla el momento máximo.`,a:M,u:'kN·m',s:[`M′(x) = ${w*L/2} − ${w}x = 0`,`x = ${x} m`,`M = ${n(M)} kN·m`]};},
r=>{const P=r.i(20,120,4);const b=P/4,a=b*2;return{q:`Con ${P} m de cerco se encierra un terreno rectangular junto a un río (no se cerca ese lado). ¿Cuál es el área máxima?`,a:a*b,u:'m²',s:[`2y + x = ${P}, A = xy = (${P} − 2y)y`,`dA/dy = ${P} − 4y = 0, y = ${b} m`,`x = ${a} m, A = ${a*b} m²`]};},
r=>{const A=r.i(2,20,.5);const y=sq(A/2),b=2*y;return{q:`Un canal rectangular debe tener área A=${A} m² con perímetro mojado mínimo (P=b+2y). Halla el tirante óptimo y.`,a:y,u:'m',s:[`b = A/y, entonces P = A/y + 2y`,`dP/dy = −A/y² + 2 = 0`,`y = √(A/2) = ${n(y)} m (y b = 2y = ${n(b)} m)`]};}
]});
SUB('int',{t:'Integrales: áreas y centroides',
lec:`Integrar es **sumar infinitas tiras**. El área bajo el diagrama de carga es el cortante acumulado; el área bajo el cortante es el momento.

## Usos en obra
- Área de una sección irregular
- Resultante de una carga distribuida: es el área del diagrama
- Centroide: x̄ = ∫x dA / ∫dA, el punto donde actúa la resultante
- Volúmenes de tierra entre secciones

**Imagen:** una carga triangular sobre una viga, como el empuje del agua, equivale a una sola fuerza aplicada a 1/3 de la base.`,
key:['∫x^{n}dx = [[x^{n+1}|n+1]]','R = ∫w(x)dx','x̄ = [[∫x·w dx|∫w dx]]'],
err:'Poner mal los límites de integración, sobre todo en cargas que empiezan a la mitad de la viga.',
x:[['vm','Los diagramas de V y M son integrales'],['cen','El centroide de secciones usa esta fórmula'],['fhi','La fuerza del agua sobre una pared es la integral de la presión'],['def','La deflexión se obtiene integrando dos veces']],
g:[
r=>{const a=r.i(1,6),b=r.i(a+1,10),c=r.i(2,9);const v=c*(b*b-a*a)/2;return{q:`Calcula ∫ ${c}x dx entre x=${a} y x=${b}.`,a:v,u:'',s:[`Primitiva: ${c/2}x²`,`${c/2}(${b*b} − ${a*a}) = ${n(v)}`]};},
r=>{const w=r.i(4,40,2),L=r.i(3,12);return{q:`Una carga triangular crece de 0 a ${w} kN/m en ${L} m. ¿Cuánto vale su resultante?`,a:w*L/2,u:'kN',s:[`Resultante = área = ½·${w}·${L} = ${w*L/2} kN`]};},
r=>{const w=r.i(4,40,2),L=r.i(3,12);return{q:`Para esa misma forma (carga triangular de 0 a ${w} kN/m en ${L} m), ¿a qué distancia del vértice en cero actúa la resultante?`,a:2*L/3,u:'m',s:[`x̄ = ∫x·(${w}x/${L})dx / R`,`Para un triángulo: x̄ = 2L/3 = ${n(2*L/3)} m`]};},
r=>{const c=r.i(1,5),L=r.i(2,8);const v=c*L**3/3;return{q:`La carga en una viga es w(x) = ${c}x² kN/m entre 0 y ${L} m. Calcula la resultante.`,a:v,u:'kN',s:[`R = ∫${c}x²dx = ${c}x³/3`,`R = ${c}·${L**3}/3 = ${n(v)} kN`]};},
r=>{const c=r.i(1,5),L=r.i(2,8);const R=c*L**3/3,M=c*L**4/4;return{q:`Con w(x) = ${c}x² kN/m entre 0 y ${L} m, ¿a qué distancia del origen actúa la resultante?`,a:M/R,u:'m',s:[`R = ${n(R)} kN`,`∫x·w dx = ${c}L⁴/4 = ${n(M)}`,`x̄ = ${n(M)}/${n(R)} = ${n(M/R)} m (siempre 3L/4 en este caso)`]};}
]});
SUB('edo',{t:'Ecuaciones diferenciales',
lec:`Una ecuación diferencial relaciona una cantidad con su ritmo de cambio. Aparece cuando un fenómeno depende de su propio estado:

- **Asentamiento:** el suelo se consolida rápido al inicio y lento al final.
- **Vibración:** m·ü + k·u = 0 describe un edificio oscilando.
- **Decaimiento:** dC/dt = −kC describe la DBO de un río, y también el tiempo de vaciado.
- **Crecimiento:** dP/dt = rP es la población geométrica.

La solución de dy/dt = k·y es siempre una exponencial: y = y_{0}·e^{kt}.`,
key:['[[dy|dt]] = ky → y = y_{0}e^{kt}','mü + ku = 0 → ω = √{k/m}'],
err:'Confundir la constante k positiva (crecimiento) y negativa (decaimiento).',
x:[['osc','La oscilación libre es una EDO de segundo orden'],['cns','La consolidación de Terzaghi es una ecuación diferencial'],['pob','El crecimiento geométrico sale de dP/dt = rP'],['pta','La DBO decae exponencialmente']],
g:[
r=>{const y0=r.i(10,200,10),k=r.i(.05,.5,.05),t=r.i(1,10);const a=y0*Math.exp(-k*t);return{q:`Si dC/dt = −${k}C y C(0)=${y0} mg/L, halla C a los t=${t} días.`,a,u:'mg/L',s:[`C = C_{0}e^{−kt}`,`C = ${y0}·e^{−${n(k*t)}} = ${n(a)} mg/L`]};},
r=>{const P=r.i(1000,50000,500),rr=r.i(.5,3.5,.5),t=r.i(5,30,5);const a=P*Math.exp(rr/100*t);return{q:`Una población de ${P} hab. crece según dP/dt = rP con r=${rr} % anual. ¿Cuántos habrá en ${t} años?`,a,u:'hab',s:[`P = P_{0}e^{rt}`,`P = ${P}·e^{${n(rr/100*t)}} = ${n(a,6)}`]};},
r=>{const k=r.i(.05,.5,.01);const a=Math.log(2)/k;return{q:`Si una sustancia decae con k=${k} 1/día, ¿cuál es su vida media?`,a,u:'días',s:[`½ = e^{−kt}`,`t = ln 2 / k = ${n(a)} días`]};},
r=>{const y0=r.i(50,500,50),t1=r.i(1,5),ff=r.i(40,80,5);const k=-Math.log(ff/100)/t1;return{q:`Un contaminante baja de ${y0} a ${n(y0*ff/100)} mg/L en ${t1} días (decaimiento exponencial). Halla k.`,a:k,u:'1/día',s:[`e^{−k·${t1}} = ${ff/100}`,`k = −ln(${ff/100})/${t1} = ${n(k)} 1/día`]};},
r=>{const m=r.i(10,200,10),k=r.i(1000,40000,1000);const w=sq(k/m),T=2*PI/w;return{q:`Una masa de ${m} t sobre una rigidez lateral de ${k} kN/m cumple mü+ku=0. Halla su periodo natural.`,a:T,u:'s',s:[`ω = √(k/m) = √(${k}/${m}) = ${n(w)} rad/s (kN/t = m/s²)`,`T = 2π/ω = ${n(T)} s`]};}
]});

MOD('m03','Estadística y métodos numéricos','Bases',
'El concreto nunca sale igual dos veces y la lluvia nunca se repite. La estadística te dice cuánto confiar, y los métodos numéricos resuelven lo que no sale con lápiz.',
['Walpole y Myers, Probabilidad y estadística para ingeniería','Montgomery, Applied Statistics and Probability for Engineers','Chapra y Canale, Métodos numéricos para ingenieros'],
'UNI: Estadística y Probabilidades, Métodos Numéricos, Programación Digital. PUCP: Estadística para Ingeniería.');
SUB('est',{t:'Estadística de control de obra',
lec:`Rompes probetas de concreto y cada una da un valor distinto. ¿Cuál es la resistencia real? Necesitas dos números: el **promedio** y la **desviación estándar**, que mide la dispersión.

## Para qué sirve
La norma exige diseñar la mezcla con una resistencia mayor a la especificada, f'_{cr} > f'_{c}, para que pocas probetas salgan por debajo. Cuanto peor es el control de obra (mayor s), más cemento debes pagar.

El coeficiente de variación CV = s/x̄ permite comparar la calidad de dos obras distintas.`,
key:['x̄ = [[Σx|n]]','s = √{[[Σ(x−x̄)^{2}|n−1]]}','CV = [[s|x̄]]','f\'_{cr} = f\'_{c} + 1.34s'],
err:'Dividir entre n en vez de n−1 cuando los datos son una muestra.',
x:[['mez','f\'cr entra directo al diseño de mezclas'],['pro','La curva normal da la probabilidad de falla']],
g:[
r=>{const v=[r.i(200,240,5),r.i(200,240,5),r.i(200,240,5),r.i(200,240,5)];const a=v.reduce((x,y)=>x+y)/4;return{q:`Cuatro probetas dieron ${v.join(', ')} kg/cm². Calcula el promedio.`,a,u:'kg/cm²',s:[`x̄ = (${v.join(' + ')}) / 4 = ${n(a)}`]};},
r=>{const v=[r.i(200,250,2),r.i(200,250,2),r.i(200,250,2),r.i(200,250,2),r.i(200,250,2)];const m=v.reduce((x,y)=>x+y)/5,s=sq(v.reduce((x,y)=>x+(y-m)**2,0)/4)||0;return{q:`Resistencias: ${v.join(', ')} kg/cm². Calcula la desviación estándar muestral.`,a:s,u:'kg/cm²',s:[`x̄ = ${n(m)}`,`Σ(x−x̄)² = ${n(s*s*4)}`,`s = √(${n(s*s*4)}/4) = ${n(s)}`]};},
r=>{const m=r.i(210,350,5),s=r.i(10,45,1);return{q:`Una obra tiene x̄=${m} kg/cm² y s=${s} kg/cm². Calcula su coeficiente de variación en %.`,a:s/m*100,u:'%',s:[`CV = ${s}/${m} × 100 = ${n(s/m*100)} %`]};},
r=>{const f=r.p([175,210,245,280,350]),s=r.i(15,40,1);const a=Math.max(f+1.34*s,f+2.33*s-35);return{q:`Para f'_{c}=${f} kg/cm² y s=${s} kg/cm², calcula f'_{cr} según ACI: el mayor de f'_{c}+1.34s y f'_{c}+2.33s−35.`,a,u:'kg/cm²',s:[`f'_{c}+1.34s = ${n(f+1.34*s)}`,`f'_{c}+2.33s−35 = ${n(f+2.33*s-35)}`,`Tomas el mayor: ${n(a)} kg/cm²`]};},
r=>{const f=r.p([210,280]),s1=r.i(15,25,1),s2=r.i(30,45,1),c=r.p([6,7,8]);const d=1.34*(s2-s1);const pct=(c*d/10);return{q:`Una obra mejora su control de s=${s2} a s=${s1} kg/cm² (f'_{c}=${f}). Si cada 10 kg/cm² de f'_{cr} cuestan ${c} kg de cemento por m³, ¿cuántos kg/m³ se ahorran? Usa f'_{cr}=f'_{c}+1.34s.`,a:pct,u:'kg/m³',s:[`Δf'_{cr} = 1.34(${s2}−${s1}) = ${n(d)} kg/cm²`,`Ahorro = ${c}·${n(d)}/10 = ${n(pct)} kg/m³`]};}
]});
SUB('pro',{t:'Probabilidad y periodo de retorno',
lec:`¿Una lluvia de 100 años cae una vez cada 100 años? **No**. Significa que cada año tiene 1 % de probabilidad de ocurrir. Puede caer dos años seguidos.

## Riesgo
Si una obra dura n años, la probabilidad de ver al menos una vez un evento de periodo T es:

R = 1 − (1 − 1/T)^{n}

La norma sísmica peruana usa un sismo con 10 % de probabilidad de ser superado en 50 años. Eso da T = 475 años.

## Distribución normal
Muchos datos se agrupan en campana. El valor z = (x − x̄)/s indica a cuántas desviaciones estás del promedio.`,
key:['R = 1 − (1 − [[1|T]])^{n}','z = [[x − x̄|s]]'],
err:'Creer que tras un evento grande hay que esperar T años para el siguiente.',
x:[['rac','El caudal de diseño depende del periodo de retorno'],['esp','El factor Z de la norma E.030 sale de este cálculo'],['est','z conecta la dispersión con la falla']],
g:[
r=>{const T=r.p([2,4,5,10,20,25,30,40,50,75,100,150,200,250,475,500,1000]);return{q:`¿Qué probabilidad anual, en %, tiene un evento de periodo de retorno ${T} años?`,a:100/T,u:'%',s:[`p = 1/T = ${n(100/T)} %`]};},
r=>{const T=r.p([10,25,50,100,200]),m=r.i(5,50,5);const a=(1-(1-1/T)**m)*100;return{q:`Una obra de ${m} años de vida se expone a un evento de T=${T} años. ¿Cuál es el riesgo de que ocurra al menos una vez?`,a,u:'%',s:[`R = 1 − (1 − 1/${T})^{${m}}`,`R = ${n(a)} %`]};},
r=>{const x=r.i(180,260,5),m=r.i(210,280,5),s=r.i(15,40,5);const a=(x-m)/s;return{q:`Un dato vale x=${x}, con promedio ${m} y s=${s}. Calcula z.`,a,u:'',s:[`z = (${x} − ${m}) / ${s} = ${n(a)}`]};},
r=>{const m=r.p([10,20,25,30,50]),R=r.p([5,10,20,30,50]);const T=1/(1-(1-R/100)**(1/m));return{q:`Para un riesgo aceptable de ${R} % en ${m} años, ¿qué periodo de retorno debe usarse?`,a:T,u:'años',s:[`1 − 1/T = (1 − ${R/100})^{1/${m}}`,`T = ${n(T)} años`]};},
r=>{const R=r.p([2,5,10,15,20]),m=r.p([30,50,75,100]),k=r.p([10,25,40]);const T=1/(1-(1-R/100)**(1/m));const p=(1-(1-1/T)**k)*100;return{q:`Un sismo se define con ${R} % de excedencia en ${m} años. ¿Cuál es la probabilidad de que ocurra en ${k} años?`,a:p,u:'%',s:[`Primero T = ${n(T)} años`,`R = 1 − (1−1/T)^{${k}} = ${n(p)} %`]};}
]});
SUB('num',{t:'Métodos numéricos',
lec:`Muchas ecuaciones de ingeniería no se despejan. La ecuación de Manning para el tirante de un canal o la de Colebrook para tuberías se resuelven por tanteos ordenados.

## Newton-Raphson
Parte de una suposición y mejora con la tangente: x_{nuevo} = x − f(x)/f′(x). Converge muy rápido si empiezas cerca.

## Trapecio
Para integrar datos de campo, como secciones de un río o de una vía, parte el área en trapecios y súmalos. Con **Simpson** logras más precisión usando parábolas.

## Por qué importa
Todo programa de análisis usa estos métodos. Si conoces el método, sabrás cuándo un resultado no es confiable.`,
key:['x_{i+1} = x_{i} − [[f(x_{i})|f′(x_{i})]]','A ≈ [[h|2]](y_{0} + 2y_{1} + … + y_{n})','Simpson: [[h|3]](y_{0} + 4y_{1} + y_{2})'],
err:'Dejar de iterar antes de que el resultado se estabilice.',
x:[['fpe','Colebrook se resuelve iterando'],['man','El tirante normal requiere tanteos'],['are','El área de un río se integra con trapecio y Simpson']],
g:[
r=>{const h=r.i(1,5),a=r.i(2,10),b=r.i(2,10);return{q:`Con franjas de ${h} m, las alturas son ${a} y ${b} m en un trapecio. Calcula el área.`,a:h*(a+b)/2,u:'m²',s:[`A = h(y₀+y₁)/2 = ${n(h*(a+b)/2)} m²`]};},
r=>{const h=r.i(2,10),y=[r.i(0,3,.5),r.i(1,5,.5),r.i(2,6,.5),r.i(1,5,.5),r.i(0,3,.5)];const a=h/2*(y[0]+2*(y[1]+y[2]+y[3])+y[4]);return{q:`Profundidades de un río cada ${h} m: ${y.join(', ')} m. Calcula el área por trapecios.`,a,u:'m²',s:[`A = h/2·(y₀ + 2Σyᵢ + yₙ)`,`A = ${h/2}·(${y[0]} + 2·${y[1]+y[2]+y[3]} + ${y[4]}) = ${n(a)} m²`]};},
r=>{const h=r.i(2,10),y=[r.i(1,3,.5),r.i(2,6,.5),r.i(1,3,.5)];const a=h/3*(y[0]+4*y[1]+y[2]);return{q:`Con Simpson y h=${h} m, las ordenadas son ${y.join(', ')} m. Calcula el área.`,a,u:'m²',s:[`A = h/3·(y₀+4y₁+y₂) = ${n(a)} m²`]};},
r=>{const c=r.i(3,90);const x0=Math.max(1,Math.round(sq(c)));const a=x0-(x0*x0-c)/(2*x0);return{q:`Con Newton-Raphson para f(x)=x²−${c}, parte de x₀=${x0}. ¿Cuánto vale x₁?`,a,u:'',tol:.005,s:[`f(x₀) = ${x0*x0-c}, f′(x₀) = ${2*x0}`,`x₁ = ${x0} − ${x0*x0-c}/${2*x0} = ${n(a,5)}`]};},
r=>{const c=r.i(2,40);let x=2;for(let i=0;i<8;i++)x=x-(x*x*x+x-c)/(3*x*x+1);return{q:`Halla la raíz real de x³ + x = ${c} con 3 decimales usando Newton-Raphson.`,a:x,u:'',tol:.003,s:[`f(x)=x³+x−${c}, f′(x)=3x²+1`,`Itera desde x₀=2 hasta estabilizar`,`x ≈ ${n(x,5)}`]};}
]});

MOD('m04','Física para ingenieros','Bases',
'Newton explica casi toda la ingeniería civil. Si una estructura no se mueve, las fuerzas se cancelan. Si vibra, aparece la inercia del sismo.',
['Serway y Jewett, Física para ciencias e ingeniería','Hibbeler, Dinámica','Beer y Johnston, Mecánica vectorial: Dinámica'],
'UNI: Física I y II, Dinámica. PUCP: Dinámica (1ING14). MIT: 1.058 Structural Dynamics como continuación.');
SUB('new',{t:'Leyes de Newton',
lec:`**F = m·a** es la base de todo. Si la aceleración es cero, la suma de fuerzas es cero: eso es la estática.

Cuando un sismo acelera el suelo, cada piso quiere quedarse quieto por inercia. Por eso aparece una fuerza lateral igual a masa por aceleración. Un edificio más pesado sufre más fuerza sísmica: por esto se busca aligerarlo.

**Peso y masa no son lo mismo:** una masa de 1000 kg pesa 9.81 kN.`,
key:['F = m·a','W = m·g','v = v_{0} + at, x = v_{0}t + ½at^{2}'],
err:'Sumar toneladas-fuerza con toneladas-masa como si fueran lo mismo.',
x:[['par','Con a=0 tienes estática'],['esp','V = masa × aceleración espectral'],['gdl','mü + ku = 0 es Newton aplicado a un edificio']],
g:[
r=>{const m=r.i(100,5000,100);return{q:`Una masa de ${m} kg, ¿cuánto pesa en kN?`,a:m*G/1000,u:'kN',s:[`W = mg = ${m}·9.81 = ${n(m*G)} N = ${n(m*G/1000)} kN`]};},
r=>{const m=r.i(50,800,50),ac=r.i(.1,.6,.05);return{q:`Un piso de ${m} t se acelera a ${ac}g en un sismo. ¿Qué fuerza de inercia aparece?`,a:m*ac*G,u:'kN',s:[`F = m·a = ${m}·${ac}·9.81 = ${n(m*ac*G)} kN`]};},
r=>{const v=r.i(20,110,10),d=r.i(1,6,.5);const vm=v/3.6,a=vm*vm/(2*d*G)*1;const t=vm/(d);return{q:`Un camión a ${v} km/h frena a ${d} m/s² constantes. ¿Qué distancia recorre hasta detenerse?`,a:vm*vm/(2*d),u:'m',s:[`v = ${n(vm)} m/s`,`d = v²/(2a) = ${n(vm*vm/(2*d))} m`]};},
r=>{const m=r.i(500,5000,250),t=r.i(5,30,5),mu=r.p([.1,.2,.3,.4]);const a=m*G*(sind(t)+mu*cosd(t))/1000;return{q:`Se sube una carga de ${m} kg a velocidad constante por una rampa de ${t}° con fricción μ=${mu}. ¿Qué fuerza se requiere?`,a,u:'kN',s:[`Paralela al plano: W sen θ = ${n(m*G*sind(t)/1000)} kN`,`Fricción: μW cos θ = ${n(m*G*mu*cosd(t)/1000)} kN`,`F = ${n(a)} kN`]};},
r=>{const m=r.i(1000,5000,500),ac=r.i(.5,2.5,.25),L=r.i(10,40,5);const T=m*(G+ac)/1000;return{q:`Una grúa levanta ${m} kg con aceleración de ${ac} m/s². ¿Qué tensión lleva el cable?`,a:T,u:'kN',s:[`ΣF = T − mg = ma`,`T = m(g+a) = ${n(T)} kN`]};}
]});
SUB('ene',{t:'Trabajo y energía',
lec:`Energía es la capacidad de hacer trabajo. Se transforma, no se pierde. Esa idea lleva a dos métodos enormes:

- **Bernoulli** en fluidos: la energía del agua por unidad de peso se conserva.
- **Trabajo virtual** en estructuras: el trabajo externo iguala la energía interna, y de ahí sale la deflexión.

Una bomba entrega potencia P = γQH. Un sismo inyecta energía, y el acero dúctil la disipa al fluir. Por esto se pide ductilidad.`,
key:['W = F·d','E_{p} = mgh, E_{c} = ½mv^{2}','P = [[W|t]]'],
err:'Olvidar que los kW son kJ/s: la unidad de tiempo debe coincidir.',
x:[['fbe','Bernoulli es conservación de energía'],['tvi','El trabajo virtual calcula deflexiones'],['fbo','La potencia de bombeo usa estas unidades']],
g:[
r=>{const F=r.i(5,100,5),d=r.i(1,30);return{q:`Una fuerza de ${F} kN mueve un objeto ${d} m. Calcula el trabajo.`,a:F*d,u:'kJ',s:[`W = F·d = ${F*d} kJ`]};},
r=>{const m=r.i(200,3000,100),h=r.i(3,40);return{q:`Se eleva una masa de ${m} kg a ${h} m. ¿Qué energía potencial gana?`,a:m*G*h/1000,u:'kJ',s:[`E = mgh = ${n(m*G*h/1000)} kJ`]};},
r=>{const h=r.i(2,60);return{q:`Un objeto cae ${h} m sin fricción. ¿Con qué velocidad llega?`,a:sq(2*G*h),u:'m/s',s:[`mgh = ½mv²`,`v = √(2gh) = ${n(sq(2*G*h))} m/s`]};},
r=>{const m=r.i(500,5000,500),h=r.i(5,50,5),t=r.i(10,120,10),ef=r.p([.6,.7,.8]);const P=m*G*h/t/ef/1000;return{q:`Un montacarga eleva ${m} kg a ${h} m en ${t} s con eficiencia ${ef*100} %. ¿Qué potencia consume?`,a:P,u:'kW',s:[`Potencia útil = mgh/t = ${n(m*G*h/t/1000)} kW`,`Consumida = ${n(m*G*h/t/1000)}/${ef} = ${n(P)} kW`]};},
r=>{const m=r.i(50,300,10),h=r.i(.5,3,.1),k=r.i(500,5000,250);const d=(m*G/k/1000)*1000;const a=(m*G+sq((m*G)**2+2*m*G*h*k*1000))/(k*1000);return{q:`Una masa de ${m} kg cae ${h} m sobre un resorte k=${k} kN/m. ¿Cuál es la compresión máxima?`,a:a,u:'m',s:[`Energía: mg(h+δ) = ½kδ²`,`Resolviendo la cuadrática: δ = ${n(a)} m`]};}
]});
SUB('osc',{t:'Oscilaciones',
lec:`Empuja un edificio y suéltalo: se mueve de un lado a otro con un periodo propio T. Es como un columpio: tiene su ritmo. Si el suelo vibra a ese mismo ritmo, aparece **resonancia** y el movimiento crece.

- Más rigidez: T menor, vibra más rápido.
- Más masa: T mayor, vibra más lento.

Regla práctica: un edificio de concreto con pórticos tiene T ≈ 0.1 s por piso. El suelo blando de la costa amplifica periodos largos; el daño depende de cómo encajan los dos.`,
key:['ω = √{[[k|m]]}','T = [[2π|ω]]','f = [[1|T]]'],fig:'osc',
err:'Mezclar unidades de masa y rigidez. Con k en kN/m, usa m en toneladas.',
x:[['gdl','Es la base de la dinámica estructural'],['esp','El periodo T define el factor C'],['pan','Pandeo y vibración comparten la idea de rigidez']],
g:[
r=>{const T=r.i(.2,2.5,.1);return{q:`Un edificio tiene T=${T} s. ¿Cuál es su frecuencia?`,a:1/T,u:'Hz',s:[`f = 1/T = ${n(1/T)} Hz`]};},
r=>{const k=r.i(1000,50000,1000),m=r.i(50,500,10);return{q:`Con k=${k} kN/m y m=${m} t, calcula ω.`,a:sq(k/m),u:'rad/s',s:[`ω = √(k/m) = ${n(sq(k/m))} rad/s`]};},
r=>{const k=r.i(2000,60000,1000),m=r.i(50,800,10);const T=2*PI/sq(k/m);return{q:`Un pórtico de ${m} t y rigidez lateral ${k} kN/m. ¿Cuál es su periodo?`,a:T,u:'s',s:[`T = 2π√(m/k) = ${n(T)} s`]};},
r=>{const T=r.i(.2,1.5,.05),m=r.i(100,800,50);const k=m*(2*PI/T)**2;return{q:`Una masa de ${m} t debe vibrar con T=${T} s. ¿Qué rigidez lateral necesita?`,a:k,u:'kN/m',s:[`k = m(2π/T)² = ${n(k)} kN/m`]};},
r=>{const T1=r.i(.4,1.5,.1),f=r.i(1.5,4,.5);const a=T1/sq(f);return{q:`Un edificio con T=${T1} s se rigidiza con muros y su k aumenta ${f} veces. ¿Cuál es el nuevo periodo?`,a,u:'s',s:[`T ∝ 1/√k`,`T′ = ${T1}/√${f} = ${n(a)} s`]};}
]});
