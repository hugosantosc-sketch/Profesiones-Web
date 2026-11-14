(function () {
var D = SDC.D;
SDC.XM('m3', { prof: true });

D('m3.vars', `## Ejemplo resuelto: seguir un programa con una tabla de traza
Cuando un programa no da lo que esperas, la técnica más antigua y efectiva es **ejecutarlo a mano** anotando el valor de cada variable después de cada línea. Se llama **tabla de traza**. Programa que calcula el cobro de una estadía:
~~~js
const tarifaDiaria = 20;            // 1
let dias = 3;                        // 2
let subtotal = tarifaDiaria * dias;  // 3
let igv = subtotal * 0.18;           // 4
let total = subtotal + igv;          // 5
dias = dias + 1;                     // 6
console.log(total);                  // 7
~~~
| Después de la línea | tarifaDiaria | dias | subtotal | igv | total |
| 1 | 20 | — | — | — | — |
| 2 | 20 | 3 | — | — | — |
| 3 | 20 | 3 | 60 | — | — |
| 4 | 20 | 3 | 60 | 10,8 | — |
| 5 | 20 | 3 | 60 | 10,8 | 70,8 |
| 6 | 20 | 4 | 60 | 10,8 | 70,8 |
Dos lecciones aparecen en la tabla:
1. Cambiar «dias» en la línea 6 **no** recalcula «subtotal» ni «total». Una variable guarda un **valor**, no una fórmula: las asignaciones se ejecutan una vez, en orden. Este es uno de los malentendidos más comunes al empezar (y la razón por la que una hoja de cálculo, que sí recalcula, se comporta distinto que un programa).
2. «0.18» es un número con decimales; en Matemática avanzada verás por qué los montos de dinero conviene manejarlos en céntimos enteros.
Las herramientas de depuración de los editores hacen lo mismo de forma automática (puntos de interrupción y ejecución paso a paso), como verás en la unidad de depuración; pero hacer la traza a mano al principio entrena la habilidad más importante: **predecir** lo que hará el código.

## Constantes y nombres que dicen la verdad
En el ejemplo, «tarifaDiaria» se declaró con «const» porque no debe cambiar, y «dias» con «let» porque sí cambia. Usar «const» por defecto y «let» solo cuando hace falta reasignar es una buena costumbre: quien lee sabe de inmediato qué valores pueden cambiar, y el lenguaje impide reasignar por error lo que no debía cambiar.`);

D('m3.cond', `## Ejemplo resuelto: elegir la tarifa con una tabla de decisión
La regla de negocio dice: "Los camiones pagan 45 soles por día; los autos, 20. Si la unidad tiene convenio, se descuenta el 25 %. Si la estadía es de una hora o menos, no se cobra". Antes de escribir los «if», conviene ordenar los casos en una **tabla de decisión**:
| ¿Una hora o menos? | Tipo | ¿Convenio? | Tarifa diaria |
| sí | cualquiera | cualquiera | 0 |
| no | camión | no | 45 |
| no | camión | sí | 33,75 |
| no | auto | no | 20 |
| no | auto | sí | 15 |
La tabla revela preguntas que la frase no respondía: ¿qué pasa con una camioneta? ¿El descuento se aplica antes o después del IGV? Hay que preguntarlas al negocio **antes** de programar. Con las respuestas, el código sigue la tabla con **cláusulas de guarda** primero (el caso especial sale de inmediato) y una estructura plana:
~~~js
function tarifaDiaria(tipo, horas, convenio) {
  if (horas <= 1) return 0;                                       // guarda: caso especial primero
  const base = { camion: 45, camioneta: 30, auto: 20 }[tipo];     // tabla en lugar de una cadena de if
  if (base === undefined) throw new Error('tipo de unidad desconocido: ' + tipo);
  return convenio ? base * 0.75 : base;
}
console.log(tarifaDiaria('camion', 30, true), tarifaDiaria('auto', 0.5, false), tarifaDiaria('auto', 5, false));
~~~
Observa tres decisiones: la estadía corta se resuelve primero y sale; los tipos de unidad están en un objeto que funciona como tabla (agregar un tipo nuevo no requiere tocar la lógica); y un tipo desconocido produce un error explícito en lugar de un resultado silencioso e incorrecto como «NaN».

## Probar todas las ramas
Cada «if» duplica los caminos posibles del programa. Para estar seguro de una función con condiciones, conviene probar **al menos un caso por fila** de la tabla de decisión y los **valores límite** (exactamente una hora, un minuto más). Con 5 filas y 2 límites, 7 casos de prueba dan mucha más confianza que probar "un caso normal" y suponer que el resto funciona.`);

D('m3.loops', `## Ejemplo resuelto: contar unidades por zona y encontrar la más llena
Se tiene la lista de zonas de las unidades presentes en el patio y se quiere saber cuántas hay en cada zona y cuál está más llena.
~~~js
const zonas = ['A', 'B', 'A', 'C', 'B', 'A', 'B', 'B'];
const conteo = {};
for (const z of zonas) {                       // patrón: acumular en un objeto
  conteo[z] = (conteo[z] || 0) + 1;
}
let masLlena = null;
for (const z in conteo) {                      // patrón: buscar el máximo
  if (masLlena === null || conteo[z] > conteo[masLlena]) masLlena = z;
}
console.log(conteo, 'más llena:', masLlena);   // { A: 3, B: 4, C: 1 } más llena: B
~~~
Traza del primer bucle (solo las primeras vueltas): tras «A», conteo = {A: 1}; tras «B», {A: 1, B: 1}; tras «A», {A: 2, B: 1}; y así. El patrón «(conteo[z] || 0) + 1» resuelve el primer caso, cuando la zona todavía no existe en el objeto (su valor es «undefined», y «undefined || 0» es 0).

El segundo bucle usa el patrón de **buscar el máximo**: una variable que recuerda el mejor visto hasta ahora y se actualiza cuando aparece uno mejor. El **invariante**: "masLlena es la zona con más unidades entre las ya revisadas". Al terminar, como se revisaron todas, es la más llena de todas. Si hay empate, gana la primera encontrada (porque se usa «>» y no «>=»): un detalle que hay que decidir a propósito.

## Bucles que no terminan
Un bucle infinito por error es de los fallos más comunes al empezar. Las causas típicas: olvidar actualizar la variable de la condición («while (i < n)» sin «i++»), actualizarla en la dirección equivocada («i--» cuando debía ser «i++») o una condición que nunca se vuelve falsa por un detalle de tipos («while (x !== 10)» con x avanzando de 3 en 3). La pregunta que lo previene es la de la **terminación**: ¿qué cantidad disminuye en cada vuelta y no puede bajar para siempre?

Si un programa se queda "colgado", casi siempre hay un bucle que no termina: en el navegador, la pestaña deja de responder; en Node.js, el proceso queda consumiendo el 100 % de un núcleo. Ponerle a los bucles de prueba un límite de vueltas mientras se desarrolla ayuda a detectarlo pronto.`);

D('m3.func', `## Ejemplo resuelto: diseño descendente del reporte diario
Se pide un programa que, a partir de la lista de estadías del día, imprima el total cobrado, el número de salidas y la estadía más larga. En lugar de escribir todo en un solo bloque, se aplica **diseño descendente** (*top-down*): primero se escribe la función principal como si las auxiliares ya existieran, y luego se escribe cada una.
~~~js
function reporteDiario(estadias) {
  const cerradas = soloCerradas(estadias);
  return {
    totalCobrado: sumarMontos(cerradas),
    salidas: cerradas.length,
    masLarga: estadiaMasLarga(cerradas)
  };
}
function soloCerradas(estadias) { return estadias.filter(e => e.salida !== null); }
function sumarMontos(estadias) { return estadias.reduce((suma, e) => suma + e.monto, 0); }
function duracionHoras(e) { return (e.salida - e.ingreso) / 3600000; }
function estadiaMasLarga(estadias) {
  let larga = null;
  for (const e of estadias) if (larga === null || duracionHoras(e) > duracionHoras(larga)) larga = e;
  return larga ? larga.placa : null;
}
const hoy = [
  { placa: 'ABC-123', ingreso: Date.parse('2026-11-13T07:00'), salida: Date.parse('2026-11-13T15:00'), monto: 20 },
  { placa: 'XYZ-987', ingreso: Date.parse('2026-11-12T09:00'), salida: Date.parse('2026-11-13T10:00'), monto: 45 },
  { placa: 'JKL-555', ingreso: Date.parse('2026-11-13T08:00'), salida: null, monto: 0 }
];
console.log(reporteDiario(hoy));      // { totalCobrado: 65, salidas: 2, masLarga: 'XYZ-987' }
~~~
Ventajas que se ven en el ejemplo:
- La función principal se lee como la descripción del problema; los detalles están en funciones con nombres claros.
- Cada función auxiliar es pequeña, hace una sola cosa y se puede **probar por separado** («duracionHoras» con un caso conocido).
- «duracionHoras» se reutiliza; si cambia la forma de medir la duración, se cambia en un solo lugar.
- Ninguna función modifica la lista que recibe: son funciones puras, sin efectos secundarios.
Niklaus Wirth describió este método en 1971 como **refinamiento sucesivo**, y sigue siendo la forma más confiable de atacar un problema que parece grande.

## Parámetros y valores de retorno bien elegidos
Algunas reglas que hacen las funciones más fáciles de usar:
- **Pocos parámetros:** con más de tres o cuatro, conviene agruparlos en un objeto con nombres («crearEstadia({ placa, zona, convenio })»), para que quien llama no tenga que recordar el orden.
- **Valores por defecto** para los parámetros opcionales («function listar(nodo, nivel = 0)»).
- **Devolver** el resultado en lugar de imprimirlo: una función que devuelve un valor se puede probar, reutilizar y combinar; una que solo imprime, no.
- **Un tipo de retorno consistente:** si a veces devuelve un número y a veces un texto de error, quien la llama tendrá que adivinar. Mejor un número siempre y un error explícito cuando algo falla.`);

D('m3.arr', `## Ejemplo resuelto: agrupar estadías por día
Se tiene una lista de estadías cerradas y se quiere el total cobrado por día de salida, ordenado por fecha.
~~~js
const estadias = [
  { placa: 'ABC-123', salida: '2026-11-12', monto: 20 },
  { placa: 'XYZ-987', salida: '2026-11-13', monto: 45 },
  { placa: 'JKL-555', salida: '2026-11-12', monto: 15 },
  { placa: 'MNO-222', salida: '2026-11-13', monto: 20 }
];
const porDia = new Map();
for (const e of estadias) porDia.set(e.salida, (porDia.get(e.salida) || 0) + e.monto);
const filas = [...porDia].sort((a, b) => a[0].localeCompare(b[0]));
for (const [dia, total] of filas) console.log(dia, 'S/', total);
// Con los métodos modernos, el agrupamiento existe ya hecho:
// Object.groupBy(estadias, e => e.salida)   → { '2026-11-12': [...], '2026-11-13': [...] }
~~~
Detalles que importan:
1. Se usa un **Map** en lugar de un objeto porque las claves son datos (fechas) y no nombres de propiedades fijos; un Map conserva el orden de inserción y no mezcla las claves con propiedades heredadas.
2. Las fechas en formato **ISO** (año-mes-día) se ordenan correctamente como texto, porque el formato va de lo más significativo a lo menos. Con el formato peruano día/mes/año («13/11/2026»), ordenar como texto daría un orden incorrecto: un buen motivo para guardar fechas siempre en ISO y formatearlas solo al mostrarlas.
3. «[...porDia]» convierte el Map en una lista de pares para poder ordenarla; «sort» con «localeCompare» compara textos respetando las reglas del idioma.
4. «Object.groupBy», agregado a JavaScript en 2024, hace el agrupamiento en una línea; conocer el bucle manual ayuda a entender qué hace y a usarlo en lenguajes o versiones que no lo tienen.

## Elegir la estructura antes de escribir el código
Una buena pregunta antes de programar es: ¿qué voy a hacer con estos datos? Si voy a buscar por clave muchas veces, un Map; si necesito el orden y recorrerlos, un arreglo; si necesito saber si algo ya apareció, un Set. Elegir bien la estructura suele simplificar el código más que cualquier truco posterior, y evita problemas de rendimiento como buscar con «includes» dentro de un bucle.

Y si no estás seguro, empieza por la más simple que funcione: siempre se puede cambiar después, sobre todo si el acceso a los datos está encapsulado en unas pocas funciones.`);

D('m3.rec', `## Ejemplo resuelto: recorrer zonas anidadas
Un patio grande se organiza en sectores, que contienen zonas, que contienen filas de espacios: una estructura de **árbol** cuya profundidad puede variar de un patio a otro. Contar todos los espacios es natural con recursión: los espacios de un nodo son sus propios espacios más los de todos sus hijos.
~~~js
const patio = {
  nombre: 'Patio Callao', espacios: 0, hijos: [
    { nombre: 'Sector Norte', espacios: 0, hijos: [
      { nombre: 'Zona A', espacios: 40, hijos: [] },
      { nombre: 'Zona B', espacios: 25, hijos: [{ nombre: 'Fila B-techada', espacios: 10, hijos: [] }] }
    ] },
    { nombre: 'Sector Sur', espacios: 60, hijos: [] }
  ]
};
function contarEspacios(nodo) {
  let total = nodo.espacios;                         // lo propio
  for (const hijo of nodo.hijos) total += contarEspacios(hijo);   // más lo de cada hijo (llamada recursiva)
  return total;                                      // caso base implícito: sin hijos, el bucle no hace nada
}
function listar(nodo, nivel = 0) {
  console.log('  '.repeat(nivel) + nodo.nombre + ' (' + contarEspacios(nodo) + ')');
  for (const hijo of nodo.hijos) listar(hijo, nivel + 1);
}
listar(patio);                                       // Patio Callao (135), con la jerarquía indentada
~~~
Puntos clave:
1. El **caso base** está implícito: un nodo sin hijos devuelve solo sus espacios porque el bucle no se ejecuta.
2. La recursión sigue la **forma de los datos**: como la estructura es recursiva (un nodo contiene nodos), la función también lo es. Esta correspondencia es una de las guías más útiles para diseñar funciones recursivas.
3. La función «listar» llama a «contarEspacios» para cada nodo, que a su vez recorre todo su subárbol: el mismo subárbol se recorre varias veces. Para árboles pequeños no importa; para árboles grandes, conviene calcular los totales en una sola pasada y guardarlos.
4. Los mismos recorridos sirven para menús anidados, carpetas de archivos, comentarios con respuestas o el DOM de una página web.`);
})();
