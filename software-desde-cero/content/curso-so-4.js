(function () {
var S = SDC.S;

S('so', 'so.fs', { title: 'Almacenamiento y sistemas de archivos',
  ask: '¿Qué concepto de almacenamiento o sistemas de archivos se aplica?',
  lesson: `
> **La idea en simple.** Un disco es una bodega gigantesca dividida en casilleros numerados, todos iguales. El sistema de archivos es el bibliotecario que convierte esa bodega en algo usable: carpetas con nombres, archivos que crecen, un registro de qué casilleros están libres y, sobre todo, la promesa de que si se va la luz a mitad de una tarea, la bodega no quedará en un estado absurdo.

## Los dispositivos
- **Disco duro (HDD):** platos magnéticos que giran (por ejemplo, a 7200 rpm) y un brazo con cabezales. Leer un bloque exige **buscar** la pista (varios milisegundos), esperar la **rotación** (en promedio media vuelta: 4.17 ms a 7200 rpm) y **transferir**. Por eso el acceso secuencial es cientos de veces más rápido que el aleatorio.
- **Unidad de estado sólido (SSD):** memoria flash sin partes móviles, con accesos aleatorios de decenas de microsegundos. La flash se escribe por **páginas** (unos KB) pero solo se borra por **bloques** grandes, y cada celda soporta una cantidad limitada de borrados. Un **controlador** interno (la FTL, *flash translation layer*) redirige las escrituras, reparte el desgaste (**nivelación de desgaste**) y recolecta bloques; el comando **TRIM** le avisa qué bloques ya no se usan.
Para los discos duros, el sistema ordena las peticiones pendientes con un **planificador de disco**:
| Algoritmo | Idea |
| FCFS | en orden de llegada |
| SSTF | primero la petición más cercana al cabezal (puede causar inanición) |
| SCAN (ascensor) | el cabezal barre hacia un extremo atendiendo en el camino y luego regresa |
| C-SCAN | barre en un solo sentido y vuelve al inicio sin atender, para tiempos más uniformes |
Con el cabezal en la pista 53 y las peticiones 98, 183, 37, 122, 14, 124, 65, 67 (ejemplo de Silberschatz), FCFS recorre 640 pistas y SSTF solo 236.

## La abstracción de archivo y directorio
Un **archivo** es una secuencia de bytes con nombre y **metadatos**: tamaño, dueño, permisos, fechas. Un **directorio** es un archivo especial que asocia nombres con archivos. Al abrir un archivo, el proceso recibe un **descriptor** que apunta a una entrada de la **tabla de archivos abiertos** del sistema, con la posición actual de lectura. Dos conceptos de Unix que conviene distinguir:
- **Enlace duro:** otro nombre para el mismo archivo (el mismo inodo). El archivo se borra de verdad cuando no quedan nombres ni procesos que lo tengan abierto; por eso la llamada para borrar se llama «unlink».
- **Enlace simbólico:** un archivo pequeño que contiene la ruta de otro; si el original se borra, queda roto.
El sistema de archivos de cada dispositivo se **monta** en un punto del árbol único de directorios.

## Cómo se guardan los archivos
El disco se divide en **bloques** (por ejemplo, de 4 KB). Formas de asignar bloques a un archivo:
- **Contigua:** todos seguidos; lectura rapidísima, pero fragmentación externa y difícil crecer.
- **Enlazada:** cada bloque apunta al siguiente; la **FAT** de MS-DOS guardó esos enlaces en una tabla aparte. Acceso aleatorio lento.
- **Indexada:** un bloque índice con los punteros a los bloques de datos. Unix la generalizó con el **inodo**.
- **Por extensiones** (*extents*): rangos de bloques contiguos (inicio y longitud), como en ext4 y NTFS; combina lo mejor de las anteriores.

## El inodo
En los sistemas tipo Unix, cada archivo tiene un **inodo** con sus metadatos y punteros a sus datos (el nombre no está en el inodo, sino en el directorio). En ext2 y ext3, el inodo tiene 12 punteros **directos**, uno **indirecto simple** (apunta a un bloque lleno de punteros), uno **indirecto doble** y uno **indirecto triple**. Con bloques de 4 KB y punteros de 4 bytes, cada bloque de punteros guarda 1024 punteros, así que el tamaño máximo es (12 + 1024 + 1024² + 1024³) × 4 KB, unos 4 TB. El diseño favorece a los archivos pequeños, que son la mayoría: se leen con los punteros directos sin bloques extra.
~~~js
// Tamaño máximo de un archivo con 12 directos y punteros indirectos simple, doble y triple
function tamMax(bloque, puntero, directos = 12) {
  const n = bloque / puntero;                       // punteros por bloque
  const bloques = directos + n + n ** 2 + n ** 3;
  return bloques * bloque;
}
for (const b of [1024, 4096]) console.log('bloque', b, '→', (tamMax(b, 4) / 2 ** 30).toFixed(1), 'GiB');
~~~
El espacio libre se registra con un **mapa de bits**: un bit por bloque. Marshall Kirk McKusick y sus coautores diseñaron en 1984 el **Fast File System** de BSD, que agrupaba los inodos y los datos de un mismo directorio en **grupos de cilindros** cercanos para reducir las búsquedas: multiplicó el rendimiento del sistema de archivos original de Unix.

## Varios discos: RAID y respaldo
Un solo disco puede fallar. **RAID** (Patterson, Gibson y Katz, 1988) combina varios discos: RAID 1 duplica los datos en espejo, RAID 5 reparte datos y paridad para sobrevivir a la falla de un disco, y RAID 10 combina espejo y reparto. Pero RAID no es un respaldo: si borras un archivo por error o un programa lo corrompe, el cambio se replica al instante en todos los discos. Hace falta además copia de seguridad con versiones, idealmente fuera del sitio.

## La caché de páginas
El sistema operativo guarda en memoria los bloques leídos recientemente (**caché de páginas**). Las escrituras normalmente solo modifican la caché y se envían al disco más tarde (**escritura diferida**), agrupadas. Por eso «write» retorna rápido, y por eso un corte de luz puede perder datos "ya guardados". Para exigir que lleguen al dispositivo existe **fsync**.

## Consistencia ante fallas
Crear un archivo modifica varias estructuras: el mapa de bits, el inodo, el bloque de datos y el directorio. Si la energía se corta a la mitad, el disco queda **inconsistente** (un bloque marcado como usado que nadie referencia, o peor, un inodo que apunta a basura). Soluciones históricas:
- **fsck:** al arrancar, revisar todo el disco y reparar; con discos de terabytes puede tardar horas.
- **Journaling** (registro por adelantado): antes de modificar las estructuras, escribir en un **diario** una descripción de la operación completa y una marca de confirmación; después aplicarla. Tras una falla, basta con rehacer las operaciones confirmadas del diario. ext3 (2001) lo llevó a Linux; ext4, NTFS y XFS lo usan. Muchos sistemas registran solo los metadatos (modo *ordered*), escribiendo antes los datos.
- **Copia en escritura:** nunca sobrescribir; escribir la nueva versión en otro lugar y cambiar un puntero raíz de forma atómica. Lo hacen ZFS (Sun, 2005), Btrfs y APFS, que además permiten instantáneas casi gratis.
- **Sistemas estructurados en registro:** Mendel Rosenblum y John Ousterhout propusieron en 1991 escribir todo de forma secuencial, como un registro; la idea reaparece en los SSD y en bases de datos.

## Escribir de forma segura desde una aplicación
Thanumalayan Pillai y sus coautores mostraron en 2014 (*All File Systems Are Not Created Equal*) que muchas aplicaciones populares (bases de datos, Git, sistemas de control de versiones) tenían errores de consistencia ante fallas porque suponían garantías que el sistema de archivos no daba. El patrón robusto para reemplazar un archivo:
1. Escribir el contenido nuevo en un archivo temporal en el mismo directorio.
2. Llamar a fsync sobre el temporal.
3. Renombrarlo sobre el original con «rename», que en POSIX es atómico.
4. Llamar a fsync sobre el directorio para que el cambio de nombre sea duradero.
Así, tras un corte, existe el archivo viejo o el nuevo completo, nunca uno a medias.

## Ejemplo resuelto: guardar la configuración de tarifas de PatioApp
El servidor guarda «tarifas.json» cada vez que un administrador cambia una tarifa. La versión ingenua abre el archivo, lo trunca y escribe: si el proceso cae o se corta la luz a mitad, el archivo queda vacío o cortado y el servidor no arranca. Con el patrón temporal + fsync + rename + fsync del directorio, en el peor caso se pierde el último cambio, pero el archivo siempre es un JSON válido. Para las fotos, que son muchas y grandes, PatioApp guarda un archivo por foto con nombre único (nunca sobrescribe), lo que evita el problema por diseño.`,
  links: [['arq.io', 'los discos, el DMA y RAID son el hardware bajo el sistema de archivos'], ['so.vm', 'la caché de páginas y mmap unen archivos y memoria virtual'], ['m10.index', 'los motores de bases de datos usan las mismas técnicas de registro por adelantado']],
  read: 'OSTEP, capítulos 37 a 44 (Persistence: discos, RAID, archivos, FFS, journaling, LFS, flash); Silberschatz, capítulos 11, 13 y 14; McKusick y otros (1984).',
  terms: [
    ['Inodo', 'estructura de Unix con los metadatos de un archivo y los punteros a sus bloques de datos, sin su nombre', ['Guarda dueño, permisos, tamaño y fechas.', 'Tiene punteros directos e indirectos.', 'El directorio asocia el nombre con el número de inodo.']],
    ['Enlace duro', 'nombre adicional que apunta al mismo inodo de un archivo existente', ['Borrar un nombre no borra los datos si quedan otros.', 'Se crea con ln sin opciones.', 'No puede cruzar sistemas de archivos.']],
    ['Asignación por extensiones', 'forma de registrar los bloques de un archivo como rangos contiguos de inicio y longitud', ['ext4 la usa.', 'Un archivo grande se describe con pocos rangos.', 'Combina lectura rápida y crecimiento flexible.']],
    ['Caché de páginas', 'memoria donde el sistema operativo guarda bloques de archivos leídos o escritos recientemente', ['Una segunda lectura no toca el disco.', 'Las escrituras se envían al disco más tarde.', 'fsync obliga a escribir lo pendiente.']],
    ['Journaling', 'técnica que registra en un diario la operación completa antes de aplicarla, para rehacerla tras una falla', ['ext3 lo llevó a Linux en 2001.', 'Evita revisar todo el disco con fsck.', 'Suele registrar solo los metadatos.']],
    ['fsync', 'llamada al sistema que obliga a escribir en el dispositivo los datos pendientes de un archivo', ['Una base de datos lo llama al confirmar una transacción.', 'Hace lenta la escritura, pero duradera.', 'Sin ella, un corte de luz puede perder datos.']],
    ['Nivelación de desgaste', 'técnica del controlador de un SSD que reparte las escrituras para que las celdas se gasten parejo', ['Evita que un bloque muy escrito muera pronto.', 'La hace la FTL.', 'Es invisible para el sistema operativo.']],
    ['Planificación SSTF', 'atención de las peticiones de disco eligiendo siempre la más cercana al cabezal', ['Desde 53, atiende primero 65 y 67.', 'Reduce el movimiento total.', 'Puede dejar esperando a las peticiones lejanas.']]
  ],
  q: [
    ['Con bloques de 4 KB y punteros de 4 bytes, ¿cuántos punteros caben en un bloque?', '1024', ['256', '4096', '512'], '4096 / 4.', 2],
    ['¿Dónde se guarda el nombre de un archivo en un sistema tipo Unix?', 'En la entrada del directorio, no en el inodo', ['En el inodo', 'En el superbloque', 'En el primer bloque de datos'], 'Por eso un archivo puede tener varios nombres.', 3],
    ['Con el cabezal en 53 y peticiones 98, 183, 37, 122, 14, 124, 65, 67, ¿cuántas pistas recorre SSTF?', '236', ['640', '208', '183'], 'Ejemplo clásico de Silberschatz.', 4],
    ['¿Por qué un write puede retornar rápido aunque el disco sea lento?', 'Porque solo modifica la caché de páginas y el disco se actualiza después', ['Porque comprime los datos', 'Porque los discos son instantáneos', 'Porque no escribe nada'], 'fsync fuerza la escritura real.', 2],
    ['¿Qué ventaja tiene el journaling frente a fsck?', 'Tras una falla basta rehacer las operaciones del diario en lugar de revisar todo el disco', ['No necesita escribir en disco', 'Elimina la caché de páginas', 'Hace los archivos más pequeños'], 'La recuperación tarda segundos, no horas.', 3],
    ['¿Qué patrón garantiza que un archivo quede viejo o nuevo, pero nunca a medias?', 'Escribir un temporal, fsync, rename sobre el original y fsync del directorio', ['Abrir, truncar y escribir', 'Escribir dos veces el mismo archivo', 'Usar un enlace simbólico'], 'rename es atómico en POSIX.', 4],
    ['¿Qué aportó el Fast File System de BSD?', 'Ubicar juntos los inodos y datos relacionados en grupos de cilindros para reducir búsquedas', ['El journaling', 'La copia en escritura', 'Los enlaces simbólicos'], 'McKusick y otros, 1984.', 3],
    { tf: 'Si borras el archivo original, un enlace duro a él sigue funcionando.', v: true, e: 'Ambos nombres apuntan al mismo inodo.', l: 2 },
    { tf: 'En un SSD, el acceso aleatorio es tan lento como en un disco duro.', v: false, e: 'No hay búsqueda ni rotación: el acceso aleatorio es de decenas de microsegundos.', l: 1 },
    { c: 'Escribe «tamMaxArchivo(bloque, puntero, directos)» en bytes, con un puntero indirecto simple, uno doble y uno triple.', f: 'tamMaxArchivo', p: ['bloque', 'puntero', 'directos'], t: [[[4096, 4, 12], 4402345721856], [[1024, 4, 12], 17247252480], [[512, 4, 0], 1082195968]], sol: '  const n = bloque / puntero;\n  return (directos + n + n * n + n * n * n) * bloque;', l: 3 },
    { c: 'Escribe «recorridoSSTF(cabezal, pedidos)»: total de pistas recorridas atendiendo siempre la petición más cercana (en empate, la que aparece primero en la lista).', f: 'recorridoSSTF', p: ['cabezal', 'pedidos'], t: [[[53, [98, 183, 37, 122, 14, 124, 65, 67]], 236], [[0, [5, 10]], 10], [[50, [40, 60]], 30]], sol: '  const q = [...pedidos];\n  let t = 0, h = cabezal;\n  while (q.length) {\n    let i = 0;\n    q.forEach((x, j) => { if (Math.abs(x - h) < Math.abs(q[i] - h)) i = j; });\n    t += Math.abs(q[i] - h); h = q[i]; q.splice(i, 1);\n  }\n  return t;', l: 3 },
    { c: 'Escribe «recorridoFCFS(cabezal, pedidos)»: total de pistas recorridas atendiendo en orden de llegada.', f: 'recorridoFCFS', p: ['cabezal', 'pedidos'], t: [[[53, [98, 183, 37, 122, 14, 124, 65, 67]], 640], [[10, [20, 5]], 25], [[0, []], 0]], sol: '  let t = 0, h = cabezal;\n  for (const x of pedidos) { t += Math.abs(x - h); h = x; }\n  return t;', l: 1 }
  ],
  gen: function (g) {
    function sstf(h, q) { q = q.slice(); var t = 0; while (q.length) { var i = 0; q.forEach(function (x, j) { if (Math.abs(x - h) < Math.abs(q[i] - h)) i = j; }); t += Math.abs(q[i] - h); h = q[i]; q.splice(i, 1); } return t; }
    g.times(8, function (R) { var h = R.int(20, 180), q = []; for (var i = 0; i < 5; i++) q.push(R.int(0, 199)); var f = 0, c = h; q.forEach(function (x) { f += Math.abs(x - c); c = x; }); g.input(3, 'Cabezal en ' + h + ' y peticiones ' + q.join(', ') + '. ¿Cuántas pistas recorre FCFS?', f, 'Suma las distancias en orden de llegada.'); g.input(4, 'Mismo caso (cabezal ' + h + ', peticiones ' + q.join(', ') + '). ¿Cuántas pistas recorre SSTF?', sstf(h, q), 'Elige siempre la petición más cercana.'); });
    g.times(4, function (R) { var rpm = R.pick([5400, 7200, 10000, 15000]); g.input(3, '¿Cuál es la latencia rotacional promedio en ms de un disco de ' + rpm + ' rpm? Redondea a 2 decimales.', (30000 / rpm).toFixed(2), 'Media vuelta: 60 000 / rpm / 2.'); });
    var asig = [['Todos los bloques seguidos: lectura rapidísima pero difícil crecer', 'Contigua'], ['Cada bloque apunta al siguiente, como en la FAT', 'Enlazada'], ['Un bloque índice con punteros a los datos, como el inodo', 'Indexada'], ['Rangos de inicio y longitud, como en ext4', 'Por extensiones']];
    asig.forEach(function (a) { g.mcq(2, '¿Qué método de asignación de bloques es este? ' + a[0], a[1], ['Contigua', 'Enlazada', 'Indexada', 'Por extensiones'].filter(function (x) { return x !== a[1]; }), 'Cuatro métodos clásicos.'); });
  },
  checks: [
    ['¿Por qué el acceso secuencial a un disco duro es mucho más rápido que el aleatorio?', 'Porque cada acceso aleatorio paga una búsqueda del brazo y una espera de rotación de milisegundos, mientras que el secuencial lee bloques contiguos sin esperas.'],
    ['Calcula el tamaño máximo de archivo con bloques de 4 KB, punteros de 4 bytes, 12 directos e indirectos simple, doble y triple.', '(12 + 1024 + 1024² + 1024³) × 4096 bytes, unos 4 TB.'],
    ['Explica la diferencia entre enlace duro y simbólico.', 'El duro es otro nombre para el mismo inodo; el simbólico es un archivo con la ruta de otro y queda roto si el original se borra.'],
    ['¿Cómo protege el journaling la consistencia ante un corte de luz?', 'Escribe primero la operación completa en un diario con una marca de confirmación; tras la falla rehace las confirmadas y descarta las incompletas.'],
    ['Describe cómo reemplazar un archivo de configuración de forma segura.', 'Escribir un temporal en el mismo directorio, fsync, renombrarlo sobre el original y fsync del directorio.']
  ],
  cites: ['McKusick, M. K., Joy, W., Leffler, S. y Fabry, R. (1984). A Fast File System for UNIX. *ACM Transactions on Computer Systems*, 2(3).', 'Rosenblum, M. y Ousterhout, J. (1991). The Design and Implementation of a Log-Structured File System. *SOSP 1991*.', 'Pillai, T. S. et al. (2014). All File Systems Are Not Created Equal: On the Complexity of Crafting Crash-Consistent Applications. *OSDI 2014*.', 'Patterson, D., Gibson, G. y Katz, R. (1988). A Case for Redundant Arrays of Inexpensive Disks (RAID). *SIGMOD 1988*.', 'Arpaci-Dusseau, R. y Arpaci-Dusseau, A. (2018). *Operating Systems: Three Easy Pieces*, capítulos 37 a 44.', 'Silberschatz, A., Galvin, P. y Gagne, G. (2018). *Operating System Concepts* (10.ª ed.), capítulos 11, 13 y 14.'],
  project: { t: 'Sistema de archivos en un archivo',
    goal: 'Implementar un sistema de archivos sencillo sobre un archivo que hace de disco.',
    steps: ['Define el formato: superbloque, mapa de bits de bloques, tabla de inodos con punteros directos e indirectos, y bloques de datos.', 'Implementa crear, leer, escribir, listar y borrar archivos en un directorio raíz.', 'Agrega directorios anidados y enlaces duros con contador de referencias.', 'Agrega un diario simple para que crear un archivo sea atómico ante una falla simulada.', 'Escribe pruebas que simulen cortes en distintos puntos y verifiquen la consistencia.'],
    deliver: 'El código, el documento del formato en disco y las pruebas de falla.' },
  hito: ['Guarda la configuración de PatioApp con escritura atómica (temporal, fsync, rename y fsync del directorio) y prueba que sobrevive a una caída a mitad de escritura.', 'Organiza el almacenamiento de fotos de PatioApp con nombres únicos sin sobrescrituras y mide el rendimiento de escritura secuencial frente a aleatoria.']
});

S('so', 'so.virt', { title: 'Protección, virtualización y contenedores',
  ask: '¿Qué concepto de protección o virtualización se aplica?',
  lesson: `
> **La idea en simple.** Un edificio de departamentos puede aislar a sus habitantes de dos formas: construir casas separadas en el mismo terreno, cada una con sus propias instalaciones (**máquinas virtuales**), o dividir un mismo edificio en departamentos con paredes, llaves y medidores de luz propios, pero con los mismos cimientos y ascensores (**contenedores**). Lo primero aísla más; lo segundo es mucho más liviano.

## Protección: quién puede hacer qué
La **protección** son los mecanismos que controlan el acceso de procesos y usuarios a los recursos; la **seguridad** es el objetivo más amplio de defenderse de ataques. Butler Lampson formalizó en 1971 la **matriz de acceso**: filas para los sujetos (usuarios, procesos), columnas para los objetos (archivos, dispositivos) y en cada celda los derechos (leer, escribir, ejecutar). La matriz real es enorme y casi vacía, así que se guarda de dos maneras:
- **Listas de control de acceso** (ACL), por columnas: cada objeto lista quién puede hacer qué con él.
- **Capacidades**, por filas: cada sujeto tiene "llaves" infalsificables para los objetos que puede usar. Un descriptor de archivo abierto se comporta como una capacidad.
En Unix, cada archivo tiene permisos de lectura, escritura y ejecución para tres clases: el **dueño**, el **grupo** y **los demás**, que se escriben en octal: «rwxr-x---» es 750. El usuario **root** salta todas las comprobaciones. El bit **setuid** hace que un programa se ejecute con los privilegios de su dueño (así «passwd» puede modificar el archivo de contraseñas), y por eso un programa setuid con un error es un blanco favorito de los atacantes. Linux divide los poderes de root en **capacidades** más finas (por ejemplo, abrir puertos menores que 1024 sin ser root del todo).

## Principios de diseño de Saltzer y Schroeder
Jerome Saltzer y Michael Schroeder publicaron en 1975 *The Protection of Information in Computer Systems*, cuyos principios siguen siendo la base del diseño seguro:
- **Economía del mecanismo:** diseños simples y pequeños, fáciles de revisar.
- **Valores por defecto seguros:** negar salvo permiso explícito.
- **Mediación completa:** verificar cada acceso, no solo el primero.
- **Diseño abierto:** la seguridad no debe depender de mantener el diseño en secreto.
- **Separación de privilegios:** exigir más de una condición para lo crítico.
- **Mínimo privilegio:** cada programa y usuario con solo los permisos que necesita.
- **Mínimo mecanismo común:** compartir lo menos posible entre usuarios.
- **Aceptabilidad psicológica:** que lo seguro sea fácil de usar, o la gente lo evitará.

## Máquinas virtuales
Una **máquina virtual** (VM) ejecuta un sistema operativo completo como si tuviera su propio hardware. El software que lo hace posible es el **hipervisor** (o monitor de máquina virtual):
- **Tipo 1** (nativo): corre directamente sobre el hardware: VMware ESXi, Xen, Microsoft Hyper-V; KVM convierte al propio Linux en hipervisor.
- **Tipo 2** (alojado): corre como una aplicación sobre otro sistema: VirtualBox, VMware Workstation.
La idea no es nueva: IBM ofrecía máquinas virtuales en el sistema VM/370 en 1972. Gerald Popek y Robert Goldberg formalizaron en 1974 qué hace falta: un monitor debe dar **equivalencia** (el programa se comporta igual que en hardware real), **control de recursos** y **eficiencia** (la mayoría de instrucciones corren directamente). Su teorema: una arquitectura es virtualizable de forma clásica si todas las instrucciones **sensibles** (las que leen o cambian el estado privilegiado) son **privilegiadas** (provocan una excepción en modo usuario), para que el monitor pueda atraparlas y emularlas.

La arquitectura x86 original no cumplía esa condición: John Robin y Cynthia Irvine identificaron en 2000 diecisiete instrucciones sensibles que no se atrapaban. Soluciones históricas:
- **Traducción binaria** (VMware, 1999): reescribir al vuelo las instrucciones problemáticas del sistema invitado.
- **Paravirtualización** (Xen, Paul Barham y otros, 2003): modificar el sistema invitado para que llame al hipervisor en lugar de usar esas instrucciones.
- **Soporte de hardware:** Intel VT-x (2005) y AMD-V (2006) agregaron un modo especial para el hipervisor; luego llegaron las tablas de páginas anidadas para virtualizar la memoria eficientemente.
La nube se construyó sobre esto: cada instancia de AWS, Azure o Google Cloud es una VM en un servidor compartido.

## Virtualizar la memoria y los dispositivos
El procesador no es lo único que hay que virtualizar:
- **Memoria:** el sistema invitado cree administrar memoria "física", que en realidad es memoria virtual del hipervisor. Al principio los hipervisores mantenían **tablas de páginas sombra** que combinaban ambas traducciones, a costa de atrapar cada cambio del invitado. Las **tablas de páginas anidadas** de hardware (EPT de Intel, NPT de AMD) hacen las dos traducciones en la MMU, con más accesos cuando falla la TLB pero sin intervención del hipervisor. Técnicas como el **globo** (*ballooning*) recuperan memoria de un invitado pidiéndole que la libere, y la **deduplicación** comparte páginas idénticas entre VM.
- **Dispositivos:** emular una tarjeta de red real es lento; los controladores paravirtualizados **virtio** usan colas compartidas entre invitado y anfitrión, y con **SR-IOV** una tarjeta física se presenta como varias tarjetas virtuales que el invitado usa directamente.
- **Migración en vivo:** una VM puede moverse de un servidor a otro mientras sigue funcionando, copiando su memoria en rondas y pausándola solo unos milisegundos al final; así la nube actualiza su hardware sin apagar los servicios de sus clientes.

## Contenedores
Un **contenedor** no virtualiza el hardware: es un grupo de procesos que comparten el **núcleo** del anfitrión pero ven una versión aislada del sistema. En Linux se construye con dos mecanismos del núcleo:
- **Espacios de nombres** (*namespaces*): aíslan lo que el proceso **ve**: sus propios PID (el proceso principal es el PID 1 dentro del contenedor), su red y sus puertos, su árbol de montajes, su nombre de equipo y sus usuarios.
- **Grupos de control** (*cgroups*), desarrollados en Google por Paul Menage y Rohit Seth e incorporados a Linux en 2008: limitan y contabilizan lo que el proceso **usa**: procesador, memoria, entrada y salida.
Los antecedentes son «chroot» (Unix V7, 1979), que cambia el directorio raíz de un proceso, y las *jails* de FreeBSD (2000). Docker (2013) no inventó el aislamiento, sino una forma cómoda de empaquetar una aplicación con sus dependencias en una **imagen** por capas y distribuirla. Para restringir aún más, **seccomp** filtra qué llamadas al sistema puede hacer un contenedor.

## Máquinas virtuales frente a contenedores
| Aspecto | Máquina virtual | Contenedor |
| Qué comparte | solo el hardware (vía el hipervisor) | el núcleo del anfitrión |
| Arranque | decenas de segundos | menos de un segundo |
| Peso | gigabytes (un sistema completo) | megabytes (la aplicación y sus bibliotecas) |
| Aislamiento | fuerte: un fallo del núcleo invitado no afecta a otros | más débil: un error del núcleo compartido puede afectar a todos |
| Sistema invitado | cualquiera (Windows sobre Linux) | el mismo núcleo que el anfitrión |
Por el aislamiento más débil, los proveedores de nube combinan ambos: **microVM** como Firecracker (AWS, 2018), que arrancan en unos 125 milisegundos y dan aislamiento de VM con agilidad de contenedor, o gVisor (Google), que intercepta las llamadas al sistema con un núcleo escrito en espacio de usuario.

## Ejemplo resuelto: aislar el servidor de PatioApp
Se aplican los principios de Saltzer y Schroeder:
- **Mínimo privilegio:** el contenedor corre con un usuario sin privilegios, no como root; el sistema de archivos de la imagen es de solo lectura y solo el directorio de fotos admite escritura.
- **Valores por defecto seguros:** se eliminan todas las capacidades de Linux y se agrega solo la necesaria; un perfil de seccomp bloquea llamadas que el servidor nunca usa.
- **Control de recursos:** cgroups limita el servidor a 1 GB de memoria y 2 procesadores, para que un error no tumbe al resto de la máquina.
- **Defensa en profundidad:** el contenedor corre dentro de una VM de la nube; aunque un atacante escapara del contenedor, seguiría encerrado en la VM.
Los permisos de los archivos de configuración se fijan en 640 (dueño lee y escribe, grupo lee, los demás nada).`,
  links: [['m15.containers', 'esta unidad explica lo que hay debajo de Docker y Kubernetes'], ['m16.auth', 'la autorización en aplicaciones aplica los mismos principios de control de acceso'], ['so.intro', 'la virtualización clásica depende de que las instrucciones sensibles provoquen excepciones']],
  read: 'OSTEP, apéndice sobre máquinas virtuales y capítulos de seguridad; Silberschatz, capítulos 16, 17 y 18; Saltzer y Schroeder (1975); Popek y Goldberg (1974).',
  terms: [
    ['Matriz de acceso', 'modelo que indica para cada sujeto y cada objeto qué derechos tiene el sujeto sobre el objeto', ['Lampson la formalizó en 1971.', 'Se guarda por columnas (ACL) o por filas (capacidades).', 'La mayoría de sus celdas están vacías.']],
    ['Lista de control de acceso', 'lista asociada a un objeto que indica qué sujetos pueden acceder y con qué derechos', ['Un archivo permite leer a Ana y escribir a Luis.', 'Los permisos rwx de Unix son una ACL simplificada.', 'Facilita revisar quién accede a un objeto.']],
    ['Mínimo privilegio', 'principio de dar a cada programa o usuario solo los permisos que necesita para su tarea', ['El servidor corre sin ser root.', 'Limita el daño si alguien lo compromete.', 'Saltzer y Schroeder lo enunciaron en 1975.']],
    ['Hipervisor', 'software que crea y ejecuta máquinas virtuales administrando el hardware entre ellas', ['KVM convierte a Linux en hipervisor.', 'Puede ser de tipo 1 o de tipo 2.', 'Atrapa y emula las instrucciones sensibles.']],
    ['Condición de Popek y Goldberg', 'requisito para la virtualización clásica: todas las instrucciones sensibles deben ser privilegiadas', ['El x86 original no la cumplía.', 'VT-x resolvió el problema en hardware.', 'Permite atrapar y emular lo sensible.']],
    ['Espacio de nombres', 'mecanismo del núcleo Linux que da a un grupo de procesos una vista aislada de un recurso del sistema', ['El contenedor ve su proceso principal como PID 1.', 'Tiene su propia red y puertos.', 'Aísla lo que se ve, no lo que se consume.']],
    ['Grupo de control', 'mecanismo del núcleo Linux que limita y contabiliza los recursos que usa un grupo de procesos', ['Limita un contenedor a 1 GB de memoria.', 'Lo desarrollaron Menage y Seth en Google.', 'Kubernetes lo usa para las cuotas.']],
    ['Paravirtualización', 'técnica en la que el sistema invitado se modifica para pedir servicios al hipervisor en lugar de ejecutar instrucciones difíciles de virtualizar', ['Xen la popularizó en 2003.', 'Evita la traducción binaria.', 'Hoy se usa en controladores virtio.']]
  ],
  q: [
    ['¿Cómo se escribe en octal el permiso «rwxr-x---»?', '750', ['755', '700', '570'], 'rwx = 7, r-x = 5, --- = 0.', 2],
    ['¿Qué comparten todos los contenedores de una misma máquina?', 'El núcleo del sistema operativo anfitrión', ['Nada', 'Su sistema de archivos completo', 'Sus PID'], 'Por eso su aislamiento es más débil que el de una VM.', 2],
    ['¿Qué mecanismo de Linux limita la memoria que puede usar un contenedor?', 'Los grupos de control (cgroups)', ['Los espacios de nombres', 'chroot', 'setuid'], 'Los espacios de nombres aíslan lo que se ve; cgroups, lo que se usa.', 2],
    ['Según Popek y Goldberg, ¿cuándo es virtualizable de forma clásica una arquitectura?', 'Cuando todas sus instrucciones sensibles son privilegiadas', ['Cuando tiene más de un núcleo', 'Cuando tiene TLB', 'Cuando usa paginación'], 'El monitor puede atraparlas y emularlas.', 4],
    ['¿Qué principio de Saltzer y Schroeder se viola si un servidor web corre como root sin necesitarlo?', 'Mínimo privilegio', ['Diseño abierto', 'Economía del mecanismo', 'Aceptabilidad psicológica'], 'Un fallo le daría al atacante control total.', 2],
    ['¿Por qué un programa con el bit setuid es un blanco atractivo?', 'Porque se ejecuta con los privilegios de su dueño, a menudo root', ['Porque no puede cerrarse', 'Porque es más lento', 'Porque no tiene permisos'], 'Un error en él permite escalar privilegios.', 3],
    ['¿Cuál es un hipervisor de tipo 2?', 'VirtualBox', ['VMware ESXi', 'Xen', 'Hyper-V'], 'Corre como aplicación sobre otro sistema operativo.', 2],
    { tf: 'Un contenedor Linux puede ejecutar un núcleo de Windows distinto al del anfitrión.', v: false, e: 'Comparte el núcleo del anfitrión; para otro sistema hace falta una VM.', l: 2 },
    { tf: 'El principio de diseño abierto dice que la seguridad no debe depender de mantener el diseño en secreto.', v: true, e: 'Es la misma idea que el principio de Kerckhoffs en criptografía.', l: 2 },
    { c: 'Escribe «permisoOctal(p)» que convierta un texto de 9 caracteres como "rwxr-x---" a su número octal como número (750).', f: 'permisoOctal', p: ['p'], t: [[['rwxr-x---'], 750], [['rw-r--r--'], 644], [['rwxrwxrwx'], 777], [['---------'], 0]], sol: '  let r = "";\n  for (let i = 0; i < 9; i += 3) {\n    const t = p.slice(i, i + 3);\n    r += (t[0] === "r" ? 4 : 0) + (t[1] === "w" ? 2 : 0) + (t[2] === "x" ? 1 : 0);\n  }\n  return Number(r);', l: 2 },
    { c: 'Escribe «virtualizable(sensibles, privilegiadas)» que devuelva true si toda instrucción sensible está en la lista de privilegiadas.', f: 'virtualizable', p: ['sensibles', 'privilegiadas'], t: [[[['a', 'b'], ['a', 'b', 'c']], true], [[['a', 'popf'], ['a']], false], [[[], ['a']], true]], sol: '  return sensibles.every(s => privilegiadas.includes(s));', l: 1 },
    { c: 'Escribe «puedeLeer(permiso, esDueno, enGrupo)»: permiso es un texto como "rw-r-----"; devuelve si el usuario puede leer según sea dueño, del grupo o de los demás.', f: 'puedeLeer', p: ['permiso', 'esDueno', 'enGrupo'], t: [[['rw-r-----', true, false], true], [['rw-r-----', false, true], true], [['rw-r-----', false, false], false], [['-w-r--r--', true, false], false]], sol: '  const i = esDueno ? 0 : enGrupo ? 3 : 6;\n  return permiso[i] === "r";', h: 'Unix usa la primera clase que aplica: dueño, luego grupo, luego los demás.', l: 2 }
  ],
  gen: function (g) {
    function oct(t) { var r = ''; for (var i = 0; i < 9; i += 3) r += (t[i] === 'r' ? 4 : 0) + (t[i + 1] === 'w' ? 2 : 0) + (t[i + 2] === 'x' ? 1 : 0); return r; }
    g.times(10, function (R) { var t = ''; for (var i = 0; i < 3; i++) t += R.pick(['r', '-']) + R.pick(['w', '-']) + R.pick(['x', '-']); g.input(2, '¿Cuál es el permiso octal de «' + t + '»?', oct(t), 'r = 4, w = 2, x = 1 en cada grupo de tres.'); });
    var pr = [['Negar el acceso salvo permiso explícito', 'Valores por defecto seguros'], ['Verificar cada acceso, no solo el primero', 'Mediación completa'], ['Que la seguridad no dependa de ocultar el diseño', 'Diseño abierto'], ['Exigir dos llaves para una operación crítica', 'Separación de privilegios'], ['Dar a cada programa solo los permisos que necesita', 'Mínimo privilegio'], ['Mantener el mecanismo de seguridad pequeño y simple', 'Economía del mecanismo'], ['Que lo seguro sea fácil de usar', 'Aceptabilidad psicológica']];
    var ps = pr.map(function (p) { return p[1]; });
    pr.forEach(function (p) { g.mcq(3, '¿Qué principio de Saltzer y Schroeder describe esto? ' + p[0], p[1], g.R.sample(ps.filter(function (x) { return x !== p[1]; }), 3), 'Principios de 1975, vigentes en el diseño seguro.'); });
    var vc = [['Ejecutar Windows y Linux en el mismo servidor físico', 'Máquina virtual'], ['Arrancar cientos de instancias de un microservicio en segundos', 'Contenedor'], ['Aislar código no confiable de distintos clientes con el mayor aislamiento', 'Máquina virtual'], ['Empaquetar una aplicación con sus bibliotecas para que corra igual en todos lados', 'Contenedor']];
    vc.forEach(function (v) { g.mcq(3, '¿Qué conviene más? ' + v[0], v[1], [v[1] === 'Máquina virtual' ? 'Contenedor' : 'Máquina virtual', 'Un proceso sin aislamiento', 'Un enlace simbólico'], 'Las VM aíslan más; los contenedores son más livianos.'); });
  },
  checks: [
    ['¿Qué diferencia hay entre una ACL y una capacidad?', 'La ACL se asocia al objeto y lista quién puede acceder; la capacidad la tiene el sujeto y le da acceso al objeto.'],
    ['Nombra cuatro principios de Saltzer y Schroeder y aplícalos a un servidor web.', 'Mínimo privilegio (no correr como root), valores seguros por defecto (negar lo no permitido), mediación completa (autorizar cada petición) y economía del mecanismo (código de seguridad simple).'],
    ['Enuncia la condición de Popek y Goldberg y explica por qué el x86 original no la cumplía.', 'Todas las instrucciones sensibles deben ser privilegiadas; el x86 tenía instrucciones sensibles que no provocaban excepción en modo usuario.'],
    ['¿Qué aportan los espacios de nombres y qué aportan los cgroups a un contenedor?', 'Los espacios de nombres aíslan lo que el proceso ve (PID, red, montajes); los cgroups limitan lo que consume (procesador, memoria).'],
    ['¿Cuándo elegirías una máquina virtual en lugar de un contenedor?', 'Cuando necesitas otro sistema operativo o el aislamiento más fuerte, por ejemplo para ejecutar código no confiable de distintos clientes.']
  ],
  cites: ['Saltzer, J. y Schroeder, M. (1975). The Protection of Information in Computer Systems. *Proceedings of the IEEE*, 63(9).', 'Lampson, B. (1971). Protection. *Proceedings of the 5th Princeton Symposium on Information Sciences and Systems*.', 'Popek, G. y Goldberg, R. (1974). Formal Requirements for Virtualizable Third Generation Architectures. *Communications of the ACM*, 17(7).', 'Robin, J. y Irvine, C. (2000). Analysis of the Intel Pentium’s Ability to Support a Secure Virtual Machine Monitor. *USENIX Security Symposium*.', 'Barham, P. et al. (2003). Xen and the Art of Virtualization. *SOSP 2003*.', 'Agache, A. et al. (2020). Firecracker: Lightweight Virtualization for Serverless Applications. *NSDI 2020*.'],
  project: { t: 'Un contenedor hecho a mano',
    goal: 'Entender qué es un contenedor construyendo uno con los mecanismos del núcleo.',
    steps: ['En Linux, usa «unshare» para crear un proceso con sus propios espacios de nombres de PID, montajes y nombre de equipo, y comprueba que se ve como PID 1.', 'Usa chroot o pivot_root con un sistema de archivos mínimo (por ejemplo, el de Alpine) como raíz.', 'Crea un cgroup que limite la memoria a 100 MB y verifica que el proceso muere al superarla.', 'Compara con Docker: ejecuta la misma imagen y revisa sus espacios de nombres y cgroups en /proc.', 'Escribe un informe con las diferencias de aislamiento frente a una VM.'],
    deliver: 'Los comandos o el script, las capturas de las pruebas y el informe.' },
  hito: ['Ejecuta PatioApp en un contenedor con usuario sin privilegios, sistema de archivos de solo lectura salvo el directorio de fotos y límites de memoria y procesador.', 'Revisa los permisos de los archivos de PatioApp y aplica el mínimo privilegio (por ejemplo, 640 en configuraciones con secretos), documentando cada decisión.']
});
})();
