(function () {
var D = SDC.D;
SDC.XM('arq', { prof: true });

D('arq.isa', `## La convención de llamadas
Para que una función compilada por un compilador pueda llamar a otra compilada por otro (o por el mismo en otro momento), todos deben respetar una **convención de llamadas**, parte de la **ABI** (interfaz binaria de aplicaciones). En RISC-V:
- Los argumentos van en los registros **a0 a a7**; los que no caben, en la pila.
- El resultado vuelve en **a0** (y a1 si hace falta).
- La dirección de retorno se guarda en **ra** con la instrucción «jal» (saltar y enlazar), y se vuelve con «ret».
- Los registros **t0 a t6** son temporales: quien llama no puede esperar que se conserven. Los registros **s0 a s11** son "salvados": si una función los usa, debe guardarlos en la pila al empezar y restaurarlos al terminar.
- El puntero de pila **sp** apunta al tope de la pila, que crece hacia direcciones menores; cada función reserva su **marco** restando a sp.
Romper la convención (por ejemplo, en una función escrita a mano en ensamblador) produce errores muy difíciles de rastrear, porque la falla aparece lejos de la causa.

## Ejemplo resuelto: la tarifa en ensamblador RISC-V
Una función de C que calcula la tarifa de una estadía:
~~~txt
int tarifa(int dias, int convenio) {
  int base = dias * 20;
  if (convenio) base = base - base / 4;
  return base;
}
~~~
Una traducción posible (el compilador con optimizaciones produce algo muy parecido):
~~~txt
tarifa:                  # a0 = dias, a1 = convenio
    li   t0, 20          # t0 = 20
    mul  a0, a0, t0      # a0 = dias * 20       (base)
    beqz a1, fin         # si convenio == 0, saltar a fin
    srai t1, a0, 2       # t1 = base >> 2      (base / 4, válido porque base >= 0)
    sub  a0, a0, t1      # base = base - base / 4
fin:
    ret                  # volver; el resultado está en a0
~~~
Observaciones: no se usa la pila porque todo cabe en registros temporales (es una función **hoja**, que no llama a otras); la división por 4 se convirtió en un desplazamiento aritmético; el «if» es un salto condicional «beqz» que salta sobre el bloque. Leer el ensamblador que genera el compilador (el sitio Compiler Explorer, de Matt Godbolt, lo muestra en vivo para decenas de lenguajes) es la mejor forma de entender qué hace realmente tu código.

Un ejercicio revelador es compilar la misma función con y sin optimizaciones («-O0» y «-O2»): sin ellas, cada variable se guarda y se vuelve a leer de la pila; con ellas, todo vive en registros y el código se reduce a una fracción.`);

D('arq.pipe', `## Ejemplo resuelto: contar ciclos de un bucle
Un bucle que suma un arreglo de tarifas en un procesador con el pipeline clásico de cinco etapas:
~~~txt
bucle:
  lw   t1, 0(a0)      # cargar tarifas[i]
  add  t0, t0, t1     # total += tarifas[i]   ← usa t1 justo después de cargarlo
  addi a0, a0, 4      # siguiente elemento
  addi a1, a1, -1     # quedan uno menos
  bnez a1, bucle      # repetir si quedan
~~~
1. **Riesgo de datos por carga:** «add» necesita t1, que «lw» recién tendrá al final de su etapa de memoria. Aun con adelantamiento (*forwarding*), hace falta **una burbuja** de un ciclo.
2. **Riesgo de control:** el salto «bnez» se resuelve tarde; si el predictor acierta (lo hará casi siempre en un bucle largo), no hay penalización.
3. **Total por vuelta:** 5 instrucciones + 1 burbuja = 6 ciclos, un CPI de 1,2.
4. **Reordenar:** si el compilador mueve una instrucción independiente entre la carga y su uso, la burbuja desaparece:
~~~txt
bucle:
  lw   t1, 0(a0)
  addi a0, a0, 4      # independiente: llena el hueco
  addi a1, a1, -1
  add  t0, t0, t1     # t1 ya está disponible
  bnez a1, bucle
~~~
Ahora son 5 ciclos por vuelta (CPI = 1): un 17 % más rápido sin cambiar el algoritmo. Los compiladores hacen este **planificación de instrucciones** automáticamente; los procesadores con **ejecución fuera de orden** la hacen además en el hardware, mirando decenas de instrucciones hacia adelante.

## Spectre y Meltdown
La ejecución especulativa, una de las mayores fuentes de rendimiento, resultó tener un costo de seguridad. En enero de 2018 se publicaron **Spectre** (Paul Kocher y otros) y **Meltdown** (Moritz Lipp y otros): el procesador ejecuta especulativamente instrucciones que luego descarta, pero sus efectos sobre la **caché** quedan, y un atacante puede medir esos efectos con cronómetros precisos para leer memoria a la que no debería tener acceso, incluida la del núcleo o la de otras pestañas del navegador. Las mitigaciones (aislar las tablas de páginas del núcleo, barreras de especulación, aislar cada sitio web en su propio proceso, relojes menos precisos en los navegadores) costaron rendimiento, y el episodio mostró que la microarquitectura, supuestamente invisible, también es parte de la superficie de ataque.

Para un programador de aplicaciones, la consecuencia práctica es mantener actualizados el sistema operativo, el microcódigo y el navegador, y en código criptográfico, escribir funciones de **tiempo constante** que no ramifiquen ni accedan a memoria según datos secretos.`);

D('arq.mem', `## El tiempo medio de acceso a memoria
Para evaluar una jerarquía de cachés se usa el **tiempo medio de acceso a memoria** (AMAT):
AMAT = tiempo de acierto + tasa de fallos × penalización por fallo
Con varios niveles, la penalización de un nivel es el AMAT del siguiente. Ejemplo: L1 con acierto de 1 ns y 5 % de fallos; L2 con acierto de 4 ns y 20 % de fallos (de los accesos que llegan a ella); memoria principal de 80 ns.
- AMAT(L2) = 4 + 0,2 × 80 = 20 ns.
- AMAT(L1) = 1 + 0,05 × 20 = 2 ns.
Aunque la memoria tarda 80 ns, el acceso promedio es de 2 ns gracias a la localidad. Si la tasa de fallos de L1 sube al 20 % (por un mal patrón de acceso), el AMAT pasa a 1 + 0,2 × 20 = 5 ns: el programa puede volverse más del doble de lento sin cambiar una sola instrucción.

## Ejemplo resuelto: simular una caché de correspondencia directa
Una caché de correspondencia directa con 4 líneas de 16 bytes: la dirección se divide en **desplazamiento** (4 bits, la posición dentro de la línea), **índice** (2 bits, qué línea) y **etiqueta** (el resto, para saber qué bloque está guardado).
~~~js
function simularCache(direcciones, lineas = 4, bloque = 16) {
  const etiquetas = Array(lineas).fill(null);
  let aciertos = 0;
  for (const dir of direcciones) {
    const numBloque = Math.floor(dir / bloque), indice = numBloque % lineas, etiqueta = Math.floor(numBloque / lineas);
    if (etiquetas[indice] === etiqueta) aciertos++; else etiquetas[indice] = etiqueta;
  }
  return aciertos + ' de ' + direcciones.length;
}
const secuencial = Array.from({ length: 64 }, (_, i) => i * 4);            // recorrer 64 enteros de 4 bytes
const conflicto = Array.from({ length: 64 }, (_, i) => (i % 2) * 64);       // alternar dos direcciones a 64 bytes
console.log('secuencial:', simularCache(secuencial));                     // 3 de cada 4 aciertan
console.log('conflicto:', simularCache(conflicto));                       // ambas van a la misma línea: 0 aciertos
~~~
El recorrido secuencial aprovecha la **localidad espacial**: el primer acceso a cada línea falla y los tres siguientes aciertan (75 %). El segundo patrón alterna dos direcciones que caen en la **misma línea** con etiquetas distintas: cada acceso expulsa al otro y nunca hay aciertos (**fallos por conflicto**). Una caché **asociativa** de 2 vías, que permite dos bloques por conjunto, eliminaría ese problema. Es la misma razón por la que ciertos tamaños de matrices (potencias de 2) se comportan sorprendentemente mal.`);

D('arq.io', `## Ejemplo resuelto: almacenamiento para la base de datos de PatioApp
La base de datos principal hace en hora punta unas 3000 operaciones de entrada y salida aleatorias por segundo (IOPS), con lecturas de 8 KB.
1. **Disco duro de 7200 RPM:** el tiempo medio de rotación es medio giro = 60 / 7200 / 2 ≈ 4,2 ms, más unos 8 ms de búsqueda: unos 12 ms por operación aleatoria, es decir, unas 80 IOPS. Harían falta casi 40 discos.
2. **SSD NVMe:** decenas o cientos de miles de IOPS aleatorias con latencias de unos 100 microsegundos. Uno solo sobra en rendimiento.
3. **Redundancia:** un solo SSD es un punto único de falla. Con **RAID 1** (espejo de dos SSD) se tolera la pérdida de uno y se duplican las lecturas posibles. **RAID 5** (paridad distribuida) ahorra espacio, pero cada escritura pequeña requiere leer y escribir la paridad (la "penalización de escritura" de 4 operaciones), y la reconstrucción de discos grandes tarda horas, durante las cuales otra falla pierde datos.
4. **Decisión:** en la nube, un volumen gestionado de SSD con IOPS aprovisionadas, que el proveedor ya replica dentro de la zona, más la réplica de la base de datos en otra zona y los respaldos que viste en DevOps.
5. **Lección:** RAID protege contra la falla de un disco, **no** contra borrar datos por error, el ransomware o un incendio: RAID no es un respaldo.

## Desgaste de los SSD
Las celdas de memoria flash soportan un número limitado de ciclos de escritura y borrado (desde unos 100 000 en las celdas de un bit, SLC, hasta unos pocos miles o cientos en las de varios bits, TLC y QLC). El **controlador** del SSD reparte las escrituras entre todas las celdas (**nivelación de desgaste**), mantiene celdas de reserva y reescribe internamente los datos en bloques nuevos. Por eso los fabricantes especifican la resistencia en **terabytes escritos** (TBW) y por eso un SSD que se llena casi por completo rinde peor: el controlador tiene menos espacio libre para trabajar.`);
})();
