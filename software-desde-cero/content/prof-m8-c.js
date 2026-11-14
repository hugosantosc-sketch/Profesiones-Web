(function () {
var S = SDC.S;

S('m8', 'm8.sys', { title: 'Programación de sistemas: procesos, señales, archivos y flujos',
  ask: '¿Qué servicio del sistema operativo usa este programa y cómo debería manejarlo?',
  lesson: `
> **La idea en simple.** Ya sabes qué hace el sistema operativo: administra procesos, memoria, archivos y dispositivos. La programación de sistemas es usar esos servicios **desde tu código**: lanzar otros programas, reaccionar cuando el sistema te pide que te detengas, leer archivos enormes sin agotar la memoria, hablar por la red con sockets. Son habilidades que separan un script que "funciona en mi máquina" de un servicio que se comporta bien en un servidor real.

## Procesos desde el código
Un programa puede crear otros procesos. En Unix, la llamada clásica es **fork** (duplicar el proceso actual) seguida de **exec** (reemplazar el programa del duplicado por otro). Es la forma en que la terminal ejecuta cada comando que escribes. En Node, el módulo «child_process» ofrece una interfaz más cómoda:
~~~js
import { spawn, execFile } from 'node:child_process';
// execFile: ejecutar un programa y recibir su salida completa (para salidas pequeñas)
execFile('git', ['rev-parse', '--short', 'HEAD'], (err, stdout) => {
  if (err) return console.error('git falló con código', err.code);
  console.log('versión desplegada:', stdout.trim());
});
// spawn: ejecutar y procesar la salida como flujo (para salidas grandes o largas)
const hijo = spawn('pg_dump', ['--format=custom', 'patioapp'], { stdio: ['ignore', 'pipe', 'inherit'] });
hijo.stdout.on('data', trozo => { /* escribir al archivo de respaldo */ });
hijo.on('close', codigo => console.log(codigo === 0 ? 'respaldo listo' : 'respaldo falló: ' + codigo));
~~~
Dos reglas de seguridad: preferir «execFile» o «spawn» con los argumentos en una **lista** antes que «exec» con un texto armado, porque «exec» pasa el texto a una terminal que interpreta caracteres especiales, y una placa como «ABC; rm -rf /» se convertiría en dos comandos (es la **inyección de comandos**, prima hermana de la inyección SQL). Y **revisar siempre el código de salida**: 0 significa éxito, cualquier otro valor es un error que no debe ignorarse.

## Señales y cierre ordenado
Las **señales** son mensajes asíncronos que el sistema operativo envía a un proceso. Las más importantes:
| Señal | Cuándo llega | Qué se espera |
|---|---|---|
| SIGINT | Ctrl+C en la terminal | terminar |
| SIGTERM | el sistema o el orquestador pide detenerse (despliegue, apagado) | terminar ordenadamente |
| SIGKILL | terminación forzada | no se puede atrapar: el proceso muere de inmediato |
| SIGHUP | se cerró la terminal; por convención, recargar configuración | depende del programa |
Cuando se despliega una versión nueva, la plataforma (Docker, Kubernetes, systemd, un servicio en la nube) envía **SIGTERM** al proceso viejo y, si no termina en un plazo (30 segundos por defecto en Kubernetes), envía **SIGKILL**. Un servidor que muere de golpe deja peticiones a medio responder, transacciones abiertas y archivos a medio escribir. El **cierre ordenado** (*graceful shutdown*) consiste en atrapar SIGTERM, dejar de aceptar conexiones nuevas, terminar las que están en curso, cerrar los recursos y salir:
~~~js
const servidor = app.listen(process.env.PORT || 3000);
let cerrando = false;
async function cerrar(senal) {
  if (cerrando) return;
  cerrando = true;
  console.log('recibí', senal, '— cerrando ordenadamente');
  const limite = setTimeout(() => { console.error('cierre forzado'); process.exit(1); }, 25000);
  servidor.close(async () => {                       // deja de aceptar y espera las peticiones en curso
    await pool.end();                                // cierra las conexiones a la base de datos
    clearTimeout(limite);
    process.exit(0);
  });
}
process.on('SIGTERM', () => cerrar('SIGTERM'));
process.on('SIGINT', () => cerrar('SIGINT'));
~~~

## Archivos y descriptores
Para el sistema operativo, un archivo abierto es un **descriptor de archivo**: un número pequeño que identifica un recurso abierto por el proceso. Los tres primeros son siempre la entrada estándar (0), la salida estándar (1) y la de errores (2). Los sockets de red y las tuberías también son descriptores. Cada proceso tiene un **límite** de descriptores abiertos (con «ulimit -n» se ve; 1024 es un valor por defecto común en Linux): un servidor que abre archivos o conexiones y nunca los cierra termina fallando con el error **EMFILE** ("too many open files"). La regla es cerrar todo lo que se abre, idealmente con «try/finally» o con APIs que cierran solas.
Otras cuestiones prácticas de archivos:
- **Escrituras atómicas:** para que un archivo de configuración nunca quede a medio escribir si el proceso muere, se escribe a un archivo temporal en la misma carpeta y luego se **renombra** sobre el original. En los sistemas de archivos de Unix, renombrar dentro del mismo sistema de archivos es atómico.
- **Rutas portables:** usar «path.join» en lugar de concatenar con «/» o «\\», para que el código funcione en Windows y en Linux.
- **Permisos:** un servicio no debe correr como administrador (root); se crea un usuario con acceso solo a sus carpetas.

## Flujos: procesar sin cargar todo en memoria
Leer un archivo de 4 GB con «readFileSync» intenta ponerlo entero en memoria y probablemente falla. Los **flujos** (*streams*) procesan los datos por **trozos** a medida que llegan: leer, transformar y escribir, con memoria constante. Es la misma idea de las tuberías de Unix. Node tiene flujos de lectura, de escritura, de transformación y la función «pipeline», que los conecta y maneja los errores y el cierre de todos:
~~~js
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
// Comprimir el registro de accesos del día sin cargarlo en memoria
await pipeline(
  createReadStream('accesos-2026-11-13.log'),
  createGzip(),
  createWriteStream('accesos-2026-11-13.log.gz')
);
~~~
Un concepto clave es la **contrapresión** (*backpressure*): si el destino escribe más lento de lo que la fuente lee (un disco lento, un cliente con mala conexión), los datos se acumulan en memoria. Los flujos bien conectados **pausan** la lectura hasta que el destino pide más. «pipeline» lo hace automáticamente; escribir a mano con eventos «data» sin respetar el valor que devuelve «write» es la causa típica de servidores que se quedan sin memoria al descargar archivos grandes.

## Sockets: la red desde el código
Debajo de HTTP hay **sockets**: la interfaz que el sistema operativo ofrece para comunicarse por TCP o UDP, introducida en el Unix de Berkeley (4.2BSD, 1983) y adoptada por todos los sistemas. Un servidor crea un socket, lo **asocia** a un puerto (*bind*), **escucha** (*listen*) y **acepta** conexiones; cada conexión aceptada es un descriptor nuevo por el que se leen y escriben bytes. El módulo «net» de Node expone esto directamente, y «http» está construido encima. Saberlo ayuda a entender errores comunes: **EADDRINUSE** (otro proceso ya usa ese puerto), **ECONNREFUSED** (nadie escucha en ese puerto del destino), **ECONNRESET** (el otro lado cortó la conexión) y **ETIMEDOUT** (no hubo respuesta a tiempo). Y una regla de despliegue: escuchar en «0.0.0.0» expone el servicio a todas las interfaces de red, mientras que «127.0.0.1» lo deja accesible solo desde la propia máquina, lo correcto para una base de datos o un panel de administración interno.

## Ejemplo resuelto: peticiones perdidas en cada despliegue
Cada vez que se despliega la API de PatioApp, entre 5 y 20 operadores ven el error "No se pudo registrar la salida", y algunos cobros quedan a medias.
1. **Diagnóstico:** el proceso no manejaba SIGTERM. Node, por defecto, termina de inmediato al recibirla, cortando las peticiones en curso y las transacciones abiertas.
2. **Cierre ordenado:** se atrapa SIGTERM, se detiene la aceptación de conexiones, se esperan las peticiones en curso (con un límite de 25 segundos, menor que el plazo de 30 de la plataforma) y se cierra el grupo de conexiones.
3. **Salud:** durante el cierre, la ruta «/salud» responde 503, para que el balanceador deje de enviar tráfico a esa instancia antes de que se apague.
4. **Transacciones:** como cada salida ya era una transacción, las que se cortaban se deshacían enteras, sin dejar cobros a medias; el problema visible eran los errores al usuario, que el cliente ahora reintenta con la clave de idempotencia.
5. **Otro hallazgo:** el script nocturno de respaldo usaba «exec» con el nombre de la base armado desde una variable; se reemplazó por «spawn» con argumentos en lista y verificación del código de salida, que antes se ignoraba (un respaldo había fallado tres noches seguidas sin que nadie lo notara).
6. **Resultado:** cero errores visibles en los despliegues siguientes, que ahora se pueden hacer en horario laboral.`,
  links: [['m8.os', 'procesos, llamadas al sistema y sistemas de archivos'], ['m7.cli', 'tuberías, flujos estándar y códigos de salida'], ['m15.k8s', 'cómo los orquestadores detienen y reemplazan procesos']],
  read: 'Kerrisk, *The Linux Programming Interface* (2010), capítulos 20 a 28 y 56 a 61; documentación de Node ("Child process", "Stream", "Process: signal events"); Stevens y Rago, *Advanced Programming in the UNIX Environment* (3.ª ed., 2013).',
  terms: [
    ['fork y exec', 'llamadas de Unix para duplicar un proceso y reemplazar su programa por otro', ['Cómo la terminal ejecuta comandos.', 'spawn en Node.', 'Proceso hijo.']],
    ['Código de salida', 'número que un proceso devuelve al terminar: 0 para éxito, otro valor para error', ['$?.', 'process.exit(1).', 'Nunca ignorarlo.']],
    ['Inyección de comandos', 'ataque que introduce comandos a través de datos pasados a una terminal', ['exec con texto armado.', 'Usar listas de argumentos.', 'Como la inyección SQL.']],
    ['Señal', 'mensaje asíncrono que el sistema operativo envía a un proceso', ['SIGTERM.', 'SIGINT.', 'SIGKILL no se atrapa.']],
    ['Cierre ordenado', 'terminación que deja de aceptar trabajo, completa el que está en curso y libera recursos', ['Graceful shutdown.', 'Despliegues.', 'Plazo límite.']],
    ['Descriptor de archivo', 'número que identifica un recurso abierto por un proceso: archivo, socket o tubería', ['0, 1, 2.', 'EMFILE.', 'ulimit -n.']],
    ['Flujo', 'procesamiento de datos por trozos a medida que llegan, con memoria constante', ['Streams.', 'pipeline.', 'Tuberías.']],
    ['Contrapresión', 'mecanismo por el que un destino lento hace pausar a la fuente para no acumular datos en memoria', ['Backpressure.', 'write devuelve false.', 'pipeline lo maneja.']]
  ],
  q: [
    ['¿Qué señal envía una plataforma para pedir a un proceso que se detenga ordenadamente?', 'SIGTERM', ['SIGKILL', 'SIGHUP', 'SIGSEGV'], 'SIGKILL llega después si no termina.', 2],
    ['¿Por qué preferir spawn con argumentos en lista antes que exec con un texto armado?', 'Porque exec pasa el texto a una terminal y permite la inyección de comandos', ['Porque spawn es más antiguo', 'Porque exec no existe en Linux', 'Porque spawn no devuelve nada'], 'Inyección de comandos.', 3],
    ['¿Qué significa un código de salida distinto de 0?', 'Que el proceso terminó con error', ['Que terminó con éxito', 'Que sigue corriendo', 'Nada'], 'Convención de Unix.', 1],
    ['Un servidor falla con EMFILE. ¿Qué indica?', 'Que se agotaron los descriptores de archivo por no cerrar archivos o conexiones', ['Que el disco está lleno', 'Que falta memoria RAM', 'Que el puerto está ocupado'], 'Too many open files.', 3],
    ['¿Por qué procesar un archivo de 4 GB con flujos?', 'Porque se procesa por trozos con memoria constante en lugar de cargarlo entero', ['Porque es más corto de escribir', 'Porque comprime solo', 'Porque evita el disco'], 'Streams.', 2],
    ['¿Qué error indica que otro proceso ya usa el puerto?', 'EADDRINUSE', ['ECONNREFUSED', 'ETIMEDOUT', 'ECONNRESET'], 'Dirección en uso.', 2],
    ['¿Cómo se escribe un archivo de configuración para que nunca quede a medio escribir?', 'Escribiendo a un archivo temporal en la misma carpeta y renombrándolo sobre el original', ['Escribiendo más rápido', 'Usando appendFile', 'Abriéndolo dos veces'], 'El renombrado es atómico.', 4],
    { tf: 'Un proceso puede atrapar SIGKILL para cerrar ordenadamente.', v: false, e: 'SIGKILL no se puede atrapar; por eso hay que reaccionar a SIGTERM.', l: 2 },
    { tf: 'Escuchar en 127.0.0.1 deja un servicio accesible solo desde la propia máquina.', v: true, e: '0.0.0.0 lo expone a todas las interfaces.', l: 2 },
    { c: 'Escribe «argumentosSeguros(placa)»: devuelve la lista de argumentos ["buscar", placa] solo si la placa cumple ABC-123; si no, null (nunca se arma un texto para la terminal).', f: 'argumentosSeguros', p: ['placa'], t: [[['ABC-123'], ['buscar', 'ABC-123']], [['ABC; rm -rf /'], null]], sol: '  return /^[A-Z0-9]{3}-\\d{3}$/.test(placa) ? [\'buscar\', placa] : null;', l: 2 },
    { c: 'Escribe «trozos(texto, tam)»: divide el texto en trozos de tamaño tam (el último puede ser menor), como haría un flujo.', f: 'trozos', p: ['texto', 'tam'], t: [[['abcdefg', 3], ['abc', 'def', 'g']], [['', 4], []], [['ab', 5], ['ab']]], sol: '  const r = [];\n  for (let i = 0; i < texto.length; i += tam) r.push(texto.slice(i, i + tam));\n  return r;', l: 1 },
    { c: 'Escribe «estadoCierre(enCurso, segundos, limite)»: devuelve "listo" si no hay peticiones en curso, "esperando" si hay y no se superó el límite, y "forzado" si se superó.', f: 'estadoCierre', p: ['enCurso', 'segundos', 'limite'], t: [[[0, 3, 25], 'listo'], [[4, 10, 25], 'esperando'], [[2, 26, 25], 'forzado']], sol: '  if (enCurso === 0) return \'listo\';\n  return segundos > limite ? \'forzado\' : \'esperando\';', l: 2 }
  ],
  gen: function (g) {
    var se = [['El usuario presiona Ctrl+C', 'SIGINT'], ['La plataforma pide detener el proceso en un despliegue', 'SIGTERM'], ['Terminación forzada que no se puede atrapar', 'SIGKILL'], ['Se cerró la terminal o se pide recargar la configuración', 'SIGHUP']];
    se.forEach(function (s) { g.mcq(2, '¿Qué señal corresponde? ' + s[0], s[1], ['SIGINT', 'SIGTERM', 'SIGKILL', 'SIGHUP'].filter(function (x) { return x !== s[1]; }), 'Señales de Unix.'); });
    var er = [['Otro proceso ya escucha en el puerto 3000', 'EADDRINUSE'], ['Nadie escucha en el puerto del destino', 'ECONNREFUSED'], ['El otro lado cortó la conexión', 'ECONNRESET'], ['No hubo respuesta a tiempo', 'ETIMEDOUT'], ['Demasiados archivos abiertos', 'EMFILE']];
    er.forEach(function (e) { g.mcq(2, '¿Qué código de error del sistema aparece? ' + e[0], e[1], ['EADDRINUSE', 'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'EMFILE'].filter(function (x) { return x !== e[1]; }).slice(0, 3), 'Errores de sistema.'); });
    g.times(5, function (R) { var gb = R.int(1, 8), mb = R.pick([16, 32, 64]); g.input(2, 'Un flujo procesa un archivo de ' + gb + ' GB en trozos de ' + mb + ' MB. ¿Cuántos trozos son? (1 GB = 1024 MB)', gb * 1024 / mb, 'Tamaño total entre tamaño del trozo.'); });
  },
  checks: [
    ['¿Cómo se ejecuta otro programa de forma segura desde el código?', 'Con spawn o execFile y los argumentos en lista, validando las entradas y revisando el código de salida.'],
    ['Explica las señales SIGTERM y SIGKILL y qué es un cierre ordenado.', 'SIGTERM pide terminar y se puede atrapar; SIGKILL fuerza la muerte; el cierre ordenado deja de aceptar trabajo, termina el que está en curso y libera recursos antes del plazo.'],
    ['¿Qué son los descriptores de archivo y qué cuidados requieren los archivos?', 'Números que identifican recursos abiertos, con un límite por proceso; cerrar todo, escribir de forma atómica, rutas portables y permisos mínimos.'],
    ['¿Qué son los flujos y la contrapresión, y qué indican los errores de sockets más comunes?', 'Procesamiento por trozos con pausas cuando el destino es lento; EADDRINUSE puerto ocupado, ECONNREFUSED nadie escucha, ECONNRESET corte y ETIMEDOUT sin respuesta.']
  ],
  cites: ['Ritchie, D. y Thompson, K. (1974). The UNIX Time-Sharing System. *Communications of the ACM*, 17(7).', 'Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press.', 'Stevens, W. R. y Rago, S. (2013). *Advanced Programming in the UNIX Environment* (3.ª ed.). Addison-Wesley.', 'Leffler, S., Fabry, R. y Joy, W. (1983). A 4.2BSD Interprocess Communication Primer. University of California, Berkeley.', 'Baumann, A., Appavoo, J., Krieger, O. y Roscoe, T. (2019). A fork() in the road. *HotOS 2019*.'],
  project: { t: 'Un servicio que se porta bien',
    goal: 'Escribir un servicio que use procesos, señales, archivos y flujos correctamente.',
    steps: ['Escribe un servidor HTTP con cierre ordenado ante SIGTERM y SIGINT, con un plazo límite y una ruta de salud que responda 503 durante el cierre.', 'Agrega una tarea que ejecute un programa externo con spawn, procese su salida como flujo y verifique el código de salida.', 'Implementa la escritura atómica de un archivo de configuración y pruébala matando el proceso a mitad de la escritura.', 'Procesa un archivo grande (genera uno de 1 GB) con pipeline y mide el uso de memoria frente a leerlo entero.', 'Provoca y documenta los errores EADDRINUSE, ECONNREFUSED y EMFILE, y cómo se resuelve cada uno.'],
    deliver: 'El código del servicio, las mediciones y el documento de errores.' },
  hito: ['Implementa el cierre ordenado de la API de PatioApp con plazo límite y la ruta de salud durante el cierre.', 'Reescribe el script de respaldo de PatioApp con spawn, argumentos en lista y verificación del código de salida.']
});
SDC.after('m8.sys', 'm8.conc');
})();
