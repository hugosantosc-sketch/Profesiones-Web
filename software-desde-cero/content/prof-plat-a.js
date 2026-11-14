(function () {
var D = SDC.D;
SDC.XM('plat', { prof: true });

D('plat.mobile', `## Rendimiento en el teléfono
Los teléfonos de gama media, que son la mayoría en el Perú y en América Latina, tienen procesadores varias veces más lentos que los de gama alta y que una laptop de desarrollo, y menos memoria. Una aplicación que va fluida en el teléfono del programador puede trabarse en el de un operador. Prácticas que importan:
- **Probar en dispositivos reales de gama media**, no solo en emuladores ni en el teléfono propio.
- **60 cuadros por segundo** significa unos 16 milisegundos por cuadro: cualquier trabajo largo en el hilo principal (analizar un JSON grande, ordenar una lista enorme) produce saltos visibles. Se mueve a hilos de fondo.
- **Listas virtualizadas:** mostrar 2000 unidades creando solo los elementos visibles en pantalla (RecyclerView en Android, las listas perezosas de SwiftUI o Jetpack Compose, FlatList en React Native).
- **Imágenes** del tamaño justo y comprimidas; las fotos de una cámara de 50 megapíxeles no se muestran tal cual en una miniatura.
- **Tamaño de la aplicación:** en planes de datos limitados, una aplicación de 150 MB se descarga menos que una de 20 MB. Google informó que, en sus análisis, cada 6 MB extra de tamaño reducía la tasa de instalación en alrededor de 1 %.
- **Arranque rápido:** mostrar algo útil en menos de dos segundos, y cargar el resto después.

## Notificaciones y trabajo en segundo plano
Los sistemas operativos móviles limitan cada vez más lo que una aplicación puede hacer cuando no está en pantalla, para proteger la batería y la privacidad. En Android, **WorkManager** programa tareas diferibles (sincronizar cuando haya red y batería); en iOS, las **tareas en segundo plano** tienen tiempos estrictos y el sistema decide cuándo ejecutarlas. Las **notificaciones push** llegan a través de los servicios de cada plataforma (Firebase Cloud Messaging en Android, APNs de Apple) y requieren permiso del usuario. Una notificación debe ser útil y oportuna ("Tu unidad ABC-123 está lista para retirar"); las notificaciones de marketing excesivas son la causa principal de que los usuarios las desactiven o desinstalen la aplicación.

## Accesibilidad en móviles
Los lectores de pantalla de los teléfonos (TalkBack en Android, VoiceOver en iOS) son usados por millones de personas. Cada control necesita una **etiqueta accesible** (un botón con solo un ícono debe decir "Escanear placa"), los objetivos táctiles deben tener al menos 44 o 48 puntos, el texto debe respetar el **tamaño de letra** elegido por el usuario en el sistema (sin cortar ni superponer), y el contraste debe ser suficiente al sol. Las herramientas de cada plataforma (Accessibility Scanner en Android, Accessibility Inspector en Xcode) detectan los problemas más comunes.`);

D('plat.embedded', `## Programar sin sistema operativo
Muchos microcontroladores pequeños no tienen sistema operativo: el programa corre directamente sobre el hardware (*bare metal*). La estructura típica es un **bucle principal** infinito que lee entradas, actualiza el estado y escribe salidas, combinado con **rutinas de interrupción** que atienden eventos urgentes (llegó un byte por el puerto serie, se activó un sensor, venció un temporizador). Reglas de oro: las rutinas de interrupción deben ser **cortísimas** (marcar una bandera o guardar un dato y salir), las variables compartidas entre la interrupción y el bucle principal se declaran «volatile» en C para que el compilador no las optimice, y se evita la memoria dinámica («malloc») porque fragmenta los pocos kilobytes disponibles y puede fallar en el peor momento. Cuando el sistema crece, se usa un **sistema operativo de tiempo real** (FreeRTOS, Zephyr) que ofrece tareas con prioridades, colas y temporizadores.

## El perro guardián
Un sistema embebido no tiene a nadie que lo reinicie si se cuelga. El **perro guardián** (*watchdog timer*) es un temporizador de hardware que reinicia el microcontrolador si el programa no lo "alimenta" periódicamente. El programa lo alimenta solo cuando verificó que todo funciona; si un error lo deja atrapado en un bucle o bloqueado, el perro guardián lo reinicia en segundos. Es una de las defensas más simples y efectivas, y casi todo dispositivo serio la usa.

## Actualizar en el campo
Los dispositivos instalados necesitan actualizaciones de su programa (*firmware*) para corregir errores y vulnerabilidades. Las actualizaciones **por el aire** (OTA) deben diseñarse para no dejar el dispositivo inservible (*brick*) si se corta la energía a la mitad: se usan dos particiones (se escribe la nueva versión en la que no está en uso y solo se cambia el arranque al verificarla), la imagen va **firmada** para que solo se instale software legítimo, y hay una vuelta automática a la versión anterior si la nueva no arranca bien. Un sensor de una garita que no se puede actualizar es una vulnerabilidad permanente.

## Probar lo que toca el mundo físico
Probar software embebido es difícil porque depende del hardware. Técnicas: separar la lógica pura (que se prueba en una computadora normal con pruebas unitarias) del acceso al hardware detrás de una interfaz pequeña; usar **simuladores** y emuladores (QEMU, Renode, Wokwi para placas populares); y las pruebas **hardware en el lazo** (HIL), donde el dispositivo real se conecta a un sistema que simula sus sensores y verifica sus salidas.`);

D('plat.parallel', `## Paralelismo en JavaScript y en la web
Aunque JavaScript ejecuta tu código en un solo hilo, hay formas de usar varios núcleos:
- **Web Workers** en el navegador y **worker threads** en Node: hilos con su propio contexto que se comunican por mensajes. El dato se copia al enviarlo, salvo que se **transfiera** (un «ArrayBuffer» transferido cambia de dueño sin copiarse) o se comparta un «SharedArrayBuffer» con operaciones atómicas.
- **El módulo cluster** o varios procesos detrás de un balanceador, para servidores: cada proceso usa un núcleo.
- **WebGPU** (disponible en los principales navegadores desde 2023 en adelante) da acceso a la GPU desde la web para cálculo y gráficos, y permite ejecutar modelos de aprendizaje automático en el propio navegador.
~~~js
// Repartir un cálculo entre workers en Node (esquema)
import { Worker } from 'node:worker_threads';
import os from 'node:os';
function enParalelo(partes, archivoWorker) {
  return Promise.all(partes.map(datos => new Promise((ok, mal) => {
    const w = new Worker(archivoWorker, { workerData: datos });
    w.on('message', ok); w.on('error', mal);
  })));
}
const nucleos = os.availableParallelism ? os.availableParallelism() : os.cpus().length;
console.log('núcleos disponibles:', nucleos);
~~~
Como cada worker tiene un costo de creación y la comunicación copia datos, solo conviene paralelizar trabajos de varios cientos de milisegundos o más; para tareas cortas, el reparto cuesta más de lo que ahorra.

## Paralelismo de datos a gran escala
Cuando los datos no caben en una máquina, el paralelismo se vuelve **distribuido**: MapReduce (2004) y luego Apache Spark (Matei Zaharia, 2010) reparten los datos en particiones entre muchas máquinas y aplican la misma operación a cada una, con el patrón de **mapear** (transformar cada elemento) y **reducir** (combinar resultados). Las mismas ideas de esta unidad (trabajo y profundidad, la ley de Amdahl, el costo de la comunicación) se aplican, multiplicadas: mover datos por la red es mucho más caro que moverlos en memoria, así que los sistemas distribuidos llevan el cálculo **adonde están los datos**.

## Medir antes de paralelizar
Paralelizar agrega complejidad y errores difíciles. Antes de hacerlo: medir dónde se va el tiempo (perfilador), mejorar el algoritmo (pasar de O(n²) a O(n log n) suele valer más que ocho núcleos), aprovechar la caché (recorrer los datos en orden) y considerar la vectorización. Solo después, paralelizar la parte que de verdad domina el tiempo, y medir otra vez.`);
})();
