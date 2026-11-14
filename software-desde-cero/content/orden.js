/* Se carga al final: ordena todas las unidades según la malla (ciclo, curso y posición dentro del curso),
   para que «siguiente unidad», el repaso y PatioApp sigan el orden de la carrera. */
(function () {
  var seen = {}, out = [];
  (SDC.cursosEnOrden ? SDC.cursosEnOrden() : SDC.modules).concat(SDC.modules).forEach(function (m) {
    m.subs.forEach(function (id) { if (!seen[id]) { seen[id] = 1; out.push(id); } });
  });
  SDC.order = out;
})();
