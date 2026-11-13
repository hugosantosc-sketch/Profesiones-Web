/* Ciencias básicas: álgebra lineal, cálculo vectorial y EDP, química general */
MOD('m47','Álgebra lineal','Bases',
'Todo programa de cálculo estructural, de redes de agua o de elementos finitos resuelve matrices. Aquí aprendes lo que pasa dentro: operaciones, determinantes, eliminación, valores propios y mínimos cuadrados.',
['Strang, Introduction to Linear Algebra (MIT 18.06)','Grossman, Álgebra lineal','Lay, Álgebra lineal y sus aplicaciones','Chapra y Canale, Métodos numéricos para ingenieros'],
'UNI: Álgebra Lineal (BMA03). PUCP: Álgebra Matricial y Geometría Analítica. MIT 18.06 Linear Algebra.');
SUB('alm1',{t:'Matrices y operaciones',
lec:`Una **matriz** es una tabla de números con m filas y n columnas. En ingeniería, una matriz guarda de forma ordenada los coeficientes de muchas ecuaciones: la matriz de rigidez de un edificio puede tener miles de filas.

## Operaciones
- **Suma:** elemento a elemento, solo entre matrices del mismo tamaño
- **Producto por escalar:** cada elemento por el número
- **Producto de matrices:** (AB)_{ij} = Σ_{k} a_{ik}b_{kj}. Fila de A por columna de B. Solo existe si las columnas de A son tantas como las filas de B
- **Transpuesta:** se cambian filas por columnas: (Aᵀ)_{ij} = a_{ji}
- **Traza:** suma de la diagonal

## Propiedades importantes
- AB ≠ BA en general: el orden importa
- (AB)ᵀ = BᵀAᵀ
- Una matriz es **simétrica** si A = Aᵀ. Las matrices de rigidez son simétricas (teorema de Maxwell-Betti)

## Sistema de ecuaciones
Ax = b reúne en una línea todas las ecuaciones: cada fila de A son los coeficientes de una ecuación.`,
ded:`## Por qué fila por columna
Si y = Bx y z = Ay, entonces z = A(Bx). El componente i de z es Σ_{k}a_{ik}y_{k} = Σ_{k}a_{ik}Σ_{j}b_{kj}x_{j} = Σ_{j}(Σ_{k}a_{ik}b_{kj})x_{j}. El paréntesis es el elemento (AB)_{ij}: la regla fila por columna sale de aplicar una transformación después de otra (Strang).

## Por qué (AB)ᵀ = BᵀAᵀ
El elemento (i, j) de (AB)ᵀ es el (j, i) de AB: Σ_{k}a_{jk}b_{ki}. El elemento (i, j) de BᵀAᵀ es Σ_{k}(Bᵀ)_{ik}(Aᵀ)_{kj} = Σ_{k}b_{ki}a_{jk}. Son la misma suma.

## Por qué la rigidez es simétrica
Por el teorema de reciprocidad de Maxwell-Betti, la fuerza en el grado i por un desplazamiento unitario en j es igual a la fuerza en j por un desplazamiento unitario en i: k_{ij} = k_{ji}.`,
key:['(AB)_{ij} = Σa_{ik}b_{kj}','(AB)^{T} = B^{T}A^{T}','tr(A) = Σa_{ii}','A = A^{T} (simétrica)'],
err:'Multiplicar matrices elemento a elemento o suponer que AB = BA.',
x:[['sis','Sistemas de ecuaciones'],['mk1','Matriz de rigidez'],['alm2','Determinante e inversa']],
g:[
r=>{const a=[r.i(-9,9,1),r.i(-9,9,1)],b=[r.i(-9,9,1),r.i(-9,9,1)];return{q:`Fila (${a.join(', ')}) por columna (${b.join(', ')}). Halla el producto.`,a:a[0]*b[0]+a[1]*b[1],u:'',tol:0,s:[`= ${a[0]}·${b[0]} + ${a[1]}·${b[1]} = ${a[0]*b[0]+a[1]*b[1]}`]};},
r=>{const A=[[r.i(-5,5,1),r.i(-5,5,1)],[r.i(-5,5,1),r.i(-5,5,1)]],B=[[r.i(-5,5,1),r.i(-5,5,1)],[r.i(-5,5,1),r.i(-5,5,1)]];const i=r.p([0,1]),j=r.p([0,1]);return{q:`A = [${A[0].join(' ')}; ${A[1].join(' ')}], B = [${B[0].join(' ')}; ${B[1].join(' ')}]. Halla el elemento (${i+1}, ${j+1}) de AB.`,a:A[i][0]*B[0][j]+A[i][1]*B[1][j],u:'',tol:0,s:[`Fila ${i+1} de A por columna ${j+1} de B = ${A[i][0]*B[0][j]+A[i][1]*B[1][j]}`]};},
r=>{const A=[[r.i(-6,6,1),r.i(-6,6,1),r.i(-6,6,1)],[r.i(-6,6,1),r.i(-6,6,1),r.i(-6,6,1)],[r.i(-6,6,1),r.i(-6,6,1),r.i(-6,6,1)]];const t=A[0][0]+A[1][1]+A[2][2];return{q:`A = [${A.map(f=>f.join(' ')).join('; ')}]. Halla la traza de A + Aᵀ.`,a:2*t,u:'',tol:0,s:[`tr(A + Aᵀ) = 2·tr(A) = 2·${t} = ${2*t}`]};},
r=>{const A=[[r.i(-4,4,1),r.i(-4,4,1),r.i(-4,4,1)],[r.i(-4,4,1),r.i(-4,4,1),r.i(-4,4,1)]],x=[r.i(-5,5,1),r.i(-5,5,1),r.i(-5,5,1)];const y=A.map(f=>f[0]*x[0]+f[1]*x[1]+f[2]*x[2]);return{q:`A (2×3) = [${A.map(f=>f.join(' ')).join('; ')}] y x = (${x.join(', ')}). Halla la suma de las componentes de Ax.`,a:y[0]+y[1],u:'',tol:0,s:[`Ax = (${y.join(', ')})`,`Suma = ${y[0]+y[1]}`]};},
r=>{const k=[r.i(1000,9000,500),r.i(1000,9000,500),r.i(1000,9000,500)],u=[r.i(-5,5,1),r.i(-5,5,1),r.i(-5,5,1)];const K=[[k[0]+k[1],-k[1],0],[-k[1],k[1]+k[2],-k[2]],[0,-k[2],k[2]]];const F=K.map(f=>f[0]*u[0]+f[1]*u[1]+f[2]*u[2]);return{q:`Edificio de 3 pisos con rigideces k₁=${k[0]}, k₂=${k[1]}, k₃=${k[2]} kN/m. Arma K (tridiagonal) y halla la fuerza en el piso 2 para desplazamientos u = (${u.join(', ')}) mm, en kN.`,a:F[1]/1000,u:'kN',s:[`Fila 2 de K: (${K[1].join(', ')})`,`F₂ = ${F[1]} kN·mm/m = ${n(F[1]/1000)} kN`]};}
],
cri:[
['¿Por qué al armar la matriz de rigidez de un pórtico se verifica que sea simétrica?',['Por estética','Porque por reciprocidad debe serlo: si no lo es, hay un error de ensamblaje','Porque ocupa menos espacio','No importa'],1,'k_{ij} = k_{ji} por Maxwell-Betti. Una asimetría delata un error de signo o de posición.'],
['Calculas AB y BA con dos matrices 2×2 y salen distintas. ¿Error?',['Sí, siempre deben ser iguales','No: el producto de matrices no es conmutativo','Solo si son simétricas','Error de calculadora'],1,'Aplicar primero B y luego A no es lo mismo que al revés, igual que girar y luego estirar no es estirar y luego girar.']
],
ref:['Strang, Introduction to Linear Algebra, capítulos 1 y 2','Lay, Álgebra lineal y sus aplicaciones']});
SUB('alm2',{t:'Determinante e inversa',
lec:`## Determinante
Es un número que resume a una matriz cuadrada:
- 2×2: det = ad − bc
- 3×3 (por cofactores de la primera fila): det = a₁₁(a₂₂a₃₃ − a₂₃a₃₂) − a₁₂(a₂₁a₃₃ − a₂₃a₃₁) + a₁₃(a₂₁a₃₂ − a₂₂a₃₁)

Si det = 0 la matriz es **singular**: el sistema Ax = b no tiene solución única. En estructuras significa que la estructura es inestable (un mecanismo).

## Inversa
A⁻¹ es la matriz tal que AA⁻¹ = I. Existe solo si det ≠ 0.
- 2×2: A⁻¹ = (1/det)[d −b; −c a]
- En general: A⁻¹ = adj(A)/det(A), con adj la transpuesta de los cofactores

Con la inversa: x = A⁻¹b. En la práctica, los programas no calculan la inversa (es lenta e imprecisa): resuelven el sistema por eliminación.

## Matriz de flexibilidad
La inversa de la rigidez es la flexibilidad: F = K⁻¹. Si K da fuerzas a partir de desplazamientos, F da desplazamientos a partir de fuerzas.`,
ded:`## Qué mide el determinante
En 2D, las columnas de A son dos vectores; |det A| es el área del paralelogramo que forman. Si son paralelos, el área es cero: la matriz "aplasta" el plano en una línea y pierde información, por eso no se puede invertir.

## La inversa 2×2
Busca X = [x y; z w] tal que AX = I. Resolviendo las cuatro ecuaciones: x = d/det, y = −b/det, z = −c/det, w = a/det. Se comprueba multiplicando: [a b; c d][d −b; −c a] = [ad − bc 0; 0 ad − bc] = det·I.

## Por qué no se invierte en la práctica
Calcular A⁻¹ cuesta unas tres veces más operaciones que resolver Ax = b por eliminación, y acumula más errores de redondeo (Strang; Chapra y Canale).`,
key:['det = ad − bc','A^{−1} = [[1|det]][d −b; −c a]','A^{−1} = [[adj A|det A]]','F = K^{−1}'],
err:'Intentar invertir una matriz con determinante cero.',
x:[['alm1','Operaciones'],['sis','Cramer usa determinantes'],['mk2','Rigidez y flexibilidad']],
g:[
r=>{const a=r.i(-9,9,1),b=r.i(-9,9,1),c=r.i(-9,9,1),d=r.i(-9,9,1);return{q:`A = [${a} ${b}; ${c} ${d}]. Halla det A.`,a:a*d-b*c,u:'',tol:0,s:[`= ${a}·${d} − ${b}·${c} = ${a*d-b*c}`]};},
r=>{let a=r.i(1,9,1),b=r.i(-5,5,1),c=r.i(-5,5,1),d=r.i(1,9,1);if(a*d-b*c===0)d++;const D=a*d-b*c;return{q:`A = [${a} ${b}; ${c} ${d}]. Halla el elemento (1,1) de A⁻¹.`,a:d/D,u:'',s:[`det = ${D}`,`(A⁻¹)₁₁ = d/det = ${d}/${D} = ${n(d/D)}`]};},
r=>{const M=[[r.i(-4,4,1),r.i(-4,4,1),r.i(-4,4,1)],[r.i(-4,4,1),r.i(-4,4,1),r.i(-4,4,1)],[r.i(-4,4,1),r.i(-4,4,1),r.i(-4,4,1)]];const [[a,b,c],[d,e,f],[g,h,i]]=M;const D=a*(e*i-f*h)-b*(d*i-f*g)+c*(d*h-e*g);return{q:`A = [${M.map(x=>x.join(' ')).join('; ')}]. Halla det A.`,a:D,u:'',tol:0,s:[`= ${a}(${e*i-f*h}) − ${b}(${d*i-f*g}) + ${c}(${d*h-e*g}) = ${D}`]};},
r=>{let a=r.i(1,9,1),b=r.i(-5,5,1),c=r.i(-5,5,1),d=r.i(1,9,1);if(a*d-b*c===0)a++;const D=a*d-b*c,p=r.i(-20,20,1),q=r.i(-20,20,1);return{q:`Resuelve con la inversa: [${a} ${b}; ${c} ${d}]x = (${p}, ${q}). Halla x₁.`,a:(d*p-b*q)/D,u:'',s:[`x = A⁻¹b → x₁ = (d·p − b·q)/det = (${d*p-b*q})/${D} = ${n((d*p-b*q)/D)}`]};},
r=>{const k1=r.i(2000,10000,500),k2=r.i(2000,10000,500);const K=[[k1+k2,-k2],[-k2,k2]],D=K[0][0]*K[1][1]-K[0][1]*K[1][0];const F11=K[1][1]/D,F22=K[0][0]/D;const P=r.i(10,200,5);return{q:`Edificio de 2 pisos con k₁=${k1} y k₂=${k2} kN/m. Con F = K⁻¹, halla el desplazamiento del techo por una fuerza de ${P} kN en el techo, en mm.`,a:F22*P*1000,u:'mm',s:[`K = [${K[0].join(' ')}; ${K[1].join(' ')}], det = ${D}`,`F₂₂ = ${K[0][0]}/${D} = ${n(F22,4)} m/kN`,`Δ = ${n(F22*P*1000)} mm (igual a P/k₁ + P/k₂)`]};}
],
cri:[
['El programa de análisis dice "matriz singular". ¿Qué revisas primero?',['La impresora','Los apoyos y las liberaciones: probablemente hay un mecanismo','El color de los elementos','El IGV'],1,'det = 0 en la rigidez indica que la estructura puede moverse sin resistencia en algún grado de libertad.'],
['¿Por qué un det muy pequeño (no cero) también preocupa?',['No preocupa','Indica una matriz mal condicionada: pequeños errores en los datos dan grandes errores en la solución','Porque es negativo','Por costumbre'],1,'Sistemas casi singulares amplifican el redondeo; en estructuras, suelen ser elementos casi inestables o rigideces muy dispares.']
],
ref:['Strang, Introduction to Linear Algebra, capítulos 2 y 5','Grossman, Álgebra lineal']});
SUB('alm3',{t:'Eliminación de Gauss y factorización LU',
lec:`Así resuelven los programas los sistemas grandes.

## Eliminación de Gauss
1. Con la primera ecuación se eliminan los términos de x₁ en las de abajo: a cada fila i se le resta (a_{i1}/a_{11}) veces la fila 1
2. Se repite con la segunda columna, y así hasta formar una matriz triangular superior U
3. **Sustitución hacia atrás:** se despeja la última incógnita y se sube

## Factorización LU
Los multiplicadores usados (ℓ_{ij} = a_{ij}/a_{jj}) forman una matriz triangular inferior L con unos en la diagonal: A = LU. Si cambian las cargas b pero no la estructura, se reutiliza L y U: solo se resuelven dos sistemas triangulares (Ly = b, luego Ux = y). Así se analizan muchas combinaciones de carga muy rápido.

## Pivoteo
Si un pivote a_{jj} es cero o muy pequeño, se intercambian filas para usar el mayor disponible: evita divisiones entre cero y errores de redondeo.

## Costo
Resolver un sistema n×n por eliminación cuesta del orden de n³/3 operaciones.`,
ded:`## Por qué funciona la eliminación
Restar a una ecuación un múltiplo de otra no cambia la solución: si x satisface ambas, también satisface su combinación. Así se puede transformar el sistema hasta uno triangular equivalente, que se resuelve fácil.

## De dónde sale A = LU
Cada paso de eliminación equivale a multiplicar por una matriz elemental E (la identidad con −ℓ_{ij} en la posición (i, j)). Tras todos los pasos: E_{k}…E₁A = U. Las inversas de esas matrices tienen +ℓ_{ij}, y su producto es justamente L con los multiplicadores en su lugar (Strang). Por eso A = LU.

## n³/3
Para eliminar la columna j hay que actualizar (n − j)² elementos. Sumando de j = 1 a n: Σ(n − j)² ≈ n³/3.`,
key:['ℓ_{ij} = [[a_{ij}|a_{jj}]]','A = LU','Ly = b; Ux = y','Costo ≈ [[n^{3}|3]]'],
err:'No pivotear cuando el pivote es cero o casi cero.',
x:[['sis','Sistemas pequeños'],['mk2','Sistemas de rigidez'],['num','Métodos numéricos']],
g:[
r=>{const a=r.i(1,9,1),c=r.i(-9,9,1);return{q:`Primera columna (${a}, ${c}). Halla el multiplicador ℓ₂₁.`,a:c/a,u:'',s:[`ℓ₂₁ = ${c}/${a} = ${n(c/a)}`]};},
r=>{const x=[r.i(-5,5,1),r.i(-5,5,1),r.i(-5,5,1)],U=[[r.i(1,5,1),r.i(-3,3,1),r.i(-3,3,1)],[0,r.i(1,5,1),r.i(-3,3,1)],[0,0,r.i(1,5,1)]];const b=U.map(f=>f[0]*x[0]+f[1]*x[1]+f[2]*x[2]);return{q:`Sistema triangular: ${U[0][0]}x₁ + ${U[0][1]}x₂ + ${U[0][2]}x₃ = ${b[0]}; ${U[1][1]}x₂ + ${U[1][2]}x₃ = ${b[1]}; ${U[2][2]}x₃ = ${b[2]}. Halla x₁.`,a:x[0],u:'',tol:0,s:[`x₃ = ${x[2]}; x₂ = ${x[1]}; x₁ = ${x[0]}`]};},
r=>{const x=[r.i(-5,5,1),r.i(-5,5,1)];let A=[[r.i(1,6,1),r.i(-4,4,1)],[r.i(-6,6,1),r.i(1,6,1)]];if(A[0][0]*A[1][1]-A[0][1]*A[1][0]===0)A[1][1]++;const b=A.map(f=>f[0]*x[0]+f[1]*x[1]);const l=A[1][0]/A[0][0],u22=A[1][1]-l*A[0][1];return{q:`Elimina en [${A[0].join(' ')}; ${A[1].join(' ')}]x = (${b.join(', ')}). Halla u₂₂ (el nuevo elemento (2,2)).`,a:u22,u:'',s:[`ℓ = ${n(l)}`,`u₂₂ = ${A[1][1]} − ${n(l)}·${A[0][1]} = ${n(u22)}`,`Luego x = (${x.join(', ')})`]};},
r=>{const x=[r.i(-4,4,1),r.i(-4,4,1),r.i(-4,4,1)];const A=[[r.i(2,6,1),r.i(-2,2,1),r.i(-2,2,1)],[r.i(-2,2,1),r.i(2,6,1),r.i(-2,2,1)],[r.i(-2,2,1),r.i(-2,2,1),r.i(2,6,1)]];const b=A.map(f=>f[0]*x[0]+f[1]*x[1]+f[2]*x[2]);return{q:`Resuelve por Gauss: [${A.map(f=>f.join(' ')).join('; ')}]x = (${b.join(', ')}). Halla x₃.`,a:x[2],u:'',tol:0,s:[`Eliminando las dos primeras columnas y sustituyendo hacia atrás: x = (${x.join(', ')})`]};},
r=>{const nn=r.p([100,500,1000,5000,10000,50000]),f=r.p([1e8,1e9,1e10]);return{q:`Un modelo tiene ${nn} grados de libertad (matriz llena). Con un computador de ${f.toExponential(0)} operaciones por segundo, ¿cuántos segundos tarda la eliminación (n³/3)?`,a:nn**3/3/f,u:'s',s:[`Operaciones = ${n(nn**3/3,4)}`,`t = ${n(nn**3/3/f,4)} s (los programas aprovechan que K es dispersa y en banda, y tardan mucho menos)`]};}
],
cri:[
['¿Por qué los programas de estructuras guardan K en "banda"?',['Por moda','Porque cada nudo solo se conecta con sus vecinos: casi todos los elementos son cero y la eliminación se limita a una banda','Para imprimirla','No lo hacen'],1,'Aprovechar la dispersión reduce el costo de n³ a algo cercano a n·b² (b = ancho de banda).'],
['Debes analizar 30 combinaciones de carga en el mismo edificio. ¿Qué conviene?',['Resolver 30 veces desde cero','Factorizar K = LU una vez y resolver 30 sistemas triangulares','Invertir K 30 veces','Usar solo una combinación'],1,'La factorización es lo caro; las sustituciones cuestan muy poco.']
],
ref:['Strang, Introduction to Linear Algebra, capítulo 2','Chapra y Canale, Métodos numéricos para ingenieros, parte 3']});
SUB('alm4',{t:'Valores y vectores propios',
lec:`Un **vector propio** v de A es una dirección que A no gira: solo la estira. Av = λv, con λ el **valor propio**.

## Cómo se hallan
(A − λI)v = 0 tiene solución no nula si det(A − λI) = 0: la **ecuación característica**. Para 2×2:

λ² − tr(A)λ + det(A) = 0

## Propiedades útiles
- Suma de valores propios = traza; producto = determinante
- Una matriz simétrica tiene valores propios reales y vectores propios perpendiculares

## Dónde aparecen en ingeniería civil
- **Esfuerzos principales:** son los valores propios del tensor de esfuerzos [σ_{x} τ; τ σ_{y}]; sus direcciones, los vectores propios. El círculo de Mohr es una forma gráfica de hallarlos
- **Modos de vibración:** de Kφ = ω²Mφ. Las frecuencias al cuadrado son valores propios y los modos, vectores propios
- **Pandeo:** las cargas críticas son valores propios de la matriz de rigidez geométrica`,
ded:`## La ecuación característica 2×2
det([a − λ, b; c, d − λ]) = (a − λ)(d − λ) − bc = λ² − (a + d)λ + (ad − bc). Por eso aparecen la traza y el determinante. Por Vieta, la suma de raíces es a + d y su producto ad − bc.

## Esfuerzos principales
Con A = [σ_{x} τ; τ σ_{y}]: λ = (σ_{x} + σ_{y})/2 ± √(((σ_{x} − σ_{y})/2)² + τ²). Es exactamente la fórmula del círculo de Mohr: centro en el promedio y radio igual a la raíz.

## Por qué simétrica implica direcciones perpendiculares
Si Av₁ = λ₁v₁ y Av₂ = λ₂v₂, entonces λ₁(v₁·v₂) = (Av₁)·v₂ = v₁·(Aᵀv₂) = v₁·(Av₂) = λ₂(v₁·v₂). Si λ₁ ≠ λ₂, la única salida es v₁·v₂ = 0. Por eso los planos principales son perpendiculares.`,
key:['Av = λv','det(A − λI) = 0','λ^{2} − tr(A)λ + det(A) = 0','Σλ = tr; Πλ = det'],
err:'Olvidar que el vector propio solo vale hasta un factor: cualquier múltiplo también lo es.',
x:[['moh','Círculo de Mohr'],['gd2','Modos de vibración'],['pan','Pandeo como problema de valores propios']],
g:[
r=>{const a=r.i(-9,9,1),b=r.i(-9,9,1),c=r.i(-9,9,1),d=r.i(-9,9,1);return{q:`A = [${a} ${b}; ${c} ${d}]. Halla la suma de sus valores propios.`,a:a+d,u:'',tol:0,s:[`Σλ = traza = ${a+d}`]};},
r=>{const l1=r.i(-8,8,1),l2=r.i(-8,8,1),k=r.i(-3,3,1);const a=l1,d=l2,b=k;return{q:`A = [${a} ${b}; 0 ${d}] (triangular). Halla el valor propio mayor.`,a:Math.max(a,d),u:'',tol:0,s:[`En una triangular, los valores propios son la diagonal: ${a} y ${d}`]};},
r=>{const sx=r.i(-100,200,5),sy=r.i(-100,200,5),t=r.i(-80,80,5);const c=(sx+sy)/2,R=Math.hypot((sx-sy)/2,t);return{q:`Tensor de esfuerzos [${sx} ${t}; ${t} ${sy}] kg/cm². Halla σ₁ (valor propio mayor).`,a:c+R,u:'kg/cm²',s:[`λ² − ${sx+sy}λ + ${sx*sy-t*t} = 0`,`σ₁ = ${n(c)} + ${n(R)} = ${n(c+R)} kg/cm²`]};},
r=>{const a=r.i(1,9,1),b=r.i(-5,5,1)||1,d=r.i(1,9,1);const T=a+d,D=a*d-b*b,l=(T+sq(T*T-4*D))/2;return{q:`A = [${a} ${b}; ${b} ${d}]. Para el valor propio mayor, el vector propio es (1, k). Halla k.`,a:(l-a)/b,u:'',s:[`λ_{máx} = ${n(l)}`,`De la fila 1: ${a} + ${b}k = λ → k = ${n((l-a)/b)}`]};},
r=>{const k=r.i(2000,20000,500),m=r.i(5,50,1);const l1=(3-sq(5))/2*k/m,l2=(3+sq(5))/2*k/m;return{q:`Dos pisos iguales: K = k[2 −1; −1 1], M = m·I, con k=${k} kN/m y m=${m} t. Halla el periodo del primer modo (ω² es el menor valor propio de M⁻¹K).`,a:2*PI/sq(l1),u:'s',s:[`Valores propios de [2 −1; −1 1]: (3 ∓ √5)/2 = 0.382 y 2.618`,`ω₁² = 0.382·${k}/${m} = ${n(l1)} → ω₁ = ${n(sq(l1))}`,`T₁ = ${n(2*PI/sq(l1))} s`]};}
],
cri:[
['¿Qué representan los vectores propios del tensor de esfuerzos?',['Nada útil','Las direcciones principales: planos sin corte, donde están los esfuerzos máximo y mínimo','La carga','El peso'],1,'Por eso las fisuras de tracción en concreto siguen esas direcciones.'],
['Un modelo da un valor propio negativo en un análisis de vibración. ¿Qué indica?',['Un modo muy rápido','Un error o una inestabilidad: con K y M positivas los ω² deben ser positivos','Nada','Mayor rigidez'],1,'ω² < 0 significaría una frecuencia imaginaria: la estructura es inestable o el modelo tiene errores.']
],
ref:['Strang, Introduction to Linear Algebra, capítulo 6','Chopra, Dynamics of Structures, capítulo 10 (problema de valores propios)']});
SUB('alm5',{t:'Mínimos cuadrados en forma matricial',
lec:`Cuando hay más ecuaciones que incógnitas (más mediciones que parámetros), el sistema Ax = b no tiene solución exacta. Se busca la x que **minimiza el error** |Ax − b|².

## Ecuaciones normales
AᵀAx̂ = Aᵀb

Para ajustar una recta y = c₀ + c₁t a n puntos: A tiene una columna de unos y una columna con los t_{i}. Las ecuaciones normales quedan:
- n·c₀ + Σt·c₁ = Σy
- Σt·c₀ + Σt²·c₁ = Σty

## Usos
- Ajuste de curvas de laboratorio
- **Compensación de redes topográficas y GNSS:** hay más mediciones que coordenadas desconocidas; los mínimos cuadrados dan las coordenadas más probables
- Calibración de modelos

## Residuos
r = b − Ax̂. Su suma de cuadrados mide qué tan bien ajusta el modelo.`,
ded:`## De dónde salen las ecuaciones normales
El error es E = (Ax − b)ᵀ(Ax − b). Derivando respecto a x e igualando a cero: 2Aᵀ(Ax − b) = 0, es decir AᵀAx = Aᵀb.

## La geometría
Ax recorre todas las combinaciones de las columnas de A (un plano, si A tiene dos columnas). El punto más cercano a b en ese plano es su proyección perpendicular: el residuo b − Ax̂ debe ser perpendicular a todas las columnas de A, o sea Aᵀ(b − Ax̂) = 0. Es la misma ecuación (Strang, capítulo 4).

## Relación con la regresión
Las ecuaciones normales para una recta, resueltas, dan exactamente b = S_{xy}/S_{xx} y a = ȳ − bx̄ del tema de regresión. Gauss inventó el método en 1809 para calcular la órbita de Ceres a partir de observaciones redundantes.`,
key:['A^{T}Ax̂ = A^{T}b','r = b − Ax̂','A^{T}r = 0'],
err:'Resolver solo con tantas ecuaciones como incógnitas y desechar las mediciones redundantes.',
x:[['reg','Regresión lineal'],['pol','Compensación de poligonales'],['niv','Redes de nivelación']],
g:[
r=>{const t=[0,1,2],y=t.map(()=>r.i(-10,20,1));return{q:`Puntos (0, ${y[0]}), (1, ${y[1]}), (2, ${y[2]}). Halla Σy y Σty (escribe Σty).`,a:y[1]+2*y[2],u:'',tol:0,s:[`Σy = ${y[0]+y[1]+y[2]}`,`Σty = 0·${y[0]} + 1·${y[1]} + 2·${y[2]} = ${y[1]+2*y[2]}`]};},
r=>{const t=[r.i(0,3,1),r.i(4,7,1),r.i(8,12,1)];return{q:`Para ajustar una recta con t = ${t.join(', ')}, halla el elemento (2,2) de AᵀA (Σt²).`,a:t[0]**2+t[1]**2+t[2]**2,u:'',tol:0,s:[`AᵀA = [3 ${t[0]+t[1]+t[2]}; ${t[0]+t[1]+t[2]} ${t[0]**2+t[1]**2+t[2]**2}]`]};},
r=>{const t=[0,1,2,3],c0=r.i(-5,10,1),c1=r.i(-3,5,.5),e=[r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5)];const y=t.map((v,i)=>c0+c1*v+e[i]);const Sy=y.reduce((a,b)=>a+b),Sty=y.reduce((a,b,i)=>a+t[i]*b,0);const det=4*14-36,b1=(4*Sty-6*Sy)/det,b0=(Sy-6*b1)/4;return{q:`Ajusta y = c₀ + c₁t a (0, ${y[0]}), (1, ${y[1]}), (2, ${y[2]}), (3, ${y[3]}). Halla c₁.`,a:b1,u:'',s:[`AᵀA = [4 6; 6 14], Aᵀb = (${n(Sy)}, ${n(Sty)})`,`c₁ = ${n(b1)}, c₀ = ${n(b0)}`]};},
r=>{const t=[0,1,2,3],c0=r.i(-5,10,1),c1=r.i(-3,5,.5),e=[r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5),r.i(-1,1,.5)];const y=t.map((v,i)=>c0+c1*v+e[i]);const Sy=y.reduce((a,b)=>a+b),Sty=y.reduce((a,b,i)=>a+t[i]*b,0);const b1=(4*Sty-6*Sy)/20,b0=(Sy-6*b1)/4;const R=y.reduce((a,v,i)=>a+(v-b0-b1*t[i])**2,0);return{q:`Con los puntos (0, ${y[0]}), (1, ${y[1]}), (2, ${y[2]}), (3, ${y[3]}), halla la suma de cuadrados de los residuos de la recta de mínimos cuadrados.`,a:R,u:'',s:[`Recta: y = ${n(b0)} + ${n(b1)}t`,`Σr² = ${n(R,4)}`]};},
r=>{const H=[r.i(100,120,.001)],d1=r.i(1,5,.001),d2=r.i(1,5,.001),e=r.i(-.03,.03,.001);const hA=+(H[0]).toFixed(3),hB=+(hA+d1).toFixed(3),hC=+(hB+d2).toFixed(3);const m1=+(d1).toFixed(3),m2=+(d2).toFixed(3),m3=+(d1+d2+e).toFixed(3);const B=((2*(hA+m1)+(hA+m3)-m2)/3);return{q:`Nivelación: cota de A = ${hA} m. Se midieron A→B = ${m1} m, B→C = ${m2} m y A→C = ${m3} m (con pesos iguales). Con mínimos cuadrados, la cota de B es [2(A + d_{AB}) + (A + d_{AC}) − d_{BC}]/3. Halla la cota de B.`,a:B,u:'m',tol:.0001,s:[`Hay 3 mediciones para 2 cotas: se reparte el error de cierre ${n(m3-m1-m2,3)} m`,`B = ${n(B,7)} m`]};}
],
cri:[
['En una red GNSS mediste más líneas base de las necesarias. ¿Las descartas?',['Sí, sobran','No: con mínimos cuadrados mejoran la precisión y permiten detectar errores groseros','Solo si llueve','Da igual'],1,'La redundancia es la que permite estimar la precisión y encontrar mediciones malas por sus residuos.']
],
ref:['Strang, Introduction to Linear Algebra, capítulo 4 (proyecciones y mínimos cuadrados)','Ghilani, Adjustment Computations: Spatial Data Analysis']});

