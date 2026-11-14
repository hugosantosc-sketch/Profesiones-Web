(function () {
var S = SDC.S;

S('m10', 'm10.app', { title: 'La base de datos desde la aplicación',
  ask: '¿Cómo debería la aplicación usar la base de datos en este caso?',
  lesson: `
> **La idea en simple.** Saber SQL es la mitad del trabajo; la otra mitad es usar la base de datos **bien desde el código**: abrir conexiones sin agotarlas, pasar los parámetros de forma segura, agrupar operaciones en transacciones, evolucionar el esquema sin perder datos y decidir cuándo conviene un ORM. Aquí están las prácticas que separan una aplicación que funciona en la demo de una que resiste el uso real.

## Conexiones y grupos de conexiones
Abrir una conexión a PostgreSQL o MySQL es caro: requiere un saludo de red, autenticación y, en PostgreSQL, que el servidor cree un **proceso** nuevo para atenderla (unos megabytes de memoria cada uno). Abrir una conexión por petición es lento y, con tráfico, agota el límite del servidor (en PostgreSQL, «max_connections» es 100 por defecto). La solución es un **grupo de conexiones** (*connection pool*): la aplicación mantiene unas pocas conexiones abiertas y las presta a cada consulta, que las devuelve al terminar.
~~~js
import pg from 'pg';
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,                        // conexiones simultáneas como máximo
  idleTimeoutMillis: 30000,       // cerrar las que no se usan en 30 s
  connectionTimeoutMillis: 5000   // fallar si no hay conexión libre en 5 s
});
export async function estadiaAbierta(placa) {
  const { rows } = await pool.query(
    'SELECT id, placa, entrada, espacio_id FROM estadias WHERE placa = $1 AND salida IS NULL', [placa]);
  return rows[0] ?? null;
}
~~~
Un grupo pequeño suele rendir **más** que uno grande: la base de datos tiene un número limitado de núcleos y discos, y muchas conexiones compitiendo solo agregan cambios de contexto y bloqueos. Una regla de partida citada por el equipo de HikariCP (un grupo de conexiones de Java) es «núcleos × 2 + discos», y luego medir. Con funciones sin servidor, donde cada instancia abre sus propias conexiones, se pone delante un **pooler** externo como PgBouncer o los que ofrecen los proveedores administrados, para que cientos de instancias compartan unas pocas conexiones reales.

## Parámetros, nunca concatenación
La consulta anterior usa «$1» y pasa la placa aparte. Así, el valor viaja separado del texto SQL y la base **nunca** lo interpreta como código. La alternativa, armar la consulta pegando textos, es la puerta de la **inyección SQL**:
~~~js
// MAL: si placa es "X' OR '1'='1", devuelve todas las estadías
const malo = "SELECT * FROM estadias WHERE placa = '" + placa + "'";
// BIEN: consulta parametrizada
await pool.query('SELECT * FROM estadias WHERE placa = $1', [placa]);
~~~
La inyección SQL lleva más de 25 años en las listas de vulnerabilidades más graves (OWASP la mantiene en su Top 10 dentro de "Inyección"), y causó filtraciones masivas como la de Heartland Payment Systems en 2008, con más de cien millones de tarjetas. Los parámetros sirven para **valores**; los nombres de tablas o columnas no se pueden parametrizar, así que si dependen del usuario (por ejemplo, la columna por la que ordenar), se eligen de una **lista blanca** en el código.

## Transacciones en el código
Cuando varias operaciones deben ocurrir **todas o ninguna**, se agrupan en una transacción. El patrón con un grupo de conexiones es tomar **una** conexión, usarla para toda la transacción y devolverla siempre, incluso si hay error:
~~~js
export async function registrarSalida(placa, monto) {
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const { rows } = await c.query(
      'UPDATE estadias SET salida = now(), monto = $2 WHERE placa = $1 AND salida IS NULL RETURNING id, espacio_id',
      [placa, monto]);
    if (!rows.length) throw Object.assign(new Error('Sin estadía abierta'), { status: 404 });
    await c.query('UPDATE espacios SET ocupado = false WHERE id = $1', [rows[0].espacio_id]);
    await c.query('INSERT INTO caja (estadia_id, monto) VALUES ($1, $2)', [rows[0].id, monto]);
    await c.query('COMMIT');
    return rows[0];
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();                   // devolver la conexión al grupo, pase lo que pase
  }
}
~~~
Reglas prácticas: las transacciones deben ser **cortas** (nunca esperar una respuesta del usuario o de una API externa con una transacción abierta, porque los bloqueos se mantienen); si el nivel de aislamiento es alto, hay que estar preparado para **reintentar** ante errores de serialización o interbloqueo; y una operación que llama a un sistema externo (emitir el comprobante en SUNAT) no puede "deshacerse" con ROLLBACK: se diseña con estados («pendiente», «emitido», «fallido») y reintentos.

## ORM, constructores de consultas y SQL directo
- Un **ORM** (*object-relational mapper*: Prisma, TypeORM, Sequelize en JavaScript; Hibernate en Java; el ORM de Django; Entity Framework en .NET) mapea tablas a clases y genera el SQL. Acelera el trabajo común, da tipos y migraciones, pero oculta lo que ejecuta: el problema **N+1** (una consulta por cada elemento de una lista) y las consultas ineficientes son frecuentes si no se revisa el SQL generado. Ted Neward llamó al desajuste entre objetos y tablas "el Vietnam de la informática" (2006).
- Un **constructor de consultas** (Knex, Kysely, Drizzle) arma SQL con funciones del lenguaje, con parámetros automáticos y, en TypeScript, con tipos, sin esconder el modelo relacional.
- **SQL directo** con parámetros da control total y es lo más claro para consultas complejas o de reportes.
Muchos equipos combinan: ORM o constructor para el CRUD, SQL directo para reportes. Lo que no se negocia: **saber qué SQL se ejecuta** (los ORM permiten registrarlo) y revisar los planes de las consultas importantes.

## Migraciones
El esquema de la base evoluciona con la aplicación. Una **migración** es un archivo versionado que describe un cambio («agregar la columna convenio a clientes») y, opcionalmente, cómo revertirlo. Herramientas: las migraciones de Prisma, Knex o Drizzle, Flyway y Liquibase en Java, Alembic en Python. Reglas:
1. Las migraciones se versionan en Git junto al código y se aplican **en orden**; la base guarda una tabla con las ya aplicadas.
2. **Nunca** se edita una migración ya aplicada en producción: se escribe otra.
3. Se ejecutan automáticamente en el despliegue, antes de que la nueva versión reciba tráfico.
4. Los cambios incompatibles se hacen en **varios pasos** para no detener el sistema (patrón *expandir y contraer*): para renombrar una columna, primero se agrega la nueva, se escribe en ambas, se copian los datos, se cambia la lectura y, en un despliegue posterior, se borra la vieja.
5. En tablas grandes, operaciones como agregar una columna con valor por defecto o crear un índice pueden bloquear la tabla: se usan las variantes concurrentes y se prueban con datos de tamaño real.

## Ejemplo resuelto: "too many connections" en la quincena
El día de pago, PatioApp recibe tres veces más tráfico y la API empieza a responder con el error "sorry, too many clients already".
1. **Causa:** cada función sin servidor creaba un grupo de 10 conexiones; con 30 instancias activas, eran 300 conexiones contra un límite de 100.
2. **Primera corrección:** bajar el grupo por instancia a 2 conexiones y poner un pooler (PgBouncer en modo transacción) entre las funciones y la base: 300 conexiones lógicas comparten 20 reales.
3. **Segunda causa:** una ruta de reporte abría una transacción, llamaba a la API de SUNAT (2 a 5 segundos) y después confirmaba: mantenía la conexión y los bloqueos durante toda la espera. Se separó: primero se guarda la salida y se confirma, luego se emite el comprobante en una tarea en segundo plano con estado «pendiente».
4. **Tercera:** el listado de estadías del día hacía N+1 consultas a clientes a través del ORM; se reemplazó por una sola consulta con JOIN.
5. **Resultado:** la quincena siguiente, con el mismo tráfico, la base usó como máximo 18 conexiones y el tiempo de respuesta se mantuvo por debajo de 150 ms.`,
  links: [['m10.index', 'transacciones, aislamiento e interbloqueos'], ['m10.join', 'el problema N+1 y los planes de ejecución'], ['m16.web', 'la inyección SQL y otras vulnerabilidades web']],
  read: 'Documentación de node-postgres ("Pooling", "Transactions"); Karwin, *SQL Antipatterns* (2010); Sadalage y Ambler, *Refactoring Databases* (2006).',
  terms: [
    ['Grupo de conexiones', 'conjunto de conexiones abiertas que la aplicación reutiliza entre consultas', ['Pool.', 'max: 10.', 'PgBouncer.']],
    ['Consulta parametrizada', 'consulta en la que los valores se envían separados del texto SQL', ['$1.', 'Contra la inyección.', 'Siempre.']],
    ['Inyección SQL', 'ataque que introduce código SQL a través de datos concatenados en una consulta', ["' OR '1'='1.", 'Heartland, 2008.', 'OWASP.']],
    ['Lista blanca', 'conjunto explícito de valores permitidos, usado para lo que no puede parametrizarse', ['Columnas de orden.', 'Nombres de tabla.', 'Validación.']],
    ['ORM', 'herramienta que mapea tablas a objetos y genera el SQL', ['Prisma.', 'Hibernate.', 'Cuidado con N+1.']],
    ['Migración', 'cambio versionado del esquema de la base de datos', ['Flyway.', 'En orden.', 'Nunca editar una aplicada.']],
    ['Expandir y contraer', 'técnica para cambiar el esquema en varios pasos compatibles sin detener el sistema', ['Agregar, copiar, cambiar, borrar.', 'Sin caída.', 'Varios despliegues.']],
    ['Pooler', 'servicio intermedio que hace que muchas conexiones lógicas compartan pocas conexiones reales a la base', ['PgBouncer.', 'Funciones sin servidor.', 'Modo transacción.']]
  ],
  q: [
    ['¿Por qué usar un grupo de conexiones en lugar de abrir una por petición?', 'Porque abrir conexiones es caro y muchas agotan el límite del servidor', ['Porque es obligatorio en SQL', 'Porque cifra los datos', 'Porque evita las transacciones'], 'Reutilizar pocas conexiones.', 2],
    ['¿Qué devuelve la consulta concatenada si la placa es «X\' OR \'1\'=\'1»?', 'Todas las estadías, porque la condición siempre es verdadera', ['Ninguna', 'Solo la placa X', 'Un error siempre'], 'Inyección SQL.', 2],
    ['El usuario elige la columna por la que ordenar. ¿Cómo se hace seguro?', 'Eligiendo la columna de una lista blanca en el código', ['Con un parámetro $1', 'Concatenando con comillas', 'Con un ORM siempre'], 'Los nombres de columna no se parametrizan.', 3],
    ['¿Por qué se libera la conexión en el bloque finally?', 'Para devolverla al grupo aunque haya error', ['Para confirmar la transacción', 'Para cerrar la base', 'Por estilo'], 'Si no, el grupo se agota.', 3],
    ['¿Qué problema tiene llamar a una API externa lenta dentro de una transacción abierta?', 'Mantiene la conexión y los bloqueos durante la espera', ['Ninguno', 'Cifra mal los datos', 'Duplica la tabla'], 'Transacciones cortas.', 3],
    ['¿Qué se hace con una migración ya aplicada en producción que tiene un error?', 'Se escribe una migración nueva que lo corrige', ['Se edita el archivo original', 'Se borra la tabla de migraciones', 'Se ignora'], 'Las migraciones son historia.', 2],
    ['¿Cómo se renombra una columna sin detener el sistema?', 'Con expandir y contraer: agregar la nueva, escribir en ambas, copiar, cambiar la lectura y luego borrar la vieja', ['Con un solo ALTER TABLE RENAME en el despliegue', 'Deteniendo el servidor un día', 'Creando otra base de datos'], 'Varios pasos compatibles.', 4],
    { tf: 'Un grupo de conexiones más grande siempre da mejor rendimiento.', v: false, e: 'Más conexiones compitiendo agregan bloqueos y cambios de contexto; se mide.', l: 2 },
    { tf: 'Un ORM puede producir el problema N+1 si no se revisa el SQL que genera.', v: true, e: 'Una consulta por cada elemento de una lista.', l: 2 },
    { c: 'Escribe «parametrizar(plantilla, valores)»: reemplaza en la plantilla cada "?" por $1, $2, ... en orden y devuelve { texto, valores }.', f: 'parametrizar', p: ['plantilla', 'valores'], t: [[['SELECT * FROM estadias WHERE placa = ? AND sede_id = ?', ['ABC-123', 2]], { texto: 'SELECT * FROM estadias WHERE placa = $1 AND sede_id = $2', valores: ['ABC-123', 2] }], [['SELECT 1', []], { texto: 'SELECT 1', valores: [] }]], sol: '  let i = 0;\n  return { texto: plantilla.replace(/\\?/g, () => \'$\' + (++i)), valores };', l: 2 },
    { c: 'Escribe «columnaOrden(pedida)»: devuelve la columna si está en la lista blanca [placa, entrada, salida, monto]; si no, "entrada".', f: 'columnaOrden', p: ['pedida'], t: [[['monto'], 'monto'], [['placa; DROP TABLE estadias'], 'entrada'], [['entrada'], 'entrada']], sol: '  return [\'placa\', \'entrada\', \'salida\', \'monto\'].includes(pedida) ? pedida : \'entrada\';', l: 1 },
    { c: 'Escribe «pendientesMigrar(todas, aplicadas)»: devuelve, en orden, las migraciones de «todas» que no están en «aplicadas».', f: 'pendientesMigrar', p: ['todas', 'aplicadas'], t: [[[['001_inicial', '002_convenio', '003_indices'], ['001_inicial']], ['002_convenio', '003_indices']], [[['001'], ['001']], []]], sol: '  const a = new Set(aplicadas);\n  return todas.filter(m => !a.has(m));', l: 1 }
  ],
  gen: function (g) {
    var bu = [['"SELECT * FROM t WHERE placa = \'" + placa + "\'"', 'Inseguro'], ['pool.query("SELECT * FROM t WHERE placa = $1", [placa])', 'Seguro'], ['"ORDER BY " + columnaDeListaBlanca', 'Seguro'], ['"ORDER BY " + req.query.orden', 'Inseguro'], ['knex("t").where({ placa })', 'Seguro'], ['"DELETE FROM t WHERE id = " + req.params.id', 'Inseguro']];
    bu.forEach(function (b) { g.mcq(2, '¿Es seguro frente a inyección SQL? ' + b[0], b[1], [b[1] === 'Seguro' ? 'Inseguro' : 'Seguro', 'Solo en PostgreSQL', 'Solo si hay HTTPS'], 'Parámetros o lista blanca, nunca concatenar datos del usuario.'); });
    var he = [['Mapea tablas a clases y genera el SQL', 'ORM'], ['Arma SQL con funciones del lenguaje sin esconder el modelo', 'Constructor de consultas'], ['Hace que muchas conexiones lógicas compartan pocas reales', 'Pooler'], ['Describe un cambio versionado del esquema', 'Migración']];
    he.forEach(function (h) { g.mcq(1, '¿Qué es? ' + h[0], h[1], ['ORM', 'Constructor de consultas', 'Pooler', 'Migración'].filter(function (x) { return x !== h[1]; }), 'Herramientas de acceso a datos.'); });
    g.times(5, function (R) { var inst = R.int(5, 40), pool = R.int(2, 10); g.input(2, 'Hay ' + inst + ' instancias de una función, cada una con un grupo de ' + pool + ' conexiones. ¿Cuántas conexiones puede abrir en total contra la base?', inst * pool, 'Instancias por tamaño del grupo.'); });
  },
  checks: [
    ['¿Qué es un grupo de conexiones y cómo se dimensiona?', 'Conexiones abiertas que se reutilizan; pequeño, empezando por núcleos por dos más discos y midiendo, con un pooler si hay muchas instancias.'],
    ['¿Cómo se evita la inyección SQL?', 'Con consultas parametrizadas para los valores y listas blancas para nombres de columnas o tablas.'],
    ['Describe el patrón correcto de una transacción en el código.', 'Una conexión para toda la transacción, BEGIN, operaciones, COMMIT, ROLLBACK ante error y liberar la conexión en finally; transacciones cortas.'],
    ['¿Qué reglas siguen las migraciones?', 'Versionadas y en orden, nunca editar una aplicada, automáticas en el despliegue y en varios pasos para cambios incompatibles.']
  ],
  cites: ['Karwin, B. (2010). *SQL Antipatterns*. Pragmatic Bookshelf.', 'Sadalage, P. y Ambler, S. (2006). *Refactoring Databases: Evolutionary Database Design*. Addison-Wesley.', 'Neward, T. (2006). The Vietnam of Computer Science. blogs.tedneward.com.', 'OWASP Foundation (2021). *OWASP Top 10: A03 Injection*. owasp.org.', 'Halfond, W., Viegas, J. y Orso, A. (2006). A Classification of SQL Injection Attacks and Countermeasures. *IEEE ISSSE*.'],
  project: { t: 'Capa de datos robusta',
    goal: 'Implementar el acceso a datos de una aplicación con grupo de conexiones, transacciones, migraciones y defensas contra la inyección.',
    steps: ['Configura PostgreSQL (local o administrado) y un grupo de conexiones con límites y tiempos de espera.', 'Escribe el esquema con migraciones versionadas, incluidas restricciones e índices.', 'Implementa un repositorio con consultas parametrizadas y una operación que use transacción con ROLLBACK y finally.', 'Escribe una prueba que intente una inyección SQL y verifique que no funciona, y otra que simule un fallo a mitad de la transacción.', 'Realiza un cambio de esquema con expandir y contraer, documentando cada paso.'],
    deliver: 'El repositorio con migraciones, repositorio de datos, pruebas y el documento del cambio de esquema.' },
  hito: ['Implementa en PatioApp la salida en una transacción que cierra la estadía, libera el espacio y registra la caja, con ROLLBACK ante error.', 'Agrega a PatioApp migraciones versionadas y un pooler para las funciones sin servidor.']
});
SDC.after('m10.app', 'm10.index');

S('m10', 'm10.ops', { title: 'Operar una base de datos: respaldos, seguridad y rendimiento',
  ask: '¿Qué práctica de operación de bases de datos se aplica aquí?',
  lesson: `
> **La idea en simple.** Los datos suelen ser lo más valioso de un sistema: el código se puede reescribir, pero los registros de diez años de clientes y cobros no. Operar una base de datos significa garantizar que esos datos **sobrevivan** a errores, fallas y ataques, que solo los vea quien debe, y que la base siga respondiendo rápido a medida que crece. Es trabajo silencioso que solo se nota cuando falta.

## Respaldos: lo que no se ha restaurado no existe
Un **respaldo** (*backup*) es una copia de los datos que permite recuperarlos tras un desastre: un disco que falla, un «DELETE» sin «WHERE», un ataque de ransomware, un proveedor que cierra. Hay varios tipos:
- **Lógico:** un archivo con las instrucciones SQL o los datos («pg_dump», «mysqldump»). Portable entre versiones, lento para bases grandes.
- **Físico:** una copia de los archivos de la base («pg_basebackup»). Rápido de restaurar, ligado a la versión.
- **Continuo con registro de transacciones:** un respaldo físico base más el archivo continuo del **WAL** (*write-ahead log*, el diario donde la base anota cada cambio antes de aplicarlo). Permite la **recuperación a un punto en el tiempo** (PITR): "restaurar la base tal como estaba el martes a las 10:41, un minuto antes del borrado accidental".
Dos números definen qué se necesita:
- **RPO** (*recovery point objective*): cuántos datos se pueden perder como máximo. Si el respaldo es diario, el RPO es de hasta 24 horas; con PITR, de segundos.
- **RTO** (*recovery time objective*): cuánto tiempo puede estar caído el sistema mientras se recupera.
La regla **3-2-1** sigue siendo la referencia: **3** copias de los datos, en **2** medios distintos, **1** de ellas fuera del sitio (y, frente al ransomware, al menos una **inmutable** o desconectada). Y la regla más importante: **un respaldo que nunca se ha restaurado no es un respaldo**. En enero de 2017, un administrador de GitLab borró por error el directorio de datos de la base principal; de los cinco mecanismos de respaldo que tenían, ninguno funcionaba como se esperaba, y perdieron seis horas de datos de producción. Lo publicaron con total transparencia, y el caso se convirtió en lección obligatoria: probar la restauración periódicamente, medir cuánto tarda y documentar el procedimiento.

## Alta disponibilidad
Un respaldo protege los datos, pero restaurarlo toma tiempo. Para que el sistema siga funcionando si el servidor principal cae, se usa **replicación**: uno o más servidores **réplica** reciben continuamente los cambios del principal. Si el principal falla, una réplica se **promueve** (*failover*), manual o automáticamente (con herramientas como Patroni para PostgreSQL, o lo que ofrecen los servicios administrados). Las réplicas también sirven para **lecturas**: los reportes pesados se envían a una réplica para no cargar al principal, sabiendo que puede ir unos milisegundos o segundos atrasada. Ojo: la replicación **no reemplaza** al respaldo, porque un «DELETE» accidental se replica fielmente en segundos.

## Seguridad de la base de datos
- **Mínimo privilegio:** la aplicación se conecta con un usuario que solo puede hacer lo que necesita (SELECT, INSERT, UPDATE en sus tablas), nunca como superusuario. Las migraciones usan otro usuario con permisos de esquema. Los analistas, un usuario de solo lectura sobre una réplica o sobre vistas que excluyen datos personales.
- **Red:** la base no debe ser accesible desde internet; solo desde la red privada de la aplicación o mediante listas de direcciones permitidas. Miles de bases MongoDB y Elasticsearch expuestas sin contraseña fueron borradas y "secuestradas" en 2017 por atacantes que dejaban una nota de rescate.
- **Cifrado** en tránsito (TLS entre la aplicación y la base) y en reposo (discos cifrados, lo que los servicios administrados hacen por defecto). Para datos especialmente sensibles, cifrado a nivel de columna.
- **Seguridad a nivel de fila** (*row-level security* en PostgreSQL): políticas que hacen que cada consulta solo vea las filas permitidas, por ejemplo, las de la sede del usuario. Es una defensa adicional para aplicaciones con varios clientes en la misma base.
- **Auditoría:** registrar quién accedió o cambió datos sensibles. La **Ley 29733** de protección de datos personales y su reglamento exigen medidas de seguridad proporcionales a la sensibilidad de los datos, y la Autoridad Nacional de Protección de Datos Personales puede sancionar su incumplimiento.
- **Datos en entornos de prueba:** nunca copiar la base de producción con datos personales a desarrollo; se usan datos sintéticos o **anonimizados** (placas, nombres y documentos reemplazados de forma consistente).

## Rendimiento y mantenimiento
- **Monitorear** lo que importa: consultas lentas (en PostgreSQL, la extensión «pg_stat_statements» lista las que más tiempo total consumen), conexiones activas, uso de disco y de memoria, atraso de las réplicas, bloqueos.
- **Mantenimiento:** en PostgreSQL, cada UPDATE y DELETE deja versiones viejas de las filas (por su modelo MVCC); el proceso **VACUUM** (automático con *autovacuum*) las limpia y actualiza las estadísticas que usa el optimizador. Una tabla muy actualizada con autovacuum mal configurado crece sin control (*bloat*) y se vuelve lenta.
- **Crecimiento:** cuando una tabla de registros históricos crece demasiado, se **particiona** por fecha (una partición por mes): las consultas del mes actual solo leen esa partición, y archivar o borrar un mes viejo es eliminar una partición, sin un DELETE de millones de filas.
- **Capacidad:** proyectar cuánto crecerán los datos y el tráfico, para escalar antes de que el disco se llene. Un disco lleno detiene la base por completo.

## Bases administradas
Los servicios administrados (Amazon RDS y Aurora, Google Cloud SQL, Azure Database, y otros más pequeños como Supabase o Neon) se encargan de instalar, actualizar, respaldar, replicar y monitorear. Para la mayoría de los equipos, sobre todo pequeños, son la opción sensata: el costo mensual es menor que el de una persona dedicada y que el de un desastre. Lo que **no** delegan: el diseño del esquema, los índices, las consultas, los permisos de la aplicación y la decisión de probar la restauración.

## Ejemplo resuelto: el DELETE del viernes
Un viernes a las 18:07, un supervisor de PatioApp ejecuta desde una herramienta de administración «DELETE FROM estadias WHERE sede_id = 3» queriendo borrar solo las de prueba de una sede nueva, pero la sede 3 es Lurín, con 140 000 estadías reales.
1. **Detección:** a las 18:15, los operadores reportan que el historial de Lurín está vacío.
2. **No empeorar:** se detiene la escritura en esa tabla y se avisa al equipo; no se intenta "arreglar a mano".
3. **Recuperación a un punto en el tiempo:** gracias al WAL archivado, se restaura en un servidor **aparte** la base tal como estaba a las 18:06.
4. **Reintegrar:** desde la copia restaurada se exportan solo las estadías de la sede 3 y se insertan en producción, verificando que no se pisan los registros creados después de las 18:07.
5. **Tiempo total:** 50 minutos, dentro del RTO de 2 horas; datos perdidos: ninguno.
6. **Prevención:** el usuario del supervisor pierde el permiso de DELETE sobre producción; los borrados masivos pasan por un script revisado que primero cuenta las filas afectadas y pide confirmación; y se programa una prueba de restauración mensual con medición del tiempo.`,
  links: [['m10.index', 'transacciones y el registro de cambios'], ['m16.priv', 'privacidad y protección de datos personales'], ['m15.incident', 'respuesta a incidentes y postmortems']],
  read: 'Documentación de PostgreSQL ("Backup and Restore", "High Availability", "Routine Vacuuming"); GitLab (2017), *Postmortem of database outage of January 31*; Kleppmann, *Designing Data-Intensive Applications*, capítulo 5.',
  terms: [
    ['Respaldo', 'copia de los datos que permite recuperarlos tras una pérdida', ['pg_dump.', 'Lógico o físico.', 'Probar la restauración.']],
    ['WAL', 'registro en el que la base anota cada cambio antes de aplicarlo', ['Write-ahead log.', 'Recuperación.', 'Replicación.']],
    ['Recuperación a un punto en el tiempo', 'restauración de la base al estado exacto de un instante pasado', ['PITR.', 'Respaldo base más WAL.', 'Antes del error.']],
    ['RPO', 'cantidad máxima de datos que se acepta perder, medida en tiempo', ['Recovery point objective.', 'Diario: 24 h.', 'PITR: segundos.']],
    ['RTO', 'tiempo máximo aceptable para recuperar el servicio', ['Recovery time objective.', 'Horas o minutos.', 'Se mide en simulacros.']],
    ['Regla 3-2-1', 'tres copias, en dos medios distintos, una fuera del sitio', ['Respaldos.', 'Una inmutable.', 'Contra ransomware.']],
    ['Failover', 'promoción de una réplica a servidor principal cuando este falla', ['Alta disponibilidad.', 'Patroni.', 'Automático o manual.']],
    ['Mínimo privilegio', 'principio de dar a cada usuario solo los permisos que necesita', ['Usuario de la aplicación.', 'Sin superusuario.', 'Solo lectura para analistas.']]
  ],
  q: [
    ['¿Qué permite la recuperación a un punto en el tiempo?', 'Restaurar la base tal como estaba en un instante exacto, por ejemplo antes de un borrado', ['Viajar al futuro de los datos', 'Evitar todos los errores', 'Replicar en tiempo real'], 'Respaldo base más WAL.', 2],
    ['Con un respaldo diario a medianoche, ¿cuál es el RPO máximo?', 'Hasta 24 horas de datos', ['Cero', 'Una hora', 'Una semana'], 'Se pierde lo ocurrido desde el último respaldo.', 2],
    ['¿Por qué la replicación no reemplaza al respaldo?', 'Porque un borrado accidental se replica también en las réplicas', ['Porque es más lenta', 'Porque cifra los datos', 'Porque no copia nada'], 'La réplica copia los errores.', 3],
    ['¿Qué enseñó el incidente de GitLab de 2017?', 'Que hay que probar la restauración de los respaldos periódicamente', ['Que no hay que usar PostgreSQL', 'Que los respaldos son innecesarios', 'Que la nube es insegura'], 'Ninguno de sus cinco mecanismos funcionó como esperaban.', 3],
    ['¿Con qué permisos debe conectarse la aplicación a la base?', 'Solo con los que necesita sobre sus tablas, nunca como superusuario', ['Como superusuario', 'Sin contraseña', 'Con permisos de todas las bases'], 'Mínimo privilegio.', 1],
    ['¿Qué hace VACUUM en PostgreSQL?', 'Limpia las versiones viejas de las filas y actualiza estadísticas', ['Borra la base', 'Comprime los respaldos', 'Cifra las tablas'], 'Consecuencia de MVCC.', 3],
    ['¿Qué ventaja tiene particionar por mes una tabla histórica enorme?', 'Las consultas recientes leen solo una partición y archivar un mes es eliminar una partición', ['Elimina la necesidad de índices', 'Hace la tabla más pequeña en disco siempre', 'Evita los respaldos'], 'Particionamiento por rango.', 4],
    { tf: 'Copiar la base de producción con datos personales a desarrollo es una buena práctica para probar con datos reales.', v: false, e: 'Se usan datos sintéticos o anonimizados.', l: 1 },
    { tf: 'La regla 3-2-1 recomienda tres copias, en dos medios distintos y una fuera del sitio.', v: true, e: 'Con al menos una inmutable frente al ransomware.', l: 1 },
    { c: 'Escribe «rpoHoras(horasEntreRespaldos, hayPitr)»: devuelve 0 si hay PITR (pérdida prácticamente nula); si no, las horas entre respaldos.', f: 'rpoHoras', p: ['horasEntreRespaldos', 'hayPitr'], t: [[[24, false], 24], [[24, true], 0], [[6, false], 6]], sol: '  return hayPitr ? 0 : horasEntreRespaldos;', l: 1 },
    { c: 'Escribe «cumple321(copias)»: recibe una lista de { medio, fueraDelSitio } y devuelve true si hay al menos 3 copias, al menos 2 medios distintos y al menos una fuera del sitio.', f: 'cumple321', p: ['copias'], t: [[[[{ medio: 'disco', fueraDelSitio: false }, { medio: 'nube', fueraDelSitio: true }, { medio: 'disco', fueraDelSitio: false }]], true], [[[{ medio: 'disco', fueraDelSitio: false }, { medio: 'disco', fueraDelSitio: false }, { medio: 'disco', fueraDelSitio: true }]], false], [[[{ medio: 'disco', fueraDelSitio: false }, { medio: 'nube', fueraDelSitio: true }]], false]], sol: '  return copias.length >= 3 && new Set(copias.map(c => c.medio)).size >= 2 && copias.some(c => c.fueraDelSitio);', l: 2 },
    { c: 'Escribe «particionDe(fechaISO)»: devuelve el nombre de la partición mensual, como "estadias_2026_11" para "2026-11-13T08:00:00".', f: 'particionDe', p: ['fechaISO'], t: [[['2026-11-13T08:00:00'], 'estadias_2026_11'], [['2025-01-31'], 'estadias_2025_01']], sol: '  return \'estadias_\' + fechaISO.slice(0, 4) + \'_\' + fechaISO.slice(5, 7);', l: 1 }
  ],
  gen: function (g) {
    var co = [['Recuperar la base tal como estaba a las 10:41', 'Recuperación a un punto en el tiempo'], ['Que el sistema siga si el servidor principal cae', 'Replicación con failover'], ['Que la aplicación no pueda borrar tablas', 'Mínimo privilegio'], ['Que cada sede solo vea sus filas', 'Seguridad a nivel de fila'], ['Archivar un mes de datos sin un DELETE masivo', 'Particionamiento'], ['Limpiar versiones viejas de filas en PostgreSQL', 'VACUUM']];
    var op = ['Recuperación a un punto en el tiempo', 'Replicación con failover', 'Mínimo privilegio', 'Seguridad a nivel de fila', 'Particionamiento', 'VACUUM'];
    co.forEach(function (c) { g.mcq(2, '¿Qué práctica o mecanismo resuelve esto? ' + c[0], c[1], op.filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Operación de bases de datos.'); });
    g.times(6, function (R) { var h = R.pick([1, 4, 6, 12, 24]); g.input(2, 'Si los respaldos se hacen cada ' + h + ' horas y no hay PITR, ¿cuántas horas de datos se pueden perder como máximo?', h, 'El RPO es el intervalo entre respaldos.'); });
    g.times(4, function (R) { var gb = R.int(50, 500), cr = R.int(5, 40); g.input(3, 'Una base ocupa ' + gb + ' GB y crece ' + cr + ' GB por mes. ¿En cuántos meses alcanzará los ' + (gb + cr * 6) + ' GB?', 6, 'Crecimiento lineal: (capacidad − actual) / crecimiento mensual.'); });
  },
  checks: [
    ['Diferencia respaldo lógico, físico y continuo, y explica RPO y RTO.', 'Lógico: SQL portable; físico: archivos, rápido; continuo: base más WAL para PITR; RPO es cuántos datos se pueden perder y RTO cuánto tiempo puede durar la recuperación.'],
    ['¿Por qué hay que probar la restauración y qué es la regla 3-2-1?', 'Porque un respaldo no probado puede no funcionar, como en GitLab 2017; tres copias, dos medios, una fuera del sitio.'],
    ['¿Qué medidas de seguridad se aplican a una base de datos?', 'Mínimo privilegio, sin exposición a internet, cifrado en tránsito y en reposo, seguridad a nivel de fila, auditoría y datos anonimizados fuera de producción.'],
    ['¿Qué se monitorea y mantiene para que una base siga siendo rápida?', 'Consultas lentas, conexiones, disco, atraso de réplicas y bloqueos; VACUUM, estadísticas, particionamiento y planificación de capacidad.']
  ],
  cites: ['GitLab (2017). *Postmortem of database outage of January 31*. about.gitlab.com.', 'Mohan, C. y otros (1992). ARIES: A Transaction Recovery Method. *ACM Transactions on Database Systems*, 17(1).', 'PostgreSQL Global Development Group. *PostgreSQL Documentation: Backup and Restore*. postgresql.org.', 'Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O\'Reilly.', 'Congreso de la República del Perú (2011). Ley 29733, Ley de Protección de Datos Personales, y su Reglamento (D.S. 016-2024-JUS).'],
  project: { t: 'Plan de continuidad de datos',
    goal: 'Diseñar, implementar y probar respaldos, seguridad y monitoreo para una base de datos real.',
    steps: ['Define el RPO y el RTO de una aplicación y justifícalos con el impacto en el negocio.', 'Configura respaldos (lógicos y, si es posible, continuos) siguiendo la regla 3-2-1.', 'Haz un simulacro: borra datos a propósito en una copia y restaura, midiendo el tiempo y comparándolo con el RTO.', 'Crea usuarios con mínimo privilegio para la aplicación, las migraciones y los analistas, y verifica que la base no es accesible desde internet.', 'Activa el registro de consultas lentas, identifica las tres más costosas y mejora al menos una.'],
    deliver: 'El plan escrito, los scripts de respaldo y restauración, el informe del simulacro y las mejoras de rendimiento.' },
  hito: ['Define el RPO y el RTO de PatioApp, configura respaldos continuos con PITR y realiza una prueba de restauración cronometrada.', 'Crea en PatioApp usuarios de base de datos con mínimo privilegio y un entorno de pruebas con datos anonimizados.']
});
SDC.after('m10.ops', 'm10.app');


SDC.D('m10.app', `## Cachés delante de la base
Cuando la misma consulta se repite miles de veces con el mismo resultado (la lista de tarifas, la ocupación por sede actualizada cada minuto), conviene guardar el resultado en una **caché** en memoria (Redis, Memcached o la memoria del propio proceso) y no molestar a la base. El patrón más común es **cache-aside**: la aplicación busca primero en la caché; si no está, consulta la base, guarda el resultado con un **tiempo de expiración** y lo devuelve. El problema difícil es la **invalidación**: cuando cambia una tarifa, la caché debe borrarse o actualizarse, o los usuarios verán precios viejos. Phil Karlton lo resumió en una frase célebre: "Solo hay dos cosas difíciles en informática: invalidar cachés y ponerle nombre a las cosas". Regla práctica: cachear solo lo que se lee mucho más de lo que se escribe, con expiraciones cortas, y medir antes y después.`);

SDC.D('m10.ops', `## Actualizar la versión del motor
Las bases de datos reciben versiones nuevas con correcciones de seguridad y mejoras; PostgreSQL, por ejemplo, publica una versión mayor por año y la mantiene cinco años. Quedarse en una versión sin soporte significa no recibir parches. Las versiones **menores** (de 16.2 a 16.3) solo corrigen errores y se aplican reiniciando el servidor. Las **mayores** (de 15 a 16) cambian el formato interno y requieren un procedimiento: «pg_upgrade» sobre los mismos archivos, o una réplica lógica en la versión nueva que se sincroniza y luego recibe el tráfico, con un corte de segundos. En todos los casos: probar antes con una copia de producción, revisar las notas de la versión en busca de cambios incompatibles y tener un plan para volver atrás.

## Documentar la operación
Cada procedimiento crítico (restaurar, promover una réplica, rotar contraseñas, agregar espacio) debe estar escrito en un **runbook**: pasos exactos, comandos, cómo verificar que funcionó y a quién avisar. En una emergencia, a las tres de la mañana, nadie debería improvisar. Los runbooks se prueban en los simulacros y se corrigen cada vez que algo no coincide con la realidad.`);
})();
