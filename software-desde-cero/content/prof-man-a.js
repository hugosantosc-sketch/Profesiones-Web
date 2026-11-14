(function () {
var D = SDC.D;
SDC.XM('man', { prof: true });

D('man.evol', `## Medir la mantenibilidad
La norma ISO/IEC 25010 define la **mantenibilidad** como una característica de calidad con cinco subcaracterísticas: **modularidad** (cambiar una parte afecta poco a las demás), **reusabilidad**, **analizabilidad** (qué tan fácil es diagnosticar y encontrar qué cambiar), **modificabilidad** y **capacidad de prueba**. Para medirlas se usan indicadores como:
- **Complejidad ciclomática** (Thomas McCabe, 1976): el número de caminos independientes de una función. Más de 10 o 15 suele indicar una función difícil de entender y de probar.
- **Tamaño** de funciones y archivos, y **duplicación**.
- **Acoplamiento** entre módulos (cuántos dependen de cuántos).
- **Cobertura** de pruebas en las partes críticas.
- **Tiempo de cambio:** cuánto se tarda, en la práctica, en hacer un cambio típico y llevarlo a producción.
Ninguna métrica aislada basta, y todas pueden manipularse; su valor está en mostrar **tendencias** y en señalar dónde mirar. Herramientas como SonarQube calculan muchas de ellas de forma continua y las muestran por archivo.

## Leer código ajeno
El mantenimiento empieza por entender código que no escribiste. Estrategias que ayudan:
1. **Empezar por afuera:** qué hace el sistema para el usuario, cuáles son sus entradas y salidas, cómo se ejecuta y se prueba localmente.
2. **Seguir un caso concreto** de punta a punta (una salida de una unidad, desde el botón hasta la base de datos) con el depurador o con registros.
3. **Leer las pruebas**, que muestran cómo se espera que se use el código.
4. **Leer la historia:** «git log» y «git blame» de un archivo explican por qué es así; los mensajes de commit y los PR enlazados son documentación.
5. **Dibujar** lo entendido: un diagrama de módulos o de secuencia, aunque sea a mano.
6. **Escribir lo aprendido** en la documentación del proyecto para el siguiente.
Estudios de Xin Xia y otros (2018) estimaron que los desarrolladores dedican cerca del 58 % de su tiempo a **comprender** código. Hacer el código más fácil de leer es, por tanto, la inversión con mayor retorno en mantenimiento.

## El código como pasivo
Cada línea de código que se escribe tendrá que leerse, probarse, actualizarse y mantenerse durante años. Por eso muchos ingenieros experimentados dicen que el código es un **pasivo**, y la funcionalidad, el **activo**: el mejor código es el que no hace falta escribir. Borrar funciones que nadie usa, eliminar dependencias innecesarias y simplificar son formas legítimas, y muy valiosas, de mantenimiento.`);

D('man.legacy', `## Pruebas de caracterización paso a paso
Michael Feathers propone escribir pruebas que **documenten lo que el código hace hoy**, aunque no sea lo correcto, antes de cambiarlo. El procedimiento:
1. Elegir la función o el módulo que se va a cambiar.
2. Escribir una prueba que lo llame con una entrada y una aserción que se sabe **falsa** (por ejemplo, que devuelve «null»).
3. Ejecutarla: el mensaje de error dice qué devuelve realmente.
4. Cambiar la aserción a ese valor real. La prueba ahora **caracteriza** el comportamiento actual.
5. Repetir con entradas que recorran los casos importantes (con convenio, sin convenio, camión, un día, treinta días, fechas en el borde de un mes).
~~~js
// Función heredada que nadie se atreve a tocar
function calcular(d, t, c) { var r = d * (t == 'C' ? 45 : 20); if (c) r = r - r * 0.25; if (d > 30) r = r * 0.9; return Math.round(r * 100) / 100; }
// Pruebas de caracterización: registran el comportamiento actual, correcto o no
const casos = [[1, 'A', false], [3, 'C', true], [31, 'A', false], [31, 'C', true]];
for (const [d, t, c] of casos) console.log('calcular(' + d + ", '" + t + "', " + c + ') =', calcular(d, t, c));
// 20, 101.25, 558, 941.63 → se convierten en aserciones antes de refactorizar
~~~
Si durante el proceso aparece un comportamiento que parece un error (por ejemplo, que el descuento por más de 30 días se aplique **después** del convenio y no antes), no se corrige en ese momento: se anota, se consulta con el negocio y se corrige **después**, en un cambio aparte. Mezclar refactorización con corrección de errores hace imposible saber cuál cambio rompió qué.

## Aprobaciones y pruebas de instantánea
Para código que produce salidas grandes (un reporte, un XML de comprobante electrónico, un HTML), escribir aserciones a mano es tedioso. Las **pruebas de aprobación** (*approval tests*, popularizadas por Llewellyn Falco) o de **instantánea** (*snapshot*, como las de Jest y Vitest) guardan la salida completa la primera vez y, en adelante, comparan contra ella: cualquier diferencia hace fallar la prueba y muestra el cambio. Son una forma rápida de caracterizar sistemas heredados enteros. Su riesgo es aprobar diferencias sin leerlas; cada cambio de instantánea debe revisarse como código.

## Cuándo sí reescribir
Reescribir desde cero rara vez es buena idea, pero hay casos razonables: cuando la plataforma dejó de existir o no tiene soporte de seguridad (un lenguaje o framework abandonado), cuando el sistema es pequeño y bien entendido, o cuando el dominio cambió tanto que el sistema viejo ya no lo representa. Incluso entonces, la reescritura se hace **por partes** (con la higuera estranguladora), con el sistema viejo en producción hasta que el nuevo lo reemplaza por completo, y con pruebas de caracterización del viejo como especificación del nuevo.`);

D('man.scm', `## Configuración como código
La gestión de la configuración no se limita al código fuente. Todo lo que define cómo funciona un sistema debería estar **versionado** y ser **reproducible**:
- **Infraestructura como código:** los servidores, redes, bases y permisos descritos en archivos (Terraform, OpenTofu, Pulumi, AWS CloudFormation) en lugar de configurados a mano en un panel. Un cambio en la infraestructura pasa por un PR, se revisa y queda en la historia.
- **Configuración de la aplicación** por entorno (desarrollo, pruebas, producción), versionada, con los **secretos** aparte, en un gestor de secretos (AWS Secrets Manager, HashiCorp Vault, los de cada plataforma), nunca en el repositorio.
- **Esquema de la base de datos** con migraciones versionadas.
- **Imágenes de contenedor** etiquetadas por versión e inmutables.
La consecuencia es poderosa: el estado de producción de cualquier fecha pasada se puede **reconstruir** a partir del repositorio, y la diferencia entre dos entornos se ve con un «diff».

## La deriva de configuración
La **deriva** (*configuration drift*) ocurre cuando alguien cambia algo a mano en un servidor ("solo por esta vez", durante un incidente) y el cambio nunca vuelve al código. Con el tiempo, cada servidor es un "copo de nieve" único que nadie sabe reconstruir. Las defensas son la **infraestructura inmutable** (no se modifica un servidor: se reemplaza por uno nuevo construido desde el código), las herramientas que comparan el estado real con el declarado («terraform plan» muestra la deriva) y la disciplina de que todo cambio de emergencia se registre y se lleve al código al día siguiente.

## Lista de materiales del software
Una **SBOM** (*software bill of materials*) es la lista completa de componentes de un sistema, con sus versiones y licencias, en un formato estándar (SPDX o CycloneDX). Cuando se descubrió **Log4Shell** en diciembre de 2021, una vulnerabilidad crítica en la biblioteca de registros Log4j de Java, miles de organizaciones pasaron días averiguando si la usaban, a veces escondida como dependencia de una dependencia. Con una SBOM, la respuesta toma minutos. Por eso la orden ejecutiva 14028 de Estados Unidos (2021) exige SBOM al software que compra su gobierno, y herramientas como Syft o las de GitHub las generan automáticamente.`);

D('man.release', `## Estrategias de despliegue
Separar desplegar de liberar se apoya en estrategias que limitan el riesgo de cada versión nueva:
| Estrategia | Cómo funciona | Ventaja | Costo |
|---|---|---|---|
| Todo a la vez | se reemplaza la versión en todos los servidores | simple | un error afecta a todos |
| Gradual (*rolling*) | se reemplazan los servidores de a poco | sin caída del servicio | conviven dos versiones un tiempo |
| Azul-verde | se prepara un entorno completo nuevo (verde) y se cambia el tráfico de golpe | reversión instantánea | el doble de infraestructura durante el cambio |
| Canario | la versión nueva recibe primero un pequeño porcentaje del tráfico (1 %, luego 10 %, luego 50 %) | un error afecta a pocos y se detecta con métricas | requiere buena observabilidad |
| Con banderas | el código nuevo se despliega apagado y se enciende por usuario, sede o porcentaje | control fino sin redesplegar | gestionar y retirar las banderas |
El nombre "canario" viene de los canarios que los mineros llevaban a las minas de carbón: si el gas tóxico aparecía, el ave lo sufría primero y daba la alarma. Un despliegue canario automático compara las métricas de la versión nueva (errores, latencia) con las de la vieja y **revierte solo** si empeoran.

## Versiones con soporte prolongado
Los productos que usan muchas organizaciones suelen ofrecer versiones **LTS** (*long-term support*): versiones que reciben correcciones de seguridad durante años, sin funciones nuevas. Node publica una LTS cada año (las pares) con unos 30 meses de soporte; Ubuntu LTS, 5 años (o más con soporte extendido); Java LTS, varios años según el proveedor. Para quien mantiene un producto, ofrecer LTS significa mantener varias ramas a la vez y portar las correcciones de seguridad a cada una (**retroportar**). Para quien usa software de terceros, significa planificar las actualizaciones **antes** de que termine el soporte: un sistema en una versión sin parches es una vulnerabilidad esperando a ser explotada.

## Comunicar la entrega
Una entrega bien comunicada evita soporte innecesario: notas de versión en lenguaje del usuario (qué cambia para él, no la lista de commits), aviso anticipado de los cambios incompatibles con su fecha y guía de migración, capacitación breve cuando cambia un flujo de trabajo, y un canal para reportar problemas en los primeros días. En PatioApp, por ejemplo, un cambio en la pantalla de salida se anuncia a los supervisores una semana antes, con un video corto, y se libera primero en una sede piloto.`);
})();
