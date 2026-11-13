/* Módulos nuevos: ejercicio profesional e ingeniería ambiental */
MOD('m44','Ejercicio profesional del ingeniero','Gestión',
'Saber calcular no basta: hay que saber armar un expediente técnico, formular un proyecto de inversión pública, supervisar una obra y responder legal y éticamente por lo que se firma. Este módulo une la técnica con la profesión.',
['Ley 32069, Ley General de Contrataciones Públicas, y su reglamento','MEF, Directiva General del Sistema Nacional de Programación Multianual y Gestión de Inversiones (Invierte.pe)','Ley 29090, Ley de regulación de habilitaciones urbanas y de edificaciones','Colegio de Ingenieros del Perú, Código de Ética','Ramos Salazar, Costos y presupuestos en edificación (CAPECO)','Project Management Institute, PMBOK Guide'],
'UNI: Ingeniería de Costos, Formulación y Evaluación de Proyectos, Gerencia de la Construcción. PUCP: Gestión de Proyectos de Construcción, Ética Profesional.');
SUB('exp2',{t:'Expediente técnico y presupuesto de obra',
lec:`Una obra pública no se construye con una idea: se construye con un **expediente técnico**. El reglamento de la ley de contrataciones lo define como el conjunto de documentos que permiten ejecutar la obra. Incluye:

- Memoria descriptiva: qué se construye, dónde y por qué
- Especificaciones técnicas: cómo se ejecuta y controla cada partida
- Planos de ejecución
- Metrados, análisis de precios unitarios y presupuesto
- Fecha de determinación del presupuesto, calendario de avance y fórmulas polinómicas
- Estudios básicos: suelos, topografía, hidrología, impacto ambiental, según el caso

## Estructura del presupuesto
- **Costo directo (CD):** Σ metrado × precio unitario. Lo que se queda físicamente en la obra
- **Gastos generales (GG):** lo que cuesta dirigir la obra y no se puede cargar a una partida
  - Fijos: no dependen del plazo (licencias, ensayos de liquidación, gastos de licitación)
  - Variables: dependen del plazo (residente, almacenero, oficina, camioneta, fianzas)
- **Utilidad (U):** la ganancia del contratista, un porcentaje del CD
- **Subtotal** = CD + GG + U
- **IGV:** 18 % del subtotal (16 % IGV más 2 % de Impuesto de Promoción Municipal)

Valores de referencia en edificación: GG entre 8 y 15 % del CD, utilidad entre 5 y 10 %. Un presupuesto con GG muy bajos casi siempre esconde un plazo irreal.

## Ampliación de plazo
Si el plazo se amplía por causa no atribuible al contratista, se reconocen **mayores gastos generales variables**: el gasto general variable diario por los días ampliados.`,
ded:`## Por qué la utilidad se calcula sobre el costo directo
El contratista arriesga su capital en lo que construye: la práctica peruana (y la estructura de presupuesto de CAPECO) toma la utilidad como porcentaje del CD, no del subtotal. Así, si cambian los GG por un mayor plazo, la utilidad no cambia.

## Gasto general variable diario
Los GG variables son, por definición, proporcionales al tiempo. Si en P días de plazo suman GG_{v}, cada día cuesta g = GG_{v}/P. Con una ampliación de Δ días: mayor gasto = g·Δ. Por eso es tan importante que el presupuesto desagregue los GG en fijos y variables: sin esa separación no se puede valorizar una ampliación.

## Factor de relación
Al ofertar, el postor ajusta todo con un mismo factor: f = oferta/presupuesto referencial. Cada partida se multiplica por f, de modo que la estructura del presupuesto se mantiene.`,
key:['CD = Σ metrado × PU','ST = CD + GG + U','Total = 1.18·ST','g = [[GG_{v}|P]]','Mayor GG = g·Δ'],
err:'Calcular el IGV sobre el costo directo en vez de sobre el subtotal.',
x:[['met','Metrados'],['apu','Precios unitarios'],['val','Valorizaciones'],['pen','Plazos']],
g:[
r=>{const CD=r.i(100,9000,50)*1000,gg=r.i(8,15,.5),u=r.i(5,10,.5);return{q:`CD = S/${CD}, GG = ${gg} % y utilidad = ${u} % del CD. Halla el subtotal.`,a:CD*(1+gg/100+u/100),u:'S/',s:[`GG = S/ ${n(CD*gg/100)}; U = S/ ${n(CD*u/100)}`,`ST = S/ ${n(CD*(1+gg/100+u/100))}`]};},
r=>{const CD=r.i(100,9000,50)*1000,gg=r.i(8,15,.5),u=r.i(5,10,.5);const ST=CD*(1+gg/100+u/100);return{q:`CD = S/${CD}, GG ${gg} %, U ${u} %. Halla el presupuesto total con IGV.`,a:ST*1.18,u:'S/',s:[`ST = S/ ${n(ST)}`,`Total = 1.18·ST = S/ ${n(ST*1.18)}`]};},
r=>{const res=r.i(8,15,.5)*1000,otros=r.i(5,25,1)*1000,P=r.i(90,540,30),fij=r.i(20,120,5)*1000;const GGv=(res+otros)*P/30;return{q:`GG variables: residente S/${res}/mes y otros S/${otros}/mes; plazo ${P} días. GG fijos S/${fij}. Halla los GG totales.`,a:GGv+fij,u:'S/',s:[`GG_{v} = (${res}+${otros})·${P}/30 = S/ ${n(GGv)}`,`GG = S/ ${n(GGv+fij)}`]};},
r=>{const GGv=r.i(50,900,10)*1000,P=r.i(90,540,30),d=r.i(5,90,1);return{q:`GG variables de S/${GGv} en ${P} días. Se aprueba una ampliación de ${d} días. Halla los mayores gastos generales (sin IGV).`,a:GGv/P*d,u:'S/',s:[`g = ${GGv}/${P} = S/ ${n(GGv/P)} por día`,`Mayor GG = S/ ${n(GGv/P*d)}`]};},
r=>{const p=[[r.i(50,400,5),r.i(300,600,5)],[r.i(1000,8000,50),r.i(4,7,.1)],[r.i(200,2000,10),r.i(40,90,1)]],gg=r.i(9,14,.5),u=r.i(6,10,.5);const CD=p.reduce((s,[m,pu])=>s+m*pu,0),T=CD*(1+gg/100+u/100)*1.18;return{q:`Presupuesto con tres partidas: concreto ${p[0][0]} m³ a S/${p[0][1]}; acero ${p[1][0]} kg a S/${p[1][1]}; encofrado ${p[2][0]} m² a S/${p[2][1]}. GG ${gg} %, U ${u} %, IGV 18 %. Halla el total.`,a:T,u:'S/',s:[`CD = S/ ${n(CD)}`,`ST = S/ ${n(CD*(1+gg/100+u/100))}`,`Total = S/ ${n(T)}`]};}
],
cri:[
['Un postor ofrece GG del 3 % en una obra de 12 meses. ¿Qué es lo más probable?',['Es más eficiente que los demás','Subestimó el plazo o el personal y buscará adicionales','El IGV compensa la diferencia','Los GG no influyen en el costo'],1,'Doce meses de residente, oficina y fianzas no caben en 3 %. Un GG irreal suele terminar en reclamos, adicionales o abandono de obra.'],
['¿Por qué deben separarse los GG en fijos y variables?',['Por estética del presupuesto','Porque solo los variables dependen del plazo y se usan para valorizar ampliaciones','Porque los fijos no pagan IGV','Porque los variables son la utilidad'],1,'Una ampliación de plazo genera gastos que crecen con el tiempo. Sin separar los variables no se puede calcular el gasto diario.'],
['El expediente técnico tiene planos y presupuesto, pero no estudio de suelos. ¿Qué haces como evaluador?',['Lo apruebo: el suelo se ve en obra','Lo observo: sin estudio de suelos la cimentación es una suposición','Pido solo más metrados','Aumento el GG para cubrir el riesgo'],1,'El estudio de mecánica de suelos es parte del expediente. Sin él, el diseño de cimentaciones no tiene sustento y aparecen adicionales en obra.']
],
ref:['CAPECO, Costos y presupuestos en edificación (Ramos Salazar)','Reglamento de la Ley 32069: definición de expediente técnico y mayores gastos generales (verifica el texto vigente)']});
SUB('inv',{t:'Invierte.pe y evaluación social',
lec:`La inversión pública en el Perú se rige por el **Sistema Nacional de Programación Multianual y Gestión de Inversiones (Invierte.pe)**, creado por el D. Leg. 1252. Tiene cuatro fases:

- **Programación multianual:** qué brechas de servicio (agua, vías, salud) se van a cerrar
- **Formulación y evaluación:** ficha técnica o estudio de preinversión. Se decide si el proyecto es socialmente rentable
- **Ejecución:** expediente técnico y obra
- **Funcionamiento:** operación y mantenimiento

## Precios privados y precios sociales
Para la sociedad, el costo real no es el precio de mercado:
- Se quitan los impuestos (son transferencias, no consumen recursos)
- La mano de obra no calificada se corrige con un factor menor que 1 (hay desempleo)
- Las divisas se corrigen con un factor mayor que 1

Costo social = costo privado (sin IGV) × factor de corrección.

## Métodos de evaluación
- **Costo-beneficio:** cuando los beneficios se pueden valorar en dinero (riego, vías). VAN social = Σ(B − C)/(1 + i)^{t}, con la tasa social de descuento que publica el MEF (8 % en los últimos años; verifica el anexo vigente)
- **Costo-efectividad:** cuando no se pueden (salud, educación, saneamiento rural). Índice: ICE = VACS/beneficiarios. Se elige la alternativa de menor ICE, si está bajo la línea de corte del sector

El proyecto debe además ser **sostenible**: alguien debe pagar su operación y mantenimiento.`,
ded:`## Por qué se descuenta al 8 % y no a la tasa del banco
La tasa social de descuento representa el costo de oportunidad de los fondos para el país: lo que la economía deja de ganar al usar ese dinero en otro proyecto. No es la tasa de un préstamo, sino un parámetro nacional que el MEF fija para que todos los proyectos se comparen con la misma vara.

## Valor actual de costos sociales
VACS = Σ C_{t}/(1 + i)^{t}. Es el VAN de un proyecto que solo tiene costos (inversión y operación). Dividirlo entre los beneficiarios da cuánto cuesta, a valor de hoy, atender a cada persona: así se comparan alternativas que dan el mismo servicio de distinta forma.

## Por qué se quita el IGV
Si un proyecto paga S/118 por algo que vale S/100, los S/18 van al Estado: no se pierden para el país, se transfieren. Para la sociedad el recurso realmente usado vale S/100.`,
key:['VANS = Σ[[B_{t}−C_{t}|(1+i)^{t}]]','VACS = Σ[[C_{t}|(1+i)^{t}]]','ICE = [[VACS|beneficiarios]]','C_{social} = [[C_{mercado}|1.18]]·f'],
err:'Evaluar un proyecto social con precios de mercado e IGV incluido.',
x:[['vpn','Valor presente'],['pob','Beneficiarios proyectados'],['exp2','El expediente viene después']],
g:[
r=>{const I=r.i(100,5000,50)*1000,B=r.i(20,900,10)*1000,N=r.p([10,15,20]);const fa=(1-1.08**-N)/.08;return{q:`Inversión S/${I} y beneficio neto anual de S/${B} durante ${N} años. Con i = 8 %, halla el VAN social.`,a:-I+B*fa,u:'S/',s:[`Factor = ${n(fa)}`,`VANS = −${I} + ${B}·${n(fa)} = S/ ${n(-I+B*fa)}`]};},
r=>{const C=r.i(10,900,5)*1000,f=r.p([.57,.6,.68,.72,.85]);return{q:`Mano de obra no calificada por S/${C} a precios de mercado (sin IGV) y factor de corrección ${f}. Halla su costo social.`,a:C*f,u:'S/',s:[`= ${C}·${f} = S/ ${n(C*f)}`]};},
r=>{const V=r.i(200,8000,50)*1000,b=r.i(300,20000,50);return{q:`VACS = S/${V} y ${b} beneficiarios. Halla el ICE.`,a:V/b,u:'S/ por beneficiario',s:[`ICE = S/ ${n(V/b)}`]};},
r=>{const I1=r.i(500,3000,50)*1000,O1=r.i(10,60,5)*1000,I2=r.i(300,2500,50)*1000,O2=r.i(30,120,5)*1000,b=r.i(1000,8000,50),N=10;const fa=(1-1.08**-N)/.08;const c1=(I1+O1*fa)/b,c2=(I2+O2*fa)/b;return{q:`Dos alternativas de saneamiento para ${b} personas, 10 años, i=8 %. A: inversión S/${I1}, operación S/${O1}/año. B: inversión S/${I2}, operación S/${O2}/año. Halla el ICE de la alternativa elegida.`,a:Math.min(c1,c2),u:'S/ por beneficiario',s:[`ICE_{A} = ${n(c1)}; ICE_{B} = ${n(c2)}`,`Se elige ${c1<c2?'A':'B'}: ${n(Math.min(c1,c2))}`]};},
r=>{const I=r.i(500,6000,50)*1000,mo=r.i(.2,.4,.05),f=r.p([.57,.6,.68]),B=r.i(80,900,10)*1000,O=r.i(10,80,5)*1000,N=r.p([15,20]);const Is=I/1.18*((1-mo)+mo*f),fa=(1-1.08**-N)/.08,V=-Is+(B-O/1.18)*fa;return{q:`Proyecto de riego: inversión S/${I} con IGV, de la cual ${mo*100} % es mano de obra no calificada (factor ${f}). Beneficio anual S/${B} y operación S/${O} con IGV, ${N} años, i=8 %. Halla el VAN social.`,a:V,u:'S/',s:[`Inversión social = ${I}/1.18·(${n(1-mo)} + ${mo}·${f}) = S/ ${n(Is)}`,`Flujo neto = ${B} − ${n(O/1.18)} = S/ ${n(B-O/1.18)}`,`VANS = S/ ${n(V)}`]};}
],
cri:[
['Un puesto de salud no genera ingresos en dinero. ¿Cómo se evalúa?',['No se evalúa','Con costo-efectividad: VACS por beneficiario','Con la TIR privada','Con el precio de la consulta'],1,'Cuando el beneficio (vidas, salud) no se valora fácilmente en soles, se compara cuánto cuesta atender a cada persona y se elige la alternativa más barata que logre el mismo servicio.'],
['Un proyecto tiene VAN social positivo pero ningún municipio puede pagar su operación. ¿Es viable?',['Sí, el VAN manda','No: falla la sostenibilidad y la obra quedará abandonada','Sí, si se termina rápido','Depende del IGV'],1,'Invierte.pe exige sostenibilidad. Una planta de tratamiento sin presupuesto de operación deja de funcionar en meses.'],
['¿Por qué se usa un factor menor que 1 para la mano de obra no calificada?',['Porque trabaja menos','Porque hay desempleo: contratarla le cuesta al país menos de lo que se le paga','Por el IGV','Porque no tiene seguro'],1,'Si la persona estaba desempleada, la economía no deja de producir otra cosa al contratarla: el costo de oportunidad social es menor que el salario.']
],
ref:['D. Leg. 1252 y Directiva General de Invierte.pe (MEF)','Fontaine, Evaluación social de proyectos','Beltrán y Cueva, Evaluación privada de proyectos (Universidad del Pacífico)']});
SUB('sup',{t:'Supervisión e inspección de obra',
lec:`El supervisor (o inspector, si es un funcionario de la entidad) es los ojos del propietario en la obra. Verifica que se construya lo que dice el expediente, con la calidad que exigen las especificaciones y en el plazo del contrato.

## Funciones
- Controlar calidad: ensayos de materiales, pruebas y protocolos de cada partida
- Controlar avance: comparar lo ejecutado con el calendario
- Controlar costo: revisar valorizaciones, adicionales y ampliaciones
- Llevar el **cuaderno de obra**, el documento donde residente y supervisor anotan ocurrencias, consultas y respuestas. Lo que no está en el cuaderno, para efectos del contrato, casi no existe

## Muestreo de concreto (E.060)
Se toma una muestra (al menos dos probetas) como mínimo:
- una vez por día de vaciado,
- una por cada 50 m³,
- una por cada 300 m² de losas o muros.

Manda el criterio que dé **más** muestras. Verifica los valores en la E.060 vigente.

## Atraso
Se compara el avance acumulado real con el programado. En el reglamento de contrataciones, si el real es menor que el 80 % del programado, la entidad puede exigir un calendario acelerado (porcentaje del reglamento anterior; verifica el vigente).

El costo de supervisión suele estar entre 5 y 10 % del costo de la obra.`,
ded:`## Por qué se toma el mayor número de muestras
Cada criterio protege contra un riesgo distinto: el diario detecta cambios de mezcla de un día a otro; el de volumen, la variabilidad dentro de un vaciado grande; el de área, la de elementos delgados donde un mal concreto es más crítico. Tomar el máximo asegura que ningún riesgo quede sin vigilancia.

## Índice de avance
Avance real/programado = SPI del método del valor ganado (EV/PV). Un SPI de 0.8 significa que en el tiempo transcurrido se hizo solo el 80 % de lo planeado. Proyectado linealmente, la obra terminaría en P/SPI días.`,
key:['N = máx(días, ⌈[[V|50]]⌉, ⌈[[A|300]]⌉)','SPI = [[real|programado]]','T_{estimado} = [[P|SPI]]'],
err:'Aceptar partidas sin protocolo ni ensayos porque "se ven bien".',
x:[['cal','Aceptación del concreto'],['evm','Valor ganado'],['val','Valorizaciones'],['seg','Seguridad en obra']],
g:[
r=>{const d=r.i(1,20,1),V=r.i(10,900,5),A=r.i(50,3000,10);const N=Math.max(d,Math.ceil(V/50),Math.ceil(A/300));return{q:`Vaciados en ${d} días, ${V} m³ en total y ${A} m² de losas y muros. ¿Cuántas muestras mínimas?`,a:N,u:'muestras',tol:0,s:[`Por días: ${d}; por volumen: ${Math.ceil(V/50)}; por área: ${Math.ceil(A/300)}`,`N = ${N}`]};},
r=>{const C=r.i(1,80,.5),p=r.i(5,10,.5);return{q:`Obra de S/${C} millones. Supervisión al ${p} %. Halla su costo.`,a:C*1e6*p/100,u:'S/',s:[`= S/ ${n(C*1e6*p/100)}`]};},
r=>{const pr=r.i(20,90,1),re=r.i(10,pr,1);return{q:`Avance programado acumulado ${pr} % y real ${re} %. Halla real/programado en %.`,a:re/pr*100,u:'%',s:[`= ${n(re/pr*100)} % ${re/pr<.8?'(< 80 %: calendario acelerado)':''}`]};},
r=>{const A=r.i(500,30000,100),f=r.p([250,500,1000]),c=r.i(2,4,1);return{q:`Una base granular de ${A} m² se compacta en ${c} capas. Se exige un ensayo de densidad de campo por cada ${f} m² de cada capa. ¿Cuántos ensayos?`,a:c*Math.ceil(A/f),u:'ensayos',tol:0,s:[`Por capa: ⌈${A}/${f}⌉ = ${Math.ceil(A/f)}`,`Total = ${c*Math.ceil(A/f)}`]};},
r=>{const P=r.i(120,540,30),t=r.i(30,P-30,10),pr=r.i(30,80,1),re=r.i(15,pr-5,1);const spi=re/pr,T=P/spi;return{q:`Obra de ${P} días. Al día ${t} el avance programado es ${pr} % y el real ${re} %. Si el ritmo no cambia, ¿con cuántos días de atraso terminaría?`,a:T-P,u:'días',s:[`SPI = ${n(spi)}`,`T = ${P}/${n(spi)} = ${n(T)} días`,`Atraso = ${n(T-P)} días`]};}
],
cri:[
['El residente te pide verbalmente cambiar un detalle de acero y ya lo ejecutó. ¿Qué corresponde?',['Aprobarlo para no demorar','Exigir la consulta por cuaderno y la opinión del proyectista; evaluar si se acepta, se corrige o se demuele','Ignorarlo','Descontarlo de la utilidad sin más'],1,'Un cambio estructural sin sustento escrito ni aprobación del proyectista deja la responsabilidad en el aire. El cuaderno de obra es el registro legal.'],
['Las probetas a 7 días dan 60 % de f′c. ¿Qué haces?',['Rechazar el concreto de inmediato','Esperar el resultado a 28 días: a 7 días es normal un 65–70 %, y revisar tendencias','Pedir demolición','Nada, nunca importa'],1,'La aceptación se hace a 28 días (o la edad especificada). A 7 días solo es una alerta: si está bajo lo usual, conviene revisar la mezcla y el curado de inmediato.'],
['¿Qué asegura mejor la calidad de una obra?',['Un supervisor que solo revisa al final','Protocolos por partida y ensayos durante la ejecución','Más utilidad para el contratista','Menos planos'],1,'La calidad se construye y se controla durante el proceso. Al final solo se puede aceptar o demoler.']
],
ref:['ACI 311, Guide for Concrete Construction Inspection','E.060 Concreto armado, capítulo de evaluación y aceptación del concreto','Reglamento de la Ley 32069: cuaderno de obra y supervisión']});
SUB('eti',{t:'Ética, responsabilidad y licencias',
lec:`Firmar un plano es comprometer la vida de quienes usarán la obra. Por eso la ingeniería es una profesión regulada.

## Colegiatura
Para ejercer en el Perú se requiere título y estar **colegiado y habilitado** en el Colegio de Ingenieros del Perú (Ley 28858). El CIP tiene un **Código de Ética** que obliga, entre otras cosas, a:
- Anteponer la seguridad y el bienestar público
- Firmar solo lo que uno hizo o revisó y domina
- No aceptar trabajos para los que no se está capacitado
- Evitar conflictos de interés y no recibir pagos de dos partes por lo mismo
- No desprestigiar el trabajo de colegas sin fundamento

## Responsabilidad civil
El Código Civil (art. 1784) establece que si dentro de los **cinco años** desde su aceptación la obra se destruye, presenta peligro de ruina o graves defectos por vicio de construcción, el contratista responde, siempre que se le avise por escrito dentro de los **seis meses** de descubierto el problema.

En obra pública, la ley de contrataciones fija además un plazo de responsabilidad por vicios ocultos (siete años como mínimo en la Ley 30225; verifica la Ley 32069).

## Licencias (Ley 29090)
Las edificaciones necesitan licencia municipal. Hay cuatro modalidades, de la A (obras pequeñas, aprobación automática) a la D (obras grandes o de riesgo, con evaluación previa por la comisión técnica). Construir sin licencia expone a multa y demolición.

## Responsabilidad penal
Si por negligencia se causa la muerte o lesiones (un muro que cae, una excavación sin entibado), hay responsabilidad penal además de la civil.`,
ded:`## Por qué hay dos plazos en el art. 1784
El plazo de cinco años protege al propietario mientras la obra "se asienta": la mayoría de vicios de construcción aparecen en ese tiempo. El de seis meses protege al contratista: obliga al propietario a avisar pronto, para que el daño no crezca por descuido y se pueda verificar la causa.

## Cómo se cuentan
Ambos plazos son independientes: primero se verifica que el daño apareció dentro de los cinco años desde la aceptación; después, que el aviso escrito se hizo dentro de los seis meses desde el descubrimiento. Si cualquiera falla, la acción por esa vía se pierde.`,
key:['Responsabilidad: 5 años desde la aceptación','Aviso: 6 meses desde el descubrimiento','Obra pública: ≥ 7 años por vicios ocultos (verifica)'],
err:'Pensar que la responsabilidad termina al entregar la obra.',
x:[['sup','Supervisión'],['seg','Seguridad'],['par2','Parámetros urbanos y licencia']],
g:[
r=>{const a=r.i(0,59,1),d=r.i(1,24,1);return{q:`La obra se aceptó hace ${a} meses. ¿Cuántos meses quedan del plazo de 5 años del art. 1784?`,a:60-a,u:'meses',tol:0,s:[`= 60 − ${a} = ${60-a} meses`]};},
r=>{const d=r.i(0,25,1);return{q:`El propietario descubrió fisuras graves hace ${d} semanas. Si el plazo de aviso de 6 meses equivale a unas 26 semanas, ¿cuántas semanas le quedan para avisar por escrito?`,a:26-d,u:'semanas',tol:0,s:[`= 26 − ${d} = ${26-d} semanas`]};},
r=>{const a=r.i(12,100,1);return{q:`Una obra pública se recibió hace ${a} meses. Con un plazo de responsabilidad de 7 años, ¿cuántos meses quedan (0 si ya venció)?`,a:Math.max(84-a,0),u:'meses',tol:0,s:[`= máx(84 − ${a}, 0) = ${Math.max(84-a,0)} meses`]};},
r=>{const ac=r.i(10,70,1),dd=r.i(0,ac,1);const ok=ac-dd<=60?1:0;return{q:`Obra aceptada hace ${ac} meses; la falla se descubrió hace ${dd} meses. ¿Apareció dentro de los 5 años? (1 = sí, 0 = no)`,a:ok,u:'',tol:0,s:[`Se descubrió ${ac-dd} meses después de la aceptación`,ok?'≤ 60 meses: dentro del plazo':'> 60 meses: fuera del plazo']};},
r=>{const ac=r.i(12,70,1),dd=r.i(0,10,1);const ok=(ac-dd<=60&&dd<=6)?1:0;return{q:`Aceptación hace ${ac} meses; descubrimiento hace ${dd} meses y el aviso escrito se envía hoy. ¿Procede la responsabilidad del art. 1784? (1 = sí, 0 = no)`,a:ok,u:'',tol:0,s:[`Descubierto a los ${ac-dd} meses de la aceptación (${ac-dd<=60?'≤':'>'} 60)`,`Aviso a los ${dd} meses del descubrimiento (${dd<=6?'≤':'>'} 6)`,ok?'Procede':'No procede por esta vía']};}
],
cri:[
['Te piden firmar los planos de instalaciones eléctricas de un edificio, que no diseñaste ni sabes revisar. ¿Qué haces?',['Firmo: es solo un trámite','Me niego y recomiendo a un ingeniero electricista colegiado','Firmo si me pagan más','Firmo y pongo "revisado"'],1,'El Código de Ética exige firmar solo lo que se domina y se hizo o revisó. La firma es responsabilidad legal y penal.'],
['Eres supervisor y el contratista te ofrece pagarte un "bono" por aprobar valorizaciones rápido. ¿Qué es?',['Un incentivo normal','Un conflicto de interés y posible delito de corrupción: se rechaza y se informa','Parte de la utilidad','Aceptable si es pequeño'],1,'El supervisor trabaja para la entidad. Recibir pagos de quien supervisa anula su independencia.'],
['Detectas que una losa ya vaciada tiene menos acero que el plano. El propietario quiere ocultarlo para no atrasar. ¿Qué prima?',['El plazo','La seguridad pública: se informa, se evalúa y se refuerza o demuele','El costo','La opinión del propietario'],1,'El primer deber del ingeniero es la seguridad de las personas. Ocultar un defecto estructural compromete vidas y la responsabilidad del ingeniero.'],
['Construir un edificio de 5 pisos sin licencia municipal porque "la municipalidad demora":',['Es aceptable si el diseño es bueno','Expone a multa, paralización y demolición, y el ingeniero comparte responsabilidad','Se regulariza siempre sin problema','No afecta al ingeniero'],1,'La Ley 29090 exige licencia previa. La regularización no siempre es posible y la obra puede ser demolida.']
],
ref:['Código Civil peruano, art. 1784','Ley 28858 y Código de Ética del Colegio de Ingenieros del Perú','Ley 29090 y su reglamento de licencias','Martin y Schinzinger, Ethics in Engineering']});

