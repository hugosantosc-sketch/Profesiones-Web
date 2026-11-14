(function () {
var D = SDC.D;
SDC.XM('for', { prof: true });

D('for.sm', `## Explorar todos los estados
Una ventaja enorme de modelar con máquinas de estados es que, si el número de estados es finito, se pueden **explorar todos** automáticamente y verificar propiedades: que desde cualquier estado se puede llegar a uno final, que nunca se alcanza un estado prohibido, que no hay estados inalcanzables (código muerto) ni estados sin salida (bloqueos). Es exactamente lo que hace un verificador de modelos, en miniatura.
~~~js
// Ciclo de vida de una estadía en PatioApp y verificación por exploración
const transiciones = {
  reservada: { llegar: 'abierta', cancelar: 'anulada' },
  abierta: { inspeccionar: 'inspeccionada', anular: 'anulada' },
  inspeccionada: { cobrar: 'pagada', anular: 'anulada' },
  pagada: { salir: 'cerrada' },
  cerrada: {}, anulada: {}
};
const finales = new Set(['cerrada', 'anulada']);
function alcanzables(desde) {
  const vistos = new Set([desde]), cola = [desde];
  while (cola.length) for (const s of Object.values(transiciones[cola.shift()])) if (!vistos.has(s)) { vistos.add(s); cola.push(s); }
  return vistos;
}
const inalcanzables = Object.keys(transiciones).filter(s => !alcanzables('reservada').has(s));
const sinSalida = Object.keys(transiciones).filter(s => !finales.has(s) && ![...alcanzables(s)].some(t => finales.has(t)));
console.log('inalcanzables:', inalcanzables, '· estados que no pueden terminar:', sinSalida);
console.log('¿se puede salir sin pagar?', alcanzables('abierta').has('cerrada') && !Object.values(transiciones.abierta).includes('cerrada') ? 'solo pasando por pagada' : 'revisar');
~~~

## Implementar máquinas de estados
Formas habituales de llevar una máquina de estados al código:
- **Tabla de transiciones** como datos (el objeto anterior): fácil de leer, verificar y modificar; las acciones se asocian a cada transición.
- **El patrón State** de los patrones de diseño: una clase por estado, con métodos para cada evento; útil cuando cada estado tiene mucha lógica propia.
- **Bibliotecas especializadas**, como XState en JavaScript, que implementan statecharts del W3C (SCXML) con estados jerárquicos y paralelos, y generan diagramas a partir del código.
- **Tipos suma** en lenguajes que los tienen, para que los estados ilegales sean irrepresentables, como viste en Construcción.
En todos los casos conviene que la transición se valide **en un solo lugar**: si cualquier parte del código puede cambiar el campo «estado» directamente, la máquina deja de existir.`);

D('for.contract', `## Ejemplo resuelto: el invariante de la búsqueda binaria
La búsqueda binaria es famosa por ser fácil de escribir mal: Jon Bentley contó en *Programming Pearls* que, al pedírsela a programadores profesionales, alrededor del 90 % entregó versiones con errores, y en 2006 Joshua Bloch reveló que la implementación de la biblioteca de Java tenía un desbordamiento de enteros al calcular «(lo + hi) / 2» que pasó inadvertido nueve años. Con un invariante, el razonamiento es preciso:
~~~js
// Precondición: a está ordenado. Poscondición: devuelve i con a[i] === x, o -1 si x no está.
function buscar(a, x) {
  let lo = 0, hi = a.length - 1;
  // Invariante: si x está en a, está en a[lo..hi]
  while (lo <= hi) {
    const m = lo + Math.floor((hi - lo) / 2);       // evita el desbordamiento de (lo + hi)
    if (a[m] === x) return m;
    if (a[m] < x) lo = m + 1;                        // x no puede estar en a[lo..m] porque a está ordenado
    else hi = m - 1;                                 // x no puede estar en a[m..hi]
  }
  return -1;                                         // lo > hi: el rango es vacío y, por el invariante, x no está
}
console.log(buscar([3, 8, 15, 23, 42], 23), buscar([3, 8, 15, 23, 42], 7));
~~~
1. **Inicialización:** al empezar, a[lo..hi] es todo el arreglo, así que el invariante vale.
2. **Mantenimiento:** en cada caso del «if», el rango se reduce descartando solo posiciones donde x no puede estar (gracias a la precondición de orden), así que el invariante se conserva.
3. **Terminación:** la cantidad hi − lo + 1 es un natural que **disminuye** en cada vuelta (es la **variante** o función de cota), así que el bucle termina.
4. **Corrección:** al salir, o se encontró x, o el rango es vacío y, por el invariante, x no está.

## Contratos ejecutables
Aunque el lenguaje no tenga soporte nativo, los contratos se pueden escribir como **aserciones** que se verifican en desarrollo y en pruebas: «console.assert», una función «requiere(condición, mensaje)» al inicio de las funciones públicas, o bibliotecas de validación de esquemas en las fronteras. Lenguajes como Eiffel (Bertrand Meyer, 1986), Ada 2012, D y Dafny los tienen integrados; en Python, las anotaciones de tipo y bibliotecas como «icontract» los acercan. Combinados con **pruebas basadas en propiedades**, los contratos se convierten en oráculos: el generador produce miles de entradas que cumplen la precondición y verifica que se cumpla la poscondición.`);

D('for.verif', `## La verificación formal en la industria
La verificación formal dejó de ser solo académica:
- **Microsoft** usó desde 2004 el verificador **SLAM** (Thomas Ball y Sriram Rajamani), y luego el Static Driver Verifier, para comprobar que los controladores de dispositivos de Windows respetan las reglas de uso del núcleo; los controladores defectuosos eran la principal causa de las pantallas azules.
- **Amazon Web Services** publicó en 2015 (Chris Newcombe y otros) cómo sus ingenieros usaron TLA+ en S3, DynamoDB y otros servicios, y encontraron errores sutiles de diseño que requerían secuencias de más de 30 pasos, imposibles de hallar con pruebas. Desde entonces AWS desarrolló herramientas propias de razonamiento automático, como Zelkova, que verifica políticas de acceso de los clientes con resolvedores SMT.
- **Intel** adoptó la verificación formal de sus unidades de punto flotante después del error de la división del Pentium de 1994.
- **Facebook (Meta)** usa Infer, basado en lógica de separación, para analizar millones de líneas en cada cambio.
- Los controladores de vuelo de **Airbus** se verifican con herramientas basadas en interpretación abstracta como Astrée, que demostró la ausencia de errores de ejecución en el software de control del A380.

## Ejemplo resuelto: un modelo de la asignación de espacios
En PatioApp, dos operadores pueden asignar espacios al mismo tiempo desde tablets distintas. Se escribe un modelo pequeño del protocolo: cada operador lee la lista de espacios libres, elige uno y lo marca como ocupado. La propiedad de **seguridad** es "nunca hay dos unidades en el mismo espacio". El verificador explora todos los entrelazados de las acciones de dos operadores y encuentra el contraejemplo en cuatro pasos: A lee "B-14 libre", B lee "B-14 libre", A marca B-14, B marca B-14. Se cambia el modelo: marcar el espacio es una operación atómica de "comparar y asignar" (solo tiene éxito si sigue libre), y el operador que falla vuelve a leer. El verificador confirma la propiedad para todos los entrelazados con hasta 3 operadores y 4 espacios, y además una propiedad de **vivacidad**: si hay espacios libres, todo operador termina asignando uno. Ese mismo diseño se implementa con una actualización condicional en la base de datos.

El valor del ejercicio no fue solo encontrar el error, sino encontrarlo **antes de escribir el código**, en un modelo de 40 líneas que el verificador explora en segundos, en lugar de descubrirlo en producción un lunes de mucho tráfico, cuando dos camiones llegan al mismo espacio y nadie entiende cómo pasó.`);
})();