MOD('m48','Cálculo vectorial y ecuaciones diferenciales','Bases',
'Las leyes del agua que fluye, del calor que pasa por un muro y de la presión de poros que se disipa están escritas en derivadas parciales e integrales en varias dimensiones. Aquí aprendes a leerlas y resolverlas.',
['Stewart, Cálculo de varias variables','Marsden y Tromba, Cálculo vectorial','Zill, Ecuaciones diferenciales con aplicaciones','Kreyszig, Matemáticas avanzadas para ingeniería','Boyce y DiPrima, Ecuaciones diferenciales y problemas con valores en la frontera'],
'UNI: Cálculo Integral, Cálculo Vectorial, Ecuaciones Diferenciales. PUCP: Cálculo en Varias Variables, Ecuaciones Diferenciales. MIT 18.02 y 18.03.');
SUB('cvt1',{t:'Integrales dobles: áreas, centroides e inercias',
lec:`Una integral doble suma una función sobre una región: ∫∫_{R} f(x, y) dA.

## Usos directos
- Área: A = ∫∫dA
- Momento estático y centroide: x̄ = ∫∫x dA/A, ȳ = ∫∫y dA/A
- Momento de inercia: I_{x} = ∫∫y² dA
- Volumen bajo una superficie: V = ∫∫z dA

## Regiones no rectangulares
Se integra primero en una dirección con límites que dependen de la otra. Para un triángulo de base b y altura h (vértice arriba), el ancho a una altura y es b(1 − y/h).

## Coordenadas polares
En regiones circulares: x = r cos θ, y = r sen θ, y dA = r dr dθ. El factor r aparece porque los "rectángulos" polares crecen al alejarse del centro.

Para un círculo: I_{x} = ∫₀^{2π}∫₀^{R} (r sen θ)²·r dr dθ = πR⁴/4.`,
ded:`## Inercia de un triángulo respecto a su base
Con la base sobre el eje x, el ancho a la altura y es b(1 − y/h). I = ∫₀^{h} y²·b(1 − y/h) dy = b[h³/3 − h³/4] = bh³/12. Con ejes paralelos se pasa al centroide (a h/3): I_{c} = bh³/12 − (bh/2)(h/3)² = bh³/36.

## Círculo en polares
I_{x} = ∫∫y² dA = ∫₀^{2π}sen²θ dθ·∫₀^{R} r³ dr = π·R⁴/4. Por simetría I_{y} es igual, y el momento polar J = I_{x} + I_{y} = πR⁴/2 = πd⁴/32: el que se usa en torsión.

## Por qué dA = r dr dθ
Un pequeño sector de radio r, espesor dr y ángulo dθ tiene lados dr y r·dθ: su área es r dr dθ (Stewart).`,
key:['A = ∫∫dA','x̄ = [[∫∫x dA|A]]','I_{x} = ∫∫y^{2}dA','dA = r dr dθ'],
err:'Olvidar el factor r en coordenadas polares.',
x:[['cen','Centroides e inercias'],['int','Integrales simples'],['mvar','Volúmenes']],
g:[
r=>{const b=r.i(10,60,1),h=r.i(10,80,1);return{q:`Triángulo de base ${b} cm y altura ${h} cm. Halla su inercia respecto a la base (bh³/12).`,a:b*h**3/12,u:'cm⁴',s:[`= ${b}·${h}³/12 = ${n(b*h**3/12,6)} cm⁴`]};},
r=>{const b=r.i(10,60,1),h=r.i(10,80,1);return{q:`Triángulo de base ${b} y altura ${h} cm. Halla la inercia centroidal (bh³/36).`,a:b*h**3/36,u:'cm⁴',s:[`= ${n(b*h**3/36,6)} cm⁴`]};},
r=>{const d=r.i(5,120,1);return{q:`Círculo de diámetro ${d} cm. Halla I_{x} = πd⁴/64.`,a:PI*d**4/64,u:'cm⁴',s:[`= ${n(PI*d**4/64,6)} cm⁴`]};},
r=>{const a=r.i(1,5,.5),L=r.i(2,8,1);return{q:`Región bajo y = ${a}x² entre x = 0 y x = ${L}. Halla la abscisa del centroide x̄.`,a:3*L/4,u:'',s:[`A = ∫${a}x² dx = ${n(a*L**3/3)}`,`∫x·y dx = ${n(a*L**4/4)}`,`x̄ = (${a}L⁴/4)/(${a}L³/3) = 3L/4 = ${n(3*L/4)}`]};},
r=>{const D=r.i(20,120,1),t=r.i(1,10,.5);const d=D-2*t;return{q:`Tubo de diámetro exterior ${D} cm y espesor ${t} cm. Halla su momento polar J = π(D⁴ − d⁴)/32.`,a:PI*(D**4-d**4)/32,u:'cm⁴',s:[`d = ${d} cm`,`J = ${n(PI*(D**4-d**4)/32,6)} cm⁴`]};}
],
cri:[
['¿Por qué un tubo resiste casi igual a torsión que una barra maciza del mismo diámetro, con mucho menos material?',['No resiste igual','Porque en J = ∫r²dA el material cercano al centro aporta muy poco','Por el acero','Por la forma'],1,'El material lejos del eje aporta con r²; el del centro casi nada. Por eso los ejes y postes son huecos.']
],
ref:['Stewart, Cálculo de varias variables, capítulo 15','Beer y Johnston, Mecánica vectorial: Estática (momentos de inercia)']});
SUB('cvt2',{t:'Integrales de línea y trabajo',
lec:`Una integral de línea suma algo a lo largo de una curva.

## Trabajo de una fuerza
W = ∫_{C} F·dr = ∫(F_{x}dx + F_{y}dy). Solo cuenta la componente de la fuerza a lo largo del camino.

## Campos conservativos
Si F = ∇φ (es el gradiente de un potencial), el trabajo solo depende de los extremos: W = φ(B) − φ(A). La gravedad es conservativa: subir un peso cuesta lo mismo por cualquier camino.

Prueba en 2D: F es conservativo si ∂F_{y}/∂x = ∂F_{x}/∂y.

## Teorema de Green
Para una curva cerrada C que encierra la región R:

∮_{C}(P dx + Q dy) = ∫∫_{R}(∂Q/∂x − ∂P/∂y) dA

Consecuencia práctica: el área encerrada por una curva es ½∮(x dy − y dx). Es la fórmula del zapatero para calcular áreas por coordenadas en topografía.

## En hidráulica
La circulación del flujo alrededor de una curva cerrada; si es cero, el flujo es irrotacional y existe un potencial de velocidades (base de las redes de flujo).`,
ded:`## Área de un polígono con Green
Con P = −y/2 y Q = x/2: ∂Q/∂x − ∂P/∂y = 1/2 + 1/2 = 1, así que ∮(x dy − y dx)/2 = ∫∫1 dA = A. En un lado recto entre (x_{i}, y_{i}) y (x_{i+1}, y_{i+1}), la integral vale (x_{i}y_{i+1} − x_{i+1}y_{i})/2. Sumando todos los lados se obtiene la fórmula de Gauss para áreas por coordenadas (Marsden y Tromba).

## Por qué el trabajo de un campo conservativo no depende del camino
Si F = ∇φ: F·dr = dφ, la diferencial total. Integrar una diferencial total da la diferencia de valores en los extremos.`,
key:['W = ∫F·dr','F = ∇φ ⇒ W = φ(B) − φ(A)','∮(Pdx + Qdy) = ∫∫(Q_{x} − P_{y})dA','A = ½∮(x dy − y dx)'],
err:'Calcular el trabajo como fuerza por longitud del camino sin proyectar la fuerza.',
x:[['ene','Trabajo y energía'],['are','Áreas por coordenadas'],['flu','Redes de flujo']],
g:[
r=>{const Fx=r.i(-20,20,1),Fy=r.i(-20,20,1),dx=r.i(-10,10,1),dy=r.i(-10,10,1);return{q:`Fuerza constante F = (${Fx}, ${Fy}) N y desplazamiento recto (${dx}, ${dy}) m. Halla el trabajo.`,a:Fx*dx+Fy*dy,u:'J',tol:0,s:[`W = ${Fx}·${dx} + ${Fy}·${dy} = ${Fx*dx+Fy*dy} J`]};},
r=>{const m=r.i(10,500,10),h=r.i(1,30,.5);return{q:`Un bloque de ${m} kg se sube ${h} m de altura por una rampa larga y curva. Halla el trabajo contra la gravedad en kJ.`,a:m*G*h/1000,u:'kJ',s:[`La gravedad es conservativa: W = mgh = ${n(m*G*h/1000)} kJ, sin importar el camino`]};},
r=>{const a=r.i(1,5,1),b=r.i(1,5,1),L=r.i(1,6,1);return{q:`F = (${a}y, ${b}x). Halla el trabajo de (0,0) a (${L},${L}) por la recta y = x.`,a:(a+b)*L*L/2,u:'',s:[`Con x = y = t: W = ∫₀^{${L}}(${a}t + ${b}t)dt = ${(a+b)}·${L}²/2 = ${n((a+b)*L*L/2)}`,a===b?'Aquí ∂F_{y}/∂x = ∂F_{x}/∂y: el campo es conservativo':'El campo no es conservativo: otro camino daría otro trabajo']};},
r=>{const P=[[0,0],[r.i(5,30,1),0],[r.i(5,30,1),r.i(5,30,1)],[0,r.i(5,30,1)]];let s=0;for(let i=0;i<4;i++){const [x1,y1]=P[i],[x2,y2]=P[(i+1)%4];s+=x1*y2-x2*y1;}return{q:`Polígono con vértices ${P.map(p=>'('+p.join(',')+')').join(', ')} m. Halla su área con ½∮(x dy − y dx).`,a:Math.abs(s)/2,u:'m²',s:[`Σ(x_{i}y_{i+1} − x_{i+1}y_{i}) = ${s}`,`A = ${n(Math.abs(s)/2)} m²`]};},
r=>{const k=r.i(1,6,1),R=r.i(1,10,.5);return{q:`Campo de velocidades v = (−${k}y, ${k}x). Halla la circulación ∮v·dr alrededor de un círculo de radio ${R} (con Green: ∫∫(∂v_{y}/∂x − ∂v_{x}/∂y)dA).`,a:2*k*PI*R*R,u:'',s:[`∂v_{y}/∂x − ∂v_{x}/∂y = ${k} + ${k} = ${2*k}`,`Circulación = ${2*k}·π·${R}² = ${n(2*k*PI*R*R)} (flujo rotacional)`]};}
],
cri:[
['¿Por qué la fórmula de áreas por coordenadas da negativo a veces?',['Error','Porque depende del sentido de recorrido: horario da negativo y antihorario positivo; se toma el valor absoluto','Porque hay puntos negativos','Por la escala'],1,'El signo viene de la orientación de la curva en el teorema de Green.']
],
ref:['Marsden y Tromba, Cálculo vectorial','Stewart, Cálculo de varias variables, capítulo 16']});
SUB('cvt3',{t:'Divergencia, flujo y continuidad',
lec:`## Flujo a través de una superficie
Cuánto de un campo (agua, calor) atraviesa una superficie: Φ = ∫∫F·n dS. Si F es la velocidad del agua, Φ es el caudal.

## Divergencia
∇·F = ∂F_{x}/∂x + ∂F_{y}/∂y + ∂F_{z}/∂z mide cuánto "sale" de un punto por unidad de volumen. Positiva: fuente; negativa: sumidero.

## Teorema de la divergencia (Gauss)
∯_{S}F·n dS = ∭_{V}∇·F dV. Lo que sale por la superficie cerrada es lo que se genera dentro.

## Ecuación de continuidad
Para un fluido incompresible no se crea ni se destruye masa: ∇·v = 0. Es la versión diferencial de Q = AV. En suelos, combinada con Darcy (v = −k∇h), da la **ecuación de Laplace**: ∇²h = 0, que es la base de las redes de flujo.

## Gradiente, divergencia y laplaciano
∇²h = ∇·(∇h) = ∂²h/∂x² + ∂²h/∂y². Aparece en flujo en suelos, conducción de calor y elasticidad.`,
ded:`## La divergencia como balance
Toma un cubito dx·dy·dz. En la dirección x, entra v_{x}(x)dydz y sale v_{x}(x + dx)dydz ≈ [v_{x} + (∂v_{x}/∂x)dx]dydz. La salida neta es (∂v_{x}/∂x)dxdydz. Sumando las tres direcciones: (∇·v)dV. Si el fluido es incompresible y no hay fuentes, esa salida neta debe ser cero.

## De continuidad a Laplace en suelos
Darcy: v = −k∇h. Continuidad: ∇·v = 0. Combinando con k constante: −k∇²h = 0, es decir ∂²h/∂x² + ∂²h/∂y² = 0. Las soluciones son las redes de flujo: equipotenciales y líneas de corriente perpendiculares (Cedergren, Seepage, Drainage, and Flow Nets).`,
key:['Φ = ∫∫F·n dS','∇·F = [[∂F_{x}|∂x]] + [[∂F_{y}|∂y]] + [[∂F_{z}|∂z]]','∯F·n dS = ∭∇·F dV','∇^{2}h = 0'],
err:'Olvidar que solo la componente normal del campo atraviesa la superficie.',
x:[['fbe','Continuidad en tuberías'],['flu','Ecuación de Laplace y redes de flujo'],['calor','Conducción de calor']],
g:[
r=>{const a=r.i(-9,9,1),b=r.i(-9,9,1),c=r.i(-9,9,1);return{q:`F = (${a}x, ${b}y, ${c}z). Halla ∇·F.`,a:a+b+c,u:'',tol:0,s:[`= ${a} + ${b} + ${c} = ${a+b+c}`]};},
r=>{const v=r.i(.1,5,.1),A=r.i(.5,20,.5),t=r.i(0,80,5);return{q:`Flujo uniforme de ${v} m/s atraviesa una superficie plana de ${A} m² cuya normal forma ${t}° con el flujo. Halla el caudal.`,a:v*A*cosd(t),u:'m³/s',s:[`Φ = vA cos θ = ${n(v*A*cosd(t))} m³/s`]};},
r=>{const a=r.i(-9,9,1),b=r.i(-9,9,1);return{q:`v = (${a}x, ${b}y, cz) m/s. ¿Qué valor de c hace que el flujo sea incompresible?`,a:-(a+b),u:'',tol:0,s:[`∇·v = ${a} + ${b} + c = 0 → c = ${-(a+b)}`]};},
r=>{const a=r.i(1,5,1),b=r.i(1,5,1),c=r.i(1,5,1),L=r.i(1,4,1);return{q:`F = (${a}x, ${b}y, ${c}z). Halla el flujo total que sale de un cubo de lado ${L} (teorema de la divergencia).`,a:(a+b+c)*L**3,u:'',s:[`∇·F = ${a+b+c}`,`Flujo = ${a+b+c}·${L}³ = ${(a+b+c)*L**3}`]};},
r=>{const k=r.i(1,50,1)*1e-6,H=r.i(2,10,.5),Nf=r.i(3,6,1),Nd=r.i(8,16,1),B=r.i(10,100,5);const q=k*H*Nf/Nd;return{q:`Bajo una presa de ${B} m de largo, la red de flujo (solución de ∇²h = 0) tiene N_{f}=${Nf}, N_{d}=${Nd}. k=${n(k,3)} m/s, H=${H} m. Halla la filtración total en m³/día.`,a:q*B*86400,u:'m³/día',s:[`q = kH·N_{f}/N_{d} = ${n(q,4)} m³/s/m`,`Q = ${n(q*B*86400)} m³/día`]};}
],
cri:[
['¿Por qué las líneas de flujo y las equipotenciales se cortan a 90° en una red de flujo?',['Por costumbre','Porque el agua se mueve según −∇h, que es perpendicular a las líneas de igual h','Por la gravedad','No se cortan'],1,'El gradiente siempre es perpendicular a las curvas de nivel de la función: igual que el agua baja perpendicular a las curvas de nivel del terreno.']
],
ref:['Marsden y Tromba, Cálculo vectorial','Cedergren, Seepage, Drainage, and Flow Nets','Harr, Groundwater and Seepage']});
SUB('edo2',{t:'Ecuaciones diferenciales de segundo orden',
lec:`La ecuación más importante de la dinámica estructural:

mü + cu̇ + ku = F(t)

## Solución homogénea (vibración libre)
Se prueba u = e^{st}: ms² + cs + k = 0 (ecuación característica).
- Raíces complejas (c pequeño, el caso real de los edificios): u = e^{−ζωt}(A cos ω_{d}t + B sen ω_{d}t), con ω_{d} = ω√(1 − ζ²)
- Raíces reales: no oscila (sobreamortiguado)

## Solución particular
Para F = F₀ sen(Ωt) se prueba u = C sen(Ωt) + D cos(Ωt) (coeficientes indeterminados).

## Solución completa
u = homogénea + particular, con A y B de las condiciones iniciales u(0) y u̇(0).

## Otros casos en civil
- Viga sobre fundación elástica: EI·y⁗ + ky = q (cuarto orden)
- Pandeo: EI·y″ + Py = 0 (da la carga de Euler)`,
ded:`## Por qué probar e^{st}
Derivar una exponencial la reproduce: si u = e^{st}, u̇ = se^{st} y ü = s²e^{st}. Reemplazando, e^{st}(ms² + cs + k) = 0: el problema diferencial se vuelve algebraico.

## Raíces complejas
s = [−c ± √(c² − 4mk)]/(2m). Con ζ = c/(2mω) y ω² = k/m: s = −ζω ± iω√(1 − ζ²). Por la fórmula de Euler, e^{iθ} = cos θ + i sen θ, las exponenciales complejas se combinan en senos y cosenos multiplicados por e^{−ζωt} (Boyce y DiPrima; Chopra).

## Constantes
Con u(0) = u₀ y u̇(0) = v₀: A = u₀ y B = (v₀ + ζωu₀)/ω_{d}.`,
key:['mü + cu̇ + ku = F(t)','ms^{2} + cs + k = 0','u = e^{−ζωt}(A cos ω_{d}t + B sen ω_{d}t)','ω_{d} = ω√{1 − ζ^{2}}'],
err:'Usar ω en vez de ω_{d} en la solución amortiguada (aunque con ζ = 5 % casi no cambia).',
x:[['edo','Primer orden'],['gdl','Un grado de libertad'],['pan','Pandeo como EDO']],
g:[
r=>{const m=r.i(1,20,1),c=r.i(0,20,1),k=r.i(10,500,10);const D=c*c-4*m*k;return{q:`Ecuación característica ${m}s² + ${c}s + ${k} = 0. Halla el discriminante.`,a:D,u:'',tol:0,s:[`= ${c}² − 4·${m}·${k} = ${D} (${D<0?'oscila':'no oscila'})`]};},
r=>{const w=r.i(1,30,.5),z=r.i(.01,.2,.01);return{q:`ω=${w} rad/s y ζ=${z}. Halla ω_{d}.`,a:w*sq(1-z*z),u:'rad/s',s:[`= ${w}√(1 − ${z}²) = ${n(w*sq(1-z*z),5)} rad/s`]};},
r=>{const w=r.i(2,20,.5),z=r.i(.02,.1,.01),u0=r.i(1,10,.5),t=r.i(.2,3,.1);const wd=w*sq(1-z*z),B=z*w*u0/wd;const u=Math.exp(-z*w*t)*(u0*Math.cos(wd*t)+B*Math.sin(wd*t));return{q:`Vibración libre con u₀=${u0} cm, v₀=0, ω=${w} rad/s, ζ=${z}. Halla u en t=${t} s.`,a:u,u:'cm',s:[`ω_{d} = ${n(wd)}; A = ${u0}; B = ${n(B,4)}`,`u = ${n(u,4)} cm`]};},
r=>{const EI=r.i(500,20000,100),L=r.i(2,8,.5);return{q:`De EI·y″ + Py = 0 con y(0) = y(L) = 0 sale P_{cr} = π²EI/L². Con EI=${EI} kN·m² y L=${L} m, halla P_{cr}.`,a:PI*PI*EI/(L*L),u:'kN',s:[`= ${n(PI*PI*EI/(L*L))} kN`]};},
r=>{const m=r.i(1,20,1),k=r.i(100,5000,50),F=r.i(1,50,1),W=r.i(1,40,.5);const w=sq(k/m),C=F/(k-m*W*W);return{q:`Sin amortiguamiento: ${m}ü + ${k}u = ${F} sen(${W}t). Halla la amplitud de la solución particular C (de C(k − mΩ²) = F₀).`,a:C,u:'',s:[`ω = ${n(w)} rad/s; Ω = ${W}`,`C = ${F}/(${k} − ${m}·${W}²) = ${n(C,4)}${C<0?' (negativa: está en contrafase, Ω > ω)':''}`]};}
],
cri:[
['En la solución de vibración libre, ¿qué término hace que la amplitud decrezca?',['cos ω_{d}t','e^{−ζωt}','B','La masa'],1,'La exponencial decreciente representa la energía que disipa el amortiguamiento.']
],
ref:['Boyce y DiPrima, Ecuaciones diferenciales y problemas con valores en la frontera','Chopra, Dynamics of Structures, capítulos 2 y 3']});
SUB('edp',{t:'Ecuaciones en derivadas parciales',
lec:`Cuando la incógnita depende del espacio y del tiempo aparecen las EDP. Tres son fundamentales en civil:

## Difusión
∂u/∂t = c·∂²u/∂z²
- Consolidación de Terzaghi (u: presión de poros, c = c_{v})
- Conducción de calor en muros y en concreto masivo

## Onda
∂²u/∂t² = a²·∂²u/∂x²
- Ondas en barras y pilotes (hinca), ondas sísmicas, golpe de ariete

## Laplace
∂²h/∂x² + ∂²h/∂y² = 0
- Flujo en suelos, redes de flujo, torsión (función de Prandtl)

## Solución por separación de variables
Se prueba u = Z(z)·T(t). Para la difusión con extremos a cero se obtienen series de Fourier: u = ΣB_{n}sen(nπz/L)e^{−c(nπ/L)²t}. Los términos de orden alto se apagan rápido.

## Diferencias finitas
Se reemplazan las derivadas por diferencias en una malla:
u_{i}^{k+1} = u_{i}^{k} + r(u_{i+1}^{k} − 2u_{i}^{k} + u_{i−1}^{k}), con r = cΔt/Δz².
El esquema explícito es estable si r ≤ 0.5.`,
ded:`## Por qué la difusión tiene ∂²u/∂z²
El flujo es proporcional al gradiente (Fourier en calor, Darcy en agua). Lo que se acumula en un trozo dz es la diferencia entre lo que entra y lo que sale, que es la derivada del flujo: ∂/∂z(c ∂u/∂z) = c∂²u/∂z².

## Diferencias finitas
Con Taylor: u(z ± Δz) = u ± Δz·u′ + (Δz²/2)u″ ± … Sumando ambas: u(z + Δz) + u(z − Δz) − 2u(z) ≈ Δz²·u″. Así ∂²u/∂z² ≈ (u_{i+1} − 2u_{i} + u_{i−1})/Δz². La derivada temporal se aproxima con (u^{k+1} − u^{k})/Δt.

## Estabilidad r ≤ 0.5
Con r > 0.5 el nuevo valor depende con coeficiente negativo (1 − 2r) del anterior: los errores cambian de signo y crecen en cada paso. El análisis de von Neumann lo demuestra (Kreyszig).`,
key:['[[∂u|∂t]] = c[[∂^{2}u|∂z^{2}]]','[[∂^{2}u|∂t^{2}]] = a^{2}[[∂^{2}u|∂x^{2}]]','∇^{2}h = 0','u_{i}^{k+1} = u_{i}^{k} + r(u_{i+1} − 2u_{i} + u_{i−1})','r = [[cΔt|Δz^{2}]] ≤ 0.5'],
err:'Usar un paso de tiempo demasiado grande en el esquema explícito: la solución explota.',
x:[['cns','Consolidación'],['gar','Golpe de ariete (onda)'],['flu','Laplace en suelos'],['calor','Calor']],
g:[
r=>{const c=r.i(.5,10,.5),dt=r.i(.01,.5,.01),dz=r.i(.2,2,.1);return{q:`c=${c} m²/año, Δt=${dt} año, Δz=${dz} m. Halla r (estable si ≤ 0.5).`,a:c*dt/(dz*dz),u:'',s:[`r = ${n(c*dt/(dz*dz),4)} ${c*dt/(dz*dz)<=.5?'(estable)':'(inestable)'}`]};},
r=>{const c=r.i(.5,10,.5),dz=r.i(.2,2,.1);return{q:`c=${c} m²/año y Δz=${dz} m. Halla el Δt máximo estable.`,a:.5*dz*dz/c,u:'años',s:[`Δt = 0.5Δz²/c = ${n(.5*dz*dz/c,4)} años`]};},
r=>{const u=[r.i(0,100,5),r.i(20,120,5),r.i(0,100,5)],rr=r.p([.1,.2,.25,.3,.4,.5]);return{q:`Nudos vecinos con u = ${u.join(', ')} kPa y r=${rr}. Halla el nuevo valor del nudo central.`,a:u[1]+rr*(u[0]-2*u[1]+u[2]),u:'kPa',s:[`= ${u[1]} + ${rr}(${u[0]} − ${2*u[1]} + ${u[2]}) = ${n(u[1]+rr*(u[0]-2*u[1]+u[2]))} kPa`]};},
r=>{const L=r.i(2,20,.5),c=r.i(.5,10,.5),t=r.i(.1,5,.1);const f=Math.exp(-c*(PI/L)**2*t);return{q:`Difusión con extremos a cero, estrato de ${L} m, c=${c} m²/año. ¿Qué fracción queda del primer término de Fourier a t=${t} años? (e^{−c(π/L)²t})`,a:f,u:'',s:[`= e^{−${n(c*(PI/L)**2*t,4)}} = ${n(f,4)}`]};},
r=>{const u0=r.i(50,200,10),c=r.i(1,5,.5),H=r.i(2,6,1),dt=.05,dz=1;const rr=c*dt/(dz*dz);const N=H*2;let u=Array(N+1).fill(u0);u[0]=0;u[N]=0;const steps=r.i(2,4,1);for(let k=0;k<steps;k++){const v=u.slice();for(let i=1;i<N;i++)v[i]=u[i]+rr*(u[i+1]-2*u[i]+u[i-1]);u=v;}return{q:`Consolidación por diferencias finitas: estrato de ${N} m drenado arriba y abajo (u=0 en los bordes), u inicial ${u0} kPa, c_{v}=${c} m²/año, Δz=1 m, Δt=0.05 año. Tras ${steps} pasos, ¿cuánto vale u en el nudo a 1 m del borde?`,a:u[1],u:'kPa',s:[`r = ${n(rr)}`,`Aplica u^{k+1} = u^{k} + r(u_{i+1} − 2u_{i} + u_{i−1}) ${steps} veces`,`u₁ = ${n(u[1],4)} kPa`]};}
],
cri:[
['¿Por qué las arcillas cerca de las capas drenantes consolidan primero?',['Por el peso','Porque allí el agua recorre menos camino: la presión de poros se disipa primero en los bordes','Por la temperatura','No es así'],1,'La solución de la ecuación de difusión muestra isócronas que bajan primero cerca de los bordes drenantes.'],
['Un programa de consolidación da valores que oscilan y crecen sin sentido. ¿Qué revisas?',['La arcilla','El paso de tiempo: probablemente r > 0.5 en un esquema explícito','La impresora','Nada'],1,'La inestabilidad numérica no es un fenómeno físico: se corrige reduciendo Δt o usando un esquema implícito.']
],
ref:['Kreyszig, Matemáticas avanzadas para ingeniería, capítulos de EDP y métodos numéricos','Terzaghi, Theoretical Soil Mechanics (consolidación)','Chapra y Canale, Métodos numéricos para ingenieros, parte 8']});

