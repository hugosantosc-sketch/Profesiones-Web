(function () {
var S = SDC.S;

S('m3', 'm3.io', { title: 'Entrada, salida y archivos',
  ask: '¿Qué concepto de entrada, salida o archivos se aplica?',
  lesson: `
> **La idea en simple.** Un programa que no recibe datos ni muestra resultados es como una calculadora sin teclas ni pantalla: puede calcular, pero no sirve a nadie. Los programas reales leen datos de algún lado (el teclado, un archivo, internet, una base de datos) y escriben resultados en otro. Esta unidad muestra cómo hacerlo bien y qué puede salir mal en ese camino.

## Entrada y salida estándar
Todo programa que corre en una terminal recibe tres canales del sistema operativo:
- **Entrada estándar** (*stdin*): por defecto, lo que se escribe con el teclado.
- **Salida estándar** (*stdout*): por defecto, la pantalla. Es donde va el resultado normal.
- **Salida de error** (*stderr*): también la pantalla, pero separada, para mensajes de error y diagnósticos.
Separar la salida normal de la de errores permite redirigirlas por separado: «programa > resultado.txt» guarda solo el resultado y deja los errores en la pantalla. En la filosofía Unix, los programas pequeños se encadenan con tuberías: «cat estadias.csv | grep camion | wc -l» cuenta cuántas líneas mencionan camiones, pasando la salida de cada programa como entrada del siguiente. En Node.js, «console.log» escribe en stdout, «console.error» en stderr, y «process.stdin» permite leer la entrada.

## Archivos: abrir, leer, escribir, cerrar
Un archivo es una secuencia de bytes con un nombre, guardada por el sistema operativo. Para usarlo, el programa:
1. **Abre** el archivo (el sistema operativo verifica que exista y que haya permiso).
2. **Lee** o **escribe** bytes.
3. **Cierra** el archivo, liberando el recurso y asegurando que lo escrito se guarde.
Muchas bibliotecas resumen los tres pasos en una sola llamada. En Node.js:
~~~js
const fs = require('fs');
fs.writeFileSync('salidas.txt', 'ABC-123,2026-11-13,20\\n');          // crear o reemplazar
fs.appendFileSync('salidas.txt', 'XYZ-987,2026-11-13,45\\n');         // agregar al final
const texto = fs.readFileSync('salidas.txt', 'utf8');                // leer todo como texto UTF-8
const lineas = texto.trim().split('\\n');
console.log(lineas.length, 'salidas registradas');
~~~
Dos detalles importantes:
- **Texto y codificación:** un archivo guarda bytes; para leerlo como texto hay que indicar la **codificación** (casi siempre UTF-8). Si se lee con la equivocada aparecen caracteres extraños, como viste en la representación de datos.
- **Saltos de línea:** Linux y macOS usan «\\n»; Windows usa «\\r\\n». Un programa que separa líneas solo por «\\n» dejará un «\\r» invisible al final de cada línea de un archivo creado en Windows, y luego «'camion\\r' === 'camion'» será falso. Conviene limpiar con «trim» o separar con una expresión regular que acepte ambos.

## Lectura síncrona y asíncrona
Leer un archivo o una página web tarda (desde microsegundos hasta segundos). Hay dos estilos:
- **Síncrono** («readFileSync»): el programa **espera** hasta que termina. Es simple y está bien en scripts y herramientas de línea de comandos.
- **Asíncrono** («await fs.promises.readFile(...)»): el programa pide la lectura y **sigue con otras cosas**; cuando los datos llegan, continúa donde quedó. Es imprescindible en servidores, porque mientras un usuario espera un archivo, el servidor puede atender a otros. Lo verás a fondo con JavaScript asíncrono.

## Formatos de datos
Para que otros programas (o tú mismo, mañana) entiendan lo que guardas, se usan formatos estándar:
- **CSV** (valores separados por comas): una tabla en texto, una fila por línea. Es universal (Excel, hojas de cálculo, bases de datos), pero engañosamente difícil: ¿qué pasa si un valor contiene una coma o un salto de línea? Va entre comillas, y las comillas internas se duplican (la norma informal es la RFC 4180, de 2005). En el Perú y otros países donde la coma es separador decimal, Excel suele usar **punto y coma**. Por eso no conviene separar CSV "a mano" con «split(',')» en datos reales: mejor una biblioteca.
- **JSON**: estructuras anidadas de objetos, listas, textos, números, booleanos y null. Es el formato estándar de las APIs web. «JSON.stringify» convierte un valor en texto y «JSON.parse» hace lo contrario; «JSON.parse» lanza un error si el texto no es JSON válido.
- Otros: **XML** (más antiguo, aún usado en la facturación electrónica de la SUNAT), **YAML** (configuraciones), formatos binarios como **Parquet** para grandes volúmenes de datos.

## Validar lo que entra
Todo lo que viene de fuera del programa puede estar mal: un archivo incompleto, un campo vacío, un número escrito como "veinte", una fecha inválida, o datos maliciosos. La regla de oro es **no confiar en la entrada**:
- Verificar que existe lo que se espera (columnas, campos) y que tiene el tipo y el rango correctos.
- Decidir qué hacer con lo inválido: rechazar todo el archivo, saltar la fila y anotarla en un reporte de errores, o corregir con una regla explícita.
- Nunca usar la entrada para construir comandos o consultas sin protección (la inyección que verás en Seguridad).
~~~js
// Leer un CSV sencillo de estadías y separar filas válidas e inválidas
const csv = 'placa,dias,monto\\nABC-123,3,60\\nXYZ-987,dos,45\\n,1,20\\nJKL-555,2,40';
const [cabecera, ...filas] = csv.split(/\\r?\\n/);
const columnas = cabecera.split(',');
const validas = [], errores = [];
filas.forEach((linea, i) => {
  const valores = linea.split(',');
  const fila = Object.fromEntries(columnas.map((c, j) => [c, valores[j]]));
  const dias = Number(fila.dias);
  if (!fila.placa) errores.push('fila ' + (i + 2) + ': falta la placa');
  else if (!Number.isInteger(dias) || dias < 0) errores.push('fila ' + (i + 2) + ': días inválidos "' + fila.dias + '"');
  else validas.push({ placa: fila.placa, dias, monto: Number(fila.monto) });
});
console.log(validas.length, 'válidas;', errores);
~~~

## Leer de internet
Hoy muchos datos no están en archivos locales sino en servicios web. En JavaScript, «fetch» pide una URL y devuelve una promesa con la respuesta: «const r = await fetch(url); const datos = await r.json();». Los mismos principios valen: la respuesta puede tardar, puede fallar (sin conexión, servidor caído, error 500) y puede traer datos inesperados, así que se verifica «r.ok», se pone un tiempo de espera y se validan los datos antes de usarlos. Una API es, en el fondo, un archivo que vive en otra computadora.

## Errores al leer y escribir
Las operaciones de entrada y salida fallan por razones que el programa no controla: el archivo no existe, no hay permiso, el disco está lleno, la red se cortó. En JavaScript, estas fallas **lanzan excepciones**, y un programa robusto las atrapa con «try» y «catch» para mostrar un mensaje claro en lugar de terminar con un error incomprensible:
~~~js
try {
  const datos = JSON.parse(require('fs').readFileSync('config.json', 'utf8'));
  console.log('sede configurada:', datos.sede);
} catch (e) {
  if (e.code === 'ENOENT') console.error('No se encontró config.json; crea uno a partir de config.ejemplo.json');
  else console.error('config.json no es válido:', e.message);
}
~~~
Un detalle profesional: al escribir un archivo importante, conviene escribir primero en un archivo temporal y luego **renombrarlo** sobre el original; así, si el programa se corta a la mitad, el archivo original no queda dañado (el renombrado es atómico en la mayoría de los sistemas de archivos).

## Ejemplo resuelto: importar las estadías de la hoja de cálculo
La sede de Ate llevaba sus estadías en Excel y hay que importarlas a PatioApp.
1. **Exportar** la hoja como CSV UTF-8 (en Excel, "CSV UTF-8 (delimitado por comas)"), porque el CSV normal de Excel en Windows usa otra codificación y punto y coma.
2. **Leer** con una biblioteca de CSV que maneje comillas y saltos de línea dentro de los campos.
3. **Validar** cada fila: placa con formato válido, fecha de ingreso en formato reconocible, monto numérico. Las fechas venían como «13/11/2026»; se convierten a ISO «2026-11-13» indicando explícitamente el formato día/mes/año (adivinar el formato confundiría el 03/04 entre marzo y abril).
4. **Reporte:** de 1240 filas, 1198 válidas y 42 con errores (placas vacías, montos con la palabra "pendiente"). Las 42 se escriben en un archivo de errores con el número de fila y el motivo, para que la sede las corrija.
5. **Escritura segura:** las válidas se insertan en la base de datos en una sola transacción: o entran todas, o ninguna, para no dejar una importación a medias.`,
  links: [['m3.arr', 'los datos leídos se procesan con listas y objetos'], ['m7.cli', 'las tuberías y redirecciones son parte de la línea de comandos'], ['m9.async', 'la lectura asíncrona se estudia con JavaScript asíncrono']],
  read: 'Haverbeke, *Eloquent JavaScript* (4.ª ed., 2024), capítulos 10 y 20; Shafranovich, RFC 4180 (2005); documentación del módulo fs de Node.js.',
  terms: [
    ['Entrada estándar', 'canal por el que un programa recibe datos, por defecto el teclado', ['stdin.', 'process.stdin en Node.', 'Se puede redirigir desde un archivo.']],
    ['Salida de error', 'canal separado para mensajes de error y diagnóstico', ['stderr.', 'console.error.', 'No se mezcla con el resultado.']],
    ['Tubería', 'conexión de la salida de un programa con la entrada de otro', ['cat | grep | wc.', 'Filosofía Unix.', 'Encadena herramientas.']],
    ['Codificación', 'regla que traduce bytes en caracteres de texto', ['UTF-8.', 'Hay que indicarla al leer.', 'Si se equivoca, aparecen caracteres raros.']],
    ['CSV', 'formato de tabla en texto con una fila por línea y valores separados por comas', ['RFC 4180.', 'Comillas para comas internas.', 'Excel peruano usa punto y coma.']],
    ['JSON', 'formato de texto para estructuras anidadas de objetos, listas y valores', ['JSON.parse y JSON.stringify.', 'Estándar de las APIs.', 'Falla con texto inválido.']],
    ['Lectura asíncrona', 'lectura en la que el programa sigue con otras tareas mientras espera los datos', ['await fs.promises.readFile.', 'Imprescindible en servidores.', 'Se opone a la síncrona.']],
    ['Escritura atómica', 'técnica de escribir en un archivo temporal y renombrarlo sobre el original', ['No deja archivos a medias.', 'El renombrado es atómico.', 'Protege la configuración.']]
  ],
  q: [
    ['¿Por qué separar la salida estándar de la salida de error?', 'Para poder redirigir el resultado sin mezclarlo con los mensajes de error', ['Porque la de error es más rápida', 'Porque es obligatorio en JavaScript', 'No hay diferencia'], 'programa > resultado.txt deja los errores en pantalla.', 2],
    ['Un archivo creado en Windows tiene un \\r invisible al final de cada línea. ¿Qué conviene hacer?', 'Separar las líneas con una expresión que acepte \\r\\n o limpiar con trim', ['Ignorarlo', 'Borrar el archivo', 'Convertirlo a mayúsculas'], 'Windows usa \\r\\n.', 3],
    ['¿Por qué no conviene separar un CSV real con split(",")?', 'Porque los valores pueden contener comas o saltos de línea entre comillas', ['Porque split no existe', 'Porque los CSV no tienen comas', 'Porque es lento'], 'Mejor una biblioteca.', 2],
    ['¿Qué pasa con JSON.parse si el texto no es JSON válido?', 'Lanza un error', ['Devuelve null', 'Devuelve el texto', 'Lo corrige solo'], 'Se atrapa con try y catch.', 2],
    ['¿Por qué un servidor debe leer archivos de forma asíncrona?', 'Para seguir atendiendo a otros usuarios mientras espera', ['Porque es más corto de escribir', 'Porque los archivos son asíncronos', 'No debe'], 'La espera no bloquea al resto.', 3],
    ['Una fecha viene como 03/04/2026. ¿Qué conviene hacer al importarla?', 'Convertirla indicando explícitamente el formato día/mes/año', ['Dejar que el programa adivine', 'Guardarla como texto sin cambiar', 'Descartarla'], 'Adivinar confunde marzo con abril.', 3],
    ['¿Para qué sirve escribir en un archivo temporal y luego renombrarlo?', 'Para que un corte a la mitad no deje dañado el archivo original', ['Para que ocupe menos espacio', 'Para cifrarlo', 'Por estética'], 'El renombrado es atómico.', 4],
    { tf: 'Todo lo que entra al programa desde fuera debe validarse.', v: true, e: 'Puede estar incompleto, mal escrito o ser malicioso.', l: 1 },
    { tf: 'Si un archivo se lee con la codificación equivocada, el programa siempre falla con un error.', v: false, e: 'Muchas veces no falla: muestra caracteres extraños en silencio.', l: 2 },
    { c: 'Escribe «parsearLineas(texto)»: separa un texto en líneas aceptando \\n y \\r\\n, y descarta las vacías.', f: 'parsearLineas', p: ['texto'], t: [[['a\r\nb\n\nc'], ['a', 'b', 'c']], [[''], []]], sol: '  return texto.split(/\\r?\\n/).filter(l => l.length > 0);', l: 2 },
    { c: 'Escribe «csvAObjetos(texto)»: la primera línea es la cabecera; devuelve una lista de objetos con esas claves (sin comillas ni comas internas).', f: 'csvAObjetos', p: ['texto'], t: [[['placa,dias\nABC-123,3\nXYZ-987,1'], [{ placa: 'ABC-123', dias: '3' }, { placa: 'XYZ-987', dias: '1' }]], [['a,b'], []]], sol: '  const [cab, ...filas] = texto.split(/\\r?\\n/).filter(Boolean);\n  const c = cab.split(",");\n  return filas.map(f => { const v = f.split(","); return Object.fromEntries(c.map((k, i) => [k, v[i]])); });', l: 3 },
    { c: 'Escribe «jsonSeguro(texto, porDefecto)»: devuelve el resultado de JSON.parse, o porDefecto si el texto no es JSON válido.', f: 'jsonSeguro', p: ['texto', 'porDefecto'], t: [[['{"sede":"Ate"}', null], { sede: 'Ate' }], [['{sede:Ate}', {}], {}], [['42', 0], 42]], sol: '  try { return JSON.parse(texto); } catch (e) { return porDefecto; }', l: 2 }
  ],
  gen: function (g) {
    var ca = [['El resultado de un reporte que se quiere guardar en un archivo', 'Salida estándar'], ['Un aviso de que una fila del CSV es inválida', 'Salida de error'], ['Los datos que el usuario escribe con el teclado', 'Entrada estándar']];
    ca.forEach(function (c) { g.mcq(1, '¿Por qué canal debe ir esto? ' + c[0], c[1], ['Entrada estándar', 'Salida estándar', 'Salida de error', 'Ninguno'].filter(function (x) { return x !== c[1]; }), 'stdin, stdout y stderr.'); });
    var fo = [['Una tabla de estadías para abrir en Excel', 'CSV'], ['La respuesta de una API web con objetos anidados', 'JSON'], ['Un comprobante electrónico para la SUNAT', 'XML'], ['El archivo de configuración de un pipeline', 'YAML'], ['Miles de millones de filas para análisis', 'Parquet']];
    fo.forEach(function (f) { g.mcq(2, '¿Qué formato es el más habitual para esto? ' + f[0], f[1], ['CSV', 'JSON', 'XML', 'YAML', 'Parquet'].filter(function (x) { return x !== f[1]; }).slice(0, 3), 'Formatos de datos.'); });
    var er = [['ENOENT', 'El archivo no existe'], ['EACCES', 'No hay permiso'], ['ENOSPC', 'No hay espacio en el disco'], ['SyntaxError en JSON.parse', 'El texto no es JSON válido']];
    er.forEach(function (e) { g.mcq(3, '¿Qué significa el error ' + e[0] + '?', e[1], ['El archivo no existe', 'No hay permiso', 'No hay espacio en el disco', 'El texto no es JSON válido'].filter(function (x) { return x !== e[1]; }), 'Errores frecuentes de entrada y salida.'); });
  },
  checks: [
    ['¿Para qué sirven stdin, stdout y stderr?', 'Para recibir datos, entregar el resultado normal y reportar errores por separado, lo que permite redirigir y encadenar programas.'],
    ['¿Qué problemas aparecen al leer archivos de texto de distintas fuentes?', 'Codificaciones distintas, saltos de línea \\r\\n frente a \\n, separadores distintos en CSV y formatos de fecha ambiguos.'],
    ['¿Cómo validarías un CSV antes de importarlo?', 'Verificando columnas, tipos y rangos de cada fila, separando las válidas de las inválidas con un reporte de errores.'],
    ['¿Por qué conviene la escritura atómica en archivos importantes?', 'Porque si el programa se corta, el archivo original queda intacto.']
  ],
  cites: ['Haverbeke, M. (2024). *Eloquent JavaScript* (4.ª ed.). No Starch Press.', 'Shafranovich, Y. (2005). *Common Format and MIME Type for Comma-Separated Values (CSV) Files*. RFC 4180.', 'Bray, T. (ed.) (2017). *The JavaScript Object Notation (JSON) Data Interchange Format*. RFC 8259.', 'Kernighan, B. y Pike, R. (1984). *The UNIX Programming Environment*. Prentice Hall.', 'OpenJS Foundation. *Node.js Documentation: File system*. nodejs.org.'],
  project: { t: 'Un importador robusto',
    goal: 'Escribir un programa que importe datos de un archivo validando todo lo que entra.',
    steps: ['Prepara un CSV con datos reales o inventados que incluya errores a propósito (campos vacíos, números mal escritos, fechas ambiguas, comas dentro de comillas).', 'Escribe un programa que lo lea con la codificación correcta y maneje \\n y \\r\\n.', 'Valida cada fila y separa las válidas de las inválidas, escribiendo un reporte de errores con número de fila y motivo.', 'Guarda las válidas en un archivo JSON con escritura atómica.', 'Maneja con mensajes claros los errores de archivo inexistente y de JSON inválido.'],
    deliver: 'El programa, los archivos de prueba, el reporte de errores y el JSON generado.' },
  hito: ['Escribe el importador de estadías desde Excel para PatioApp con validación por fila y reporte de errores.', 'Haz que la importación de PatioApp sea todo o nada, en una transacción, y que la configuración se escriba de forma atómica.']
});
SDC.after('m3.io', 'm3.arr');

S('m3', 'm3.mods', { title: 'Módulos, paquetes y bibliotecas',
  ask: '¿Qué concepto de módulos o paquetes se aplica?',
  lesson: `
> **La idea en simple.** Nadie construye una casa fabricando sus propios ladrillos, tuberías y enchufes: se usan piezas hechas por otros, que encajan según medidas estándar. En programación pasa lo mismo: el código se organiza en **módulos** (tus propias piezas, separadas en archivos) y se usan **paquetes** (piezas hechas por otros, publicadas para que cualquiera las use). Saber organizar tu código y elegir bien las piezas ajenas es tan importante como saber escribir un bucle.

## Por qué dividir en módulos
Un programa de 50 líneas cabe en un archivo; uno de 5000, no. Dividir en **módulos** (archivos con una responsabilidad clara que exponen solo lo necesario) permite:
- **Encontrar** las cosas: el cálculo de tarifas está en «tarifas.js», no perdido entre 5000 líneas.
- **Esconder detalles:** cada módulo decide qué exporta; lo demás es privado, y se puede cambiar sin romper a nadie.
- **Evitar choques de nombres:** dos módulos pueden tener una función «formatear» cada uno sin conflicto.
- **Reutilizar y probar** cada parte por separado.
Es la ocultación de información de Parnas que verás en Construcción, aplicada desde el primer día.

## Módulos en JavaScript
JavaScript tuvo durante años dos sistemas de módulos, y conviene reconocer ambos:
- **CommonJS** (el de Node.js desde 2009): «module.exports = { calcularTarifa }» para exportar y «const { calcularTarifa } = require('./tarifas')» para importar.
- **Módulos ES** (ESM, estándar del lenguaje desde 2015, en navegadores y en Node.js moderno): «export function calcularTarifa(...)» y «import { calcularTarifa } from './tarifas.js'». Es el estándar actual.
~~~js
// tarifas.js
export const TARIFA_DIARIA = 20;
export function calcularTarifa(dias, convenio = false) {
  const base = dias * TARIFA_DIARIA;
  return convenio ? redondear(base * 0.75) : base;
}
function redondear(x) { return Math.round(x * 100) / 100; }    // no se exporta: es privada del módulo

// reporte.js
import { calcularTarifa } from './tarifas.js';
console.log(calcularTarifa(3, true));                          // 45
~~~
Reglas prácticas: un módulo por idea, nombres de archivo que digan lo que contienen, exportar lo mínimo, y evitar las **dependencias circulares** (A importa B y B importa A), que producen errores difíciles de entender en tiempo de carga.

## Paquetes y gestores de paquetes
Un **paquete** es código empaquetado para ser compartido, con un nombre, una versión y la lista de lo que necesita. Un **gestor de paquetes** los descarga, instala y actualiza. Cada ecosistema tiene el suyo: **npm** para JavaScript (creado por Isaac Schlueter en 2010, hoy el registro de paquetes más grande del mundo, con millones de paquetes), **pip** y PyPI para Python, **Maven** para Java, **Cargo** para Rust, **Composer** para PHP.

En un proyecto de Node.js, el archivo «package.json» describe el proyecto y sus dependencias:
~~~txt
{
  "name": "patioapp-api",
  "version": "1.4.0",
  "scripts": { "start": "node src/servidor.js", "test": "node --test" },
  "dependencies": { "express": "^4.19.2", "date-fns": "^3.6.0" },
  "devDependencies": { "eslint": "^9.5.0" }
}
~~~
- «npm install» descarga las dependencias en la carpeta «node_modules» (que **no** se sube al repositorio; se recrea con «npm install»).
- Las **dependencias** se necesitan para ejecutar; las **dependencias de desarrollo**, solo para trabajar (pruebas, linters).
- Los **scripts** dan nombres cortos a comandos frecuentes: «npm test», «npm start».
- El archivo **package-lock.json** registra la versión **exacta** instalada de cada paquete (incluidas las dependencias de las dependencias), para que todos los del equipo y el servidor instalen exactamente lo mismo. Ese archivo **sí** se sube al repositorio.

## Versiones y rangos
Las versiones siguen el **versionado semántico** MAYOR.MENOR.PARCHE (que verás a fondo en Construcción): un cambio de MAYOR puede romper el código que usa el paquete. En «package.json», los rangos indican qué actualizaciones se aceptan:
| Rango | Acepta | Ejemplo con 4.19.2 |
| ^4.19.2 | cambios menores y parches | 4.19.3, 4.20.0, pero no 5.0.0 |
| ~4.19.2 | solo parches | 4.19.3, pero no 4.20.0 |
| 4.19.2 | solo esa versión | 4.19.2 |
El acento circunflejo es el valor por defecto en npm y confía en que el autor respeta el versionado semántico; el archivo de bloqueo es lo que garantiza que no haya sorpresas entre una instalación y otra.

## Elegir una dependencia
Cada paquete que agregas es código ajeno que corre con todos los permisos de tu programa, que puede tener errores o vulnerabilidades, y que puede dejar de mantenerse. Antes de agregar uno, conviene preguntarse:
- **¿Lo necesito?** Si son 10 líneas que puedo escribir y entender, quizás no. En 2016, la eliminación del paquete «left-pad» (11 líneas) rompió miles de proyectos que dependían de él sin saberlo.
- **¿Está mantenido?** Fecha de la última versión, problemas abiertos, cuántas personas lo mantienen.
- **¿Es confiable y popular?** Descargas semanales, uso en proyectos conocidos.
- **¿Qué licencia tiene?** MIT, Apache y BSD permiten casi cualquier uso; GPL tiene condiciones que hay que entender, como verás en La profesión.
- **¿Cuántas dependencias trae?** Un paquete pequeño que instala 200 dependencias multiplica los riesgos.
Y una vez agregadas: actualizarlas con frecuencia y revisar los avisos de seguridad («npm audit»), como verás en Seguridad de la cadena de suministro.

## Ámbito del módulo y efectos al importar
Un detalle que confunde al empezar: **importar un módulo ejecuta su código** una vez, la primera vez que se importa. Si un módulo, además de definir funciones, imprime algo, abre una conexión o modifica una variable global al cargarse, ese efecto ocurre en cuanto alguien lo importa, aunque no use nada. Por eso conviene que los módulos solo **definan** cosas (funciones, constantes, clases) y que los efectos ocurran cuando se llama explícitamente a una función («iniciarServidor()»). Así, importar un módulo para probarlo no arranca un servidor por accidente.

## Monorepos y paquetes internos
Cuando una organización tiene varios proyectos que comparten código (la API, la app móvil y el panel de administración de PatioApp usan el mismo cálculo de tarifas), puede publicar ese código como un **paquete interno** en un registro privado, o mantener todos los proyectos en un solo repositorio (**monorepo**) con herramientas que gestionan varios paquetes a la vez (los *workspaces* de npm, pnpm o Yarn). Google y Meta mantienen enormes monorepos; muchos equipos pequeños prefieren repositorios separados. Ambos enfoques funcionan si los límites entre paquetes son claros.

Lo que no funciona es copiar y pegar el mismo código en cada proyecto: al corregir un error en una copia, las demás siguen con él.

## La biblioteca estándar primero
Antes de buscar un paquete, conviene revisar lo que ya trae el lenguaje o la plataforma: JavaScript moderno incluye «fetch» para pedir datos por la red, «structuredClone» para copiar objetos, «Intl» para formatear fechas, números y monedas según el país, y Node.js trae módulos para archivos, rutas, criptografía y hasta un ejecutor de pruebas («node --test»). Python es famoso por su lema de "baterías incluidas". Cada dependencia que no agregas es una que no tendrás que actualizar ni vigilar.
~~~js
// Formatear dinero y fechas para el Perú sin ninguna dependencia
const soles = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });
const fecha = new Intl.DateTimeFormat('es-PE', { dateStyle: 'long', timeZone: 'America/Lima' });
console.log(soles.format(1234.5), '·', fecha.format(new Date('2026-11-13T15:00:00Z')));
~~~

## Ejemplo resuelto: organizar el primer proyecto de PatioApp
El prototipo de PatioApp creció a un solo archivo de 900 líneas. Se reorganiza:
1. **Módulos por responsabilidad:** «src/tarifas.js» (cálculo), «src/estadias.js» (reglas de ingreso y salida), «src/almacen.js» (lectura y escritura de datos), «src/formato.js» (mostrar montos y fechas), «src/servidor.js» (la API). Cada uno exporta solo lo que usan los demás.
2. **Sin ciclos:** «tarifas» no importa nada del proyecto; «estadias» importa «tarifas»; «servidor» importa todo. El grafo de dependencias va en una sola dirección.
3. **Dependencias:** se elimina «moment» (grande y en modo mantenimiento) porque «Intl» y unas pocas funciones propias alcanzan; se mantiene «express» para el servidor web.
4. **package.json** con scripts «start», «test» y «lint», y package-lock.json subido al repositorio.
5. **Resultado:** cualquier persona nueva clona el repositorio, ejecuta «npm install» y «npm test», y en dos minutos tiene el proyecto funcionando con exactamente las mismas versiones.`,
  links: [['m6.design', 'el diseño de módulos e interfaces se estudia a fondo en Construcción'], ['m16.supply', 'las dependencias son parte de la cadena de suministro'], ['m7.git', 'el archivo de bloqueo se versiona con Git']],
  read: 'Haverbeke, *Eloquent JavaScript* (4.ª ed.), capítulo 10; documentación de npm (docs.npmjs.com); semver.org.',
  terms: [
    ['Módulo', 'archivo con una responsabilidad clara que exporta solo lo necesario', ['tarifas.js.', 'Esconde detalles.', 'Evita choques de nombres.']],
    ['Módulos ES', 'sistema de módulos estándar de JavaScript con import y export', ['Desde 2015.', 'Navegadores y Node moderno.', 'Reemplaza a CommonJS.']],
    ['Paquete', 'código empaquetado con nombre, versión y dependencias para ser compartido', ['express.', 'Se publica en un registro.', 'Lo instala un gestor.']],
    ['Gestor de paquetes', 'herramienta que descarga, instala y actualiza paquetes', ['npm, pip, Maven, Cargo.', 'Resuelve dependencias.', 'Usa un registro.']],
    ['package.json', 'archivo que describe un proyecto de Node.js, sus dependencias y sus scripts', ['dependencies y devDependencies.', 'scripts.', 'Se versiona.']],
    ['Archivo de bloqueo', 'archivo que registra la versión exacta instalada de cada paquete', ['package-lock.json.', 'Instalaciones idénticas.', 'Se sube al repositorio.']],
    ['Rango de versiones', 'expresión que indica qué versiones de un paquete se aceptan', ['^4.19.2 acepta menores.', '~4.19.2 solo parches.', 'Basado en SemVer.']],
    ['Dependencia circular', 'situación en que dos módulos se importan mutuamente', ['A importa B y B importa A.', 'Errores al cargar.', 'Se rompe extrayendo lo común.']]
  ],
  q: [
    ['¿Qué carpeta no se sube al repositorio en un proyecto de Node.js?', 'node_modules', ['src', 'package.json', 'package-lock.json'], 'Se recrea con npm install.', 1],
    ['¿Qué archivo garantiza que todos instalen exactamente las mismas versiones?', 'package-lock.json', ['package.json', 'README.md', '.gitignore'], 'Registra versiones exactas.', 2],
    ['¿Qué versiones acepta el rango ^4.19.2?', '4.19.3 y 4.20.0, pero no 5.0.0', ['Solo 4.19.2', 'Cualquier versión', 'Solo 5.0.0'], 'Menores y parches.', 2],
    ['¿Qué diferencia hay entre dependencies y devDependencies?', 'Las primeras se necesitan para ejecutar; las segundas, solo para desarrollar', ['No hay diferencia', 'Las de desarrollo son más importantes', 'Las primeras son gratuitas'], 'ESLint es de desarrollo.', 2],
    ['¿Qué enseñó el caso left-pad en 2016?', 'Que depender de paquetes ajenos, incluso diminutos, tiene riesgos', ['Que npm no funciona', 'Que JavaScript es inseguro', 'Nada'], 'Su retiro rompió miles de proyectos.', 3],
    ['¿Qué problema producen las dependencias circulares entre módulos?', 'Errores difíciles de entender al cargar los módulos', ['Que el programa sea más rápido', 'Nada', 'Que no se pueda usar Git'], 'Se evitan con un grafo en una sola dirección.', 3],
    ['Antes de agregar un paquete para formatear fechas en español, ¿qué conviene revisar?', 'Si la biblioteca estándar (Intl) ya lo resuelve', ['El color del logo del paquete', 'Si el paquete tiene muchas dependencias, mejor', 'Nada'], 'Cada dependencia es un riesgo y un costo.', 3],
    { tf: 'Un paquete instalado corre con los mismos permisos que tu programa.', v: true, e: 'Por eso hay que elegirlo con cuidado.', l: 2 },
    { tf: 'El acento circunflejo en ^4.19.2 permite instalar la versión 5.0.0.', v: false, e: 'Solo cambios menores y parches dentro de la versión 4.', l: 2 },
    { c: 'Escribe «aceptaCircunflejo(rango, version)»: rango como "^4.19.2" y version como "4.20.0"; devuelve true si la versión tiene el mismo MAYOR y es mayor o igual al rango.', f: 'aceptaCircunflejo', p: ['rango', 'version'], t: [[['^4.19.2', '4.20.0'], true], [['^4.19.2', '5.0.0'], false], [['^4.19.2', '4.19.1'], false], [['^4.19.2', '4.19.2'], true]], sol: '  const [a, b, c] = rango.slice(1).split(".").map(Number), [x, y, z] = version.split(".").map(Number);\n  if (x !== a) return false;\n  return y > b || (y === b && z >= c);', l: 3 },
    { c: 'Escribe «sinCiclos(imports)»: imports es {modulo: [modulos que importa]}; devuelve true si no hay dos módulos que se importen mutuamente de forma directa.', f: 'sinCiclos', p: ['imports'], t: [[[{ servidor: ['tarifas', 'estadias'], estadias: ['tarifas'], tarifas: [] }], true], [[{ a: ['b'], b: ['a'] }], false]], sol: '  for (const m in imports) for (const d of imports[m]) if ((imports[d] || []).includes(m)) return false;\n  return true;', l: 2 },
    { c: 'Escribe «formatearSoles(monto)»: devuelve "S/ " seguido del monto con dos decimales (por ejemplo, "S/ 60.00").', f: 'formatearSoles', p: ['monto'], t: [[[60], 'S/ 60.00'], [[45.5], 'S/ 45.50'], [[0], 'S/ 0.00']], sol: '  return "S/ " + monto.toFixed(2);', l: 1 }
  ],
  gen: function (g) {
    var gp = [['JavaScript', 'npm'], ['Python', 'pip'], ['Java', 'Maven'], ['Rust', 'Cargo'], ['PHP', 'Composer']];
    gp.forEach(function (p) { g.mcq(1, '¿Cuál es un gestor de paquetes habitual de ' + p[0] + '?', p[1], ['npm', 'pip', 'Maven', 'Cargo', 'Composer'].filter(function (x) { return x !== p[1]; }).slice(0, 3), 'Cada ecosistema tiene el suyo.'); });
    var rg = [['^2.3.1', '2.9.0', 'Sí'], ['^2.3.1', '3.0.0', 'No'], ['~2.3.1', '2.3.9', 'Sí'], ['~2.3.1', '2.4.0', 'No'], ['2.3.1', '2.3.2', 'No'], ['^0.4.0', '0.4.5', 'Sí']];
    rg.forEach(function (r) { g.mcq(3, '¿El rango ' + r[0] + ' acepta la versión ' + r[1] + '?', r[2], [r[2] === 'Sí' ? 'No' : 'Sí', 'Solo con --force', 'Depende del sistema operativo'], '^ acepta menores y parches; ~ solo parches; sin símbolo, la versión exacta.'); });
    var dd = [['express, para el servidor web', 'dependencies'], ['eslint, para revisar el estilo', 'devDependencies'], ['el ejecutor de pruebas', 'devDependencies'], ['una biblioteca para generar comprobantes que usa la API', 'dependencies']];
    dd.forEach(function (d) { g.mcq(2, '¿Dónde va esta dependencia? ' + d[0], d[1], ['dependencies', 'devDependencies', 'scripts'].filter(function (x) { return x !== d[1]; }).concat(['node_modules']), 'Ejecutar contra desarrollar.'); });
  },
  checks: [
    ['¿Qué ventajas tiene dividir un programa en módulos?', 'Encontrar las cosas, esconder detalles, evitar choques de nombres y reutilizar y probar cada parte por separado.'],
    ['¿Para qué sirven package.json y package-lock.json?', 'El primero describe el proyecto, sus dependencias con rangos y sus scripts; el segundo fija las versiones exactas instaladas.'],
    ['¿Qué preguntas harías antes de agregar una dependencia?', 'Si la necesito, si está mantenida, si es confiable, qué licencia tiene y cuántas dependencias trae.'],
    ['¿Por qué conviene revisar la biblioteca estándar antes de buscar un paquete?', 'Porque cada dependencia que no se agrega es una que no hay que actualizar ni vigilar.']
  ],
  cites: ['Haverbeke, M. (2024). *Eloquent JavaScript* (4.ª ed.). No Starch Press.', 'Ecma International (2015). *ECMAScript 2015 Language Specification* (ECMA-262, 6.ª ed.).', 'npm, Inc. *npm Docs*. docs.npmjs.com.', 'Preston-Werner, T. *Semantic Versioning 2.0.0*. semver.org.', 'Abdalkareem, R. et al. (2017). Why Do Developers Use Trivial Packages? An Empirical Case Study on npm. *ESEC/FSE 2017*.'],
  project: { t: 'Organizar un proyecto en módulos con dependencias',
    goal: 'Convertir un programa de un solo archivo en un proyecto modular con dependencias gestionadas.',
    steps: ['Toma un programa propio de más de 200 líneas en un solo archivo.', 'Divídelo en módulos por responsabilidad con import y export, exportando lo mínimo.', 'Crea su package.json con scripts de inicio y de pruebas, y agrega como mucho una dependencia justificada.', 'Dibuja el grafo de dependencias entre tus módulos y verifica que no tenga ciclos.', 'Clona el proyecto en otra carpeta, ejecuta npm install y npm test, y verifica que funciona igual.'],
    deliver: 'El repositorio con el proyecto modular, el grafo de dependencias y la justificación de la dependencia elegida.' },
  hito: ['Reorganiza el prototipo de PatioApp en módulos por responsabilidad sin dependencias circulares.', 'Crea el package.json de PatioApp con scripts y el archivo de bloqueo, y reemplaza las dependencias innecesarias por la biblioteca estándar.']
});
SDC.after('m3.mods', 'm3.io');

S('m3', 'm3.debug', { title: 'Depurar y probar tus programas',
  ask: '¿Qué técnica de depuración o de prueba se aplica?',
  lesson: `
> **La idea en simple.** Todos los programadores escriben errores, incluidos los mejores del mundo. La diferencia está en lo que hacen después: un principiante cambia cosas al azar hasta que "funciona"; un profesional **investiga** con método y luego escribe una prueba para que el error no vuelva. Depurar y probar no es algo que se aprende después de programar: es parte de programar.

## El primer "bug"
En 1947, el equipo de la computadora Mark II de la Universidad de Harvard encontró una polilla atrapada en un relé que causaba fallas, y la pegó en el cuaderno de registro con la nota "primer caso real de un *bug* encontrado". La palabra *bug* (bicho) ya se usaba en ingeniería para los defectos (Thomas Edison la usaba en el siglo XIX), pero la anécdota, que Grace Hopper contaba a menudo, la hizo famosa en la computación. El cuaderno con la polilla se conserva en el Museo Nacional de Historia Estadounidense del Smithsonian.

## Tres tipos de errores
- **Errores de sintaxis:** el programa no está bien escrito según las reglas del lenguaje (falta un paréntesis, una coma). El lenguaje lo detecta antes de ejecutar y dice dónde. Son los más fáciles.
- **Errores de ejecución:** el programa está bien escrito pero falla al ejecutarse: leer una propiedad de «undefined», dividir algo inválido, un archivo que no existe. Aparecen como **excepciones** con un mensaje y una **traza de la pila**.
- **Errores de lógica:** el programa corre sin quejarse pero da un resultado **incorrecto**: una tarifa mal calculada, un bucle que se salta el último elemento. Son los más difíciles, porque nada avisa.

## Leer los mensajes de error
Un mensaje de error es información valiosa, no un regaño. Ejemplo:
~~~txt
TypeError: Cannot read properties of undefined (reading 'placa')
    at mostrarUnidad (/patio/src/reporte.js:14:22)
    at reporteDiario (/patio/src/reporte.js:31:5)
    at Object.<anonymous> (/patio/src/index.js:8:1)
~~~
Se lee así: el **tipo** de error (TypeError: se usó un valor de un tipo que no lo permite), el **mensaje** (se intentó leer «placa» de algo que es «undefined») y la **traza de la pila**, de lo más reciente a lo más antiguo: el error ocurrió en la línea 14, columna 22 de «reporte.js», dentro de «mostrarUnidad», que fue llamada desde la línea 31 dentro de «reporteDiario». La pregunta siguiente es: ¿por qué llegó «undefined» a «mostrarUnidad»? Probablemente la lista tenía menos elementos de los que el código suponía.

## Depurar con método
Andreas Zeller, en *Why Programs Fail* (2009), propone aplicar el **método científico**:
1. **Reproducir** el error de forma confiable, con la entrada mínima que lo provoca.
2. **Observar:** qué se esperaba y qué pasó realmente.
3. **Formular una hipótesis** sobre la causa ("el índice del bucle se pasa en uno").
4. **Predecir** qué se vería si la hipótesis fuera cierta, y **probar** (imprimir un valor, poner un punto de interrupción).
5. Si la hipótesis se confirma, **corregir**; si no, descartarla y formular otra.
6. **Verificar** que la corrección resuelve el problema y no rompe otra cosa, idealmente con una prueba automática.
Lo que no funciona: cambiar cosas al azar hasta que el síntoma desaparezca. A veces "funciona", pero sin entender por qué, y el error vuelve de otra forma.

## Herramientas
- **Imprimir valores** («console.log»): simple y útil, sobre todo con etiquetas claras («console.log('dias antes del cálculo:', dias)»). «console.table» muestra listas de objetos como tabla.
- **El depurador:** permite poner **puntos de interrupción** (el programa se detiene en una línea), ejecutar **paso a paso** (entrar a una función o pasar por encima), inspeccionar las variables y la pila de llamadas, y poner **puntos de interrupción condicionales** ("detente solo si placa === 'ABC-123'"). Lo tienen las herramientas de desarrollo del navegador (pestaña Sources) y los editores como Visual Studio Code (también para Node.js). La instrucción «debugger;» en el código detiene la ejecución ahí si el depurador está abierto.
- **El pato de goma:** explicarle el código, línea por línea, a alguien (o a un pato de juguete, como cuentan Andrew Hunt y David Thomas en *The Pragmatic Programmer*, 1999) obliga a decir en voz alta lo que uno supone, y muchas veces el error aparece a mitad de la explicación.
- **Buscar por bisección:** si algo funcionaba en una versión y no en otra, probar la versión del medio, y así sucesivamente; con Git, «git bisect» lo automatiza. Con 1000 cambios, bastan unos 10 pasos.

## Probar: comprobar que funciona y que sigue funcionando
Una **prueba automática** es un pequeño programa que ejecuta tu código con una entrada conocida y verifica que el resultado sea el esperado. Node.js trae un ejecutor de pruebas incorporado:
~~~js
// tarifas.test.js  — se ejecuta con: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularTarifa } from './tarifas.js';

test('una estadía de 3 días sin convenio cuesta 60', () => {
  assert.equal(calcularTarifa(3), 60);
});
test('con convenio se descuenta el 25 %', () => {
  assert.equal(calcularTarifa(4, true), 60);
});
test('cero días no cuesta nada', () => {
  assert.equal(calcularTarifa(0), 0);
});
~~~
Cada prueba tiene tres partes: **preparar** los datos, **ejecutar** el código y **verificar** el resultado. Qué probar:
- El **caso normal** ("3 días, 60 soles").
- Los **casos límite**: cero, uno, el máximo, la lista vacía, el texto vacío.
- Los **casos de error**: datos inválidos que deben rechazarse.
- Cada **error encontrado**: antes de corregirlo, escribir una prueba que lo reproduzca y falle; después de corregirlo, debe pasar. Así ese error nunca vuelve sin que nadie se entere (una **prueba de regresión**).
Las pruebas automáticas cambian la forma de trabajar: puedes modificar el código con confianza, porque si rompes algo, las pruebas te avisan en segundos. En el curso de Pruebas verás técnicas mucho más completas.

## Pruebas y depuración se complementan
Las pruebas encuentran que **hay** un error; la depuración encuentra **dónde** y **por qué**. Un buen hábito es que cada sesión de depuración termine con al menos una prueba nueva, de modo que el conocimiento ganado quede guardado en el proyecto y no solo en tu memoria.

Y cuando un error tarda mucho en encontrarse, vale la pena anotar al final qué lo hizo difícil (un mensaje poco claro, una función demasiado larga, falta de registros) y mejorar eso también: la próxima vez será más fácil.

## Errores frecuentes de principiante
| Síntoma | Causa típica |
| El bucle omite el último elemento o lee uno de más | condición «<=» en lugar de «<» (error de uno, *off-by-one*) |
| "Cannot read properties of undefined" | un índice fuera de la lista o una propiedad mal escrita |
| La suma da «"2010"» en lugar de 30 | se sumaron textos, no números; convertir con «Number» |
| El «if» siempre entra | se usó «=» (asignar) en lugar de «===» (comparar) |
| La función devuelve «undefined» | se olvidó el «return» |
| Cambiar una copia cambia el original | los objetos y listas se copian por referencia |

## Ejemplo resuelto: el reporte que perdía una estadía
El reporte diario de PatioApp muestra 41 salidas, pero el registro tiene 42.
1. **Reproducir:** con una lista de 3 estadías cerradas, el reporte cuenta 2. Error reproducido con la entrada mínima.
2. **Observar:** siempre falta la **última** estadía de la lista.
3. **Hipótesis:** el bucle termina un paso antes.
4. **Probar:** se lee el código: «for (let i = 0; i < estadias.length - 1; i++)». La condición omite el último índice. Confirmado.
5. **Prueba de regresión primero:** se escribe «test('cuenta todas las salidas', ...)» con 3 estadías esperando 3; falla.
6. **Corregir:** se reemplaza el bucle por «for (const e of estadias)», que no tiene índices que equivocar. La prueba pasa, y también todas las anteriores.
7. **Aprender:** el equipo agrega a su lista de revisión "preferir for...of o métodos de lista cuando no se necesita el índice".`,
  links: [['m3.loops', 'los errores de uno aparecen en los bucles con índices'], ['m6.errors', 'la depuración con método científico se profundiza en Construcción'], ['m14.unit', 'las pruebas unitarias y el TDD se estudian en Pruebas']],
  read: 'Zeller, *Why Programs Fail* (2.ª ed., 2009); Agans, *Debugging: The 9 Indispensable Rules* (2002); Hunt y Thomas, *The Pragmatic Programmer* (2.ª ed., 2019); documentación de node:test.',
  terms: [
    ['Error de sintaxis', 'error en la forma del código que el lenguaje detecta antes de ejecutar', ['Falta un paréntesis.', 'Indica la línea.', 'El más fácil de corregir.']],
    ['Error de lógica', 'error que no detiene el programa pero produce un resultado incorrecto', ['Tarifa mal calculada.', 'Nada avisa.', 'Se encuentra con pruebas.']],
    ['Traza de la pila', 'lista de las llamadas a funciones activas cuando ocurrió un error, de la más reciente a la más antigua', ['reporte.js:14:22.', 'Indica dónde y desde dónde.', 'Stack trace.']],
    ['Punto de interrupción', 'marca que detiene el programa en una línea para inspeccionar su estado', ['Breakpoint.', 'Puede ser condicional.', 'debugger;.']],
    ['Depuración del pato de goma', 'técnica de explicar el código línea por línea para encontrar el error', ['The Pragmatic Programmer.', 'Obliga a decir los supuestos.', 'Funciona sorprendentemente bien.']],
    ['Prueba automática', 'programa que ejecuta código con una entrada conocida y verifica el resultado esperado', ['node --test.', 'Preparar, ejecutar, verificar.', 'Avisa si algo se rompe.']],
    ['Prueba de regresión', 'prueba que reproduce un error ya corregido para que no vuelva', ['Se escribe antes de corregir.', 'Debe fallar primero.', 'Protege lo arreglado.']],
    ['Error de uno', 'error en que un bucle o índice se pasa o se queda corto por una posición', ['Off-by-one.', '<= en lugar de <.', 'Muy frecuente.']]
  ],
  q: [
    ['El programa corre sin errores pero el total es incorrecto. ¿Qué tipo de error es?', 'De lógica', ['De sintaxis', 'De ejecución', 'De red'], 'Nada avisa: hay que probar.', 1],
    ['En una traza de la pila, ¿qué línea indica dónde ocurrió el error?', 'La primera (la más reciente)', ['La última', 'La del medio', 'Ninguna'], 'Se lee de lo más reciente a lo más antiguo.', 2],
    ['¿Cuál es el primer paso de la depuración con método científico?', 'Reproducir el error de forma confiable', ['Cambiar código al azar', 'Reescribir el programa', 'Preguntar a otra persona sin investigar'], 'Zeller.', 2],
    ['La suma de dos valores da "2010" en lugar de 30. ¿Cuál es la causa probable?', 'Se sumaron textos en lugar de números', ['Un error de red', 'Un bucle infinito', 'Un error de sintaxis'], 'Hay que convertir con Number.', 2],
    ['¿Para qué sirve escribir una prueba que reproduzca un error antes de corregirlo?', 'Para comprobar la corrección y evitar que el error vuelva sin que nadie se entere', ['Para que el error sea más grave', 'Para ocupar tiempo', 'No sirve'], 'Prueba de regresión.', 3],
    ['Con 1000 commits entre una versión que funcionaba y otra que no, ¿cuántos pasos necesita git bisect como máximo aproximadamente?', '10', ['1000', '500', '100'], 'Bisección: log₂ 1000 ≈ 10.', 3],
    ['Un bucle usa i <= lista.length. ¿Qué error probable tiene?', 'Lee una posición de más (error de uno)', ['No tiene errores', 'Omite el primer elemento', 'Es un error de sintaxis'], 'El último índice válido es length − 1.', 2],
    { tf: 'Cambiar cosas al azar hasta que funcione es una buena técnica de depuración.', v: false, e: 'Sin entender la causa, el error suele volver de otra forma.', l: 1 },
    { tf: 'Explicar el código en voz alta a otra persona o a un objeto ayuda a encontrar errores.', v: true, e: 'Es la depuración del pato de goma.', l: 1 },
    { o: 'Ordena los pasos de la depuración con método científico.', s: ['Reproducir el error', 'Observar lo esperado y lo ocurrido', 'Formular una hipótesis', 'Probar la hipótesis', 'Corregir y verificar con una prueba'], e: 'Zeller, Why Programs Fail.', l: 2 },
    { c: 'Escribe «contarSalidas(estadias)»: cuenta las estadías con salida distinta de null (sin errores de uno).', f: 'contarSalidas', p: ['estadias'], t: [[[[{ salida: 1 }, { salida: null }, { salida: 3 }]], 2], [[[]], 0], [[[{ salida: 5 }]], 1]], sol: '  let c = 0;\n  for (const e of estadias) if (e.salida !== null) c++;\n  return c;', l: 1 },
    { c: 'Escribe «sumarMontos(montos)»: los montos llegan como textos ("20", "45.5"); devuelve la suma numérica.', f: 'sumarMontos', p: ['montos'], t: [[[['20', '10']], 30], [[['45.5', '4.5']], 50], [[[]], 0]], sol: '  return montos.reduce((s, m) => s + Number(m), 0);', l: 1 },
    { c: 'Escribe «pasosBiseccion(n)»: número máximo de pasos para encontrar el commit culpable entre n commits por bisección (⌈log₂ n⌉, y 0 si n ≤ 1).', f: 'pasosBiseccion', p: ['n'], t: [[[1000], 10], [[1], 0], [[2], 1], [[1024], 10]], sol: '  return n <= 1 ? 0 : Math.ceil(Math.log2(n));', l: 2 }
  ],
  gen: function (g) {
    var ti = [['Falta un paréntesis y el programa no arranca', 'De sintaxis'], ['El programa se detiene con TypeError al leer una propiedad', 'De ejecución'], ['El total mensual sale 10 soles menos de lo correcto', 'De lógica'], ['Se escribió "funtion" en lugar de "function"', 'De sintaxis'], ['El archivo de configuración no existe y el programa termina con un error', 'De ejecución'], ['El reporte omite la última estadía', 'De lógica']];
    ti.forEach(function (t) { g.mcq(1, '¿Qué tipo de error es? ' + t[0], t[1], ['De sintaxis', 'De ejecución', 'De lógica', 'De hardware'].filter(function (x) { return x !== t[1]; }), 'Sintaxis, ejecución y lógica.'); });
    var ca = [['El if siempre entra, aunque la condición parezca falsa', 'Se usó = en lugar de ==='], ['La función devuelve undefined', 'Falta el return'], ['Cambiar la copia de una lista cambia la original', 'Las listas se copian por referencia'], ['El bucle lee una posición de más', 'Se usó <= en lugar de <'], ['"5" + 3 da "53"', 'Se sumó un texto con un número']];
    ca.forEach(function (c) { g.mcq(2, '¿Cuál es la causa típica de este síntoma? ' + c[0], c[1], ['Se usó = en lugar de ===', 'Falta el return', 'Las listas se copian por referencia', 'Se usó <= en lugar de <', 'Se sumó un texto con un número'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Errores frecuentes.'); });
    g.times(6, function (R) { var n = R.pick([10, 50, 100, 500, 2000, 5000]); g.input(3, 'Hay ' + n + ' commits entre la versión buena y la mala. ¿Cuántos pasos de bisección hacen falta como máximo?', Math.ceil(Math.log2(n)), '⌈log₂ n⌉.'); });
  },
  checks: [
    ['Diferencia los errores de sintaxis, de ejecución y de lógica con un ejemplo de cada uno.', 'Sintaxis: falta un paréntesis; ejecución: leer una propiedad de undefined; lógica: un total mal calculado sin ningún aviso.'],
    ['Describe cómo leer una traza de la pila.', 'Tipo y mensaje del error, y la lista de llamadas desde la más reciente (donde ocurrió) hasta la más antigua, con archivo, línea y columna.'],
    ['Explica los pasos de la depuración con método científico.', 'Reproducir, observar, formular una hipótesis, probarla, corregir y verificar con una prueba.'],
    ['¿Qué casos conviene cubrir con pruebas automáticas?', 'El caso normal, los límites, los errores esperados y cada error encontrado como prueba de regresión.']
  ],
  cites: ['Zeller, A. (2009). *Why Programs Fail: A Guide to Systematic Debugging* (2.ª ed.). Morgan Kaufmann.', 'Agans, D. (2002). *Debugging: The 9 Indispensable Rules for Finding Even the Most Elusive Software and Hardware Problems*. AMACOM.', 'Hunt, A. y Thomas, D. (2019). *The Pragmatic Programmer* (2.ª ed.). Addison-Wesley.', 'Smithsonian National Museum of American History. *Log Book With Computer Bug* (1947).', 'OpenJS Foundation. *Node.js Documentation: Test runner*. nodejs.org.'],
  project: { t: 'Cazar errores con método',
    goal: 'Practicar la depuración sistemática y las pruebas automáticas.',
    steps: ['Pide a un compañero que introduzca tres errores (uno de cada tipo) en un programa tuyo de unas 100 líneas.', 'Encuéntralos aplicando el método científico y registra tus hipótesis en un cuaderno.', 'Usa el depurador del editor con al menos un punto de interrupción condicional.', 'Escribe una prueba de regresión para cada error antes de corregirlo.', 'Agrega pruebas para el caso normal y los casos límite de las funciones principales, y ejecútalas con node --test.'],
    deliver: 'El cuaderno de depuración, el código corregido y las pruebas.' },
  hito: ['Agrega a PatioApp las primeras pruebas automáticas del cálculo de tarifas con casos normales, límites y de error.', 'Corrige en PatioApp el error del reporte que perdía la última estadía con una prueba de regresión y reemplazando el bucle con índices.']
});
SDC.after('m3.debug', 'm3.rec');
})();
