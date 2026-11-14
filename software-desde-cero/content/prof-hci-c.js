(function () {
var S = SDC.S;

S('hci', 'hci.interact', { title: 'Diseño de interacción: formularios, retroalimentación y móvil',
  ask: '¿Cómo diseñarías esta interacción para que sea clara, rápida y tolerante a errores?',
  lesson: `
> **La idea en simple.** La interacción es el diálogo entre la persona y el sistema: ella actúa, el sistema responde, ella interpreta y vuelve a actuar. Un buen diálogo es claro (se sabe qué se puede hacer), rápido (sin pasos de más), responde siempre (se sabe qué pasó) y perdona (los errores se evitan o se deshacen). Esta unidad reúne los patrones que más impacto tienen en el software de todos los días: formularios, retroalimentación, estados, errores, textos y diseño para el teléfono.

## Los tiempos de respuesta
Robert Miller (1968) y después Jakob Nielsen (1993) describieron tres umbrales que siguen vigentes:
| Tiempo | Percepción | Qué hacer |
|---|---|---|
| hasta 0,1 s | instantáneo: la persona siente que lo hizo ella | nada, solo responder |
| hasta 1 s | se nota la espera, pero no se pierde el hilo | evitar indicadores que parpadeen |
| hasta 10 s | límite de la atención | indicador de progreso, idealmente con porcentaje o pasos |
| más de 10 s | la persona se va a otra cosa | trabajo en segundo plano y aviso al terminar |
Una técnica para que la interfaz se sienta instantánea es la **actualización optimista**: al marcar una unidad como lista, la interfaz la muestra lista de inmediato y envía la petición; si falla, revierte y avisa. Funciona para acciones frecuentes y casi siempre exitosas, no para un cobro.

## Retroalimentación y estados
Toda acción debe tener una respuesta visible (la primera heurística de Nielsen: visibilidad del estado del sistema). Un botón presionado cambia de aspecto; un guardado muestra "Guardado a las 10:42"; un envío largo muestra progreso. Además, cada pantalla tiene más estados que el "feliz", y el diseño debe cubrirlos todos:
- **Vacío:** "Aún no hay unidades en esta sede. Registra el primer ingreso", con la acción a mano, en lugar de una tabla en blanco.
- **Cargando:** un **esqueleto** (*skeleton*) con la forma del contenido se percibe más rápido que un indicador giratorio.
- **Parcial:** algunos datos llegaron y otros fallaron.
- **Error:** qué pasó y qué hacer, con un botón para reintentar.
- **Sin conexión:** qué funciona y qué no, y cuándo se sincronizará.
- **Exceso:** qué pasa con 10 000 filas o un nombre de 80 caracteres.
Diseñar solo el estado con datos perfectos es la causa de la mitad de las pantallas rotas en producción.

## Formularios que no frustran
Los formularios son donde más se gana o se pierde. Lo que muestra la investigación (Luke Wroblewski, *Web Form Design*, 2008, y estudios del Baymard Institute sobre formularios de compra):
1. **Pedir menos:** cada campo es un costo. ¿Hace falta el teléfono para registrar un ingreso? Lo que el sistema puede deducir (la sede del operador, la fecha y hora, la marca a partir de la placa ya registrada) no se pregunta.
2. **Una columna**, con etiquetas **encima** de los campos: se lee de arriba abajo sin zigzaguear.
3. **Etiquetas visibles siempre**: el texto de ejemplo dentro del campo (*placeholder*) desaparece al escribir y no sustituye a la etiqueta.
4. **El tipo de campo correcto**: en el teléfono, «inputmode="numeric"» abre el teclado numérico para el DNI; «type="email"», el teclado con arroba; «autocomplete» permite autocompletar nombres, direcciones y códigos de un solo uso.
5. **Formatos tolerantes**: aceptar la placa como «abc123», «ABC 123» o «ABC-123» y normalizarla, en lugar de exigir un formato exacto; aceptar montos con coma o punto.
6. **Validar en el momento justo**: al salir del campo (no mientras la persona todavía escribe) y de nuevo al enviar; marcar el error **junto al campo**, en texto, y mover el foco al primer error.
7. **Valores por defecto inteligentes**: la sede actual, la tarifa habitual, el último cliente.
8. **Botón de acción con verbo claro**: "Registrar ingreso", no "Enviar" ni "Aceptar".

## Prevenir, confirmar y deshacer
Para los errores, el orden de preferencia es:
1. **Prevenir**: hacer imposible el error. Un selector de espacios que solo muestra los libres; un botón de cobro deshabilitado hasta que el monto esté calculado; una fecha de salida que no puede ser anterior a la de ingreso. Shigeo Shingo llamó *poka-yoke* (a prueba de errores) a este principio en la manufactura de Toyota.
2. **Deshacer**: permitir revertir. "Unidad marcada como lista. Deshacer" durante unos segundos es mejor que un diálogo de confirmación, porque no interrumpe a quien lo hizo bien.
3. **Confirmar**: solo para acciones **destructivas e irreversibles** (anular un comprobante ya enviado a SUNAT, borrar una sede). Y con un texto específico: "¿Anular la factura F001-57 de S/ 60,00? Esta acción no se puede deshacer", con el botón "Anular factura", no "Sí". Las confirmaciones frecuentes se aceptan sin leer: la gente aprende a hacer clic en "Aceptar" de forma automática.

## Escribir para la interfaz
Las palabras son parte del diseño (lo que hoy se llama *UX writing* o diseño de contenido):
- **Claro antes que ingenioso**, en el lenguaje del usuario, no del sistema: "No encontramos esa placa" en lugar de "Error 404: entidad no hallada".
- **Mensajes de error con tres partes**: qué pasó, por qué (si ayuda) y qué hacer. "No se pudo emitir el comprobante porque SUNAT no responde. La salida quedó registrada; el comprobante se enviará automáticamente en unos minutos."
- **Consistencia** de términos: si es "estadía" en una pantalla, no es "permanencia" en otra.
- **Tono respetuoso**, sin culpar: "La placa debe tener 6 caracteres" en lugar de "Ingresó una placa inválida".
- **Números y fechas** en el formato local: «S/ 1 250,00» o «S/ 1,250.00» según la convención elegida, pero siempre la misma, y fechas como «13/11/2026».

## Diseñar para el teléfono
- **Objetivos táctiles** grandes: Apple recomienda al menos 44 × 44 puntos, Google 48 × 48 dp, y WCAG 2.2 pide un mínimo de 24 × 24 píxeles con separación suficiente. Un dedo no es un puntero de mouse.
- **La zona del pulgar**: Steven Hoober observó en 2013 que la mayoría de las personas sostiene el teléfono con una mano y usa el pulgar, que alcanza cómodamente la parte inferior y central de la pantalla. Por eso las acciones principales van abajo (barras de navegación inferiores, botones de acción al pie).
- **Contexto móvil**: luz solar, una mano ocupada, interrupciones, conexión intermitente. Contraste alto, textos grandes y guardado automático de lo que se está escribiendo.
- **Gestos con alternativa visible**: deslizar para borrar es invisible para quien no lo conoce; siempre debe existir un botón.
- **Entrada mínima**: escanear el código de barras o la placa con la cámara, elegir en lugar de escribir, autocompletar.

## Leyes que ayudan a decidir
- **Ley de Hick** (William Hick, 1952): el tiempo para decidir crece con el logaritmo del número de opciones. Un menú con 30 opciones planas es lento; agrupado y con las frecuentes primero, rápido.
- **Ley de Fitts** (Paul Fitts, 1954): el tiempo para alcanzar un objetivo depende de su distancia y su tamaño. Los botones frecuentes, grandes y cerca de donde está la atención; los bordes de la pantalla son objetivos "infinitos" en el escritorio.
- **Ley de Jakob** (Nielsen): las personas pasan la mayor parte de su tiempo en **otros** sitios, así que esperan que el tuyo funcione como ellos. Las convenciones (el logo lleva al inicio, el carrito arriba a la derecha) no se rompen sin una muy buena razón.

## Ejemplo resuelto: el ingreso de unidades en la garita, desde el teléfono
La garita pasa de una computadora de escritorio a teléfonos resistentes. El formulario anterior tenía 14 campos y tomaba unos 90 segundos.
1. **Pedir menos:** la sede, la fecha y la hora se deducen; si la placa ya existe, se completan marca, modelo y cliente. Quedan 4 campos para una unidad conocida y 7 para una nueva.
2. **Entrada mínima:** un botón grande "Escanear placa" usa la cámara; el operador solo confirma o corrige. El espacio se elige tocando un mapa de la zona con los libres resaltados (prevención: los ocupados no se pueden elegir).
3. **Formatos tolerantes:** la placa se normaliza sola; el DNI del chofer abre el teclado numérico.
4. **Pulgar:** el botón "Registrar ingreso" va fijo al pie, de ancho completo y 56 dp de alto.
5. **Retroalimentación:** al registrar, una vibración corta y el mensaje "ABC-123 ingresó al espacio A-07. Deshacer", visible 8 segundos.
6. **Sin conexión:** si no hay red, el ingreso se guarda y se marca "pendiente de sincronizar"; nunca se pierde lo digitado.
7. **Resultado:** en la prueba con operadores, el ingreso de una unidad conocida baja a 20 segundos, y los errores de espacio duplicado desaparecen porque ya no se pueden cometer.`,
  links: [['hci.usab', 'heurísticas de Nielsen y pruebas'], ['hci.visual', 'jerarquía, tipografía y color'], ['m9.browser', 'almacenamiento local y modo sin conexión']],
  read: 'Wroblewski, *Web Form Design* (2008); Tidwell, Brewer y Valencia, *Designing Interfaces* (3.ª ed., 2020); Yablonski, *Laws of UX* (2.ª ed., 2024).',
  terms: [
    ['Diseño de interacción', 'disciplina que diseña el diálogo entre la persona y el sistema: acciones, respuestas y estados', ['Formularios.', 'Retroalimentación.', 'Errores.']],
    ['Actualización optimista', 'mostrar el resultado de una acción antes de que el servidor la confirme, revirtiendo si falla', ['Sensación instantánea.', 'Acciones frecuentes.', 'No para cobros.']],
    ['Estado vacío', 'diseño de una pantalla cuando aún no tiene datos, con orientación sobre qué hacer', ['Primer uso.', 'Acción a mano.', 'No tabla en blanco.']],
    ['Esqueleto de carga', 'marcador con la forma del contenido que se muestra mientras carga', ['Skeleton.', 'Se percibe más rápido.', 'Frente al indicador giratorio.']],
    ['Poka-yoke', 'principio de diseñar para que el error sea imposible', ['Shingo, Toyota.', 'Solo espacios libres.', 'Prevención.']],
    ['Deshacer', 'posibilidad de revertir una acción recién hecha, preferible a la confirmación previa', ['Ocho segundos.', 'No interrumpe.', 'Heurística de control.']],
    ['Ley de Hick', 'el tiempo de decisión crece con el logaritmo del número de opciones', ['Hick, 1952.', 'Menús agrupados.', 'Frecuentes primero.']],
    ['Zona del pulgar', 'área de la pantalla del teléfono que el pulgar alcanza cómodamente con una mano', ['Hoober, 2013.', 'Abajo y al centro.', 'Acciones principales.']]
  ],
  q: [
    ['Una operación tarda 6 segundos. ¿Qué conviene mostrar?', 'Un indicador de progreso, idealmente con pasos o porcentaje', ['Nada', 'Una alerta de error', 'Cerrar la pantalla'], 'Entre 1 y 10 segundos.', 2],
    ['¿Por qué el placeholder no debe reemplazar a la etiqueta?', 'Porque desaparece al escribir y la persona olvida qué pedía el campo', ['Porque es más lento', 'Porque no existe en HTML', 'Porque ocupa mucho espacio'], 'Etiquetas visibles siempre.', 2],
    ['¿Cuál es la mejor respuesta a "marcar unidad como lista", una acción frecuente y reversible?', 'Hacerla de inmediato y ofrecer "Deshacer" unos segundos', ['Pedir confirmación cada vez', 'No dar retroalimentación', 'Pedir la contraseña'], 'Deshacer antes que confirmar.', 3],
    ['¿Cuándo se justifica un diálogo de confirmación?', 'Para acciones destructivas e irreversibles, con texto específico', ['Para cada guardado', 'Para abrir una pantalla', 'Para cualquier clic'], 'Las confirmaciones frecuentes se aceptan sin leer.', 2],
    ['¿Qué mensaje de error es mejor?', '"No se pudo emitir el comprobante porque SUNAT no responde. Se enviará automáticamente en unos minutos."', ['"Error 500"', '"Operación inválida"', '"Algo salió mal"'], 'Qué pasó, por qué y qué hacer.', 2],
    ['¿Dónde conviene el botón principal en una aplicación para teléfono que se usa con una mano?', 'Abajo, en la zona del pulgar', ['Arriba a la izquierda', 'En un menú oculto', 'Al centro arriba'], 'Hoober, 2013.', 3],
    ['Un menú tiene 30 opciones planas. ¿Qué ley sugiere agruparlas y destacar las frecuentes?', 'Ley de Hick', ['Ley de Moore', 'Ley de Conway', 'Ley de Brooks'], 'El tiempo de decisión crece con las opciones.', 4],
    { tf: 'Validar cada campo mientras la persona todavía está escribiendo es la mejor práctica.', v: false, e: 'Se valida al salir del campo y al enviar.', l: 2 },
    { tf: 'Un selector que solo muestra los espacios libres es un ejemplo de prevención de errores.', v: true, e: 'Poka-yoke: el error es imposible.', l: 1 },
    { c: 'Escribe «tiempoHick(opciones, b)»: tiempo de decisión b × log2(opciones + 1), redondeado a 2 decimales.', f: 'tiempoHick', p: ['opciones', 'b'], t: [[[1, 0.2], 0.2], [[3, 0.2], 0.4], [[7, 0.15], 0.45]], sol: '  return Math.round(b * Math.log2(opciones + 1) * 100) / 100;', l: 2 },
    { c: 'Escribe «tiempoFitts(distancia, ancho, a, b)»: tiempo de movimiento a + b × log2(distancia / ancho + 1), redondeado a 3 decimales.', f: 'tiempoFitts', p: ['distancia', 'ancho', 'a', 'b'], t: [[[300, 100, 0.1, 0.15], 0.4], [[700, 100, 0.05, 0.1], 0.35]], sol: '  return Math.round((a + b * Math.log2(distancia / ancho + 1)) * 1000) / 1000;', l: 3 },
    { c: 'Escribe «mensajeTiempo(segundos)»: devuelve "ninguno" si es menor o igual a 0.1, "sutil" si es menor o igual a 1, "progreso" si es menor o igual a 10 y "segundo plano" si es mayor.', f: 'mensajeTiempo', p: ['segundos'], t: [[[0.05], 'ninguno'], [[0.8], 'sutil'], [[6], 'progreso'], [[30], 'segundo plano']], sol: '  if (segundos <= 0.1) return \'ninguno\';\n  if (segundos <= 1) return \'sutil\';\n  if (segundos <= 10) return \'progreso\';\n  return \'segundo plano\';', l: 1 }
  ],
  gen: function (g) {
    var es = [['La sede aún no tiene unidades registradas', 'Estado vacío'], ['Los datos están llegando del servidor', 'Estado de carga'], ['La consulta falló por un error del servidor', 'Estado de error'], ['El teléfono perdió la conexión', 'Estado sin conexión'], ['Llegaron las unidades, pero falló la consulta de tarifas', 'Estado parcial']];
    es.forEach(function (e) { g.mcq(2, '¿Qué estado de pantalla hay que diseñar? ' + e[0], e[1], ['Estado vacío', 'Estado de carga', 'Estado de error', 'Estado sin conexión', 'Estado parcial'].filter(function (x) { return x !== e[1]; }).slice(0, 3), 'Diseñar todos los estados.'); });
    var er = [['Solo se pueden elegir espacios libres', 'Prevenir'], ['"Unidad marcada como lista. Deshacer"', 'Deshacer'], ['"¿Anular la factura F001-57? No se puede deshacer"', 'Confirmar'], ['El botón de cobro se habilita al calcular el monto', 'Prevenir'], ['Se puede restaurar una estadía borrada durante 30 días', 'Deshacer']];
    er.forEach(function (e) { g.mcq(2, '¿Qué estrategia ante errores se usa? ' + e[0], e[1], ['Prevenir', 'Deshacer', 'Confirmar', 'Ignorar'].filter(function (x) { return x !== e[1]; }), 'Prevenir, deshacer, confirmar.'); });
    var ti = [[0.05, 'Nada: se percibe instantáneo'], [0.7, 'Una señal sutil sin parpadeos'], [5, 'Indicador de progreso'], [40, 'Trabajo en segundo plano y aviso al terminar']];
    ti.forEach(function (t) { g.mcq(2, 'Una acción tarda ' + t[0] + ' segundos. ¿Qué retroalimentación conviene?', t[1], ['Nada: se percibe instantáneo', 'Una señal sutil sin parpadeos', 'Indicador de progreso', 'Trabajo en segundo plano y aviso al terminar'].filter(function (x) { return x !== t[1]; }), 'Umbrales de Miller y Nielsen.'); });
  },
  checks: [
    ['Explica los umbrales de tiempo de respuesta y la actualización optimista.', 'Hasta 0,1 s instantáneo, hasta 1 s sin perder el hilo, hasta 10 s con progreso, más con trabajo en segundo plano; la actualización optimista muestra el resultado antes de la confirmación.'],
    ['¿Qué estados debe cubrir el diseño de una pantalla?', 'Vacío, cargando, con datos, parcial, error, sin conexión y exceso de datos.'],
    ['Nombra cinco buenas prácticas de formularios.', 'Pedir menos, una columna con etiquetas visibles, tipos de campo y autocompletado, formatos tolerantes, validar al salir del campo con el error junto a él y botón con verbo claro.'],
    ['¿En qué orden se manejan los errores y qué cambia en el diseño para teléfonos?', 'Prevenir, deshacer y confirmar solo lo irreversible; en el teléfono, objetivos grandes, acciones en la zona del pulgar, alto contraste y entrada mínima.']
  ],
  cites: ['Miller, R. B. (1968). Response Time in Man-Computer Conversational Transactions. *AFIPS Fall Joint Computer Conference*.', 'Nielsen, J. (1993). *Usability Engineering*. Academic Press.', 'Hick, W. E. (1952). On the Rate of Gain of Information. *Quarterly Journal of Experimental Psychology*, 4(1).', 'Fitts, P. (1954). The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement. *Journal of Experimental Psychology*, 47(6).', 'Wroblewski, L. (2008). *Web Form Design: Filling in the Blanks*. Rosenfeld Media.', 'Hoober, S. (2013). How Do Users Really Hold Mobile Devices? *UXmatters*.'],
  project: { t: 'Un flujo que perdona',
    goal: 'Diseñar e implementar un flujo de captura de datos con todos sus estados, prevención de errores y uso móvil.',
    steps: ['Elige un flujo con formulario (registro, reserva, pago) y mide el tiempo y los errores del diseño actual o de un primer prototipo.', 'Reduce los campos deduciendo lo que se pueda y aplica las buenas prácticas de formularios, incluidos tipos de campo y formatos tolerantes.', 'Diseña e implementa todos los estados: vacío, cargando, error, sin conexión y éxito con deshacer.', 'Adapta el flujo al teléfono: objetivos táctiles, acción principal en la zona del pulgar y entrada mínima.', 'Prueba con cinco personas en un teléfono y compara tiempo y errores con la medición inicial.'],
    deliver: 'El prototipo o la implementación, el inventario de estados y la comparación antes y después.' },
  hito: ['Rediseña el ingreso de unidades de PatioApp para teléfono: escaneo de placa, campos deducidos, espacios libres seleccionables y deshacer.', 'Diseña los estados vacío, de carga, de error y sin conexión de las pantallas principales de PatioApp.']
});
SDC.after('hci.interact', 'hci.visual');
})();