MOD('m49','Química general para ingenieros','Bases',
'El cemento, el acero que se corroe, el agua que se trata y el calor del concreto masivo son química. Aquí ves la química general que el ingeniero civil usa de verdad.',
['Chang y Goldsby, Química','Brown, LeMay y Bursten, Química: la ciencia central','Mehta y Monteiro, Concrete: Microstructure, Properties, and Materials','Sawyer, McCarty y Parkin, Chemistry for Environmental Engineering and Science'],
'UNI: Química I y II (para ingeniería). PUCP: Química 1. MIT 5.111.');
SUB('qg1',{t:'Estequiometría',
lec:`La estequiometría cuenta átomos para saber cuánto se produce o se consume en una reacción.

## Mol y masa molar
Un mol tiene 6.022×10²³ partículas. La masa molar M (g/mol) es la suma de las masas atómicas: Ca 40.08, C 12.01, O 16.00, H 1.008, Si 28.09, Fe 55.85, S 32.07.

n = m/M

## Reacción balanceada
Los coeficientes dicen la proporción en moles. Ejemplos de obra:
- Calcinación de la caliza: CaCO₃ → CaO + CO₂
- Carbonatación del concreto: Ca(OH)₂ + CO₂ → CaCO₃ + H₂O
- Corrosión simplificada: 4Fe + 3O₂ → 2Fe₂O₃

## Reactivo limitante
El que se acaba primero. Se compara la relación de moles disponible con la de la ecuación.

## Rendimiento
Real/teórico·100.`,
ded:`## Por qué se trabaja en moles
Las reacciones combinan partículas, no gramos: una molécula de CaCO₃ da una de CO₂. Pero las masas de las partículas son distintas, así que la proporción en gramos no es 1 a 1. Pasar a moles con n = m/M convierte la proporción de partículas en una proporción medible.

## Ejemplo con el cemento
M(CaCO₃) = 40.08 + 12.01 + 3·16.00 = 100.09 g/mol; M(CO₂) = 44.01 g/mol. Cada 100 kg de caliza liberan 44 kg de CO₂: el 44 % de su masa se va al aire al fabricar clínker (Chang).

## Expansión por corrosión
El óxido ocupa más volumen que el hierro original (de 2 a 6 veces, según el óxido). Esa expansión es la que rompe el recubrimiento del concreto.`,
key:['n = [[m|M]]','CaCO_{3} → CaO + CO_{2}','Ca(OH)_{2} + CO_{2} → CaCO_{3} + H_{2}O'],
err:'Usar las masas en lugar de los moles para aplicar los coeficientes de la reacción.',
x:[['qm1','Química del cemento'],['huc','Huella de carbono'],['pt1','Carbonatación']],
g:[
r=>{const m=r.i(10,5000,10);return{q:`¿Cuántos moles hay en ${m} g de CaCO₃ (M = 100.09 g/mol)?`,a:m/100.09,u:'mol',s:[`n = ${m}/100.09 = ${n(m/100.09)} mol`]};},
r=>{const m=r.i(1,500,1);return{q:`Se calcinan ${m} t de CaCO₃ puro. ¿Cuántas t de CaO se obtienen? (M: CaCO₃ 100.09; CaO 56.08)`,a:m*56.08/100.09,u:'t',s:[`= ${m}·56.08/100.09 = ${n(m*56.08/100.09)} t`]};},
r=>{const m=r.i(1,200,1);return{q:`¿Cuántos kg de CO₂ captura la carbonatación de ${m} kg de Ca(OH)₂? (M: Ca(OH)₂ 74.09; CO₂ 44.01)`,a:m*44.01/74.09,u:'kg',s:[`= ${m}·44.01/74.09 = ${n(m*44.01/74.09)} kg`]};},
r=>{const fe=r.i(10,500,5),o=r.i(5,300,5);const nFe=fe/55.85,nO=o/32;const lim=nFe/4<nO/3?'Fe':'O₂';const prod=Math.min(nFe/4,nO/3)*2*159.69;return{q:`Reaccionan ${fe} g de Fe y ${o} g de O₂: 4Fe + 3O₂ → 2Fe₂O₃. ¿Cuántos g de Fe₂O₃ se forman como máximo? (M: Fe 55.85, O₂ 32.00, Fe₂O₃ 159.69)`,a:prod,u:'g',s:[`Fe: ${n(nFe)} mol (alcanza para ${n(nFe/4)}); O₂: ${n(nO)} mol (alcanza para ${n(nO/3)})`,`Limitante: ${lim}`,`Fe₂O₃ = ${n(prod)} g`]};},
r=>{const C=r.i(250,450,10),cl=r.i(60,70,1);const caco3=C*cl/100*(100.09/56.08),co2=caco3*44.01/100.09;return{q:`Un m³ de concreto lleva ${C} kg de cemento con ${cl} % de CaO. Si todo ese CaO vino de calcinar caliza, ¿cuántos kg de CO₂ químico se emitieron por ese m³?`,a:co2,u:'kg',s:[`CaO = ${n(C*cl/100)} kg → ${n(C*cl/100/56.08*1000)} mol`,`CO₂ = mismos moles × 44.01 = ${n(co2)} kg`]};}
],
cri:[
['¿Por qué la carbonatación, que captura CO₂, es mala para el concreto armado?',['No es mala','Porque consume el Ca(OH)₂ que mantiene el pH alto que protege al acero','Porque lo hace más débil siempre','Por el color'],1,'Al bajar el pH, el acero pierde su capa pasiva y puede corroerse.']
],
ref:['Chang y Goldsby, Química, capítulo 3','Mehta y Monteiro, Concrete: Microstructure, Properties, and Materials']});
SUB('qg2',{t:'Gases y presión atmosférica',
lec:`## Ley de los gases ideales
PV = nRT, con R = 0.08206 L·atm/(mol·K) = 8.314 J/(mol·K) y T en kelvin (T = °C + 273.15).

## Densidad de un gas
ρ = PM/(RT). El aire seco (M ≈ 28.97 g/mol) a nivel del mar y 15 °C pesa unos 1.225 kg/m³.

## Presión con la altura
La presión atmosférica baja con la altitud. Con la atmósfera estándar:

P = 101.325·(1 − 2.2558×10⁻⁵·h)^{5.256} kPa (h en m)

Importa mucho en el Perú:
- Una bomba succiona menos en la sierra (menos NPSH disponible)
- El agua hierve a menor temperatura
- Los aviones necesitan pistas más largas
- Los motores de maquinaria pierden potencia (≈ 1 % por cada 100 m sobre 1000 m)

## Presiones parciales (Dalton)
P_{total} = ΣP_{i}, con P_{i} = x_{i}P_{total}. El oxígeno es el 21 % del aire: a 4000 m hay mucho menos oxígeno disponible por respiración.`,
ded:`## De dónde sale PV = nRT
Combina tres leyes experimentales: Boyle (PV constante a T fija), Charles (V ∝ T a P fija) y Avogadro (V ∝ n). La teoría cinética la explica: la presión es el choque de las moléculas contra las paredes, y su energía cinética media es proporcional a T.

## Presión con la altura
Una capa de aire de espesor dh pesa ρg·dh por unidad de área: dP = −ρg dh. Con ρ = PM/(RT) y temperatura que baja linealmente (atmósfera estándar), se integra y se obtiene la fórmula potencial (Brown, LeMay y Bursten; Organización de Aviación Civil Internacional).

## Densidad
De PV = nRT con n = m/M: P = (m/V)(RT/M) = ρRT/M.`,
key:['PV = nRT','ρ = [[PM|RT]]','P = 101.325(1 − 2.2558×10^{−5}h)^{5.256}','P_{i} = x_{i}P'],
err:'Usar grados Celsius en vez de kelvin en la ley de los gases.',
x:[['fbo','NPSH en la sierra'],['aer','Pistas en altura'],['maq','Pérdida de potencia de equipos']],
g:[
r=>{const nn=r.i(.1,10,.1),T=r.i(-10,40,1),V=r.i(1,100,1);return{q:`${nn} mol de gas en ${V} L a ${T} °C. Halla P en atm.`,a:nn*.08206*(T+273.15)/V,u:'atm',s:[`P = ${nn}·0.08206·${n(T+273.15)}/${V} = ${n(nn*.08206*(T+273.15)/V,4)} atm`]};},
r=>{const h=r.i(0,5000,50);return{q:`Halla la presión atmosférica estándar a ${h} m.`,a:101.325*(1-2.2558e-5*h)**5.256,u:'kPa',s:[`= ${n(101.325*(1-2.2558e-5*h)**5.256)} kPa`]};},
r=>{const h=r.i(0,5000,50),T=r.i(-5,30,1);const P=101325*(1-2.2558e-5*h)**5.256;return{q:`Halla la densidad del aire a ${h} m y ${T} °C (M = 0.02897 kg/mol).`,a:P*.02897/(8.314*(T+273.15)),u:'kg/m³',s:[`P = ${n(P)} Pa`,`ρ = PM/(RT) = ${n(P*.02897/(8.314*(T+273.15)),4)} kg/m³`]};},
r=>{const h=r.i(0,5000,50);const P=101.325*(1-2.2558e-5*h)**5.256;return{q:`Halla la presión parcial de O₂ (21 %) a ${h} m.`,a:.21*P,u:'kPa',s:[`P = ${n(P)} kPa`,`P_{O₂} = ${n(.21*P)} kPa`]};},
r=>{const h=r.i(1000,5000,50),P0=r.i(50,400,10);const loss=Math.max((h-1000)/100,0);return{q:`Una excavadora tiene ${P0} HP a nivel del mar y pierde 1 % por cada 100 m sobre 1000 m. ¿Cuántos HP efectivos tiene a ${h} m? Compara además la presión atmosférica allí.`,a:P0*(1-loss/100),u:'HP',s:[`Pérdida = ${n(loss)} %`,`Potencia = ${n(P0*(1-loss/100))} HP`,`P_{atm} = ${n(101.325*(1-2.2558e-5*h)**5.256)} kPa`]};}
],
cri:[
['¿Por qué los rendimientos de maquinaria del Manual de Lima no sirven tal cual en Junín?',['Sí sirven','Porque los motores de combustión pierden potencia con menos oxígeno y los trabajadores rinden menos por la altura','Por el clima solamente','Por el precio'],1,'La presión parcial de oxígeno baja con la altitud: afecta motores y personas. Se aplican factores de corrección.']
],
ref:['Brown, LeMay y Bursten, Química: la ciencia central, capítulo de gases','OACI, Manual de la atmósfera tipo (Doc 7488)']});
SUB('qg3',{t:'Soluciones, pH y equilibrio',
lec:`## Concentración
- Molaridad: M = moles de soluto/litros de solución
- mg/L (≈ ppm en agua): la unidad de la calidad del agua
- Normalidad y equivalentes: para neutralizaciones

## pH
pH = −log[H⁺]; pOH = −log[OH⁻]; pH + pOH = 14 (a 25 °C).
- El concreto tiene pH ≈ 12.5 por el Ca(OH)₂ de su pasta
- El agua potable debe estar entre 6.5 y 8.5 (reglamento de calidad del agua del Perú)

## Neutralización
Moles de H⁺ = moles de OH⁻: N_{ácido}V_{ácido} = N_{base}V_{base}.

## Solubilidad (K_{sp})
Para una sal AB poco soluble: K_{sp} = [A][B]. Si el producto de las concentraciones supera K_{sp}, la sal precipita. Así se forman las incrustaciones de carbonato de calcio en tuberías con agua dura.

## Sulfatos y concreto
Los sulfatos del suelo o del agua reaccionan con la pasta de cemento y la expanden. La E.060 exige cementos resistentes (tipo II o V) y a/c bajas según la concentración de sulfatos.`,
ded:`## Por qué pH + pOH = 14
El agua se autoioniza: H₂O ⇌ H⁺ + OH⁻, con K_{w} = [H⁺][OH⁻] = 10⁻¹⁴ a 25 °C. Tomando −log: pH + pOH = 14.

## pH de una base fuerte
Ca(OH)₂ libera 2 OH⁻ por fórmula. Una solución saturada (≈ 0.02 M) tiene [OH⁻] ≈ 0.04 M: pOH ≈ 1.4 y pH ≈ 12.6. Es el pH de la solución de poros del concreto (Mehta y Monteiro).

## Solubilidad desde K_{sp}
Para CaCO₃ ⇌ Ca²⁺ + CO₃²⁻ en agua pura, [Ca²⁺] = [CO₃²⁻] = s, así que K_{sp} = s² y s = √K_{sp}.`,
key:['M = [[n|V]]','pH = −log[H^{+}]','pH + pOH = 14','K_{sp} = [A][B]'],
err:'Olvidar que una base como Ca(OH)₂ libera dos iones OH⁻ por fórmula.',
x:[['qm2','Química del agua'],['pot','Tratamiento de agua'],['pt1','pH y corrosión']],
g:[
r=>{const m=r.i(1,100,1),M=r.p([[40,'NaOH'],[74.09,'Ca(OH)₂'],[36.46,'HCl']]),V=r.i(.1,5,.1);return{q:`${m} g de ${M[1]} (M = ${M[0]} g/mol) en ${V} L. Halla la molaridad.`,a:m/M[0]/V,u:'mol/L',s:[`= ${n(m/M[0])}/${V} = ${n(m/M[0]/V,4)} M`]};},
r=>{const e=r.i(1,13,1),c=r.i(1,9,1);const h=c*10**(-e);return{q:`[H⁺] = ${c}×10⁻${e} M. Halla el pH.`,a:-Math.log10(h),u:'',s:[`pH = −log(${n(h,3)}) = ${n(-Math.log10(h))}`]};},
r=>{const c=r.i(.001,.025,.001);return{q:`Solución de Ca(OH)₂ ${c} M (disociación total). Halla el pH.`,a:14+Math.log10(2*c),u:'',s:[`[OH⁻] = ${n(2*c)} M → pOH = ${n(-Math.log10(2*c))}`,`pH = ${n(14+Math.log10(2*c))}`]};},
r=>{const Va=r.i(10,500,5),Ca=r.i(.01,1,.01),Cb=r.i(.01,1,.01);return{q:`${Va} mL de ácido ${Ca} N se neutralizan con base ${Cb} N. ¿Cuántos mL de base?`,a:Va*Ca/Cb,u:'mL',s:[`V_{b} = ${Va}·${Ca}/${Cb} = ${n(Va*Ca/Cb)} mL`]};},
r=>{const Ksp=r.p([3.3e-9,4.5e-9,8.7e-9]),Ca=r.i(20,200,5),CO3=r.i(1,60,1);const q=(Ca/40080)*(CO3/60010);return{q:`Agua con ${Ca} mg/L de Ca²⁺ y ${CO3} mg/L de CO₃²⁻. K_{sp}(CaCO₃) = ${Ksp.toExponential(1)}. Halla Q/K_{sp} (si > 1, tiende a incrustar).`,a:q/Ksp,u:'',s:[`[Ca²⁺] = ${n(Ca/40080,3)} M; [CO₃²⁻] = ${n(CO3/60010,3)} M`,`Q = ${n(q,3)} → Q/K_{sp} = ${n(q/Ksp)}`]};}
],
cri:[
['Un estudio de suelos detecta 3000 ppm de sulfatos. ¿Qué afecta?',['Solo el color','La cimentación de concreto: hay que usar cemento resistente a sulfatos y a/c baja','Nada','Solo el acero'],1,'Los sulfatos atacan la pasta de cemento formando productos expansivos. La E.060 fija requisitos según la exposición.']
],
ref:['Chang y Goldsby, Química, capítulos de soluciones y equilibrio','Sawyer, McCarty y Parkin, Chemistry for Environmental Engineering and Science','E.060, requisitos de durabilidad (exposición a sulfatos)']});
SUB('qg4',{t:'Termoquímica y calor de hidratación',
lec:`El cemento al hidratarse libera calor. En una zapata pequeña se disipa; en una presa o en una platea gruesa se acumula y el centro se calienta mucho más que la superficie. La diferencia de temperatura fisura el concreto.

## Calor y temperatura
Q = m·c·ΔT, con c el calor específico (concreto ≈ 0.9–1.0 kJ/(kg·K); agua 4.18).

## Calor de hidratación
Un cemento portland libera del orden de 250–500 kJ/kg en los primeros días (tipo I más; tipos II y IV, menos; usa el dato del fabricante).

## Elevación adiabática
Si el calor no escapa (centro de un elemento masivo):

ΔT_{ad} = C·H/(ρ·c)

con C el cemento por m³, H el calor por kg, ρ la densidad y c el calor específico del concreto.

## Control
- Cementos de bajo calor o con adiciones
- Menos cemento por m³ (agregado más grande, aditivos)
- Enfriar el agua o los agregados, vaciar de noche
- El ACI 207 recomienda limitar la diferencia entre el centro y la superficie (≈ 20 °C)

## Ley de Hess
El calor de una reacción es el mismo si ocurre en un paso o en varios: ΔH_{total} = ΣΔH_{pasos}.`,
ded:`## De dónde sale ΔT_{ad}
Un metro cúbico de concreto con C kg de cemento libera C·H kJ. Si no escapa nada, todo calienta la masa del metro cúbico (ρ·1 m³): C·H = ρ·c·ΔT. Despejando ΔT = CH/(ρc). Con 350 kg, 350 kJ/kg, ρ = 2400 y c = 1.0: ΔT ≈ 51 °C.

## Mezcla de temperaturas
Si se mezclan materiales a distinta temperatura, el calor que pierden unos lo ganan otros: Σm_{i}c_{i}(T − T_{i}) = 0, de donde T = Σm_{i}c_{i}T_{i}/Σm_{i}c_{i}. Por eso enfriar el agua (de c alto) baja eficazmente la temperatura del concreto fresco (ACI 305 y 207).`,
key:['Q = mcΔT','ΔT_{ad} = [[C·H|ρ·c]]','T = [[Σm_{i}c_{i}T_{i}|Σm_{i}c_{i}]]','ΔH_{total} = ΣΔH_{i}'],
err:'Tratar un vaciado masivo como si fuera un elemento delgado y no controlar la temperatura.',
x:[['qm1','Hidratación del cemento'],['calor','Transferencia de calor'],['pgr','Presas de concreto']],
g:[
r=>{const m=r.i(1,1000,1),c=r.p([.9,1,4.18,.46]),dT=r.i(1,60,1);return{q:`Halla el calor para calentar ${m} kg de un material con c=${c} kJ/(kg·K) en ${dT} °C.`,a:m*c*dT,u:'kJ',s:[`Q = ${n(m*c*dT)} kJ`]};},
r=>{const C=r.i(250,500,10),H=r.i(250,500,10),rho=r.i(2300,2450,10),c=r.i(.9,1.05,.01);return{q:`Concreto con ${C} kg/m³ de cemento, H=${H} kJ/kg, ρ=${rho} kg/m³, c=${c} kJ/(kg·K). Halla ΔT_{ad}.`,a:C*H/(rho*c),u:'°C',s:[`= ${C}·${H}/(${rho}·${c}) = ${n(C*H/(rho*c))} °C`]};},
r=>{const C=r.i(300,450,10),Tc=r.i(15,40,1),A=r.i(1800,2000,10),Ta=r.i(15,40,1),W=r.i(150,200,5),Tw=r.i(2,30,1);const T=(C*.92*Tc+A*.84*Ta+W*4.18*Tw)/(C*.92+A*.84+W*4.18);return{q:`Mezcla por m³: ${C} kg de cemento a ${Tc} °C (c=0.92), ${A} kg de agregados a ${Ta} °C (c=0.84), ${W} kg de agua a ${Tw} °C (c=4.18). Halla la temperatura del concreto fresco.`,a:T,u:'°C',s:[`T = Σmc·T/Σmc = ${n(T)} °C`]};},
r=>{const a=r.i(-500,-50,5),b=r.i(-500,-50,5),c=r.i(-300,300,5);return{q:`Una reacción ocurre en tres pasos con ΔH = ${a}, ${b} y ${c} kJ. Halla ΔH total (Hess).`,a:a+b+c,u:'kJ',tol:0,s:[`= ${a+b+c} kJ`]};},
r=>{const T0=r.i(18,32,1),C1=r.i(350,450,10),H=r.i(300,450,10),f=r.i(15,40,5),lim=r.p([60,65,70]);const dT=x=>x*H/(2400*1);const T1=T0+dT(C1),C2=C1*(1-f/100),T2=T0+dT(C2);return{q:`Platea masiva vaciada a ${T0} °C con ${C1} kg/m³ de cemento (H=${H} kJ/kg, ρc = 2400 kJ/(m³·K)). Se cambia a una mezcla con ${f} % menos cemento (puzolana de calor despreciable). Halla la temperatura máxima adiabática con la mezcla nueva (compárala con ${lim} °C).`,a:T2,u:'°C',s:[`Antes: ${n(T1)} °C`,`Después: ${n(T2)} °C ${T2<=lim?'(cumple)':'(aún alta: enfriar agua o agregados)'}`]};}
],
cri:[
['¿Por qué en una platea de 2 m de espesor se colocan termocuplas?',['Por estética','Para controlar la diferencia de temperatura entre el centro y la superficie y evitar fisuras térmicas','Para medir la lluvia','Para el sismo'],1,'El centro casi adiabático se calienta mucho más que la superficie; la diferencia genera tensiones que fisuran.'],
['¿Qué es más eficaz para bajar la temperatura del concreto fresco?',['Calentar el cemento','Enfriar el agua o usar hielo: tiene el mayor calor específico','Pintar el mixer','Nada'],1,'Por la ecuación de mezcla, el agua pesa mucho por su c alto; el hielo además absorbe calor al fundirse.']
],
ref:['ACI 207.1R, Guide to Mass Concrete','ACI 305R, Guide to Hot Weather Concreting','Chang y Goldsby, Química, capítulo de termoquímica']});
