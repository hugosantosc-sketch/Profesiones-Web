(function () {
var S = SDC.S;

S('plat', 'plat.cross', { title: 'Desarrollo multiplataforma: una base de código, varios dispositivos',
  ask: '¿Qué enfoque multiplataforma conviene para este producto y por qué?',
  lesson: `
> **La idea en simple.** Un producto hoy suele necesitar estar en la web, en Android y en iOS, y a veces también en el escritorio. Escribir y mantener tres o cuatro aplicaciones separadas, con equipos distintos, es caro. Las tecnologías multiplataforma prometen escribir una vez y ejecutar en todas partes, cada una con un compromiso distinto entre costo, rendimiento, experiencia y acceso a las capacidades del dispositivo. Elegir bien depende del producto, del equipo y de cuánto importa sentirse "nativo".

## El espectro de opciones
| Enfoque | Ejemplos | Cómo funciona | Fortalezas | Debilidades |
|---|---|---|---|---|
| Nativo por plataforma | Kotlin (Android), Swift (iOS) | una aplicación por plataforma con sus herramientas oficiales | máximo rendimiento y acceso a todo | dos o más bases de código y equipos |
| Web progresiva (PWA) | cualquier sitio con service worker y manifiesto | la web, instalable | un solo código, sin tiendas, actualización inmediata | acceso limitado al dispositivo, sobre todo en iOS |
| Web empaquetada | Capacitor, Cordova | una web dentro de un contenedor nativo con complementos | reutiliza la web, publica en tiendas | rendimiento y sensación de web |
| Interfaz nativa desde JavaScript | React Native | JavaScript que controla componentes nativos reales | equipo web puede hacer móvil, componentes nativos | puente entre mundos, complejidad en lo avanzado |
| Motor de dibujo propio | Flutter | el framework dibuja cada píxel con su propio motor | apariencia idéntica y fluida en todas | no usa los componentes del sistema, tamaño mayor |
| Lógica compartida, interfaz nativa | Kotlin Multiplatform | se comparte el dominio y los datos; cada plataforma hace su interfaz | interfaz 100 % nativa, lógica única | dos interfaces que mantener |
No hay una opción mejor en abstracto. Encuestas como la de Stack Overflow muestran a React Native y Flutter como las más usadas entre las multiplataforma, y empresas grandes usan cada una de las opciones de la tabla.

## Las PWA, otra vez
Como viste en la plataforma del navegador, una **aplicación web progresiva** puede instalarse, funcionar sin conexión y enviar notificaciones, con una sola base de código y sin pasar por tiendas. Para muchas aplicaciones internas y de negocio (como una herramienta de garita o un panel de supervisión) es la opción más económica. Sus límites: en iOS, Apple fue durante años restrictiva (las notificaciones push para PWA instaladas llegaron recién con iOS 16.4, en 2023), y el acceso a algunas capacidades (Bluetooth, NFC, tareas en segundo plano largas) es limitado o inexistente según el navegador. Si la aplicación necesita esas capacidades, o estar en las tiendas como requisito comercial, hay que mirar las otras opciones.

## React Native
Creado por Facebook (lanzado en 2015), **React Native** permite escribir aplicaciones con JavaScript o TypeScript y React, pero en lugar de generar HTML, controla **componentes nativos** reales de cada plataforma: un «View» es una vista de Android o de iOS. Para un equipo que ya sabe React, la curva es corta, y buena parte del código (lógica, estado, llamadas a la API) se comparte con la web. La **nueva arquitectura** (con JSI y Fabric, por defecto desde 2024) eliminó el antiguo puente asíncrono que causaba problemas de rendimiento. Herramientas como **Expo** simplifican mucho el desarrollo: compilar sin instalar Xcode ni Android Studio, actualizar la parte de JavaScript sin pasar por la tienda (dentro de las reglas de cada tienda) y acceder a la cámara, la ubicación o las notificaciones con módulos listos.
~~~js
// Un componente React Native: se parece a React web, pero con componentes nativos
import { View, Text, Pressable, FlatList } from 'react-native';
export function ListaUnidades({ unidades, onSalida }) {
  return (
    <FlatList
      data={unidades}
      keyExtractor={u => u.placa}
      renderItem={({ item }) => (
        <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.placa}</Text>
          <Pressable onPress={() => onSalida(item)} accessibilityRole="button" accessibilityLabel={'Registrar salida de ' + item.placa}>
            <Text>Salida</Text>
          </Pressable>
        </View>
      )}
    />
  );
}
~~~

## Flutter
**Flutter** (Google, versión 1.0 en 2018) usa el lenguaje **Dart** y un motor gráfico propio (Impeller, que reemplazó a Skia como motor principal) que dibuja toda la interfaz: no usa los botones del sistema, dibuja los suyos. Eso le da una apariencia idéntica y animaciones fluidas en Android, iOS, web y escritorio, con una sola base de código y un rendimiento muy bueno. El costo: aprender Dart, aplicaciones algo más pesadas, y que la interfaz imita los estilos nativos en lugar de usarlos (cuando una plataforma cambia su diseño, Flutter debe actualizarse para seguirla). Es popular en aplicaciones con diseño propio de marca, donde verse igual en todas partes es una ventaja.

## Compartir la lógica, no la interfaz
**Kotlin Multiplatform** (estable desde 2023, de JetBrains) toma otro camino: se comparte el código de **dominio, datos y red** (las reglas de tarifas, el cliente de la API, la base de datos local, la sincronización) y cada plataforma escribe su interfaz con sus herramientas nativas (Jetpack Compose en Android, SwiftUI en iOS). Se obtiene una experiencia 100 % nativa con la lógica escrita una sola vez. Lo usan empresas como Netflix, McDonald's y Cash App en partes de sus aplicaciones. Una idea parecida, en el mundo JavaScript, es tener un paquete compartido de lógica en un monorepo que usan la web, la aplicación React Native y el servidor.

## Cómo decidir
Preguntas que ordenan la decisión:
1. **¿Qué necesita el dispositivo?** Si basta con formularios, listas, cámara básica y notificaciones, una PWA o una web empaquetada pueden alcanzar. Si necesita Bluetooth, NFC, procesamiento de video en tiempo real o realidad aumentada, nativo o React Native/Flutter con módulos nativos.
2. **¿Qué sabe el equipo?** Un equipo web rinde antes con PWA o React Native; uno con experiencia en Android, con Kotlin Multiplatform.
3. **¿Qué tan importante es la sensación nativa?** En una aplicación de consumo masivo compitiendo con otras, mucho; en una herramienta interna, poco.
4. **¿Hay que estar en las tiendas?** Las tiendas dan visibilidad y confianza, pero imponen revisiones, comisiones (en ventas digitales dentro de la aplicación) y tiempos de publicación.
5. **¿Cuánto durará y quién lo mantendrá?** Una tecnología con comunidad grande y respaldo estable reduce el riesgo a largo plazo.

## Lo que no se comparte
Aunque el código sea uno, la **experiencia** de cada plataforma tiene convenciones: el botón "atrás" de Android, los gestos de iOS, la ubicación de las pestañas, los diálogos del sistema, los permisos. Una aplicación multiplataforma que ignora esas diferencias se siente extraña en ambas. Además, cada tienda tiene sus **reglas de publicación** y revisión, sus requisitos de privacidad (las etiquetas de privacidad de Apple, la sección de seguridad de datos de Google Play) y su ritmo de cambios de sistema operativo, que exige actualizar la aplicación cada año.

## Ejemplo resuelto: la aplicación de PatioApp para choferes
Se quiere una aplicación para los choferes de las empresas clientes: avisar la llegada, adjuntar documentos, ver el estado de su unidad y recibir una notificación cuando esté lista.
1. **Necesidades del dispositivo:** cámara (fotos de documentos), notificaciones y funcionamiento con mala conexión. Nada de Bluetooth ni procesamiento pesado.
2. **Equipo:** tres desarrolladores web con React; nadie con experiencia en Swift o Kotlin.
3. **Tiendas:** los choferes buscan aplicaciones en la tienda y desconfían de instalar desde una web; el área comercial quiere estar en Google Play (la mayoría usa Android) y en la App Store.
4. **Decisión:** React Native con Expo. La lógica de validación de placas, el cliente de la API y los tipos se comparten con la web en un paquete del monorepo.
5. **Respetar cada plataforma:** navegación con los patrones de cada sistema, permisos pedidos en contexto ("para adjuntar tu SOAT, PatioApp necesita usar la cámara"), y pruebas en teléfonos Android de gama media.
6. **Resultado:** la aplicación sale en ambas tiendas en diez semanas con el mismo equipo; la herramienta de garita, que no necesita tiendas, sigue siendo una PWA.`,
  links: [['plat.mobile', 'restricciones y ciclo de vida de las aplicaciones móviles'], ['m9.browser', 'PWA y service workers'], ['hci.interact', 'diseño de interacción para el teléfono']],
  read: 'Documentación de React Native (reactnative.dev) y Expo (docs.expo.dev); documentación de Flutter (flutter.dev); documentación de Kotlin Multiplatform (kotlinlang.org).',
  terms: [
    ['Desarrollo multiplataforma', 'construcción de una aplicación para varias plataformas a partir de una base de código común', ['React Native.', 'Flutter.', 'PWA.']],
    ['Aplicación nativa', 'aplicación escrita con las herramientas oficiales de cada plataforma', ['Kotlin.', 'Swift.', 'Máximo acceso.']],
    ['Web empaquetada', 'aplicación web dentro de un contenedor nativo que se publica en las tiendas', ['Capacitor.', 'Complementos.', 'Sensación de web.']],
    ['React Native', 'framework que controla componentes nativos reales desde JavaScript con React', ['Facebook, 2015.', 'Expo.', 'Nueva arquitectura.']],
    ['Flutter', 'framework que dibuja toda la interfaz con su propio motor gráfico usando Dart', ['Google, 2018.', 'Impeller.', 'Apariencia idéntica.']],
    ['Kotlin Multiplatform', 'tecnología para compartir la lógica entre plataformas manteniendo interfaces nativas', ['JetBrains.', 'Dominio compartido.', 'SwiftUI y Compose.']],
    ['Expo', 'conjunto de herramientas que simplifica el desarrollo y la publicación con React Native', ['Sin Xcode local.', 'Módulos listos.', 'Actualizaciones.']],
    ['Convenciones de plataforma', 'patrones de interacción propios de cada sistema que los usuarios esperan', ['Botón atrás.', 'Gestos.', 'Permisos.']]
  ],
  q: [
    ['Una herramienta interna con formularios y listas, sin requisito de tiendas. ¿Qué opción suele ser la más económica?', 'Una PWA', ['Dos aplicaciones nativas', 'Un motor de juegos', 'Una aplicación de escritorio'], 'Una base de código, sin tiendas.', 1],
    ['¿Qué distingue a React Native de una web empaquetada?', 'Controla componentes nativos reales en lugar de mostrar una página web', ['Usa Dart', 'No usa JavaScript', 'Solo funciona en Android'], 'Componentes nativos.', 2],
    ['¿Qué caracteriza a Flutter?', 'Dibuja toda la interfaz con su propio motor, con apariencia idéntica en todas las plataformas', ['Usa los botones del sistema', 'Se programa en Swift', 'Solo funciona en la web'], 'Motor de dibujo propio.', 2],
    ['¿Qué comparte Kotlin Multiplatform?', 'La lógica de dominio, datos y red, con interfaces nativas en cada plataforma', ['Solo la interfaz', 'Nada', 'El sistema operativo'], 'Lógica compartida.', 3],
    ['La aplicación necesita Bluetooth y NFC de forma intensiva. ¿Qué opción es la menos adecuada?', 'Una PWA', ['Nativo', 'React Native con módulos nativos', 'Flutter con complementos'], 'Acceso limitado al dispositivo.', 3],
    ['¿Por qué una aplicación multiplataforma puede sentirse extraña?', 'Porque ignora las convenciones propias de cada plataforma', ['Porque usa colores', 'Porque es más rápida', 'Porque usa JavaScript'], 'Botón atrás, gestos, permisos.', 3],
    ['Un equipo de tres desarrolladores React necesita estar en ambas tiendas con cámara y notificaciones. ¿Qué opción es razonable?', 'React Native con Expo', ['Aprender Swift y Kotlin y hacer dos aplicaciones', 'Una aplicación de escritorio', 'Ninguna'], 'Aprovecha lo que sabe el equipo.', 4],
    { tf: 'Existe una tecnología multiplataforma que es la mejor para cualquier producto.', v: false, e: 'Depende de las necesidades, el equipo y la importancia de la sensación nativa.', l: 1 },
    { tf: 'En React Native, la lógica de negocio puede compartirse con la aplicación web en un paquete común.', v: true, e: 'Por ejemplo, en un monorepo.', l: 2 },
    { c: 'Escribe «recomendarEnfoque(req)»: req = { hardwareAvanzado, equipoWeb, tiendas }; si hardwareAvanzado → "nativo"; si no requiere tiendas → "pwa"; si equipoWeb → "react-native"; si no → "flutter".', f: 'recomendarEnfoque', p: ['req'], t: [[[{ hardwareAvanzado: true, equipoWeb: true, tiendas: true }], 'nativo'], [[{ hardwareAvanzado: false, equipoWeb: true, tiendas: false }], 'pwa'], [[{ hardwareAvanzado: false, equipoWeb: true, tiendas: true }], 'react-native'], [[{ hardwareAvanzado: false, equipoWeb: false, tiendas: true }], 'flutter']], sol: '  if (req.hardwareAvanzado) return \'nativo\';\n  if (!req.tiendas) return \'pwa\';\n  return req.equipoWeb ? \'react-native\' : \'flutter\';', l: 2 },
    { c: 'Escribe «etiquetaAccesible(accion, placa)»: devuelve "Registrar salida de ABC-123" para accion "salida", "Registrar ingreso de …" para "ingreso", y "Ver …" para otro.', f: 'etiquetaAccesible', p: ['accion', 'placa'], t: [[['salida', 'ABC-123'], 'Registrar salida de ABC-123'], [['ingreso', 'XYZ-987'], 'Registrar ingreso de XYZ-987'], [['detalle', 'ABC-123'], 'Ver ABC-123']], sol: '  if (accion === \'salida\') return \'Registrar salida de \' + placa;\n  if (accion === \'ingreso\') return \'Registrar ingreso de \' + placa;\n  return \'Ver \' + placa;', l: 1 },
    { c: 'Escribe «codigoCompartido(archivos)»: recibe { ruta, lineas, compartido } y devuelve el porcentaje de líneas compartidas entre plataformas, redondeado a entero.', f: 'codigoCompartido', p: ['archivos'], t: [[[[{ ruta: 'tarifas', lineas: 400, compartido: true }, { ruta: 'ui-android', lineas: 300, compartido: false }, { ruta: 'ui-ios', lineas: 300, compartido: false }]], 40]], sol: '  const total = archivos.reduce((s, a) => s + a.lineas, 0);\n  const c = archivos.filter(a => a.compartido).reduce((s, a) => s + a.lineas, 0);\n  return Math.round(c / total * 100);', l: 1 }
  ],
  gen: function (g) {
    var en = [['Una aplicación por plataforma con Kotlin y Swift', 'Nativo por plataforma'], ['La web instalable con service worker y manifiesto', 'Web progresiva (PWA)'], ['Una web dentro de un contenedor nativo con Capacitor', 'Web empaquetada'], ['JavaScript que controla componentes nativos reales', 'React Native'], ['Un motor propio que dibuja cada píxel con Dart', 'Flutter'], ['Lógica compartida en Kotlin con SwiftUI y Compose', 'Kotlin Multiplatform']];
    en.forEach(function (e) { g.mcq(2, '¿Qué enfoque multiplataforma describe? ' + e[0], e[1], ['Nativo por plataforma', 'Web progresiva (PWA)', 'Web empaquetada', 'React Native', 'Flutter', 'Kotlin Multiplatform'].filter(function (x) { return x !== e[1]; }).slice(0, 3), 'Opciones multiplataforma.'); });
    var de = [['Herramienta interna de garita sin requisito de tiendas', 'Web progresiva (PWA)'], ['Juego con gráficos intensivos y realidad aumentada', 'Nativo por plataforma'], ['Aplicación de marca que debe verse idéntica en todas partes', 'Flutter'], ['Equipo React que necesita publicar en ambas tiendas', 'React Native'], ['Equipo Android que quiere interfaz nativa en iOS sin duplicar reglas', 'Kotlin Multiplatform']];
    de.forEach(function (d) { g.mcq(3, '¿Qué enfoque conviene? ' + d[0], d[1], ['Web progresiva (PWA)', 'Nativo por plataforma', 'Flutter', 'React Native', 'Kotlin Multiplatform'].filter(function (x) { return x !== d[1]; }).slice(0, 3), 'Decidir según necesidades y equipo.'); });
    g.times(4, function (R) { var c = R.int(200, 800), n = R.int(100, 600); g.input(2, 'Una aplicación tiene ' + c + ' líneas compartidas y ' + n + ' líneas específicas de cada una de sus 2 plataformas. ¿Qué porcentaje del total es compartido? (redondea)', Math.round(c / (c + 2 * n) * 100), 'Compartidas entre el total.'); });
  },
  checks: [
    ['Describe el espectro de opciones multiplataforma con una fortaleza y una debilidad de cada una.', 'Nativo (rendimiento, varias bases), PWA (una base sin tiendas, acceso limitado), web empaquetada (reutiliza web, sensación web), React Native (componentes nativos desde JS, complejidad avanzada), Flutter (idéntico y fluido, no nativo), KMP (interfaz nativa, dos interfaces).'],
    ['¿Qué diferencia de fondo hay entre React Native y Flutter?', 'React Native controla componentes nativos del sistema; Flutter dibuja toda la interfaz con su propio motor.'],
    ['¿Qué preguntas ordenan la elección de un enfoque?', 'Qué necesita del dispositivo, qué sabe el equipo, cuánto importa la sensación nativa, si hay que estar en tiendas y quién lo mantendrá a largo plazo.'],
    ['¿Qué no se comparte aunque el código sea uno?', 'Las convenciones de cada plataforma, las reglas y requisitos de cada tienda y la actualización anual por cambios del sistema operativo.']
  ],
  cites: ['Meta. *React Native Documentation*. reactnative.dev.', 'Google. *Flutter Documentation*. flutter.dev.', 'JetBrains. *Kotlin Multiplatform Documentation*. kotlinlang.org.', 'Biørn-Hansen, A., Grønli, T.-M. y Ghinea, G. (2018). A Survey and Taxonomy of Core Concepts and Research Challenges in Cross-Platform Mobile Development. *ACM Computing Surveys*, 51(5).', 'Stack Overflow (2024). *Developer Survey 2024*. survey.stackoverflow.co.'],
  project: { t: 'Una aplicación en dos plataformas',
    goal: 'Construir y comparar una aplicación pequeña con dos enfoques multiplataforma.',
    steps: ['Define una aplicación pequeña (lista, detalle, formulario con cámara y notificación).', 'Constrúyela como PWA y luego con React Native (Expo) o Flutter.', 'Comparte la lógica de negocio entre ambas versiones en un paquete común, si el enfoque lo permite.', 'Prueba ambas en un teléfono Android de gama media y mide arranque, fluidez y tamaño.', 'Escribe una recomendación justificada para un producto real según lo aprendido.'],
    deliver: 'Los dos proyectos, las mediciones y la recomendación.' },
  hito: ['Construye la aplicación de choferes de PatioApp con React Native y Expo, compartiendo validaciones y cliente de la API con la web.', 'Documenta en PatioApp por qué la garita sigue siendo una PWA y la aplicación de choferes es nativa multiplataforma.']
});
SDC.after('plat.cross', 'plat.mobile');

S('plat', 'plat.desktop', { title: 'Aplicaciones de escritorio',
  ask: '¿Cómo construirías y distribuirías esta aplicación de escritorio?',
  lesson: `
> **La idea en simple.** Aunque gran parte del software se mudó a la web y al teléfono, el escritorio sigue siendo el lugar de las herramientas de trabajo intensivo: editores, programas de diseño, aplicaciones contables, puntos de venta, asistentes que necesitan acceso al micrófono, a los archivos o a dispositivos conectados. Construir para el escritorio tiene sus propios desafíos: tres sistemas operativos distintos, instaladores, firmas de código, actualizaciones automáticas y acceso al sistema con responsabilidad.

## Cuándo una aplicación de escritorio
Una aplicación de escritorio se justifica cuando necesita:
- **Acceso profundo al sistema:** archivos y carpetas del usuario, procesos, impresoras, lectores de códigos de barras, balanzas, puertos serie, dispositivos USB.
- **Funcionar sin conexión** de forma completa y prolongada.
- **Rendimiento** con archivos grandes o procesamiento intensivo (video, modelos 3D, grandes hojas de cálculo).
- **Integrarse con el sistema operativo:** atajos globales de teclado, ícono en la bandeja del sistema, arranque con el sistema, notificaciones nativas, asociar tipos de archivo.
- **Correr en segundo plano** de forma continua, como un asistente de voz que escucha una palabra de activación o un agente que sincroniza archivos.
Si nada de esto hace falta, una aplicación web (o una PWA instalable) suele ser más simple de distribuir y mantener.

## Las opciones
| Opción | Lenguaje | Cómo funciona | Tamaño típico | Fortalezas | Debilidades |
|---|---|---|---|---|---|
| Nativa | C# (WinUI, WPF), Swift (AppKit, SwiftUI), C++ (Qt), GTK | herramientas de cada sistema | pequeño | máxima integración y rendimiento | una base por sistema, salvo Qt |
| Electron | JavaScript, HTML y CSS | empaqueta Chromium y Node con la aplicación | 80–150 MB | equipo web, mismo código en los tres sistemas, ecosistema enorme | pesado en disco y memoria |
| Tauri | JavaScript para la interfaz, Rust para el núcleo | usa la vista web del sistema operativo | 3–10 MB | liviano, seguro por diseño | diferencias entre las vistas web de cada sistema |
| Flutter de escritorio | Dart | su motor de dibujo | moderado | mismo código que móvil | menos maduro en escritorio |
| Python con interfaz | Python (Qt con PySide, Tkinter) | bibliotecas de interfaz para Python | variable | rápido para herramientas internas y prototipos | distribución más complicada |
**Electron** (GitHub, 2013, creado para el editor Atom) es la base de Visual Studio Code, Slack, Discord, Figma de escritorio y muchas más: demostró que una aplicación web empaquetada puede ser una herramienta de primera línea. Su costo es que cada aplicación trae su propio navegador completo. **Tauri** (versión 1.0 en 2022, 2.0 en 2024) reutiliza el componente web que ya trae el sistema (WebView2 en Windows, WebKit en macOS y Linux) y escribe el núcleo en Rust, con instaladores de pocos megabytes y un modelo de permisos que obliga a declarar qué puede hacer la interfaz.

## La arquitectura de Electron y Tauri
Ambos separan dos mundos:
- El **proceso principal** (o el núcleo en Rust): tiene acceso al sistema: archivos, ventanas, menús, procesos, dispositivos.
- El **proceso de interfaz** (*renderer*): una página web que dibuja la interfaz.
La comunicación entre ambos es por **mensajes** (IPC). La regla de seguridad más importante es que la interfaz **no** tenga acceso directo al sistema: si la página web pudiera ejecutar comandos o leer cualquier archivo, una vulnerabilidad de XSS se convertiría en control total de la computadora del usuario. Por eso, en Electron se activan el **aislamiento de contexto** y el *sandbox*, se desactiva la integración de Node en la interfaz y se expone solo una API mínima y validada mediante un script de precarga:
~~~js
// preload.js: la única puerta entre la interfaz y el sistema (Electron)
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('patio', {
  imprimirTicket: (datos) => ipcRenderer.invoke('imprimir-ticket', datos),     // acción concreta, no "ejecutar lo que sea"
  leerBalanza: () => ipcRenderer.invoke('leer-balanza')
});
// main.js: el proceso principal valida todo lo que llega
// ipcMain.handle('imprimir-ticket', (e, datos) => { if (!/^[A-Z0-9]{3}-\\d{3}$/.test(datos.placa)) throw new Error('placa inválida'); ... });
~~~
Además: no cargar contenido remoto que no sea propio, aplicar una Content Security Policy y mantener Electron actualizado (cada versión trae un Chromium con parches de seguridad).

## Distribuir: instaladores, firmas y actualizaciones
Distribuir es la parte más subestimada del escritorio:
- **Instaladores por sistema:** un «.exe» o «.msi» (o MSIX) en Windows, un «.dmg» o «.pkg» en macOS, y en Linux paquetes «.deb», «.rpm», AppImage o Flatpak. Herramientas como electron-builder o el empaquetador de Tauri los generan desde la integración continua.
- **Firma de código:** el instalador se firma con un certificado que identifica al editor. Sin firma, Windows muestra la advertencia de SmartScreen ("Windows protegió su PC") y macOS directamente impide abrir la aplicación; en macOS, además, hay que enviarla a Apple para su **notarización** automática. Los certificados tienen un costo anual y deben custodiarse como un secreto crítico: con ellos, un atacante podría firmar malware en tu nombre.
- **Actualizaciones automáticas:** la aplicación verifica periódicamente si hay una versión nueva, la descarga, verifica su firma y la instala. Sin actualizaciones automáticas, los usuarios se quedan en versiones viejas con errores y vulnerabilidades.
- **Tiendas:** Microsoft Store y Mac App Store son opcionales; simplifican la confianza y las actualizaciones a cambio de reglas y, en el caso de Apple, de un *sandbox* más estricto.

## Diferencias entre sistemas
Una aplicación multiplataforma debe respetar las convenciones de cada sistema: en macOS el menú está en la barra superior de la pantalla y el atajo principal es Cmd, en Windows el menú va en la ventana y el atajo es Ctrl; las rutas de archivos, los finales de línea, las carpetas de datos de la aplicación («AppData» en Windows, «Library/Application Support» en macOS, «~/.config» en Linux), los permisos de privacidad (macOS pide permiso explícito para el micrófono, la cámara, la grabación de pantalla y el acceso a ciertas carpetas) y el comportamiento al cerrar la última ventana (en macOS la aplicación suele seguir abierta).

## Ejemplo resuelto: el punto de cobro de la garita
Las garitas de PatioApp necesitan imprimir tickets térmicos, leer una balanza de camiones conectada por puerto serie y seguir funcionando aunque se caiga internet durante horas.
1. **¿Web o escritorio?** La impresora térmica y la balanza por puerto serie requieren acceso a dispositivos que el navegador no ofrece de forma fiable en todos los equipos: escritorio.
2. **Tecnología:** el equipo ya tiene la interfaz de la garita en React. Se elige **Tauri** por el tamaño (los equipos de garita son antiguos) y por su modelo de permisos; la lectura del puerto serie y la impresión se escriben en el núcleo en Rust.
3. **Seguridad:** la interfaz solo puede invocar tres comandos (imprimir ticket, leer balanza, guardar en la cola local), cada uno validado en el núcleo.
4. **Sin conexión:** los registros se guardan en SQLite local y se sincronizan con la API con claves de idempotencia, como en la PWA.
5. **Distribución:** instalador MSI firmado para Windows, generado en la integración continua; actualizaciones automáticas firmadas, con despliegue gradual por sede.
6. **Resultado:** un instalador de 8 MB, la balanza integrada al cobro de camiones (antes se digitaba el peso a mano) y cero tickets perdidos por cortes de red.`,
  links: [['plat.cross', 'multiplataforma en móviles'], ['m9.browser', 'seguridad del navegador y Content Security Policy'], ['m8.memsafe', 'Rust y la seguridad de memoria']],
  read: 'Documentación de Electron ("Security" y "Process Model", electronjs.org); documentación de Tauri (v2.tauri.app); Apple, "Notarizing macOS software before distribution".',
  terms: [
    ['Aplicación de escritorio', 'programa que se instala y ejecuta en el sistema operativo de una computadora', ['Windows, macOS, Linux.', 'Acceso al sistema.', 'Instalador.']],
    ['Electron', 'framework que empaqueta Chromium y Node para crear aplicaciones de escritorio con tecnologías web', ['GitHub, 2013.', 'VS Code.', 'Pesado.']],
    ['Tauri', 'framework que usa la vista web del sistema y un núcleo en Rust para aplicaciones livianas', ['2022.', 'Pocos MB.', 'Permisos declarados.']],
    ['Proceso principal', 'parte de la aplicación con acceso al sistema que atiende pedidos de la interfaz', ['Main.', 'Valida todo.', 'IPC.']],
    ['Aislamiento de contexto', 'separación que impide que la interfaz web acceda directamente al sistema', ['contextBridge.', 'Precarga.', 'Contra XSS.']],
    ['Firma de código', 'firma digital del instalador que identifica al editor y evita advertencias del sistema', ['SmartScreen.', 'Certificado.', 'Custodiar.']],
    ['Notarización', 'verificación automática de Apple de una aplicación antes de distribuirla fuera de su tienda', ['macOS.', 'Obligatoria.', 'Gatekeeper.']],
    ['Actualización automática', 'mecanismo por el que la aplicación descarga, verifica e instala sus nuevas versiones', ['Firmada.', 'Gradual.', 'Seguridad.']]
  ],
  q: [
    ['¿Cuándo se justifica una aplicación de escritorio frente a una web?', 'Cuando necesita acceso profundo al sistema, dispositivos, trabajo prolongado sin conexión o rendimiento alto', ['Siempre', 'Nunca', 'Solo si es un juego'], 'Si nada de eso hace falta, la web suele bastar.', 1],
    ['¿Qué diferencia de fondo hay entre Electron y Tauri?', 'Electron empaqueta su propio Chromium; Tauri usa la vista web del sistema y un núcleo en Rust', ['Tauri no usa HTML', 'Electron no funciona en Windows', 'Son lo mismo'], 'Tamaño y arquitectura.', 2],
    ['¿Por qué la interfaz web no debe tener acceso directo al sistema?', 'Porque una vulnerabilidad XSS se convertiría en control de la computadora', ['Porque sería más lenta', 'Porque no se puede', 'Por estética'], 'Aislamiento de contexto.', 3],
    ['¿Qué debe exponer el script de precarga?', 'Solo acciones concretas y validadas, no un acceso general', ['Todo Node', 'La consola del sistema', 'Nada nunca'], 'API mínima.', 3],
    ['¿Qué ocurre si no se firma el instalador en Windows?', 'Aparece la advertencia de SmartScreen y muchos usuarios no lo instalan', ['No pasa nada', 'Se borra solo', 'Se instala más rápido'], 'Firma de código.', 2],
    ['¿Por qué son importantes las actualizaciones automáticas?', 'Porque sin ellas los usuarios se quedan con versiones con errores y vulnerabilidades', ['Porque aumentan el tamaño', 'Porque lo exige Electron', 'No son importantes'], 'Seguridad y soporte.', 2],
    ['¿Por qué los certificados de firma de código deben custodiarse como un secreto crítico?', 'Porque con ellos un atacante podría firmar malware en nombre del editor', ['Porque caducan', 'Porque son caros', 'Porque ocupan espacio'], 'Cadena de suministro.', 4],
    { tf: 'Visual Studio Code está construido con Electron.', v: true, e: 'Igual que Slack y Discord.', l: 1 },
    { tf: 'En macOS, una aplicación distribuida fuera de la tienda puede abrirse sin firma ni notarización sin ninguna advertencia.', v: false, e: 'macOS lo impide o advierte; hay que firmar y notarizar.', l: 2 },
    { c: 'Escribe «carpetaDatos(sistema, app)»: devuelve "AppData/Roaming/<app>" para "windows", "Library/Application Support/<app>" para "macos" y ".config/<app>" para "linux".', f: 'carpetaDatos', p: ['sistema', 'app'], t: [[['windows', 'PatioApp'], 'AppData/Roaming/PatioApp'], [['macos', 'PatioApp'], 'Library/Application Support/PatioApp'], [['linux', 'patioapp'], '.config/patioapp']], sol: '  return { windows: \'AppData/Roaming/\', macos: \'Library/Application Support/\', linux: \'.config/\' }[sistema] + app;', l: 1 },
    { c: 'Escribe «comandoPermitido(nombre, permitidos)»: true solo si el nombre está en la lista de comandos permitidos (modelo de permisos).', f: 'comandoPermitido', p: ['nombre', 'permitidos'], t: [[['imprimir-ticket', ['imprimir-ticket', 'leer-balanza']], true], [['ejecutar-shell', ['imprimir-ticket']], false]], sol: '  return permitidos.includes(nombre);', l: 1 },
    { c: 'Escribe «hayActualizacion(actual, disponible)»: true si la versión disponible ("M.m.p") es mayor que la actual.', f: 'hayActualizacion', p: ['actual', 'disponible'], t: [[['1.4.2', '1.5.0'], true], [['1.4.2', '1.4.2'], false], [['2.0.0', '1.9.9'], false], [['1.4.9', '1.4.10'], true]], sol: '  const a = actual.split(\'.\').map(Number), d = disponible.split(\'.\').map(Number);\n  for (let i = 0; i < 3; i++) { if (d[i] > a[i]) return true; if (d[i] < a[i]) return false; }\n  return false;', l: 2 }
  ],
  gen: function (g) {
    var op = [['Equipo web, aplicación que debe ser igual en los tres sistemas y tamaño no crítico', 'Electron'], ['Equipos antiguos, instalador pequeño y permisos estrictos', 'Tauri'], ['Máxima integración con Windows y rendimiento', 'Nativa'], ['Herramienta interna rápida hecha por analistas de datos', 'Python con interfaz'], ['Mismo código que una aplicación móvil existente en Dart', 'Flutter de escritorio']];
    op.forEach(function (o) { g.mcq(2, '¿Qué opción de escritorio conviene? ' + o[0], o[1], ['Electron', 'Tauri', 'Nativa', 'Python con interfaz', 'Flutter de escritorio'].filter(function (x) { return x !== o[1]; }).slice(0, 3), 'Opciones para escritorio.'); });
    var di = [['Archivo de instalación de Windows', '.msi o .exe'], ['Imagen de disco de macOS', '.dmg'], ['Paquete de Debian y Ubuntu', '.deb'], ['Formato portátil de Linux que no requiere instalación', 'AppImage']];
    di.forEach(function (d) { g.mcq(1, '¿Qué formato corresponde? ' + d[0], d[1], ['.msi o .exe', '.dmg', '.deb', 'AppImage'].filter(function (x) { return x !== d[1]; }), 'Formatos de distribución.'); });
    var se = [['La interfaz web puede ejecutar cualquier comando del sistema', 'Inseguro'], ['La precarga expone solo imprimir ticket y leer balanza', 'Seguro'], ['La aplicación carga páginas de sitios externos con acceso a Node', 'Inseguro'], ['El proceso principal valida la placa antes de imprimir', 'Seguro']];
    se.forEach(function (s) { g.mcq(3, '¿Es una práctica segura en Electron o Tauri? ' + s[0], s[1], [s[1] === 'Seguro' ? 'Inseguro' : 'Seguro', 'Depende del color de la ventana', 'Solo en Linux'], 'Aislamiento y API mínima.'); });
  },
  checks: [
    ['¿Cuándo conviene una aplicación de escritorio?', 'Cuando necesita acceso profundo al sistema o a dispositivos, trabajo prolongado sin conexión, alto rendimiento, integración con el sistema o ejecución continua en segundo plano.'],
    ['Compara las opciones nativas, Electron y Tauri.', 'Nativas: máxima integración, una base por sistema; Electron: tecnologías web y gran ecosistema, pesado; Tauri: liviano con vista web del sistema y núcleo en Rust.'],
    ['Explica la separación entre proceso principal e interfaz y su regla de seguridad.', 'El principal accede al sistema y la interfaz dibuja; se comunican por mensajes, y la interfaz solo accede a una API mínima validada.'],
    ['¿Qué implica distribuir una aplicación de escritorio?', 'Instaladores por sistema, firma de código y notarización, actualizaciones automáticas firmadas y, opcionalmente, tiendas.']
  ],
  cites: ['OpenJS Foundation. *Electron Documentation: Security*. electronjs.org.', 'Tauri Contributors. *Tauri 2.0 Documentation*. v2.tauri.app.', 'Apple. *Notarizing macOS software before distribution*. developer.apple.com.', 'Microsoft. *SmartScreen and code signing*. learn.microsoft.com.', 'Carettoni, L. (2017). Electronegativity: A Study of Electron Security. *Black Hat USA 2017*.'],
  project: { t: 'Una herramienta de escritorio segura',
    goal: 'Construir y distribuir una aplicación de escritorio con acceso controlado al sistema.',
    steps: ['Elige una herramienta que necesite el sistema (leer una carpeta, usar el micrófono, imprimir) y justifica por qué es de escritorio.', 'Constrúyela con Electron o Tauri, con la interfaz en tecnologías web.', 'Expón solo dos o tres comandos al proceso de interfaz y valídalos en el proceso principal.', 'Genera instaladores para al menos un sistema desde la integración continua.', 'Implementa la verificación de actualizaciones y documenta cómo firmarías el instalador.'],
    deliver: 'El código, el instalador generado y el documento de seguridad y distribución.' },
  hito: ['Diseña la aplicación de cobro de garita de PatioApp con Tauri, con impresión térmica y balanza en el núcleo y solo tres comandos expuestos.', 'Configura la generación del instalador firmado y las actualizaciones automáticas graduales por sede.']
});
SDC.after('plat.desktop', 'plat.cross');


SDC.D('plat.desktop', `## Aplicaciones que viven en segundo plano
Algunas aplicaciones de escritorio pasan casi todo el tiempo sin ventana: un sincronizador de archivos, un agente de monitoreo, un asistente de voz que espera una palabra de activación. Para ellas importan otras cosas: un **ícono en la bandeja** del sistema con un menú para pausar, configurar y salir; la opción de **iniciar con el sistema**, que el usuario debe poder desactivar; un **consumo mínimo** de CPU, memoria y batería cuando no hacen nada (un proceso que despierta cada 100 milisegundos sin motivo agota la batería de una laptop); y, si usan el micrófono o la cámara, **transparencia**: un indicador visible cuando están escuchando, el procesamiento local siempre que sea posible (los modelos de reconocimiento de voz livianos, como Whisper en sus versiones pequeñas, ya corren en una computadora común) y una política clara de qué se envía a internet. En Windows, las tareas que deben correr aunque nadie haya iniciado sesión se implementan como **servicios**; en Linux, como unidades de systemd; en macOS, con launchd.`);
})();
