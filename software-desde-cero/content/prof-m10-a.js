(function () {
var D = SDC.D;
SDC.XM('m10', { prof: true });

D('m10.model', `## Restricciones: que la base defienda los datos
Una base de datos no solo guarda: también puede **rechazar** lo que no tiene sentido. Las restricciones son reglas que el motor verifica en cada inserción y actualización, sin importar qué programa escriba:
~~~txt
CREATE TABLE estadias (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  placa       VARCHAR(7)  NOT NULL CHECK (placa ~ '^[A-Z0-9]{3}-[0-9]{3}$'),
  espacio_id  INT         NOT NULL REFERENCES espacios(id),
  entrada     TIMESTAMPTZ NOT NULL DEFAULT now(),
  salida      TIMESTAMPTZ,
  monto       NUMERIC(10,2) CHECK (monto >= 0),
  CHECK (salida IS NULL OR salida >= entrada)
);
CREATE UNIQUE INDEX una_abierta_por_placa ON estadias (placa) WHERE salida IS NULL;
~~~
- **NOT NULL** obliga a dar un valor.
- **CHECK** valida una condición: formato de la placa, montos no negativos, salida posterior a la entrada.
- **REFERENCES** (clave foránea) impide apuntar a un espacio que no existe y, según se configure («ON DELETE RESTRICT» o «CASCADE»), qué pasa al borrar el espacio.
- **UNIQUE**, incluso parcial: el índice único con «WHERE salida IS NULL» garantiza que una unidad no tenga dos estadías abiertas a la vez, una regla del negocio que ningún error de la aplicación podrá romper.
La aplicación también valida (para dar mensajes amables), pero la base es la **última línea de defensa**: hay scripts, migraciones, otras aplicaciones y personas con acceso directo que no pasan por tu validación.

## Tipos que importan en el Perú
Dos decisiones de tipos causan errores frecuentes. El **dinero** nunca se guarda en tipos de coma flotante («REAL», «DOUBLE»), porque 0,1 + 0,2 no da exactamente 0,3: se usa «NUMERIC(12,2)» o enteros en céntimos. Las **fechas con hora** se guardan con zona horaria («TIMESTAMPTZ» en PostgreSQL), que internamente se almacena en UTC y se muestra en la zona de quien consulta; Lima es UTC−5 todo el año, pero un sistema con sedes o usuarios en otros países, o con servidores en la nube configurados en UTC, necesita esa información. Los **códigos** como el DNI (8 dígitos) o el RUC (11) se guardan como texto, no como números: tienen ceros a la izquierda y no se suman.

 Y los **nombres** y textos libres se guardan en UTF-8, para que «Ñañez», «Huamán» o «Pucallpa» no se conviertan en signos extraños al pasar de un sistema a otro.`);

D('m10.join', `## Leer un plan de ejecución
Cuando una consulta es lenta, la pregunta no es "¿qué escribí?" sino "¿qué hizo el motor?". «EXPLAIN ANALYZE» lo muestra en PostgreSQL (en MySQL, «EXPLAIN ANALYZE» desde la 8.0):
~~~txt
EXPLAIN ANALYZE
SELECT s.nombre, count(*) FROM estadias e JOIN espacios p ON p.id = e.espacio_id JOIN sedes s ON s.id = p.sede_id
WHERE e.entrada >= '2026-11-01' GROUP BY s.nombre;

HashAggregate  (actual time=212.4..212.5 rows=6)
  -> Hash Join  (actual time=3.1..180.2 rows=48210)
       Hash Cond: (p.sede_id = s.id)
       -> Hash Join  (rows=48210)
            -> Seq Scan on estadias e  (rows=48210)  Filter: (entrada >= '2026-11-01')  Rows Removed by Filter: 1950112
            -> Hash -> Seq Scan on espacios p  (rows=1200)
       -> Hash -> Seq Scan on sedes s  (rows=6)
Execution Time: 213.0 ms
~~~
Se lee de adentro hacia afuera. La línea reveladora es el **Seq Scan** sobre «estadias» que descarta casi dos millones de filas para quedarse con 48 mil: falta un índice sobre «entrada». Con «CREATE INDEX ON estadias (entrada)», el plan cambia a un **Index Scan** o **Bitmap Index Scan** y el tiempo baja a unos 30 ms. Otras señales comunes: una estimación de filas muy distinta de la real (estadísticas desactualizadas: «ANALYZE»), un **Nested Loop** sobre muchas filas sin índice en la columna de unión, o un ordenamiento que no cabe en memoria y usa disco («external merge»).

## Paginación que escala
«LIMIT 20 OFFSET 100000» parece inocente, pero el motor debe leer y descartar las primeras 100 000 filas: cada página es más lenta que la anterior. La alternativa es la **paginación por clave** (*keyset* o por cursor): recordar el último valor visto y pedir los siguientes.
~~~txt
SELECT id, placa, entrada FROM estadias
WHERE (entrada, id) < ('2026-11-12 18:40', 98231)
ORDER BY entrada DESC, id DESC LIMIT 20;
~~~
Con un índice sobre «(entrada, id)», cada página cuesta lo mismo, sin importar la profundidad. Es lo que usan los "cargar más" de las redes sociales. Su límite: no se puede saltar directamente a la página 500, lo que rara vez alguien necesita.`);

D('m10.norm', `## Normalizar paso a paso con un ejemplo
Una hoja de cálculo de la garita tiene estas columnas: placa, marca, modelo, cliente, RUC del cliente, dirección del cliente, sede, dirección de la sede, entrada, salida, monto. Cada fila es una estadía.
1. **Primera forma normal:** cada celda tiene un solo valor. Si una columna "servicios" decía "lavado, revisión", se separa en una tabla «servicios_estadia» con una fila por servicio.
2. **Identificar dependencias:** la marca y el modelo dependen de la placa; la dirección y el nombre del cliente dependen del RUC; la dirección de la sede depende de la sede; entrada, salida y monto dependen de la estadía.
3. **Separar:** «unidades(placa, marca, modelo, ruc_cliente)», «clientes(ruc, nombre, direccion)», «sedes(id, nombre, direccion)», «estadias(id, placa, sede_id, entrada, salida, monto)».
4. **Verificar con anomalías:** cambiar la dirección de un cliente ahora se hace en una fila, no en las 3000 estadías de sus unidades; registrar un cliente nuevo no exige inventar una estadía; borrar la última estadía de una unidad no borra los datos del cliente.
5. **Decisión consciente:** el monto, que podría recalcularse con la tarifa, se **guarda** en la estadía, porque las tarifas cambian y el monto cobrado es un hecho histórico (y forma parte del comprobante emitido a SUNAT). Guardar un valor derivado es legítimo cuando representa lo que ocurrió en un momento, no lo que se calcularía hoy.
El resultado elimina la redundancia sin perder información: con JOIN se reconstruye exactamente la hoja original.

## Claves naturales que dejan de serlo
La placa parece una clave natural perfecta, hasta que una unidad se reemplaza de placa, se registra con un error de digitación o llega un vehículo con placa extranjera de otro formato. Por eso es habitual usar una **clave sustituta** (un identificador numérico o UUID sin significado) como clave primaria y mantener la placa como columna con restricción **UNIQUE**: si la placa cambia, se actualiza una columna, y todas las referencias siguen apuntando al mismo identificador.`);

D('m10.index', `## Índices compuestos y el orden de las columnas
Un índice sobre varias columnas, como «(sede_id, entrada)», funciona como una guía telefónica ordenada por apellido y luego por nombre: sirve para buscar por apellido, o por apellido y nombre, pero no por nombre solo. Es la regla del **prefijo izquierdo**:
- «WHERE sede_id = 3» usa el índice.
- «WHERE sede_id = 3 AND entrada >= '2026-11-01'» lo usa por completo, y es el caso ideal.
- «WHERE entrada >= '2026-11-01'» (sin sede) en general no lo aprovecha.
Por eso el orden se decide según las consultas: primero las columnas que se comparan por igualdad, después las de rango u ordenamiento. Un **índice que cubre** la consulta (que incluye todas las columnas que se leen, por ejemplo con «INCLUDE (monto)» en PostgreSQL) permite responder sin visitar la tabla.

## Lo que cuestan los índices
Cada índice acelera lecturas pero **encarece escrituras**: cada INSERT y cada UPDATE de una columna indexada debe actualizar también el índice, y los índices ocupan espacio y memoria. Una tabla de registros con diez índices puede escribir varias veces más lento que con dos. Buenas prácticas: crear índices a partir de consultas reales y medidas (no "por si acaso"), revisar periódicamente los que nunca se usan (PostgreSQL lo informa en «pg_stat_user_indexes») y crearlos en producción con «CREATE INDEX CONCURRENTLY» para no bloquear la tabla.

## Interbloqueos en la base de datos
Dos transacciones pueden bloquearse mutuamente: la primera actualiza la estadía A y luego quiere la B; la segunda actualizó la B y quiere la A. El motor detecta el ciclo y **aborta** una de ellas con un error de *deadlock*. La aplicación debe estar preparada para **reintentar** la transacción abortada, y el riesgo baja si todas las transacciones toman los recursos en el mismo orden (por ejemplo, por identificador ascendente) y son cortas: nada de esperar una respuesta de una API externa con una transacción abierta.`);

D('m10.nosql', `## Bases especializadas que vale la pena conocer
- **Series de tiempo** (TimescaleDB, InfluxDB): optimizadas para datos con marca de tiempo que llegan en orden, como las lecturas de sensores o las métricas de servidores. Comprimen y agregan por intervalos de forma muy eficiente, y borran automáticamente los datos viejos.
- **Búsqueda de texto** (Elasticsearch, OpenSearch, Meilisearch): índices invertidos con tolerancia a errores, relevancia, sinónimos y facetas. Se usan junto a la base principal, no en lugar de ella.
- **Vectoriales** (pgvector en PostgreSQL, Pinecone, Qdrant): guardan **embeddings** (vectores que representan el significado de un texto o una imagen) y buscan los más parecidos. Son la base de la búsqueda semántica y de los sistemas que dan contexto a modelos de lenguaje.
- **Grafos** (Neo4j): para recorridos de muchas relaciones, como redes de contactos o detección de fraude.
- **Embebidas** (SQLite): una base completa en un archivo, sin servidor. Es la base de datos más desplegada del mundo: está en cada teléfono Android e iPhone, en los navegadores y en millones de aplicaciones. Ideal para aplicaciones de escritorio, móviles y para sedes que deben funcionar sin conexión.

## Cómo decidir sin modas
Para la mayoría de las aplicaciones, la respuesta por defecto es una base **relacional** (PostgreSQL es la opción más versátil hoy, con soporte de JSON, texto completo, geografía y vectores). Se agrega una base especializada cuando hay un problema concreto que la relacional no resuelve bien y que se puede **medir**: volumen de escritura que no escala, búsquedas de texto con relevancia, latencia de una caché. Cada base adicional es otro sistema que respaldar, monitorear, asegurar y sincronizar. La pregunta útil no es "¿qué base es más moderna?", sino "¿qué consultas haré, con qué volumen, y qué garantías de consistencia necesito?".`);
})();