MOD('m45','Ingeniería ambiental','Agua',
'Toda obra cambia su entorno. La ingeniería ambiental mide ese cambio y lo controla: impacto ambiental, calidad del agua y del aire, y huella de carbono de los materiales.',
['Davis y Cornwell, Introduction to Environmental Engineering','Metcalf & Eddy, Wastewater Engineering','Conesa Fernández-Vítora, Guía metodológica para la evaluación del impacto ambiental','Canter, Environmental Impact Assessment','Ley 27446 (SEIA) y D.S. 019-2009-MINAM','D.S. 004-2017-MINAM (ECA agua) y D.S. 003-2017-MINAM (ECA aire)'],
'UNI: Ingeniería Ambiental, Impacto Ambiental. PUCP: Ingeniería Ambiental (CIV). MIT 1.018: Ecology.');
SUB('eia',{t:'Evaluación de impacto ambiental',
lec:`Antes de construir una carretera, una presa o un relleno sanitario hay que demostrar que sus impactos se pueden controlar. En el Perú lo exige el **Sistema Nacional de Evaluación del Impacto Ambiental (SEIA)**, Ley 27446.

## Categorías
- **I – Declaración de Impacto Ambiental (DIA):** impactos leves
- **II – EIA semidetallado:** impactos moderados
- **III – EIA detallado:** impactos significativos. Los grandes proyectos los evalúa el SENACE

## Matriz de Leopold
Cruza las acciones del proyecto (filas o columnas) con los factores ambientales (agua, aire, suelo, fauna, población). En cada celda:
- Magnitud M: de −10 a +10 (cuánto cambia el factor; signo negativo si empeora)
- Importancia I: de 1 a 10 (qué tan relevante es ese cambio)
- Efecto de la celda: M × I. Se suman por filas y columnas para ver qué acciones y qué factores concentran el impacto

## Importancia de Conesa
Más detallada: I = ±(3IN + 2EX + MO + PE + RV + SI + AC + EF + PR + MC)

- IN intensidad, EX extensión, MO momento, PE persistencia, RV reversibilidad, SI sinergia, AC acumulación, EF efecto, PR periodicidad, MC recuperabilidad
- Resultado entre 13 y 100: < 25 irrelevante, 25–50 moderado, 50–75 severo, > 75 crítico

## Plan de manejo ambiental
Por cada impacto significativo: medidas de prevención, mitigación o compensación, con responsable, costo y monitoreo.`,
ded:`## Por qué Conesa pesa más la intensidad y la extensión
En la fórmula, IN se multiplica por 3 y EX por 2. Conesa razona que cuánto se daña el factor y en qué área son los dos atributos que más pesan en la gravedad; los demás (si es reversible, si se acumula) matizan. Con todos los atributos al mínimo (IN=1, EX=1, demás = 1) se obtiene 3 + 2 + 8 = 13, el mínimo de la escala; con todos al máximo, 100.

## Por qué Leopold multiplica magnitud por importancia
Un cambio grande en algo irrelevante (M alto, I bajo) y un cambio pequeño en algo crítico (M bajo, I alto) pueden pesar lo mismo. El producto combina ambas ideas en un solo número, como el riesgo = probabilidad × impacto.`,
key:['Leopold: E = M × I','I_{Conesa} = ±(3IN + 2EX + MO + PE + RV + SI + AC + EF + PR + MC)','13 ≤ I ≤ 100'],
err:'Calificar un impacto solo por su intensidad, sin ver si es reversible o acumulativo.',
x:[['rsg','Es otra forma de matriz de riesgo'],['pti','Presas y su entorno'],['rsd','Rellenos sanitarios']],
g:[
r=>{const v=[r.i(1,12,1),r.i(1,12,1),r.i(1,4,1),r.i(1,4,1),r.i(1,4,1),r.i(1,4,1),r.i(1,4,1),r.i(1,4,1),r.i(1,4,1),r.i(1,8,1)];const I=3*v[0]+2*v[1]+v.slice(2).reduce((a,b)=>a+b);return{q:`Impacto negativo con IN=${v[0]}, EX=${v[1]}, MO=${v[2]}, PE=${v[3]}, RV=${v[4]}, SI=${v[5]}, AC=${v[6]}, EF=${v[7]}, PR=${v[8]}, MC=${v[9]}. Halla |I| (Conesa).`,a:I,u:'',tol:0,s:[`I = 3·${v[0]} + 2·${v[1]} + ${v.slice(2).join(' + ')} = ${I} (${I<25?'irrelevante':I<50?'moderado':I<75?'severo':'crítico'})`]};},
r=>{const M=r.i(-10,-1,1),I=r.i(1,10,1);return{q:`Celda de Leopold con M=${M} e I=${I}. Halla el efecto.`,a:M*I,u:'',tol:0,s:[`= ${M*I}`]};},
r=>{const c=[[r.i(-10,10,1),r.i(1,10,1)],[r.i(-10,10,1),r.i(1,10,1)],[r.i(-10,10,1),r.i(1,10,1)],[r.i(-10,10,1),r.i(1,10,1)]];return{q:`El factor "calidad del agua" recibe cuatro acciones (M, I): ${c.map(x=>'('+x.join(', ')+')').join(', ')}. Halla la suma de efectos.`,a:c.reduce((s,[m,i])=>s+m*i,0),u:'',tol:0,s:[`= ${c.map(([m,i])=>m*i).join(' + ')} = ${c.reduce((s,[m,i])=>s+m*i,0)}`]};},
r=>{const IN=r.p([1,2,4,8,12]),EX=r.p([1,2,4,8]),o=r.i(8,24,1);const I=3*IN+2*EX+o;return{q:`Un impacto tiene IN=${IN}, EX=${EX} y la suma de los otros ocho atributos es ${o}. ¿Cuánto vale I? Si es mayor o igual a 50 es severo.`,a:I,u:'',tol:0,s:[`I = ${3*IN} + ${2*EX} + ${o} = ${I} (${I<25?'irrelevante':I<50?'moderado':I<75?'severo':'crítico'})`]};},
r=>{const A=[[r.i(-8,-1,1),r.i(2,9,1)],[r.i(-8,-1,1),r.i(2,9,1)],[r.i(1,8,1),r.i(2,9,1)]],B=[[r.i(-8,-1,1),r.i(2,9,1)],[r.i(-8,-1,1),r.i(2,9,1)],[r.i(1,8,1),r.i(2,9,1)]];const sA=A.reduce((s,[m,i])=>s+m*i,0),sB=B.reduce((s,[m,i])=>s+m*i,0);return{q:`Dos trazos de una vía. Trazo A (agua, fauna, empleo): ${A.map(x=>'('+x.join(', ')+')').join(', ')}. Trazo B: ${B.map(x=>'('+x.join(', ')+')').join(', ')}. Halla la suma de Leopold del trazo menos dañino (el mayor valor).`,a:Math.max(sA,sB),u:'',tol:0,s:[`A = ${sA}; B = ${sB}`,`Mejor: ${sA>=sB?'A':'B'} con ${Math.max(sA,sB)}`]};}
],
cri:[
['Una obra genera empleo (+) y contamina un río (−). En la matriz de Leopold la suma total sale positiva. ¿Basta para aprobarla?',['Sí, el total manda','No: un impacto negativo severo debe tener medidas de manejo aunque el total sea positivo','Sí, si el empleo es alto','No se usa Leopold para eso'],1,'Los impactos no se compensan entre factores distintos: el río contaminado sigue afectando a quien lo usa. Cada impacto significativo requiere su medida.'],
['¿Qué atributo hace más grave un impacto en Conesa, a igualdad de lo demás?',['Que sea periódico','Que sea irreversible e irrecuperable','Que sea inmediato','Que sea positivo'],1,'Reversibilidad y recuperabilidad miden si el ambiente vuelve a su estado. Un daño irreversible pesa más porque no hay segunda oportunidad.'],
['Un proyecto grande con impactos significativos sobre una comunidad nativa. ¿Qué categoría probable?',['DIA','EIA semidetallado','EIA detallado (categoría III)','No requiere estudio'],2,'Los impactos significativos exigen EIA detallado y, para grandes proyectos, evaluación del SENACE, además de participación ciudadana y, en su caso, consulta previa.']
],
ref:['Leopold, Clarke, Hanshaw y Balsley, A Procedure for Evaluating Environmental Impact (USGS Circular 645, 1971)','Conesa Fernández-Vítora, Guía metodológica para la evaluación del impacto ambiental','Ley 27446 y D.S. 019-2009-MINAM']});
SUB('cag',{t:'Calidad del agua: DBO y oxígeno',
lec:`El desagüe tiene materia orgánica que las bacterias consumen usando oxígeno. Si se vierte a un río sin tratar, le quita el oxígeno y mueren los peces.

## Demanda bioquímica de oxígeno (DBO)
La materia orgánica que queda se agota exponencialmente:

DBO_{t} = L_{0}(1 − e^{−kt})

- L_{0}: DBO última (todo el oxígeno que se consumirá)
- k: constante de reacción, ≈ 0.1–0.3 día⁻¹ a 20 °C
- Corrección por temperatura: k_{T} = k_{20}·1.047^{T−20}

La DBO₅ (a cinco días) es el dato de laboratorio estándar.

## Mezcla en el río
C = (Q_{r}C_{r} + Q_{d}C_{d})/(Q_{r} + Q_{d})

## Curva de oxígeno (Streeter-Phelps)
El déficit de oxígeno D (saturación menos oxígeno disuelto) aguas abajo:

D_{t} = [k_{1}L_{0}/(k_{2} − k_{1})](e^{−k_{1}t} − e^{−k_{2}t}) + D_{0}e^{−k_{2}t}

- k_{1}: desoxigenación (consumo); k_{2}: reaireación (el río toma oxígeno del aire)
- El déficit es máximo en el **tiempo crítico** t_{c}

Los Estándares de Calidad Ambiental para agua (ECA, D.S. 004-2017-MINAM) fijan límites de oxígeno disuelto y DBO según el uso del río.`,
ded:`## De dónde sale DBO = L₀(1 − e^{−kt})
Se supone una reacción de primer orden: la velocidad con que desaparece la materia orgánica L es proporcional a la que queda: dL/dt = −kL. Separando e integrando: L = L_{0}e^{−kt}. El oxígeno consumido hasta t es lo que desapareció: DBO_{t} = L_{0} − L = L_{0}(1 − e^{−kt}). Es la misma ecuación diferencial que el enfriamiento de Newton y la descarga de un condensador (Davis y Cornwell).

## De dónde sale Streeter-Phelps
El déficit crece por consumo (k_{1}L) y baja por reaireación (k_{2}D): dD/dt = k_{1}L_{0}e^{−k_{1}t} − k_{2}D. Es una ecuación lineal de primer orden; resolviéndola con D(0) = D_{0} se obtiene la fórmula de la lección. Derivando D_{t} e igualando a cero:

t_{c} = [1/(k_{2} − k_{1})]·ln{(k_{2}/k_{1})[1 − D_{0}(k_{2} − k_{1})/(k_{1}L_{0})]}

## La mezcla
Es conservación de masa: la masa de contaminante por segundo (Q·C) que trae cada corriente se suma, y se divide entre el caudal total.`,
key:['DBO_{t} = L_{0}(1 − e^{−kt})','k_{T} = k_{20}·1.047^{T−20}','C = [[Q_{r}C_{r} + Q_{d}C_{d}|Q_{r} + Q_{d}]]','D_{t} = [[k_{1}L_{0}|k_{2}−k_{1}]](e^{−k_{1}t} − e^{−k_{2}t}) + D_{0}e^{−k_{2}t}'],
err:'Confundir la DBO₅ con la DBO última.',
x:[['edo','Ecuaciones diferenciales de primer orden'],['pta','Tratamiento de aguas'],['lod','Lodos activados']],
g:[
r=>{const L=r.i(50,400,5),k=r.i(.1,.3,.01),t=r.p([1,3,5,7,10]);return{q:`L₀=${L} mg/L, k=${k} día⁻¹. Halla la DBO a ${t} días.`,a:L*(1-Math.exp(-k*t)),u:'mg/L',s:[`= ${L}(1 − e^{−${n(k*t)}}) = ${n(L*(1-Math.exp(-k*t)))} mg/L`]};},
r=>{const B=r.i(20,300,5),k=r.i(.1,.3,.01);return{q:`DBO₅=${B} mg/L con k=${k} día⁻¹. Halla L₀.`,a:B/(1-Math.exp(-5*k)),u:'mg/L',s:[`L₀ = ${B}/(1 − e^{−${n(5*k)}}) = ${n(B/(1-Math.exp(-5*k)))} mg/L`]};},
r=>{const Qr=r.i(1,50,.5),Cr=r.i(1,5,.1),Qd=r.i(.02,2,.01),Cd=r.i(20,300,5);return{q:`Río con Q=${Qr} m³/s y DBO ${Cr} mg/L recibe un vertimiento de ${Qd} m³/s con ${Cd} mg/L. Halla la DBO de la mezcla.`,a:(Qr*Cr+Qd*Cd)/(Qr+Qd),u:'mg/L',s:[`= (${n(Qr*Cr)} + ${n(Qd*Cd)})/${n(Qr+Qd)} = ${n((Qr*Cr+Qd*Cd)/(Qr+Qd))} mg/L`]};},
r=>{const k=r.i(.15,.3,.01),T=r.i(10,30,1),L=r.i(50,300,5);const kT=k*1.047**(T-20);return{q:`k₂₀=${k} día⁻¹, agua a ${T} °C, L₀=${L} mg/L. Halla la DBO₅ a esa temperatura.`,a:L*(1-Math.exp(-5*kT)),u:'mg/L',s:[`k_{T} = ${n(kT)} día⁻¹`,`DBO₅ = ${n(L*(1-Math.exp(-5*kT)))} mg/L`]};},
r=>{const k1=r.i(.15,.35,.01),k2=r.i(.4,1,.05),L=r.i(10,40,.5),D0=r.i(0,2,.1),Cs=r.p([8.2,8.6,9.1]);const tc=1/(k2-k1)*Math.log(k2/k1*(1-D0*(k2-k1)/(k1*L)));const D=k1*L/(k2-k1)*(Math.exp(-k1*tc)-Math.exp(-k2*tc))+D0*Math.exp(-k2*tc);return{q:`Aguas abajo de un vertimiento: L₀=${L} mg/L, D₀=${D0} mg/L, k₁=${k1}, k₂=${k2} día⁻¹, saturación ${Cs} mg/L. Halla el oxígeno disuelto mínimo.`,a:Cs-D,u:'mg/L',s:[`t_{c} = ${n(tc)} días`,`D_{c} = ${n(D)} mg/L`,`OD_{mín} = ${Cs} − ${n(D)} = ${n(Cs-D)} mg/L`]};}
],
cri:[
['Un río caudaloso y uno pequeño reciben el mismo desagüe. ¿Cuál sufre más?',['El caudaloso','El pequeño: diluye menos','Igual','Depende del IGV'],1,'Por la ecuación de mezcla, a menor caudal del río, mayor la concentración resultante.'],
['¿Por qué un río con rápidos se recupera más pronto que uno lento?',['Porque tiene menos DBO','Porque su reaireación k₂ es mayor: la turbulencia mete oxígeno del aire','Porque es más frío siempre','No hay diferencia'],1,'La turbulencia renueva la superficie del agua en contacto con el aire y acelera la reaireación.'],
['En verano el agua está más caliente. ¿Qué pasa con la DBO y el oxígeno?',['Nada','Las bacterias consumen más rápido (k sube) y el agua disuelve menos oxígeno: empeora','Mejora todo','Solo baja la DBO'],1,'Ambos efectos van en la misma dirección: más consumo y menos oxígeno disponible.']
],
ref:['Davis y Cornwell, Introduction to Environmental Engineering','Metcalf & Eddy, Wastewater Engineering: Treatment and Resource Recovery','Streeter y Phelps, A Study of the Pollution and Natural Purification of the Ohio River (1925)']});
SUB('air',{t:'Calidad del aire en obras',
lec:`Plantas de asfalto, chancadoras, canteras y el tráfico de volquetes emiten gases y polvo. El ingeniero estima cuánto llega a las viviendas cercanas.

## Unidades
Las concentraciones se dan en ppm (volumen) o en μg/m³ (masa). A 25 °C y 1 atm:

C (μg/m³) = ppm × M × 1000/24.45, con M la masa molar en g/mol.

## Emisiones
E = A × FE: nivel de actividad (t producidas, km recorridos) × factor de emisión (de la EPA AP-42 o similares).

## Pluma gaussiana
Para una chimenea de altura efectiva H, con viento u, la concentración a nivel del suelo en el eje de la pluma es:

C = Q/(π σ_{y} σ_{z} u)·exp(−H²/(2σ_{z}²))

σ_{y} y σ_{z} crecen con la distancia y dependen de la estabilidad atmosférica (clases de Pasquill A a F). La altura efectiva es la de la chimenea más la elevación de la pluma: H = h + Δh.

## Norma
Los Estándares de Calidad Ambiental de aire (ECA, D.S. 003-2017-MINAM) fijan límites para PM₁₀, PM₂.₅, SO₂, NO₂, CO y otros.`,
ded:`## La conversión de ppm
1 ppm significa 1 m³ del gas por cada 10⁶ m³ de aire. Un mol de gas ideal ocupa 24.45 L a 25 °C y 1 atm (de PV = nRT). Entonces 1 m³ de gas tiene 1000/24.45 mol y pesa M·1000/24.45 g. Repartido en 10⁶ m³: M·1000/24.45 μg/m³ por cada ppm.

## La pluma gaussiana
Se supone que el contaminante se dispersa por turbulencia como una distribución normal en la horizontal y la vertical, alrededor del eje de la pluma, y que el suelo lo refleja (de ahí que el exponente tenga H²/(2σ_{z}²) y el factor sea π en vez de 2π). La masa emitida por segundo Q se reparte en el área que el viento barre: por eso se divide entre u. Es el modelo base de Turner (Workbook of Atmospheric Dispersion Estimates) y de los programas de la EPA.

## Por qué una chimenea más alta reduce la concentración
H aparece al cuadrado dentro de una exponencial negativa: duplicar la altura puede reducir mucho la concentración en el suelo cerca de la fuente.`,
key:['C = [[ppm·M·1000|24.45]]','E = A × FE','C = [[Q|πσ_{y}σ_{z}u]]e^{−H^{2}/2σ_{z}^{2}}'],
err:'Comparar una concentración horaria con un ECA anual.',
x:[['edo','Conservación de masa'],['ondas','Ruido en obra'],['seg','Salud ocupacional']],
g:[
r=>{const p=r.i(.01,5,.01),g=r.p([[28,'CO'],[46,'NO₂'],[64,'SO₂']]);return{q:`${p} ppm de ${g[1]} (M=${g[0]}). Halla μg/m³ a 25 °C.`,a:p*g[0]*1000/24.45,u:'μg/m³',s:[`= ${p}·${g[0]}·1000/24.45 = ${n(p*g[0]*1000/24.45)} μg/m³`]};},
r=>{const A=r.i(50,800,10),FE=r.i(.01,.5,.01);return{q:`Una chancadora procesa ${A} t/día con factor de emisión de PM₁₀ ${FE} kg/t. Halla la emisión diaria.`,a:A*FE,u:'kg/día',s:[`= ${n(A*FE)} kg/día`]};},
r=>{const Q=r.i(1,100,1),sy=r.i(20,300,5),sz=r.i(10,150,5),u=r.i(1,8,.5);return{q:`Q=${Q} g/s, σ_{y}=${sy} m, σ_{z}=${sz} m, u=${u} m/s, fuente a nivel del suelo (H=0). Halla C en μg/m³.`,a:Q/(PI*sy*sz*u)*1e6,u:'μg/m³',s:[`C = ${Q}/(π·${sy}·${sz}·${u}) = ${n(Q/(PI*sy*sz*u)*1e6)} μg/m³`]};},
r=>{const Q=r.i(1,100,1),sy=r.i(20,300,5),sz=r.i(10,150,5),u=r.i(1,8,.5),h=r.i(10,60,5),dh=r.i(5,40,5);const H=h+dh,C=Q/(PI*sy*sz*u)*Math.exp(-H*H/(2*sz*sz))*1e6;return{q:`Chimenea de ${h} m con elevación de pluma ${dh} m. Q=${Q} g/s, σ_{y}=${sy}, σ_{z}=${sz} m, u=${u} m/s. Halla C a nivel del suelo en el eje.`,a:C,u:'μg/m³',s:[`H = ${H} m`,`C = ${n(Q/(PI*sy*sz*u)*1e6)}·e^{−${n(H*H/(2*sz*sz))}} = ${n(C)} μg/m³`]};},
r=>{const A=r.i(100,600,10),FE=r.i(.05,.3,.01),h=r.i(8,24,1),sy=r.i(40,150,5),sz=r.i(20,80,5),u=r.i(1.5,5,.5),ECA=r.p([100,150]),ef=r.p([0,.5,.7,.9]);const Q=A*FE*(1-ef)*1000/(h*3600),C=Q/(PI*sy*sz*u)*1e6;return{q:`Planta de ${A} t/día que opera ${h} h/día con FE de PM₁₀ ${FE} kg/t y control de polvo de eficiencia ${ef*100} %. En la vivienda más cercana σ_{y}=${sy}, σ_{z}=${sz} m, u=${u} m/s (fuente a nivel del suelo). Halla C/ECA con ECA=${ECA} μg/m³ (si es mayor que 1, se incumple).`,a:C/ECA,u:'',s:[`Q = ${n(Q)} g/s`,`C = ${n(C)} μg/m³`,`C/ECA = ${n(C/ECA)}`]};}
],
cri:[
['Una chancadora en obra levanta mucho polvo. ¿Cuál es la medida más eficaz y barata?',['Pintar la chancadora','Humedecer el material y los accesos y colocar cubiertas','Trabajar de noche','No hacer nada'],1,'El riego y el encapsulado reducen la emisión de polvo en la fuente, que es donde más rinde el control.'],
['Una medición de 1 hora dio 140 μg/m³ de PM₁₀ y el ECA es de 24 horas. ¿Se incumple?',['Sí, siempre','No necesariamente: hay que comparar promedios del mismo periodo','No, las horas no importan','Solo de noche'],1,'Los ECA se definen para un periodo de promedio. Un pico horario puede convivir con un promedio de 24 h bajo el límite.'],
['¿Qué condición atmosférica empeora la contaminación en Lima en invierno?',['Viento fuerte','La inversión térmica: aire frío abajo que no se mezcla con el de arriba','La lluvia','El sol intenso'],1,'Con inversión térmica la atmósfera es estable (Pasquill E o F) y la dispersión vertical es muy pequeña: los contaminantes se quedan cerca del suelo.']
],
ref:['Turner, Workbook of Atmospheric Dispersion Estimates (EPA)','EPA, AP-42 Compilation of Air Emissions Factors','D.S. 003-2017-MINAM, Estándares de Calidad Ambiental para Aire']});
SUB('huc',{t:'Huella de carbono de la construcción',
lec:`El cemento es responsable de cerca del 8 % de las emisiones mundiales de CO₂. Diseñar con menos material o con materiales de menor huella es parte de la ingeniería moderna.

## Carbono incorporado
CO₂ = Σ(cantidad de material × factor de emisión)

Factores de referencia (varían por fabricante; usa los datos del proyecto):
- Cemento: 0.8–0.95 kg CO₂ por kg
- Acero de refuerzo: 1.2–2.0 kg CO₂ por kg (menos si es de chatarra reciclada en horno eléctrico)
- Ladrillo de arcilla cocido: 0.2–0.3 kg CO₂ por kg
- Madera: muy baja, e incluso almacena carbono

## Cómo reducirla
- Reemplazar parte del cemento por puzolana, escoria o ceniza volante (cementos tipo IP o IS)
- Optimizar secciones: el concreto que no se coloca no emite
- Elegir materiales locales para reducir transporte
- Diseñar para durar: una estructura que dura el doble emite la mitad por año de uso

## Indicador
kg CO₂ por m² construido, para comparar edificios.`,
ded:`## Por qué el cemento emite tanto
Se emite por dos vías: la química y el combustible. Para hacer clínker se calcina caliza: CaCO₃ → CaO + CO₂. Por cada 100 g de CaCO₃ salen 44 g de CO₂ (masas molares 100 y 44). Además, el horno trabaja a cerca de 1450 °C y consume combustible. Por eso la reducción más eficaz es usar menos clínker por m³.

## Cálculo por m³ de concreto
Si un m³ lleva C kg de cemento con factor f, emite C·f solo por el cemento. Con 350 kg y 0.9 kg/kg: 315 kg de CO₂ por m³.`,
key:['CO_{2} = Σ m_{i}·f_{i}','CaCO_{3} → CaO + CO_{2}','Indicador = [[CO_{2}|área]]'],
err:'Comparar edificios por CO₂ total sin dividir entre el área o la vida útil.',
x:[['qm1','Química del cemento'],['mez','Cantidad de cemento por m³'],['tv','Sostenibilidad']],
g:[
r=>{const V=r.i(10,3000,10),C=r.i(280,450,10),f=r.i(.8,.95,.01);return{q:`${V} m³ de concreto con ${C} kg de cemento por m³ y factor ${f} kg CO₂/kg. Halla las toneladas de CO₂ del cemento.`,a:V*C*f/1000,u:'t',s:[`= ${V}·${C}·${f}/1000 = ${n(V*C*f/1000)} t`]};},
r=>{const m=r.i(1,500,1),f=r.i(1.2,2,.1);return{q:`${m} t de acero con factor ${f} kg CO₂/kg. Halla el CO₂.`,a:m*f,u:'t',s:[`= ${n(m*f)} t`]};},
r=>{const m=r.i(10,1000,10);return{q:`¿Cuántas toneladas de CO₂ salen químicamente al calcinar ${m} t de caliza pura?`,a:m*44/100,u:'t',s:[`= ${m}·44/100 = ${n(m*.44)} t`]};},
r=>{const V=r.i(100,3000,10),C=r.i(300,450,10),p=r.i(10,35,1),f=.9;return{q:`${V} m³ de concreto con ${C} kg/m³ de cemento (0.9 kg/kg). Si se reemplaza ${p} % del cemento por puzolana de huella despreciable, ¿cuántas t de CO₂ se ahorran?`,a:V*C*p/100*f/1000,u:'t',s:[`= ${V}·${C}·${p/100}·0.9/1000 = ${n(V*C*p/100*f/1000)} t`]};},
r=>{const A=r.i(500,10000,100),v=r.i(.2,.45,.01),C=r.i(300,400,10),k=r.i(25,60,1),fc=r.i(.85,.95,.01),fa=r.i(1.3,2,.1),L=r.i(20,60,1),fl=.25;const V=A*v,co=V*C*fc/1000+V*k*fa/1000+A*L*fl/1000;return{q:`Edificio de ${A} m² con ${v} m³ de concreto por m², ${C} kg de cemento por m³ (${fc} kg CO₂/kg), ${k} kg de acero por m³ de concreto (${fa} kg/kg) y ${L} kg de ladrillo por m² (0.25 kg/kg). Halla el indicador en kg CO₂/m².`,a:co*1000/A,u:'kg/m²',s:[`Concreto: ${n(V*C*fc/1000)} t; acero: ${n(V*k*fa/1000)} t; ladrillo: ${n(A*L*fl/1000)} t`,`Total ${n(co)} t → ${n(co*1000/A)} kg/m²`]};}
],
cri:[
['¿Qué reduce más la huella de una estructura de concreto?',['Pintarla de blanco','Usar menos clínker: cemento adicionado y secciones optimizadas','Usar más acero','Vaciarla más rápido'],1,'La mayor parte de la huella está en el clínker. Cada kilo de cemento que no se usa ahorra casi un kilo de CO₂.'],
['Dos diseños: A emite 10 % menos al construirse pero dura 25 años; B dura 50. ¿Cuál tiene menor huella por año de servicio?',['A','B, porque reparte su huella en el doble de años','Igual','No se puede comparar'],1,'La durabilidad es una medida de sostenibilidad: reconstruir A una vez más duplica su huella.']
],
ref:['Hammond y Jones, Inventory of Carbon and Energy (ICE), Universidad de Bath','Mehta y Monteiro, Concrete: Microstructure, Properties, and Materials (capítulo de sostenibilidad)']});
