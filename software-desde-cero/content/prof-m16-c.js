(function () {
var S = SDC.S;

S('m16', 'm16.priv', { title: 'Privacidad y protección de datos personales',
  ask: '¿Qué concepto de privacidad o protección de datos se aplica?',
  lesson: `
> **La idea en simple.** Seguridad y privacidad no son lo mismo. La seguridad protege los datos de quienes **no** deberían tenerlos. La privacidad pregunta algo más: aunque los datos estén perfectamente protegidos, ¿deberíamos recolectarlos?, ¿para qué los usamos?, ¿cuánto tiempo los guardamos?, ¿sabe la persona lo que hacemos con ellos y puede decir que no? Un sistema puede ser muy seguro y aun así violar la privacidad de sus usuarios.

## Por qué importa
Los datos personales permiten conocer, perfilar e influir en las personas. Escándalos como el de **Cambridge Analytica** (revelado en 2018), en el que datos de hasta 87 millones de usuarios de Facebook se obtuvieron mediante una aplicación de encuestas y se usaron para segmentar propaganda política, mostraron que el problema no es solo el robo de datos, sino su uso para fines que las personas nunca aceptaron. Por eso casi todos los países tienen leyes de protección de datos, y los ingenieros de software son quienes, en la práctica, deciden qué datos se recolectan y cómo se tratan.

## El marco legal en el Perú
- La **Constitución** reconoce el derecho a la intimidad y a la autodeterminación informativa (artículo 2, incisos 6 y 7), protegido por el proceso de **hábeas data**.
- La **Ley N.º 29733, Ley de Protección de Datos Personales** (2011), y su reglamento, reemplazado por uno nuevo aprobado mediante el Decreto Supremo N.º 016-2024-JUS, que actualizó las obligaciones, entre ellas las referidas a la seguridad, los incidentes y la figura del oficial de datos personales.
- La autoridad es la **Autoridad Nacional de Protección de Datos Personales**, del Ministerio de Justicia y Derechos Humanos, que fiscaliza y puede imponer multas.
Conceptos de la ley:
- **Dato personal:** toda información sobre una persona natural que la identifica o la hace identificable (nombre, DNI, teléfono, placa asociada a una persona, ubicación, fotos).
- **Datos sensibles:** los que revelan origen racial o étnico, ingresos, opiniones políticas, convicciones religiosas, afiliación sindical, salud, vida sexual y datos biométricos, entre otros; tienen protección reforzada y, en general, exigen consentimiento **por escrito**.
- **Titular** (la persona a quien se refieren los datos), **titular del banco de datos** (la organización que decide sobre ellos) y **encargado** (quien los trata por cuenta de otro, como un proveedor de nube).
- **Bancos de datos personales:** las organizaciones deben inscribirlos en el Registro Nacional de Protección de Datos Personales.

## Principios
La ley peruana, como las de muchos países, se basa en principios que el software debe respetar:
- **Legalidad y consentimiento:** tratar los datos con una base legítima, en general el consentimiento **libre, previo, expreso, informado e inequívoco** del titular, salvo excepciones legales (por ejemplo, cuando son necesarios para ejecutar un contrato con él).
- **Finalidad:** recolectar los datos para fines determinados, explícitos y lícitos, y no usarlos después para otros incompatibles.
- **Proporcionalidad:** recolectar solo los datos adecuados, relevantes y **no excesivos** para esa finalidad (lo que en otros marcos se llama **minimización**).
- **Calidad:** datos veraces, exactos y actualizados, conservados solo el tiempo necesario.
- **Seguridad:** medidas técnicas, organizativas y legales para protegerlos.
- **Disposición de recurso** y **nivel de protección adecuado** para las transferencias internacionales.

## Los derechos ARCO
Los titulares tienen derechos que el sistema debe poder atender, dentro de los plazos legales:
- **Acceso:** saber qué datos suyos se tienen, de dónde vienen y para qué se usan.
- **Rectificación:** corregir datos inexactos o incompletos.
- **Cancelación:** pedir que se eliminen cuando ya no son necesarios o se retira el consentimiento.
- **Oposición:** oponerse a ciertos tratamientos, como el envío de publicidad.
Para el ingeniero, esto significa diseñar desde el inicio la capacidad de **encontrar todos los datos de una persona** en todos los sistemas (bases de datos, respaldos, registros, almacenes analíticos, proveedores), exportarlos, corregirlos y borrarlos. Un sistema donde los datos de una persona están dispersos en veinte lugares sin inventario no puede cumplir la ley.

## El Reglamento General de Protección de Datos europeo
El **RGPD** (en inglés, GDPR), vigente desde mayo de 2018, es la referencia mundial y se aplica a cualquier empresa del mundo que ofrezca servicios a personas en la Unión Europea. Introdujo o reforzó:
- Multas de hasta 20 millones de euros o el 4 % de la facturación mundial anual, lo que sea mayor.
- **Privacidad por diseño y por defecto** como obligación legal (artículo 25).
- **Notificación de brechas** a la autoridad en 72 horas.
- **Evaluaciones de impacto** obligatorias para tratamientos de alto riesgo.
- **Portabilidad** de los datos y derecho a no ser objeto de decisiones **solo automatizadas** con efectos significativos.
Muchas leyes posteriores en América Latina se inspiraron en él (como la LGPD de Brasil, de 2020).

## Privacidad por diseño
Ann Cavoukian, comisionada de información y privacidad de Ontario, propuso en 2009 los **siete principios de la privacidad por diseño**: ser proactivo y no reactivo; privacidad **por defecto** (sin que el usuario tenga que hacer nada); privacidad incorporada en el diseño; funcionalidad completa ("suma positiva", no privacidad contra funcionalidad); seguridad de extremo a extremo durante todo el ciclo de vida de los datos; visibilidad y transparencia; y respeto por la privacidad del usuario. Traducido a decisiones de ingeniería:
- **No recolectar** lo que no se necesita: el dato más seguro es el que no se tiene.
- **Configuraciones privadas por defecto:** las notificaciones de marketing, desactivadas hasta que el usuario las active.
- **Seudonimizar** en los sistemas que no necesitan la identidad (analítica, pruebas).
- **Políticas de retención** automáticas: borrar o anonimizar cuando se cumple la finalidad.
- **Datos de prueba sintéticos** o anonimizados, nunca copias de producción con datos reales.
- **Registros sin datos personales:** no escribir DNI, teléfonos ni contraseñas en los archivos de registro.
- **Cifrar** los datos personales en reposo y en tránsito, y controlar quién accede.

## Seudonimizar no es anonimizar
- **Seudonimización:** reemplazar los identificadores directos por un código (el DNI por "cliente-8f3a"). Quien tiene la tabla de correspondencia puede revertirlo; por eso los datos seudonimizados **siguen siendo datos personales**.
- **Anonimización:** transformar los datos de modo que la persona ya **no sea identificable** por ningún medio razonable. Los datos realmente anónimos quedan fuera de la ley de protección de datos.
El problema es que anonimizar es mucho más difícil de lo que parece. Latanya Sweeney mostró en 2000 que el **87 %** de la población de Estados Unidos podía identificarse de forma única con solo tres datos: código postal, fecha de nacimiento y sexo; en 1997 había identificado así la historia clínica del gobernador de Massachusetts en un conjunto de datos de salud "anónimo". En 2008, Arvind Narayanan y Vitaly Shmatikov reidentificaron usuarios del conjunto de datos "anónimo" que Netflix publicó para su concurso de recomendaciones, cruzándolo con reseñas públicas de IMDb. Estos datos que no identifican solos pero sí combinados se llaman **cuasi identificadores**.

## k-anonimato y privacidad diferencial
- **k-anonimato** (Sweeney, 2002): un conjunto de datos es k-anónimo si cada combinación de cuasi identificadores aparece al menos **k** veces, de modo que cada persona se confunde con al menos k − 1 otras. Se logra **generalizando** (edad exacta → rango de 10 años; distrito → provincia) o **suprimiendo** registros raros. Tiene debilidades conocidas: si todas las personas de un grupo tienen el mismo dato sensible, el k-anonimato no lo protege (por eso se propusieron la l-diversidad y la t-cercanía).
- **Privacidad diferencial** (Cynthia Dwork, Frank McSherry, Kobbi Nissim y Adam Smith, 2006): en lugar de transformar los datos, se agrega **ruido aleatorio calibrado** a los resultados de las consultas, de modo que el resultado casi no cambia si se incluye o no a una persona cualquiera. Ofrece una garantía **matemática** medida por un parámetro ε (épsilon): cuanto menor, más privacidad y más ruido. La usan Apple y Google para estadísticas de uso, y la Oficina del Censo de Estados Unidos la aplicó al censo de 2020.
~~~js
// ¿Es k-anónima una tabla según sus cuasi identificadores?
function kAnonimato(filas, cuasi) {
  const grupos = {};
  for (const f of filas) { const clave = cuasi.map(c => f[c]).join('|'); grupos[clave] = (grupos[clave] || 0) + 1; }
  return Math.min(...Object.values(grupos));
}
const dueños = [
  { distrito: 'Callao', edad: '30-39', vehiculo: 'camión' }, { distrito: 'Callao', edad: '30-39', vehiculo: 'auto' },
  { distrito: 'Callao', edad: '30-39', vehiculo: 'auto' }, { distrito: 'Lima', edad: '40-49', vehiculo: 'auto' },
  { distrito: 'Lima', edad: '40-49', vehiculo: 'camión' }
];
console.log('k =', kAnonimato(dueños, ['distrito', 'edad']));            // cada grupo tiene al menos 2
console.log('k =', kAnonimato(dueños, ['distrito', 'edad', 'vehiculo']));  // un grupo con 1: identificable
~~~

## Evaluaciones de impacto
Antes de lanzar un tratamiento de datos de riesgo (datos sensibles, vigilancia, perfilado, grandes volúmenes, nuevas tecnologías como el reconocimiento facial), se realiza una **evaluación de impacto en la protección de datos** (EIPD o DPIA): describir el tratamiento, evaluar su necesidad y proporcionalidad, identificar los riesgos para las personas (no para la empresa) y definir medidas para reducirlos. El método LINDDUN que viste en modelado de amenazas ayuda a encontrar esos riesgos.

## Ejemplo resuelto: privacidad en PatioApp
1. **Inventario de datos personales:** nombre, DNI y teléfono de los dueños; placas (dato personal cuando se asocian a una persona); fotos de las unidades (pueden mostrar personas o documentos dentro del vehículo); ubicación de los operadores en la app.
2. **Minimización:** se deja de pedir el DNI del dueño, que no era necesario para la finalidad (basta el teléfono verificado y la placa); se desactiva la ubicación continua de los operadores, que se había agregado "por si acaso".
3. **Consentimiento:** las notificaciones operativas sobre la unidad se basan en la relación contractual; las promociones requieren un consentimiento aparte, desactivado por defecto y revocable desde el mismo mensaje.
4. **Derechos ARCO:** un procedimiento y una función interna que buscan todos los datos de un teléfono en la base, el almacenamiento de fotos, los eventos y el sistema de notificaciones, y los exportan o borran (en el registro de eventos, mediante borrado criptográfico).
5. **Retención:** las fotos se borran a los 12 meses de la salida de la unidad; las estadías se anonimizan a los 5 años, conservando solo lo que exige la normativa tributaria para los comprobantes.
6. **Analítica:** el tablero de gerencia usa datos agregados por distrito y rango de edad con k ≥ 10; los datos de prueba son sintéticos.
7. **Proveedores:** contratos de encargo de tratamiento con el proveedor de nube y el de mensajería, y verificación de las condiciones de la transferencia internacional (los servidores están en Brasil).`,
  links: [['m16.threat', 'LINDDUN modela las amenazas a la privacidad'], ['m11.nfr', 'la Ley 29733 impone requisitos que deben trazarse'], ['m17.ethics', 'la privacidad es también una cuestión ética de la profesión']],
  read: 'Ley N.º 29733 y su reglamento (D. S. N.º 016-2024-JUS); Cavoukian, *Privacy by Design: The 7 Foundational Principles* (2009); Sweeney (2002); Dwork y Roth, *The Algorithmic Foundations of Differential Privacy* (2014).',
  terms: [
    ['Dato personal', 'información que identifica o hace identificable a una persona natural', ['Teléfono del dueño.', 'Placa asociada a una persona.', 'Foto con su rostro.']],
    ['Dato sensible', 'dato personal con protección reforzada, como salud, origen étnico, ingresos o datos biométricos', ['Requiere consentimiento por escrito en general.', 'Ley 29733.', 'Mayor riesgo de daño.']],
    ['Principio de finalidad', 'los datos se recolectan para fines determinados y no se usan para otros incompatibles', ['Teléfono para notificar la unidad, no para vender.', 'Se informa al titular.', 'Base de la confianza.']],
    ['Derechos ARCO', 'acceso, rectificación, cancelación y oposición del titular sobre sus datos', ['Exigen encontrar todos sus datos.', 'Tienen plazos legales.', 'Se diseñan desde el inicio.']],
    ['Privacidad por diseño', 'enfoque que incorpora la privacidad en el diseño desde el inicio y por defecto', ['Cavoukian, 2009.', 'Siete principios.', 'Obligatorio en el RGPD.']],
    ['Seudonimización', 'reemplazo de identificadores directos por códigos que pueden revertirse con información adicional', ['DNI por cliente-8f3a.', 'Sigue siendo dato personal.', 'Útil para analítica.']],
    ['k-anonimato', 'propiedad de un conjunto de datos en que cada combinación de cuasi identificadores aparece al menos k veces', ['Sweeney, 2002.', 'Se logra generalizando.', 'No protege grupos homogéneos.']],
    ['Privacidad diferencial', 'garantía matemática que agrega ruido calibrado a los resultados para que casi no dependan de una persona', ['Dwork y otros, 2006.', 'Parámetro épsilon.', 'Censo de EE. UU. 2020.']]
  ],
  q: [
    ['¿Qué diferencia hay entre seguridad y privacidad?', 'La seguridad protege los datos de accesos indebidos; la privacidad decide qué datos se recolectan, para qué y por cuánto tiempo', ['Son lo mismo', 'La privacidad es solo cifrar', 'La seguridad es solo legal'], 'Un sistema seguro puede violar la privacidad.', 2],
    ['¿Qué principio se viola al pedir el DNI cuando no hace falta para la finalidad?', 'Proporcionalidad o minimización', ['Calidad', 'Disposición de recurso', 'Ninguno'], 'Solo datos adecuados y no excesivos.', 2],
    ['¿Los datos seudonimizados siguen siendo datos personales?', 'Sí, porque con información adicional se puede volver a identificar a la persona', ['No, nunca', 'Solo si están cifrados', 'Solo en Europa'], 'La anonimización real es otra cosa.', 3],
    ['¿Qué mostró Sweeney en 2000?', 'Que el 87 % de la población de EE. UU. se identifica con código postal, fecha de nacimiento y sexo', ['Que los datos anónimos son imposibles de reidentificar', 'Que el DNI es secreto', 'Que la privacidad diferencial no funciona'], 'Cuasi identificadores.', 3],
    ['¿Qué significa que una tabla sea 5-anónima?', 'Que cada combinación de cuasi identificadores aparece al menos 5 veces', ['Que tiene 5 columnas', 'Que se borra a los 5 años', 'Que tiene 5 usuarios'], 'Cada persona se confunde con al menos 4 más.', 3],
    ['¿Qué hace la privacidad diferencial?', 'Agrega ruido calibrado a los resultados para que casi no dependan de ninguna persona en particular', ['Borra todos los datos', 'Cifra la base', 'Pide consentimiento'], 'Garantía matemática con épsilon.', 4],
    ['¿En cuánto tiempo exige el RGPD notificar una brecha a la autoridad?', '72 horas', ['24 horas', '30 días', 'No lo exige'], 'Artículo 33 del RGPD.', 2],
    { tf: 'Para cumplir los derechos ARCO, el sistema debe poder encontrar todos los datos de una persona en todos sus componentes.', v: true, e: 'Incluidos respaldos, registros y proveedores.', l: 2 },
    { tf: 'Copiar la base de producción con datos reales al entorno de pruebas es una buena práctica de privacidad.', v: false, e: 'Se usan datos sintéticos o anonimizados.', l: 1 },
    { c: 'Escribe «kAnonimato(filas, cuasi)»: devuelve el tamaño del grupo más pequeño de filas con la misma combinación de los campos en cuasi (0 si no hay filas).', f: 'kAnonimato', p: ['filas', 'cuasi'], t: [[[[{ d: 'A', e: 1 }, { d: 'A', e: 1 }, { d: 'B', e: 2 }], ['d', 'e']], 1], [[[{ d: 'A' }, { d: 'A' }], ['d']], 2], [[[], ['d']], 0]], sol: '  if (!filas.length) return 0;\n  const g = {};\n  for (const f of filas) { const k = cuasi.map(c => f[c]).join("|"); g[k] = (g[k] || 0) + 1; }\n  return Math.min(...Object.values(g));', l: 3 },
    { c: 'Escribe «rangoEdad(edad)»: generaliza una edad a un rango de 10 años como texto "30-39".', f: 'rangoEdad', p: ['edad'], t: [[[34], '30-39'], [[40], '40-49'], [[9], '0-9']], sol: '  const b = Math.floor(edad / 10) * 10;\n  return b + "-" + (b + 9);', l: 1 },
    { c: 'Escribe «enmascarar(telefono)»: deja visibles solo los 3 últimos dígitos y reemplaza los demás caracteres por "*".', f: 'enmascarar', p: ['telefono'], t: [[['987654321'], '******321'], [['123'], '123'], [['12'], '12']], sol: '  return telefono.length <= 3 ? telefono : "*".repeat(telefono.length - 3) + telefono.slice(-3);', l: 2 }
  ],
  gen: function (g) {
    var pr = [['Usar el teléfono de los dueños para enviar publicidad de otra empresa', 'Finalidad'], ['Pedir la fecha de nacimiento para registrar una unidad', 'Proporcionalidad'], ['Guardar las fotos para siempre "por si acaso"', 'Calidad (conservación limitada)'], ['Dejar la base de datos de dueños sin contraseña', 'Seguridad'], ['Enviar promociones sin haber pedido permiso', 'Consentimiento']];
    pr.forEach(function (p) { g.mcq(2, '¿Qué principio de protección de datos se viola? ' + p[0], p[1], ['Finalidad', 'Proporcionalidad', 'Calidad (conservación limitada)', 'Seguridad', 'Consentimiento'].filter(function (x) { return x !== p[1]; }).slice(0, 3), 'Principios de la Ley 29733.'); });
    var ar = [['Un dueño quiere saber qué datos suyos se guardan', 'Acceso'], ['Un dueño pide corregir su teléfono', 'Rectificación'], ['Un dueño pide que borren sus datos', 'Cancelación'], ['Un dueño no quiere recibir más promociones', 'Oposición']];
    ar.forEach(function (a) { g.mcq(1, '¿Qué derecho ARCO ejerce? ' + a[0], a[1], ['Acceso', 'Rectificación', 'Cancelación', 'Oposición'].filter(function (x) { return x !== a[1]; }), 'Derechos ARCO.'); });
    var te = [['Reemplazar el DNI por un código con una tabla de correspondencia guardada aparte', 'Seudonimización'], ['Agrupar edades en rangos y distritos en provincias', 'Generalización para k-anonimato'], ['Agregar ruido calibrado al número de visitas por distrito', 'Privacidad diferencial'], ['Generar datos ficticios con la misma forma que los reales para las pruebas', 'Datos sintéticos']];
    te.forEach(function (t) { g.mcq(3, '¿Qué técnica de privacidad es? ' + t[0], t[1], ['Seudonimización', 'Generalización para k-anonimato', 'Privacidad diferencial', 'Datos sintéticos'].filter(function (x) { return x !== t[1]; }), 'Técnicas de protección de la privacidad.'); });
  },
  checks: [
    ['¿Qué es un dato personal y qué es un dato sensible según la Ley 29733?', 'Dato personal es el que identifica o hace identificable a una persona; sensible, el que requiere protección reforzada, como salud, origen étnico, ingresos o biometría.'],
    ['Enumera cinco decisiones de ingeniería que aplican la privacidad por diseño.', 'No recolectar lo innecesario, configuraciones privadas por defecto, seudonimizar en analítica, retención automática y registros sin datos personales.'],
    ['¿Por qué anonimizar es difícil? Da un ejemplo.', 'Porque los cuasi identificadores combinados identifican a las personas; Sweeney reidentificó registros de salud con código postal, fecha de nacimiento y sexo.'],
    ['¿Qué exigen los derechos ARCO al diseño de un sistema?', 'Poder encontrar, exportar, corregir y borrar todos los datos de una persona en todos los componentes, dentro de los plazos legales.']
  ],
  cites: ['Congreso de la República del Perú (2011). Ley N.º 29733, Ley de Protección de Datos Personales.', 'Ministerio de Justicia y Derechos Humanos (2024). Decreto Supremo N.º 016-2024-JUS, Reglamento de la Ley N.º 29733.', 'Cavoukian, A. (2009). *Privacy by Design: The 7 Foundational Principles*. Information and Privacy Commissioner of Ontario.', 'Sweeney, L. (2002). k-Anonymity: A Model for Protecting Privacy. *International Journal of Uncertainty, Fuzziness and Knowledge-Based Systems*, 10(5).', 'Narayanan, A. y Shmatikov, V. (2008). Robust De-anonymization of Large Sparse Datasets. *IEEE Symposium on Security and Privacy*.', 'Dwork, C., McSherry, F., Nissim, K. y Smith, A. (2006). Calibrating Noise to Sensitivity in Private Data Analysis. *TCC 2006*.', 'Parlamento Europeo y Consejo (2016). Reglamento (UE) 2016/679, Reglamento General de Protección de Datos.'],
  project: { t: 'Evaluación de privacidad de un sistema',
    goal: 'Aplicar la privacidad por diseño y la Ley 29733 a un sistema concreto.',
    steps: ['Haz el inventario de datos personales de un sistema (propio o imaginado): qué datos, de dónde vienen, para qué, dónde se guardan y cuánto tiempo.', 'Evalúa cada dato con los principios de finalidad y proporcionalidad, y elimina los innecesarios.', 'Diseña el procedimiento para atender los derechos ARCO en todos los componentes.', 'Prepara un conjunto de datos para analítica con k ≥ 5 y verifica el valor de k con código.', 'Escribe una evaluación de impacto breve con riesgos y medidas.'],
    deliver: 'El inventario, el análisis de minimización, el procedimiento ARCO, el conjunto k-anónimo y la evaluación.' },
  hito: ['Haz el inventario de datos personales de PatioApp, elimina el DNI y la ubicación continua, y define la retención de fotos y estadías.', 'Implementa en PatioApp la búsqueda y el borrado de todos los datos de un dueño (derechos ARCO) y un tablero analítico con k ≥ 10.']
});
SDC.after('m16.priv', 'm16.ssdlc');
})();
