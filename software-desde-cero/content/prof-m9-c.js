(function () {
var S = SDC.S;

S('m9', 'm9.deploy', { title: 'Publicar en la web: hosting, dominios y despliegue',
  ask: '¿Cómo publicarías y desplegarías esta aplicación web?',
  lesson: `
> **La idea en simple.** Una aplicación que solo corre en tu computadora no existe para nadie más. Publicarla significa elegir dónde vivirá (hosting), cómo la encontrarán (dominio y DNS), cómo llegará rápido a cualquier lugar (CDN) y cómo se actualizará sin romperse (despliegue). Hoy, servicios como Vercel, Netlify o Cloudflare hacen que publicar sea cuestión de minutos, pero entender qué ocurre por debajo es lo que te permite resolver los problemas cuando aparecen.

## Qué se publica: estático o dinámico
- Un **sitio estático** es un conjunto de archivos (HTML, CSS, JavaScript, imágenes) que se entregan tal cual. No necesita un servidor que ejecute código: basta un servicio que sirva archivos. Es lo más rápido, barato y seguro (no hay servidor que atacar), y alcanza para muchísimas cosas: páginas de presentación, documentación, aplicaciones de una sola página que hablan con una API, y esta misma carrera.
- Una **aplicación dinámica** necesita ejecutar código en el servidor en cada petición: consultar una base de datos, autenticar, calcular.
Entre ambos extremos, los frameworks modernos ofrecen modos intermedios:
| Modo | Cuándo se genera el HTML | Ejemplo de uso |
|---|---|---|
| Generación estática (SSG) | al construir | blog, documentación, catálogo que cambia poco |
| Renderizado en el servidor (SSR) | en cada petición | panel con datos del usuario |
| Regeneración incremental (ISR) | al construir y luego cada cierto tiempo o a pedido | catálogo con precios que cambian cada hora |
| Renderizado en el cliente (CSR) | en el navegador, con JavaScript | aplicaciones muy interactivas detrás de un inicio de sesión |

## Dónde se publica
- **Hosting estático con CDN** (Vercel, Netlify, Cloudflare Pages, GitHub Pages): subes los archivos (o conectas el repositorio) y se distribuyen en servidores de todo el mundo. Gratis o casi para proyectos pequeños.
- **Funciones sin servidor** (*serverless*: Vercel Functions, AWS Lambda, Netlify Functions): escribes funciones que el proveedor ejecuta bajo demanda, solo cuando llega una petición; pagas por uso y no administras servidores. Limitaciones: tiempo máximo por ejecución, **arranque en frío** (la primera petición tras un rato inactiva tarda más) y no mantienen estado entre llamadas, así que la base de datos debe estar en otro servicio.
- **Funciones en el borde** (*edge functions*): versiones livianas que corren en los mismos puntos de la CDN, cerca del usuario, con arranque casi instantáneo pero un entorno más limitado.
- **Plataformas de aplicaciones** (Render, Railway, Fly.io, Heroku): ejecutan tu servidor completo (Node, Python) de forma continua, con base de datos administrada opcional. Útiles para APIs con conexiones persistentes, WebSockets o tareas en segundo plano.
- **Máquinas virtuales y contenedores** en la nube (AWS, Google Cloud, Azure, DigitalOcean): máximo control y máxima responsabilidad (actualizaciones, seguridad, escalado). Lo verás en DevOps.
Una combinación muy común para proyectos pequeños y medianos: frontend estático y funciones en Vercel o Netlify, y la base de datos en un servicio administrado (Supabase, Neon, PlanetScale, Turso).

## Dominios y DNS
Un **dominio** («patioapp.pe») se alquila por años a un **registrador**. Los dominios «.pe» los administra **Punto.pe** (antes NIC.pe, de la Red Científica Peruana) a través de registradores acreditados; los «.com», Verisign, a través de muchos registradores. Al comprar un dominio se configuran sus **registros DNS**, que dicen a dónde apunta cada nombre:
| Registro | Para qué sirve | Ejemplo |
|---|---|---|
| A / AAAA | nombre → dirección IPv4 / IPv6 | patioapp.pe → 76.76.21.21 |
| CNAME | nombre → otro nombre | www → cname.vercel-dns.com |
| MX | servidores de correo del dominio | correo en Google Workspace |
| TXT | texto libre: verificaciones, SPF, DKIM | verificar la propiedad ante Vercel |
| NS | qué servidores son la autoridad del dominio | delegar el DNS a Cloudflare |
Cada registro tiene un **TTL** (tiempo de vida en caché, en segundos). Un TTL de 3600 significa que un cambio puede tardar hasta una hora en verse en todos lados: antes de una migración, conviene bajarlo con anticipación. El famoso "espera hasta 48 horas a que se propague" viene de TTL altos y cachés obstinadas. Para el correo del dominio, los registros **SPF**, **DKIM** y **DMARC** (en TXT) evitan que tus correos lleguen como spam y que otros envíen correo falsificado en tu nombre.

## CDN: el contenido cerca del usuario
Una **CDN** (*content delivery network*) es una red de servidores repartidos por el mundo que guardan copias de tu contenido. El usuario de Arequipa recibe los archivos desde el punto más cercano (Lima o São Paulo) en lugar de un servidor en Virginia, lo que reduce la latencia de cientos a decenas de milisegundos. Akamai, fundada en 1998 por Tom Leighton y Danny Lewin en el MIT, inventó el negocio; hoy Cloudflare, Fastly, CloudFront y las propias plataformas como Vercel integran la CDN por defecto. La CDN respeta las cabeceras de caché que envías («Cache-Control»), así que una configuración correcta es lo que decide si cada visita sale de la caché o vuelve a tu servidor. Además absorbe picos de tráfico y ataques de denegación de servicio.

## Despliegue continuo y entornos
El flujo moderno conecta el repositorio con la plataforma:
1. Cada **push a una rama** crea un **despliegue de vista previa** con su propia URL: el equipo y quien revisa el PR ven el cambio funcionando antes de aceptarlo.
2. El **merge a la rama principal** despliega a **producción** automáticamente.
3. Cada despliegue es **inmutable** y conserva su URL: volver a la versión anterior (*rollback*) es instantáneo, porque solo se cambia a cuál apunta el dominio.
Las **variables de entorno** se configuran por entorno (desarrollo, vista previa, producción) en el panel de la plataforma: la vista previa usa una base de datos de prueba, nunca la de producción. Los secretos no van en el repositorio ni en el código del frontend: todo lo que se envía al navegador es público, así que una clave de API privada solo puede usarse desde funciones del servidor. En los frameworks, las variables con prefijos como «NEXT_PUBLIC_» o «VITE_» se incrustan en el JavaScript del navegador: nunca pongas un secreto en ellas.

## Después de publicar
Publicar no es el final. Conviene tener desde el primer día:
- **Monitoreo de disponibilidad** (un servicio que visita la página cada minuto y avisa si falla).
- **Registro de errores del frontend** (Sentry o similares), porque los errores en el navegador del usuario no aparecen en los registros del servidor.
- **Analítica respetuosa** de la privacidad, que mida visitas y rendimiento real (Core Web Vitals) sin rastrear personas.
- **Límites de gasto** y alertas de facturación: un error en una función sin servidor que se llama en bucle puede generar una factura sorpresa.
- **Respaldos** de la base de datos, probados restaurándolos.

## Ejemplo resuelto: publicar PatioApp en Vercel con dominio propio
1. **Repositorio:** el frontend (Vite) y las funciones de API («/api/*.js») están en un repositorio de GitHub. Se importa el repositorio en Vercel, que detecta el framework y configura el comando de construcción y la carpeta de salida.
2. **Variables:** «DATABASE_URL» apunta a una base PostgreSQL administrada; se define una para producción y otra (de prueba) para las vistas previas. La clave de la API de facturación electrónica solo se usa desde las funciones.
3. **Dominio:** se compra «patioapp.pe» en un registrador acreditado. En el DNS se crea un registro **A** del dominio raíz hacia la IP que indica Vercel y un **CNAME** de «www» hacia su nombre; Vercel emite el certificado TLS automáticamente con Let's Encrypt.
4. **Caché:** los archivos con hash se sirven con caché de un año; el HTML, sin caché, para que cada despliegue se vea de inmediato.
5. **Flujo:** cada PR genera una URL de vista previa que el supervisor revisa en su teléfono; al aceptar, se despliega a producción. Un error detectado una hora después se resuelve con *rollback* en un clic mientras se corrige.
6. **Vigilancia:** monitoreo de disponibilidad, registro de errores del frontend y una alerta si el gasto mensual supera el presupuesto.`,
  links: [['m9.tcp', 'DNS, TLS y el costo de la latencia'], ['m15.cicd', 'integración y despliegue continuos'], ['m15.cloud', 'la nube y sus modelos de servicio']],
  read: 'Documentación de Vercel ("Deployments", "Domains", "Environment Variables"); MDN, "HTTP caching"; Cloudflare Learning Center, "What is DNS?" y "What is a CDN?".',
  terms: [
    ['Sitio estático', 'sitio formado por archivos que se entregan sin ejecutar código en el servidor', ['HTML, CSS, JS.', 'Barato y seguro.', 'GitHub Pages.']],
    ['Renderizado en el servidor', 'generación del HTML en el servidor en cada petición', ['SSR.', 'Datos frescos.', 'Next.js.']],
    ['Función sin servidor', 'código que el proveedor ejecuta bajo demanda sin que administres servidores', ['Serverless.', 'Arranque en frío.', 'Pago por uso.']],
    ['Registro DNS', 'entrada que asocia un nombre de dominio con una dirección u otro dato', ['A, CNAME, MX, TXT.', 'TTL.', 'Propagación.']],
    ['TTL', 'tiempo durante el cual un registro DNS o una respuesta puede guardarse en caché', ['Segundos.', 'Bajar antes de migrar.', 'Propagación.']],
    ['CDN', 'red de servidores distribuidos que entregan copias del contenido desde el punto más cercano al usuario', ['Akamai, 1998.', 'Cloudflare.', 'Menos latencia.']],
    ['Despliegue de vista previa', 'publicación automática de una rama con su propia URL para revisarla antes de producción', ['Por PR.', 'Vercel.', 'Revisión visual.']],
    ['Rollback', 'vuelta rápida a una versión anterior desplegada', ['Despliegues inmutables.', 'Un clic.', 'Mientras se corrige.']]
  ],
  q: [
    ['¿Qué necesita un sitio estático para publicarse?', 'Solo un servicio que sirva archivos, sin ejecutar código en el servidor', ['Un servidor de base de datos', 'Una máquina virtual dedicada', 'Un contenedor con Node siempre'], 'Archivos tal cual.', 1],
    ['¿Qué registro DNS hace que www.patioapp.pe apunte a otro nombre?', 'CNAME', ['MX', 'TXT', 'NS'], 'Nombre a nombre.', 2],
    ['¿Por qué conviene bajar el TTL de un registro días antes de una migración?', 'Para que el cambio se vea pronto en todas las cachés', ['Para que el dominio sea más barato', 'Para cifrar el tráfico', 'Para aumentar la seguridad del correo'], 'Las cachés respetan el TTL.', 3],
    ['¿Qué es el arranque en frío de una función sin servidor?', 'La demora extra de la primera petición tras un periodo inactivo', ['Un error de la base de datos', 'Un ataque', 'El tiempo de construcción'], 'El proveedor debe iniciar el entorno.', 2],
    ['¿Dónde nunca debe ir una clave privada de API?', 'En variables incrustadas en el JavaScript del navegador, como VITE_ o NEXT_PUBLIC_', ['En las variables de entorno de las funciones del servidor', 'En el gestor de secretos', 'En el panel de la plataforma'], 'Todo lo que llega al navegador es público.', 3],
    ['¿Qué permite un despliegue inmutable?', 'Volver a una versión anterior al instante cambiando a cuál apunta el dominio', ['Editar archivos en producción', 'Evitar las pruebas', 'Bajar el TTL'], 'Rollback rápido.', 2],
    ['Un catálogo cambia sus precios cada hora y debe ser muy rápido. ¿Qué modo de renderizado conviene?', 'Regeneración incremental (ISR)', ['Solo renderizado en el cliente', 'SSR sin caché en cada petición', 'Generación estática sin regenerar nunca'], 'Estático con regeneración periódica.', 4],
    { tf: 'Una CDN acerca el contenido al usuario y además ayuda a absorber picos de tráfico.', v: true, e: 'Sirve copias desde muchos puntos.', l: 1 },
    { tf: 'Las vistas previas de cada rama deben usar la base de datos de producción para probar con datos reales.', v: false, e: 'Usan una base de prueba; nunca la de producción.', l: 2 },
    { c: 'Escribe «tipoRegistro(uso)»: "ipv4" → A, "ipv6" → AAAA, "alias" → CNAME, "correo" → MX, "verificacion" → TXT, "delegar" → NS; otro → null.', f: 'tipoRegistro', p: ['uso'], t: [[['ipv4'], 'A'], [['alias'], 'CNAME'], [['correo'], 'MX'], [['verificacion'], 'TXT'], [['otro'], null]], sol: '  return { ipv4: \'A\', ipv6: \'AAAA\', alias: \'CNAME\', correo: \'MX\', verificacion: \'TXT\', delegar: \'NS\' }[uso] || null;', l: 1 },
    { c: 'Escribe «cacheControl(archivo)»: si el nombre tiene un hash (un punto, 6 a 10 caracteres hexadecimales y otro punto, como app.3f9a1c.js) devuelve "public, max-age=31536000, immutable"; si termina en .html devuelve "no-cache"; si no, "public, max-age=3600".', f: 'cacheControl', p: ['archivo'], t: [[['app.3f9a1c.js'], 'public, max-age=31536000, immutable'], [['index.html'], 'no-cache'], [['logo.png'], 'public, max-age=3600'], [['estilos.a1b2c3d4.css'], 'public, max-age=31536000, immutable']], sol: '  if (/\\.[0-9a-f]{6,10}\\./.test(archivo)) return \'public, max-age=31536000, immutable\';\n  if (archivo.endsWith(\'.html\')) return \'no-cache\';\n  return \'public, max-age=3600\';', l: 3 },
    { c: 'Escribe «esSecretoExpuesto(nombre)»: true si una variable cuyo nombre contiene SECRET, KEY, TOKEN o PASSWORD empieza con VITE_ o NEXT_PUBLIC_ (se expondría en el navegador).', f: 'esSecretoExpuesto', p: ['nombre'], t: [[['VITE_API_KEY'], true], [['NEXT_PUBLIC_SITE_URL'], false], [['SUNAT_TOKEN'], false], [['NEXT_PUBLIC_STRIPE_SECRET'], true]], sol: '  return /^(VITE_|NEXT_PUBLIC_)/.test(nombre) && /(SECRET|KEY|TOKEN|PASSWORD)/.test(nombre);', l: 2 }
  ],
  gen: function (g) {
    var mo = [['Documentación que cambia una vez por semana', 'Generación estática (SSG)'], ['Panel con los datos del usuario que inició sesión, indexable', 'Renderizado en el servidor (SSR)'], ['Catálogo con precios que se actualizan cada hora', 'Regeneración incremental (ISR)'], ['Editor muy interactivo detrás de un inicio de sesión', 'Renderizado en el cliente (CSR)']];
    mo.forEach(function (m) { g.mcq(3, '¿Qué modo de renderizado conviene? ' + m[0], m[1], ['Generación estática (SSG)', 'Renderizado en el servidor (SSR)', 'Regeneración incremental (ISR)', 'Renderizado en el cliente (CSR)'].filter(function (x) { return x !== m[1]; }), 'Modos de renderizado.'); });
    var dn = [['Apuntar el dominio raíz a una dirección IPv4', 'A'], ['Apuntar www a cname.vercel-dns.com', 'CNAME'], ['Indicar los servidores de correo', 'MX'], ['Verificar la propiedad del dominio', 'TXT'], ['Delegar el DNS a otro proveedor', 'NS'], ['Apuntar a una dirección IPv6', 'AAAA']];
    dn.forEach(function (d) { g.mcq(2, '¿Qué registro DNS se usa para esto? ' + d[0], d[1], ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'].filter(function (x) { return x !== d[1]; }).slice(0, 3), 'Registros DNS.'); });
    g.times(4, function (R) { var t = R.pick([300, 900, 3600, 14400, 86400]); g.input(2, 'Un registro DNS tiene TTL de ' + t + ' segundos. ¿Cuántos minutos puede tardar como máximo en verse un cambio en una caché que lo acaba de guardar?', t / 60, 'TTL en segundos dividido entre 60.'); });
  },
  checks: [
    ['Diferencia un sitio estático de una aplicación dinámica y describe SSG, SSR, ISR y CSR.', 'El estático se sirve sin ejecutar código; SSG genera al construir, SSR en cada petición, ISR regenera periódicamente y CSR genera en el navegador.'],
    ['¿Qué opciones de hosting existen y cuándo conviene cada una?', 'Estático con CDN para sitios y SPA; funciones sin servidor para APIs livianas; plataformas de aplicaciones para servidores persistentes; máquinas y contenedores para control total.'],
    ['Explica los registros DNS principales y el TTL.', 'A y AAAA a direcciones, CNAME a otro nombre, MX para correo, TXT para verificaciones y NS para delegar; el TTL fija cuánto se guarda en caché.'],
    ['¿Qué hace un flujo de despliegue continuo con vistas previas y cómo se protegen los secretos?', 'Cada rama genera una URL de vista previa, el merge despliega a producción y el rollback es instantáneo; los secretos viven en variables del servidor por entorno, nunca en el código del navegador.']
  ],
  cites: ['Mockapetris, P. (1987). RFC 1034: Domain Names — Concepts and Facilities. IETF.', 'Nygren, E., Sitaraman, R. y Sun, J. (2010). The Akamai Network: A Platform for High-Performance Internet Applications. *ACM SIGOPS Operating Systems Review*, 44(3).', 'Fielding, R., Nottingham, M. y Reschke, J. (2022). RFC 9111: HTTP Caching. IETF.', 'Jonas, E. y otros (2019). Cloud Programming Simplified: A Berkeley View on Serverless Computing. UC Berkeley, EECS-2019-3.', 'Aas, J. y otros (2019). Let\'s Encrypt: An Automated Certificate Authority to Encrypt the Entire Web. *ACM CCS 2019*.'],
  project: { t: 'De tu computadora a internet',
    goal: 'Publicar una aplicación con dominio propio, despliegue continuo y buenas prácticas de caché y secretos.',
    steps: ['Publica una aplicación (estática con al menos una función de API) en Vercel, Netlify o Cloudflare desde un repositorio.', 'Configura variables de entorno separadas para vista previa y producción, y verifica que ningún secreto llegue al navegador.', 'Conecta un dominio (o un subdominio gratuito) configurando los registros DNS y verifica el certificado TLS.', 'Configura cabeceras de caché distintas para HTML y para archivos con hash, y mide con la pestaña Red la diferencia entre la primera y la segunda visita.', 'Agrega monitoreo de disponibilidad y registro de errores del frontend, y practica un rollback.'],
    deliver: 'La URL publicada, el repositorio y un documento con la configuración DNS, de caché y de entornos.' },
  hito: ['Publica PatioApp en Vercel con vistas previas por PR, variables separadas por entorno y dominio propio con HTTPS.', 'Configura en PatioApp la caché de archivos con hash, el monitoreo de disponibilidad y una alerta de gasto.']
});
SDC.after('m9.deploy', 'm9.async');
})();
