/* ===== MÓDULO 10 — Del código al producto ===== */
CDC.registrar({
  id: 'm10',
  nivel: 'Profesional',
  titulo: 'Del código al producto',
  resumen: 'Control de versiones, pruebas automatizadas, código legible, despliegue y seguridad: lo que separa un ejercicio de un programa que otros usan.',
  intro: '<p>Saber programar y saber entregar software son dos habilidades distintas. Un algoritmo correcto que nadie ' +
    'puede instalar, que se rompe al tercer cambio y que nadie más entiende no resuelve el problema de nadie.</p>' +
    '<p>Este módulo cubre las prácticas que convierten tu código en algo mantenible y utilizable. No son opcionales ' +
    'ni «para proyectos grandes»: aplicadas desde el primer proyecto personal, ahorran más tiempo del que cuestan.</p>',
  temas: [

    {
      id: 'm10-1',
      titulo: 'Control de versiones con Git',
      resumen: 'Qué problema resuelve, el modelo mental correcto, los comandos que de verdad usarás y cómo salir de los líos.',
      objetivos: [
        'Entender qué es un commit y qué es una rama',
        'Usar el flujo de trabajo diario con soltura',
        'Recuperarte de los errores más comunes'
      ],
      lectura: `
<p>Antes de Git, versionar era <code>proyecto_final.zip</code>, <code>proyecto_final_v2.zip</code>,
<code>proyecto_final_v2_ESTE_SI.zip</code>. Si eso te suena, ya sabes qué problema resuelve el control de versiones.</p>

<h2>Qué resuelve de verdad</h2>
<ul>
  <li><strong>Historia completa:</strong> quién cambió qué, cuándo y por qué. Puedes volver a cualquier punto.</li>
  <li><strong>Trabajo en paralelo:</strong> varias personas (o tú mismo en varias ideas) sin pisarse.</li>
  <li><strong>Experimentar sin miedo:</strong> una rama permite probar algo radical y descartarlo sin consecuencias.</li>
  <li><strong>Encontrar cuándo se rompió:</strong> <code>git bisect</code> hace búsqueda binaria sobre la historia
  (módulo 7) y encuentra el commit culpable entre miles en unos pocos pasos.</li>
  <li><strong>Respaldo distribuido:</strong> cada clon es una copia completa de toda la historia.</li>
</ul>

<h2>El modelo mental correcto</h2>
<p>La mayoría de la confusión con Git viene de un modelo mental equivocado. El correcto es este:</p>

<p>Un <strong>commit</strong> es una <strong>foto completa</strong> del proyecto en un instante, con un identificador
único, un autor, una fecha, un mensaje y un puntero a su commit padre. La historia es un grafo dirigido acíclico de
commits (un DAG, módulo 6).</p>

<p>Una <strong>rama</strong> no es una copia de los archivos: es simplemente <strong>una etiqueta que apunta a un
commit</strong>. Crear una rama cuesta cero: solo se escribe un nombre y un identificador en un archivo. Por eso en Git
se crean ramas constantemente, mientras que en sistemas antiguos eran una operación cara y rara.</p>

${fig(`<svg viewBox="0 0 540 170" width="540" height="170" role="img" aria-label="Grafo de commits con dos ramas">
<g color="var(--fg-soft)">
${[[60, 100], [140, 100], [220, 100], [300, 100]].map(function (c, i) {
  return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="16" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.7"/>' +
    '<text x="' + c[0] + '" y="' + (c[1] + 5) + '" text-anchor="middle" font-size="11" fill="var(--fg)">c' + (i + 1) + '</text>';
}).join('')}
${[[300, 48], [380, 48]].map(function (c, i) {
  return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="16" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.7"/>' +
    '<text x="' + c[0] + '" y="' + (c[1] + 5) + '" text-anchor="middle" font-size="11" fill="var(--fg)">f' + (i + 1) + '</text>';
}).join('')}
<g stroke="var(--fg-soft)" stroke-width="1.5" fill="none">
<path d="M76 100 H124"/><path d="M156 100 H204"/><path d="M236 100 H284"/>
<path d="M232 90 L288 58"/><path d="M316 48 H364"/>
</g>
<rect x="268" y="128" width="72" height="24" rx="12" fill="var(--accent)" stroke="none"/>
<text x="304" y="144" text-anchor="middle" font-size="11" fill="#fff">main</text>
<rect x="348" y="12" width="92" height="24" rx="12" fill="var(--warm)" stroke="none"/>
<text x="394" y="28" text-anchor="middle" font-size="11" fill="#fff">nueva-funcion</text>
<path d="M304 126 V120" stroke="var(--accent)" stroke-width="1.5"/>
<path d="M394 38 V58" stroke="var(--warm)" stroke-width="1.5"/>
<text x="270" y="166" text-anchor="middle" font-size="11" fill="var(--fg-soft)">Las ramas son etiquetas que apuntan a un commit; crearlas es instantáneo.</text>
</g></svg>`, 'La historia es un grafo de commits, y las ramas son punteros móviles.')}

<h2>Las tres zonas</h2>
<p>El otro concepto que hay que tener claro: un archivo pasa por tres lugares.</p>

${tabla(['Zona', 'Qué es', 'Cómo se llega'], [
  ['<b>Directorio de trabajo</b>', 'tus archivos tal como están ahora', 'editas normalmente'],
  ['<b>Área de preparación</b> (<i>staging</i>)', 'lo que entrará en el próximo commit', '<code>git add</code>'],
  ['<b>Repositorio</b>', 'la historia confirmada', '<code>git commit</code>']
], 'El área de preparación es lo que permite partir un trabajo desordenado en commits ordenados y con sentido.')}

<h2>El flujo diario</h2>
${cod('txt', `git status                      # ¿qué cambió? (úsalo constantemente)
git diff                        # ¿qué cambió exactamente?
git add archivo.py              # preparar un archivo
git add -p                      # preparar por trozos: elige qué entra
git commit -m "Corrige el cálculo del IGV en facturas con descuento"
git log --oneline --graph       # ver la historia

git switch -c nueva-funcion     # crear una rama y cambiarse a ella
git switch main                 # volver
git merge nueva-funcion         # traer los cambios de la rama

git pull                        # traer lo del remoto
git push                        # enviar lo tuyo`)}

<h2>Mensajes de commit que sirven</h2>
<p>El mensaje es para tu yo de dentro de seis meses, y para quien tenga que entender por qué el código es así.</p>

${tabla(['Mal', 'Por qué', 'Bien'], [
  ['<code>cambios</code>', 'no dice nada', '<code>Agrega validación de RUC en el registro de clientes</code>'],
  ['<code>fix</code>', 'no dice qué ni dónde', '<code>Corrige división entre cero al promediar listas vacías</code>'],
  ['<code>wip</code>', 'no debería llegar a la rama principal', '<code>Extrae el cálculo de impuestos a su propia clase</code>'],
  ['<code>arreglé lo que pidió Juan</code>', 'depende de contexto que se pierde', '<code>Permite exportar el reporte con fechas personalizadas</code>']
], 'La convención: una línea corta en imperativo que describe QUÉ hace el commit; si hace falta, una línea en blanco y luego el POR QUÉ.')}

${nota('El qué está en el diff; el mensaje es para el porqué',
  '<p>El código ya muestra qué cambió. Lo que no se puede recuperar es <strong>por qué</strong>: qué problema había, ' +
  'qué alternativas se descartaron, qué restricción obligó a esa solución rara. Ese contexto es lo que convierte un ' +
  'historial en documentación viva.</p>', 'key')}

<h2>Cómo salir de los líos</h2>
${tabla(['Problema', 'Solución'], [
  ['Me equivoqué en el mensaje del último commit', '<code>git commit --amend</code>'],
  ['Quiero deshacer cambios no confirmados de un archivo', '<code>git restore archivo</code>'],
  ['Quiero sacar algo del área de preparación', '<code>git restore --staged archivo</code>'],
  ['Quiero deshacer el último commit pero conservar los cambios', '<code>git reset --soft HEAD~1</code>'],
  ['Quiero revertir un commit ya publicado', '<code>git revert &lt;hash&gt;</code> (crea un commit inverso)'],
  ['Tengo que cambiar de rama con trabajo a medias', '<code>git stash</code> y luego <code>git stash pop</code>'],
  ['Hice commit en la rama equivocada', '<code>git cherry-pick</code> a la correcta y <code>reset</code> en la otra'],
  ['<b>Creo que perdí trabajo</b>', '<b><code>git reflog</code></b>: registra todo lo que hiciste, casi nada se pierde']
], '<code>git reflog</code> es el comando que salva la vida: muestra todos los estados por los que pasó tu repositorio, incluso los «perdidos».')}

${nota('revert contra reset en lo ya publicado',
  '<p><code>reset</code> <strong>reescribe</strong> la historia; <code>revert</code> añade un commit que deshace. ' +
  'Si ya enviaste al remoto y otras personas lo tienen, usa <strong>siempre <code>revert</code></strong>: reescribir ' +
  'historia compartida obliga a los demás a arreglar sus copias y es la forma más rápida de que el equipo te odie.</p>', 'warn')}

<h2>Qué NO subir</h2>
<p>Un archivo <code>.gitignore</code> evita versionar lo que no debe estar:</p>
${cod('txt', `# dependencias (se reinstalan)
node_modules/
__pycache__/
venv/

# resultados de compilación
dist/
build/
*.class

# SECRETOS: nunca, bajo ninguna circunstancia
.env
config/credenciales.json
*.pem

# archivos del sistema y del editor
.DS_Store
.vscode/`)}

<p><strong>Sobre los secretos:</strong> si subes una contraseña o una clave de API y luego la borras en otro commit,
<strong>sigue estando en la historia</strong> y cualquiera con acceso al repositorio puede recuperarla. Hay robots que
escanean GitHub en busca de claves y las explotan en minutos. Si ocurre: <strong>revoca la clave inmediatamente</strong>
y genera una nueva. Borrarla del historial es secundario y mucho más difícil.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Mensajes de commit',
          enunciado: 'Reescribe estos mensajes para que sean útiles: (a) «cambios»; (b) «fix bug»; (c) «ahora sí funciona»; (d) «actualización»; (e) «cambios pedidos por el cliente».',
          pista: 'Qué hace el commit, en imperativo, y específico.',
          solucion: `<p><b>(a)</b> «Agrega paginación al listado de productos»</p>
<p><b>(b)</b> «Corrige el cálculo del vuelto cuando el pago es exacto»</p>
<p><b>(c)</b> «Inicializa el acumulador antes del bucle en el reporte mensual»</p>
<p><b>(d)</b> «Actualiza la tasa de IGV de 18% a 19% según la norma vigente»</p>
<p><b>(e)</b> «Permite filtrar el reporte de ventas por rango de fechas»</p>
<p><b>Las reglas que siguen todas:</b> verbo en imperativo al inicio (agrega, corrige, permite), específicas sobre qué parte del sistema tocan, y menos de 72 caracteres en la primera línea.</p>
<p><b>Y para casos que lo merezcan</b>, un cuerpo con el porqué:</p>
<pre>Corrige el cálculo del vuelto cuando el pago es exacto

Al pagar el monto exacto, el bucle de denominaciones nunca entraba
y la función devolvía una lista vacía en lugar de "sin vuelto".
Se agrega el caso base explícito y una prueba que lo cubre.

Reportado por caja 3 el 2026-10-14.</pre>
<p>Ese contexto es irrecuperable de otra forma, y es exactamente lo que buscará quien lea este commit en dos años.</p>` },
        { n: 2, titulo: 'Diseña el flujo',
          enunciado: 'Trabajas solo en un proyecto personal desplegado en producción. Diseña tu flujo de ramas: cuándo creas una, cuándo fusionas, qué hay en <code>main</code>. Luego adapta el flujo para un equipo de tres personas.',
          pista: 'La regla básica: main siempre debe funcionar.',
          solucion: `<p><b>Trabajando solo:</b></p>
<ol>
<li><b><code>main</code> siempre desplegable.</b> Esa es la regla que lo organiza todo: si <code>main</code> está roto, no puedes desplegar una corrección urgente.</li>
<li><b>Una rama por tarea:</b> <code>git switch -c reporte-mensual</code>. Aunque trabajes solo, te permite dejar algo a medias y atender otra cosa sin mezclar.</li>
<li><b>Commits pequeños y frecuentes</b> dentro de la rama, cada uno con sentido propio.</li>
<li><b>Fusionar a main cuando funcione</b> y esté probado.</li>
<li><b>Etiquetar los despliegues:</b> <code>git tag v1.3.0</code>. Así puedes volver exactamente a lo que había en producción.</li>
</ol>
<p><b>Con tres personas, se añade:</b></p>
<ol>
<li><b>Nadie trabaja directamente en <code>main</code>.</b> Se protege la rama en el servidor para impedirlo.</li>
<li><b>Pull requests</b> (o merge requests) en lugar de fusionar directo: cada cambio lo revisa otra persona antes de entrar. La revisión encuentra bugs y, sobre todo, <b>reparte el conocimiento</b>: nadie es el único que entiende una parte.</li>
<li><b>Integración continua:</b> las pruebas se ejecutan automáticamente en cada pull request, y no se puede fusionar si fallan.</li>
<li><b>Actualizar la rama con <code>main</code> seguido</b> (<code>git pull --rebase origin main</code>) para que los conflictos sean pequeños y frecuentes en lugar de enormes y raros.</li>
<li><b>Ramas de vida corta:</b> una rama de dos semanas acumula conflictos garantizados. Mejor tareas pequeñas que se fusionan en uno o dos días.</li>
</ol>
<p><b>El error más común en equipos pequeños</b> es no proteger <code>main</code> y acabar con alguien que sube algo roto justo cuando otro necesita desplegar. Cuesta cinco minutos configurarlo y evita situaciones muy desagradables.</p>` },
        { n: 3, titulo: 'Sal del lío',
          enunciado: 'Di qué comando usarías: (a) hiciste commit con un archivo que no querías incluir; (b) borraste una rama con trabajo sin fusionar; (c) un commit de hace tres días rompió algo y no sabes cuál; (d) subiste una contraseña al repositorio; (e) tienes cambios a medias y necesitas cambiar de rama urgentemente.',
          pista: 'amend, reflog, bisect, revocar, stash.',
          solucion: `<p><b>(a)</b> Si <b>no</b> lo has publicado: <code>git reset --soft HEAD~1</code>, quitar el archivo del área de preparación con <code>git restore --staged</code>, y volver a hacer commit. O <code>git commit --amend</code> tras ajustar lo preparado. Si <b>ya</b> lo publicaste, un commit nuevo que lo elimine, y añadirlo al <code>.gitignore</code>.</p>
<p><b>(b)</b> <code>git reflog</code> para encontrar el último commit de esa rama, y luego <code>git switch -c rama-recuperada &lt;hash&gt;</code>. <b>Git casi nunca borra nada de verdad:</b> los commits quedan huérfanos pero accesibles durante semanas. El reflog es la red de seguridad que mucha gente no sabe que tiene.</p>
<p><b>(c)</b> <code>git bisect</code>. Le dices un commit que funcionaba y uno que no, y Git hace <b>búsqueda binaria</b> sobre la historia: te sitúa en el punto medio, pruebas, le dices «bien» o «mal», y repite. Con 1000 commits, <b>10 pruebas</b> encuentran el culpable. Es el algoritmo del módulo 7 aplicado a tu propio historial, y es asombrosamente efectivo.</p>
<p><b>(d) Por orden de urgencia:</b></p>
<ol>
<li><b>Revoca la credencial AHORA</b> y genera una nueva. Esto es lo único verdaderamente urgente: hay robots que escanean GitHub continuamente y explotan claves en minutos.</li>
<li>Añade el archivo al <code>.gitignore</code> y mueve el secreto a una variable de entorno.</li>
<li>Limpia la historia si hace falta (<code>git filter-repo</code> o BFG), sabiendo que reescribe todo y exige coordinar con quien tenga copias.</li>
</ol>
<p>El paso 3 es el que la gente intenta primero y es el menos importante: <b>una clave filtrada es una clave quemada</b>, aunque la borres.</p>
<p><b>(e)</b> <code>git stash</code> guarda los cambios a un lado y deja el directorio limpio; cambias de rama, haces lo urgente, vuelves y <code>git stash pop</code>. Alternativa más segura: hacer un commit temporal («wip») en tu rama y luego <code>git reset --soft HEAD~1</code> al volver; así el trabajo queda en la historia y no en una pila que es fácil olvidar.</p>` },
        { n: 4, titulo: 'Resuelve un conflicto',
          enunciado: 'Al fusionar aparece un conflicto: Git marca el archivo con <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code> y <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>. Explica qué significan esas marcas, cómo se resuelve, y tres prácticas para que los conflictos sean raros.',
          pista: 'Git no sabe cuál de los dos cambios es el correcto: esa decisión es humana.',
          solucion: `<p><b>Qué significan las marcas:</b></p>
<pre>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
    precio = base * 1.18        ← tu versión (la rama actual)
=======
    precio = base * (1 + TASA)  ← la versión que estás fusionando
&gt;&gt;&gt;&gt;&gt;&gt;&gt; otra-rama</pre>
<p>Git detectó que <b>las dos ramas modificaron las mismas líneas</b> y no puede decidir cuál es correcta. Es importante entender que <b>no es un error</b>: es Git pidiendo una decisión que solo un humano puede tomar.</p>
<p><b>Cómo se resuelve:</b></p>
<ol>
<li>Abrir el archivo y <b>decidir</b>: quedarse con una versión, con la otra, o escribir una tercera que combine ambas intenciones.</li>
<li><b>Borrar las tres líneas de marcas.</b> Olvidarlas y hacer commit con ellas dentro es un clásico que rompe la compilación.</li>
<li><b>Comprobar que el resultado funciona</b>: ejecutar las pruebas. Un merge sintácticamente correcto puede ser semánticamente absurdo.</li>
<li><code>git add archivo</code> y <code>git commit</code>.</li>
</ol>
<p><b>El riesgo oculto:</b> hay conflictos que Git <b>no</b> detecta. Si tú renombras una función y otra persona añade una llamada a esa función en otro archivo, Git fusiona sin conflicto y el código queda roto. <b>Por eso hay que ejecutar las pruebas después de cada fusión</b>, no solo revisar las marcas.</p>
<p><b>Tres prácticas para que sean raros:</b></p>
<ol>
<li><b>Ramas de vida corta.</b> Una rama de dos semanas conflicta con todo. Tareas pequeñas que se fusionan en uno o dos días apenas conflictan.</li>
<li><b>Traer <code>main</code> seguido</b> a tu rama (<code>git pull --rebase origin main</code> a diario). Conflictos pequeños y frecuentes son infinitamente más fáciles que uno enorme al final.</li>
<li><b>Repartir el trabajo por archivos o módulos</b> cuando sea posible, y acordar el formato del código (un formateador automático como Prettier o Black elimina de golpe todos los conflictos por espacios e indentación, que son los más absurdos de resolver).</li>
</ol>` },
        { n: 5, titulo: 'Prepara un proyecto',
          enunciado: 'Vas a publicar un proyecto en GitHub. Enumera todo lo que debería incluir el repositorio además del código, y explica para qué sirve cada cosa.',
          pista: 'Piensa en alguien que llega al repositorio sin conocerte.',
          solucion: `${tabla(['Archivo', 'Para qué sirve'], [
  ['<code>README.md</code>', '<b>Lo más importante.</b> Qué hace el proyecto, cómo instalarlo, cómo usarlo, una captura o ejemplo. Es lo primero y a veces lo único que alguien lee.'],
  ['<code>.gitignore</code>', 'Evita subir dependencias, resultados de compilación y <b>secretos</b>.'],
  ['<code>LICENSE</code>', 'Sin licencia, legalmente <b>nadie puede usar tu código</b>. MIT es la más permisiva y habitual.'],
  ['<code>.env.example</code>', 'Lista las variables de entorno necesarias <b>sin los valores reales</b>, para que otro sepa qué configurar.'],
  ['<code>requirements.txt</code> / <code>package.json</code>', 'Dependencias con versiones, para que la instalación sea reproducible.'],
  ['<code>CONTRIBUTING.md</code>', 'Cómo colaborar: estilo, pruebas, proceso de pull request. Solo si esperas colaboradores.'],
  ['Carpeta <code>tests/</code>', 'Las pruebas. Su presencia dice mucho sobre la seriedad del proyecto.'],
  ['<code>.github/workflows/</code>', 'Integración continua: ejecutar pruebas automáticamente en cada push.'],
  ['<code>CHANGELOG.md</code>', 'Qué cambió en cada versión. Útil si otros dependen de tu proyecto.']
])}
<p><b>Sobre el README,</b> que es donde se gana o se pierde a quien llega:</p>
<ol>
<li><b>Una frase</b> que diga qué hace y para quién. Si alguien no lo entiende en diez segundos, se va.</li>
<li><b>Una captura, un GIF o un ejemplo de salida.</b> Vale más que tres párrafos.</li>
<li><b>Instalación en comandos copiables</b>, probados desde cero en una máquina limpia.</li>
<li><b>Un ejemplo de uso mínimo</b> que funcione tal cual.</li>
<li><b>Requisitos</b> (versión del lenguaje, dependencias del sistema).</li>
<li><b>Licencia</b> y cómo contactar.</li>
</ol>
<p><b>Dos consejos que marcan la diferencia:</b></p>
<ul>
<li><b>Prueba las instrucciones de instalación en una máquina limpia</b> antes de publicarlas. Casi todos los READMEs omiten un paso que el autor ya tenía hecho y no recuerda.</li>
<li><b>Un proyecto con README decente, pruebas y licencia</b> dice más sobre ti profesionalmente que diez repositorios con código suelto y sin explicación. Para quien revisa un portafolio, la señal es inequívoca.</li>
</ul>` }
      ],
      quiz: [
        { p: 'En Git, una rama es…',
          ops: ['una copia completa de los archivos', 'una etiqueta que apunta a un commit',
            'un servidor distinto', 'un respaldo'],
          ok: 1, exp: 'Por eso crearlas es instantáneo y gratuito, y por eso en Git se crean ramas constantemente.' },
        { p: 'Si subiste una contraseña al repositorio, lo primero que hay que hacer es…',
          ops: ['borrarla en un commit nuevo', 'revocar la credencial y generar una nueva',
            'hacer el repositorio privado', 'reescribir la historia'],
          ok: 1, exp: 'Sigue estando en la historia y hay robots escaneando. Una clave filtrada es una clave quemada: lo urgente es revocarla.' },
        { p: 'Para deshacer un commit que ya enviaste al remoto y otros tienen, se usa…',
          ops: ['<code>git reset --hard</code>', '<code>git revert</code>, que crea un commit inverso',
            '<code>git clean</code>', 'borrar el repositorio'],
          ok: 1, exp: '<code>reset</code> reescribe historia compartida y obliga a todos a arreglar sus copias. <code>revert</code> añade un commit que deshace, sin tocar lo publicado.' }
      ]
    },

    {
      id: 'm10-2',
      titulo: 'Pruebas automatizadas',
      resumen: 'Por qué probar a mano no escala, los tipos de prueba, cómo escribir una buena y qué no probar.',
      objetivos: [
        'Escribir pruebas unitarias con una estructura clara',
        'Elegir qué probar y qué no',
        'Entender el valor de las pruebas como red de seguridad para cambiar código'
      ],
      lectura: `
<p>Probar a mano funciona mientras el programa es pequeño. Con veinte funciones, comprobar que un cambio no rompió
nada exige repetir veinte comprobaciones, y nadie lo hace. El resultado es el miedo a tocar el código, que es la
enfermedad terminal de un proyecto.</p>

${nota('El verdadero valor de las pruebas',
  '<p>No es «encontrar bugs»: es <strong>poder cambiar el código sin miedo</strong>. Un proyecto con buenas pruebas se ' +
  'puede refactorizar, optimizar y extender con confianza. Uno sin pruebas se petrifica: funciona, nadie lo entiende ' +
  'del todo y nadie se atreve a tocarlo.</p>', 'key')}

<h2>Anatomía de una prueba</h2>
<p>El patrón universal tiene tres partes, y conviene separarlas visualmente:</p>

${cod('python', `def test_promedio_de_tres_notas():
    # PREPARAR: los datos de entrada
    notas = [14, 16, 12]

    # ACTUAR: ejecutar lo que se prueba
    resultado = promedio(notas)

    # COMPROBAR: verificar el resultado esperado
    assert resultado == 14.0


def test_promedio_de_lista_vacia_lanza_error():
    with pytest.raises(ValueError, match="sin notas"):
        promedio([])`)}

<p>El nombre de la prueba es documentación: debe decir <strong>qué situación</strong> se prueba y <strong>qué se
espera</strong>. <code>test_1</code> no dice nada; <code>test_promedio_de_lista_vacia_lanza_error</code> lo dice todo,
y cuando falla ya sabes qué se rompió sin leer el código.</p>

<h2>Qué probar</h2>
<p>La lista sale directamente del módulo 2: son los casos de prueba de la prueba de escritorio, automatizados.</p>

${tabla(['Caso', 'Ejemplo con una función de promedio'], [
  ['El caso típico', 'tres notas normales'],
  ['El caso vacío', 'lista sin elementos'],
  ['Un solo elemento', 'una nota'],
  ['Las fronteras exactas', 'nota 11 (aprobado) y 10,99 (desaprobado)'],
  ['Valores extremos', 'la nota máxima, la mínima'],
  ['Entradas inválidas', 'texto, negativos, nulos'],
  ['El caso que falló una vez', '<b>cada bug corregido merece una prueba que lo fije</b>']
], 'La última fila es la más rentable: una prueba de regresión impide que un bug ya arreglado vuelva.')}

<h2>La pirámide de pruebas</h2>
${tabla(['Tipo', 'Qué prueba', 'Velocidad', 'Cuántas'], [
  ['<b>Unitarias</b>', 'una función o clase aislada', 'milisegundos', 'muchísimas'],
  ['<b>De integración</b>', 'varias piezas juntas (con base de datos, por ejemplo)', 'segundos', 'bastantes'],
  ['<b>De extremo a extremo</b>', 'el sistema completo como lo usa una persona', 'minutos', 'pocas']
], 'Muchas unitarias (rápidas y precisas) y pocas de extremo a extremo (lentas y frágiles, pero las únicas que prueban que todo encaja).')}

<p>El motivo de la forma de pirámide es práctico: si una prueba unitaria falla, sabes exactamente qué función está mal.
Si falla una de extremo a extremo, sabes que algo está mal en alguna parte del sistema. Y las lentas no se ejecutan
tan seguido, así que detectan los errores más tarde.</p>

<h2>Las pruebas necesitan un diseño que las permita</h2>
<p>Aquí se cobra el módulo 8: una función que crea su propia conexión a la base de datos <strong>no se puede probar</strong>
sin base de datos. Una que la recibe se prueba con un doble en milisegundos.</p>

${tabla(['Doble', 'Qué hace'], [
  ['<b>Falso</b> (<i>fake</i>)', 'implementación simplificada que funciona de verdad: un repositorio en memoria'],
  ['<b>Espía</b> (<i>spy</i>)', 'registra las llamadas que recibe para poder verificarlas'],
  ['<b>Simulacro</b> (<i>mock</i>)', 'devuelve respuestas programadas y verifica interacciones'],
  ['<b>Tope</b> (<i>stub</i>)', 'devuelve siempre un valor fijo']
], 'Son maneras de reemplazar las dependencias reales en una prueba. El falso suele ser el más útil y el menos frágil.')}

<h2>Qué NO probar</h2>
<ul>
  <li><strong>El lenguaje y las bibliotecas.</strong> No pruebes que <code>sort()</code> ordena.</li>
  <li><strong>Los detalles internos.</strong> Prueba el <em>comportamiento</em> público, no que un método privado se
  llamó. Si pruebas la implementación, cada refactorización rompe las pruebas y acabas odiándolas.</li>
  <li><strong>Código trivial sin lógica:</strong> un getter que devuelve un campo.</li>
  <li><strong>Perseguir el 100% de cobertura.</strong> La cobertura mide qué líneas se ejecutaron, no si la lógica es
  correcta. Un 100% con comprobaciones débiles vale menos que un 60% bien elegido.</li>
</ul>

<h2>Desarrollo guiado por pruebas (TDD)</h2>
<p>Escribir la prueba <em>antes</em> que el código, en un ciclo de tres pasos:</p>
<ol>
  <li><strong>Rojo:</strong> escribe una prueba que falla (porque la función no existe todavía).</li>
  <li><strong>Verde:</strong> escribe el código mínimo que la hace pasar.</li>
  <li><strong>Refactoriza:</strong> mejora el código con la prueba como red.</li>
</ol>
<p>No es obligatorio ni siempre apropiado, pero tiene dos efectos secundarios valiosos: te obliga a <strong>definir el
comportamiento esperado antes de programar</strong> (que es el módulo 0 otra vez) y produce código que se puede probar,
porque fue escrito con eso en mente.</p>

<h2>Integración continua</h2>
<p>Un servicio que ejecuta tus pruebas automáticamente en cada envío al repositorio. Con GitHub Actions son unas pocas
líneas de configuración, y transforma las pruebas de «algo que recuerdas ejecutar» a «algo que ocurre siempre». Combinado
con la protección de la rama principal (no se puede fusionar si fallan las pruebas), es lo que impide que algo roto
llegue a producción.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Escribe los casos',
          enunciado: 'Para una función <code>calcular_vuelto(pagado, total)</code>, escribe la lista de pruebas que harías con su nombre descriptivo y el resultado esperado. Mínimo 7.',
          pista: 'Típico, frontera, inválido, y los casos de dinero.',
          solucion: `${tabla(['Nombre de la prueba', 'Entrada', 'Esperado'], [
  ['<code>test_vuelto_normal</code>', '(50, 32.50)', '17.50'],
  ['<code>test_pago_exacto_devuelve_cero</code>', '(32.50, 32.50)', '0'],
  ['<code>test_pago_insuficiente_lanza_error</code>', '(20, 32.50)', '<code>PagoInsuficiente</code>'],
  ['<code>test_total_cero_devuelve_todo</code>', '(50, 0)', '50'],
  ['<code>test_total_negativo_lanza_error</code>', '(50, −10)', '<code>ValueError</code>'],
  ['<code>test_vuelto_con_centimos</code>', '(100, 19.99)', '80.01 <b>exacto</b>'],
  ['<code>test_acumulado_no_pierde_centimos</code>', '1000 operaciones de 19.99', 'suma exacta'],
  ['<code>test_pago_no_numerico_lanza_error</code>', '("abc", 10)', '<code>TypeError</code>']
])}
<p><b>Las dos pruebas de céntimos son las valiosas</b> y las que casi nadie escribe. Son las que detectan si alguien implementó la función con reales en lugar de enteros en céntimos (módulo 1): la primera puede pasar por casualidad, pero la de mil operaciones acumuladas falla sin remedio y deja el bug al descubierto.</p>
<p><b>El caso «pago exacto»</b> también merece su lugar: es la frontera donde muchas implementaciones devuelven una lista vacía, <code>None</code> o lanzan un error, en lugar de «sin vuelto». Es ambiguo en el enunciado, así que la prueba <b>documenta la decisión</b>.</p>` },
        { n: 2, titulo: 'Prueba lo que se puede probar',
          enunciado: 'Esta función no se puede probar. Explica por qué y reescríbela para que sí se pueda, con su prueba.<br><pre>def enviar_reporte_mensual():\n    datos = bd.query("SELECT * FROM ventas WHERE mes = " + str(hoy().month))\n    total = sum(d["monto"] for d in datos)\n    smtp.enviar("jefe@empresa.com", f"Total: {total}")</pre>',
          pista: 'Tres dependencias no inyectadas y una dependencia del reloj.',
          solucion: `<p><b>Los cuatro problemas:</b></p>
<ol>
<li><b>Base de datos global</b> (<code>bd</code>): probar exige una base real con datos preparados.</li>
<li><b>Servidor de correo global</b> (<code>smtp</code>): probar enviaría correos de verdad al jefe.</li>
<li><b>Depende del reloj</b> (<code>hoy()</code>): el resultado cambia según el día en que se ejecute la prueba, y es imposible probar el comportamiento en diciembre sin esperar a diciembre.</li>
<li><b>Mezcla tres responsabilidades:</b> obtener datos, calcular y notificar. No se puede probar el cálculo sin arrastrar lo demás.</li>
</ol>
<p><b>Reescrito:</b></p>
${cod('python', `def calcular_total(ventas):                  # función PURA: trivial de probar
    return sum(v["monto"] for v in ventas)

def generar_reporte_mensual(repositorio, notificador, mes, destinatario):
    ventas = repositorio.ventas_del_mes(mes)
    total = calcular_total(ventas)
    notificador.enviar(destinatario, f"Total del mes {mes}: {total:.2f}")
    return total`)}
<p><b>Las pruebas:</b></p>
${cod('python', `def test_calcular_total_suma_los_montos():
    assert calcular_total([{"monto": 100}, {"monto": 50.5}]) == 150.5

def test_calcular_total_de_lista_vacia_es_cero():
    assert calcular_total([]) == 0

def test_reporte_envia_el_total_al_destinatario():
    repo = RepositorioFalso({10: [{"monto": 100}, {"monto": 200}]})
    correo = CorreoEspia()

    total = generar_reporte_mensual(repo, correo, mes=10, destinatario="jefe@x.com")

    assert total == 300
    assert len(correo.enviados) == 1
    assert "300.00" in correo.enviados[0].cuerpo

def test_mes_sin_ventas_envia_total_cero():
    repo = RepositorioFalso({})
    correo = CorreoEspia()
    assert generar_reporte_mensual(repo, correo, mes=10, destinatario="x@y.com") == 0`)}
<p><b>Lo que cambió y por qué importa:</b></p>
<ul>
<li><b>El cálculo se extrajo a una función pura.</b> Es la parte con lógica y ahora se prueba en una línea, sin ningún andamiaje.</li>
<li><b>El mes es un parámetro,</b> no se consulta al reloj. Así se puede probar cualquier mes, y además la función se vuelve reutilizable para generar reportes históricos. <b>Depender del reloj es una dependencia como cualquier otra</b>, y hay que inyectarla.</li>
<li><b>Repositorio y notificador se inyectan,</b> así que las pruebas usan dobles y corren en milisegundos sin red ni base de datos.</li>
<li><b>Se puede verificar que <i>no</i> se envió nada</b> en los casos que lo requieran, lo que con dependencias globales es imposible.</li>
</ul>` },
        { n: 3, titulo: 'Prueba el comportamiento, no la implementación',
          enunciado: 'Estas dos pruebas verifican lo mismo. Explica cuál es mejor y qué pasa con cada una si se refactoriza la clase.<br><pre>def test_a():\n    carrito.agregar("X", 100)\n    assert carrito._items[0]["precio"] == 100\n\ndef test_b():\n    carrito.agregar("X", 100)\n    assert carrito.total() == 100</pre>',
          pista: 'Una depende de cómo está hecho por dentro; la otra, de lo que hace.',
          solucion: `<p><b>La mejor es <code>test_b</code>.</b></p>
<p><b><code>test_a</code> prueba la implementación:</b> accede a <code>_items</code>, que es un detalle interno (el guion bajo lo dice), y asume que es una lista de diccionarios con una clave «precio». <b>Si mañana el carrito guarda los ítems en un diccionario por código, o guarda céntimos en lugar de soles, o usa objetos en lugar de diccionarios, esta prueba falla aunque el carrito funcione perfectamente.</b></p>
<p><b><code>test_b</code> prueba el comportamiento:</b> «si agrego un producto de 100, el total es 100». Esa afirmación debe seguir siendo verdadera sin importar cómo esté hecho por dentro. La refactorización no la rompe.</p>
<p><b>Por qué esto importa más de lo que parece:</b> las pruebas acopladas a la implementación son <b>peores que no tener pruebas</b>, porque:</p>
<ul>
<li>Dan una falsa sensación de seguridad: pasan y el comportamiento podría estar mal.</li>
<li><b>Impiden refactorizar</b>, que era el objetivo principal de tener pruebas. Si cada mejora interna rompe veinte pruebas, el equipo deja de refactorizar.</li>
<li>El equipo acaba viendo las pruebas como un estorbo y las desactiva.</li>
</ul>
<p><b>La regla práctica:</b> <i>prueba a través de la interfaz pública</i>. Si para verificar algo necesitas acceder a un campo privado, suele significar una de dos cosas: o estás probando lo que no debes, o a la clase le falta un método público legítimo que exponga esa información.</p>
<p><b>La excepción honesta:</b> a veces un algoritmo complejo interno merece sus propias pruebas. La solución correcta no es romper el encapsulamiento, sino <b>extraerlo a su propia clase o función</b> con interfaz pública. Si algo merece prueba propia, merece ser una unidad propia.</p>` },
        { n: 4, titulo: 'TDD en la práctica',
          enunciado: 'Aplica el ciclo rojo-verde-refactor para implementar una función <code>es_bisiesto(anio)</code>. Muestra las pruebas y el código en el orden en que los escribirías.',
          pista: 'Una prueba a la vez, el código mínimo que la pasa, y luego mejora.',
          solucion: `<p><b>Ciclo 1 — rojo:</b></p>
${cod('python', `def test_2024_es_bisiesto():
    assert es_bisiesto(2024) is True`)}
<p>Falla: la función no existe. <b>Verde</b> (código mínimo, aunque sea absurdo):</p>
${cod('python', `def es_bisiesto(anio):
    return True`)}
<p>Pasa. Parece trampa, y es el punto: <b>la prueba todavía no es suficiente para forzar la implementación correcta</b>. TDD te obliga a notarlo.</p>
<p><b>Ciclo 2 — rojo:</b></p>
${cod('python', `def test_2023_no_es_bisiesto():
    assert es_bisiesto(2023) is False`)}
<p><b>Verde:</b></p>
${cod('python', `def es_bisiesto(anio):
    return anio % 4 == 0`)}
<p><b>Ciclo 3 — rojo</b> (el caso que casi todo el mundo olvida):</p>
${cod('python', `def test_1900_no_es_bisiesto_aunque_sea_multiplo_de_4():
    assert es_bisiesto(1900) is False`)}
<p><b>Verde:</b></p>
${cod('python', `def es_bisiesto(anio):
    return anio % 4 == 0 and anio % 100 != 0`)}
<p><b>Ciclo 4 — rojo</b> (la excepción de la excepción):</p>
${cod('python', `def test_2000_es_bisiesto_por_ser_multiplo_de_400():
    assert es_bisiesto(2000) is True`)}
<p><b>Verde:</b></p>
${cod('python', `def es_bisiesto(anio):
    return (anio % 4 == 0 and anio % 100 != 0) or anio % 400 == 0`)}
<p><b>Refactor:</b> el código ya es claro; se podría añadir validación de entrada y una docstring con la regla y su fuente.</p>
<p><b>Lo que TDD aportó aquí, concretamente:</b></p>
<ul>
<li><b>Las cuatro reglas del calendario quedaron explícitas como pruebas</b>, con nombres que las documentan. Quien lea las pruebas entiende la regla sin buscarla.</li>
<li><b>Cada prueba justificó su línea de código.</b> No hay código sin razón ni reglas sin verificar.</li>
<li><b>El caso 1900</b> —el que más se olvida— apareció porque el ciclo obliga a preguntarse «¿qué caso rompe la implementación actual?» en cada vuelta.</li>
<li>Si mañana alguien «simplifica» la función a <code>anio % 4 == 0</code>, dos pruebas fallan al instante.</li>
</ul>
<p><b>Honestidad sobre TDD:</b> no es obligatorio ni siempre apropiado. Funciona de maravilla con lógica bien definida y reglas claras (como esta). Encaja peor en exploración, prototipos o interfaces gráficas, donde aún no sabes qué quieres. Úsalo donde ayuda, no como dogma.</p>` },
        { n: 5, titulo: 'Diseña la estrategia',
          enunciado: 'Para un sistema de inventario con base de datos, interfaz web y notificaciones por correo, diseña la estrategia de pruebas: qué pruebas unitarias, de integración y de extremo a extremo escribirías, y qué cubriría cada nivel.',
          pista: 'Pirámide: muchas abajo, pocas arriba. Y cada nivel prueba algo distinto.',
          solucion: `<p><b>Unitarias (unas 100-200, en milisegundos, se ejecutan en cada guardado):</b></p>
<ul>
<li><b>Lógica de negocio pura:</b> cálculo de totales con descuentos e IGV, reglas de stock mínimo, validación de códigos y RUC, conversión de unidades. Son funciones puras: entrada → salida, sin dobles.</li>
<li><b>Entidades del dominio:</b> que un producto no acepte stock negativo, que una venta no supere el stock disponible, que los estados de un pedido solo transicionen de forma válida.</li>
<li><b>Servicios con dobles:</b> <code>ServicioVentas</code> con un repositorio en memoria y un notificador espía.</li>
</ul>
<p><b>De integración (unas 20-40, en segundos, se ejecutan en cada pull request):</b></p>
<ul>
<li><b>Repositorios contra una base de datos real</b> (una de prueba, en memoria o en contenedor): que guardar y recuperar un producto devuelva lo mismo, que la búsqueda por código funcione, que las transacciones hagan rollback correctamente.</li>
<li><b>Migraciones de esquema:</b> que apliquen y reviertan sin perder datos.</li>
<li><b>La API HTTP:</b> que los endpoints devuelvan los códigos y cuerpos correctos, incluidos los errores.</li>
</ul>
<p>Estas pruebas detectan lo que las unitarias <b>no pueden</b>: errores de SQL, de mapeo entre objetos y tablas, de configuración, de serialización.</p>
<p><b>De extremo a extremo (unas 5-10, en minutos, se ejecutan antes de desplegar):</b></p>
<ul>
<li><b>El camino crítico completo:</b> entrar al sistema, buscar un producto, registrar una venta, verificar que el stock bajó y que llegó el correo.</li>
<li><b>Los flujos que, si se rompen, detienen el negocio:</b> registrar venta, cerrar caja, emitir comprobante.</li>
</ul>
<p><b>Por qué tan pocas:</b> son lentas, frágiles (un cambio de CSS puede romperlas) y cuando fallan no dicen dónde está el problema. Su valor es único e insustituible —son las únicas que prueban que todo encaja de verdad— pero el costo por prueba es alto.</p>
<p><b>Dos decisiones prácticas que marcan la diferencia:</b></p>
<ol>
<li><b>Separar las pruebas por velocidad</b> y ejecutar las rápidas constantemente. Unas pruebas que tardan 4 minutos no se ejecutan; unas que tardan 3 segundos sí. <b>La velocidad de las pruebas determina si se usan.</b></li>
<li><b>Cada bug que llegue a producción merece una prueba</b> en el nivel más bajo posible que lo habría detectado. Así la batería crece guiada por los fallos reales del sistema y no por una idea abstracta de cobertura.</li>
</ol>` }
      ],
      quiz: [
        { p: 'El valor principal de las pruebas automatizadas es…',
          ops: ['encontrar todos los bugs', 'poder cambiar el código sin miedo a romper lo que funcionaba',
            'cumplir un requisito del proceso', 'medir la cobertura'],
          ok: 1, exp: 'Un proyecto con pruebas se puede refactorizar y extender con confianza. Uno sin pruebas se petrifica.' },
        { p: 'Una prueba que accede a un campo privado de la clase…',
          ops: ['es más completa', 'está acoplada a la implementación y se romperá en cada refactorización',
            'es la forma recomendada', 'mide mejor la cobertura'],
          ok: 1, exp: 'Hay que probar el comportamiento público. Si algo interno merece prueba propia, extráelo a su propia unidad.' },
        { p: 'En la pirámide de pruebas debe haber…',
          ops: ['más de extremo a extremo que unitarias', 'muchas unitarias y pocas de extremo a extremo',
            'solo pruebas de integración', 'la misma cantidad de cada tipo'],
          ok: 1, exp: 'Las unitarias son rápidas y señalan exactamente qué falló; las de extremo a extremo son lentas y frágiles, pero las únicas que prueban que todo encaja.' }
      ]
    },

    {
      id: 'm10-3',
      titulo: 'Código legible y refactorización',
      resumen: 'Escribir para humanos, los olores de código más frecuentes y cómo mejorar sin romper.',
      objetivos: [
        'Aplicar las prácticas que hacen el código legible',
        'Identificar los olores de código más comunes',
        'Refactorizar con seguridad'
      ],
      lectura: `
<p>El código se escribe una vez y se lee decenas. Cualquier esfuerzo en hacerlo legible se paga con creces, y el primer
beneficiario eres tú dentro de seis meses, cuando no recuerdes nada.</p>

<blockquote><p>«Programar es el arte de decirle a otro humano lo que quieres que haga la computadora.» — Donald Knuth</p></blockquote>

<h2>Lo que más mejora la legibilidad</h2>

<h3>1. Nombres</h3>
<p>Ya lo viste en el módulo 3, y conviene repetirlo porque es lo que más impacto tiene. Un buen nombre elimina la
necesidad de un comentario.</p>

${cod('python', `# Antes
def p(d, t):
    return d * (1 + t)

# Después
def precio_con_impuesto(precio_base, tasa_impuesto):
    return precio_base * (1 + tasa_impuesto)`)}

<h3>2. Funciones cortas que hacen una cosa</h3>
<p>Si una función no cabe en una pantalla, probablemente hace varias cosas. Si para explicarla necesitas un «y», hazla
dos.</p>

<h3>3. Nivel de abstracción consistente</h3>
<p>Dentro de una función, todas las líneas deberían estar al mismo nivel conceptual. Mezclar «enviar el pedido» con
«incrementar el índice del bucle» obliga al lector a cambiar de altura mental constantemente.</p>

${cod('pseudo', `// MAL: mezcla niveles
Funcion procesarPedido(p)
	validar(p)
	Para i <- 1 Hasta longitud(p.items) Hacer       // ← nivel bajo
		total <- total + p.items[i].precio * p.items[i].cantidad
	FinPara
	enviarConfirmacion(p)

// BIEN: todas las líneas al mismo nivel
Funcion procesarPedido(p)
	validar(p)
	total <- calcularTotal(p.items)
	enviarConfirmacion(p, total)`)}

<h3>4. Comentarios que explican el porqué</h3>
${cod('python', `# MAL: repite lo que el código ya dice
i = i + 1   # incrementa i en 1

# BIEN: explica una decisión no evidente
# Usamos 7 días y no 30 porque el proveedor purga sus registros
# semanalmente (ticket SOP-412). Con 30 días la consulta falla.
DIAS_HISTORICO = 7

# BIEN: advierte de una trampa
# OJO: la API devuelve las fechas en UTC aunque la documentación
# diga lo contrario. Confirmado con soporte el 2026-03-14.`)}

<p>Un comentario que explica <em>qué</em> hace el código suele ser una señal de que el código no es claro: mejor
arreglar el código. Un comentario que explica <em>por qué</em> es información que no está en ninguna otra parte.</p>

<h2>Los olores de código más frecuentes</h2>
${tabla(['Olor', 'Síntoma', 'Refactorización'], [
  ['<b>Función larga</b>', 'más de una pantalla', 'extraer funciones con nombre'],
  ['<b>Código duplicado</b>', 'lo mismo en tres sitios', 'extraer a una función común'],
  ['<b>Lista larga de parámetros</b>', 'más de 4 o 5', 'agrupar en un objeto'],
  ['<b>Números mágicos</b>', '<code>0.18</code> suelto', 'constante con nombre'],
  ['<b>Anidamiento profundo</b>', '4 niveles de <code>if</code>', 'cláusulas de guarda'],
  ['<b>Clase enorme</b>', 'hace de todo', 'dividir por responsabilidad'],
  ['<b>Condicional sobre tipo</b>', '<code>if tipo == ...</code> repetido', 'polimorfismo'],
  ['<b>Comentario que explica un bloque</b>', '«// calcular totales»', 'extraer ese bloque a una función con ese nombre'],
  ['<b>Nombres genéricos</b>', '<code>data</code>, <code>info</code>, <code>manager</code>', 'nombrar por lo que es'],
  ['<b>Código muerto</b>', 'funciones que nadie llama', 'borrarlo (está en Git)']
], 'El último merece énfasis: no dejes código comentado «por si acaso». Para eso existe el control de versiones.')}

<h2>Refactorizar con seguridad</h2>
<p><strong>Refactorizar</strong> es cambiar la estructura interna sin cambiar el comportamiento externo. La regla
fundamental:</p>

${nota('Nunca refactorices y cambies funcionalidad a la vez',
  '<p>Si haces las dos cosas y algo se rompe, no sabrás si fue por la reestructuración o por el cambio. ' +
  'Refactoriza, comprueba que todo sigue pasando, confirma el commit. <em>Después</em> cambia la funcionalidad.</p>', 'key')}

<p>El procedimiento seguro:</p>
<ol>
  <li><strong>Asegúrate de tener pruebas</strong> que cubran el comportamiento actual. Si no las hay, escríbelas
  <em>antes</em> de tocar nada: son la red.</li>
  <li><strong>Haz un cambio pequeño.</strong></li>
  <li><strong>Ejecuta las pruebas.</strong></li>
  <li><strong>Confirma el commit.</strong></li>
  <li>Repite.</li>
</ol>
<p>Los pasos pequeños parecen lentos y son más rápidos, porque cuando algo falla el culpable está en las últimas cinco
líneas en lugar de en las últimas quinientas.</p>

<h2>Cuándo NO refactorizar</h2>
<ul>
  <li><strong>Código que funciona y nadie toca.</strong> Si no hay que modificarlo, mejorarlo no aporta valor.</li>
  <li><strong>Sin pruebas y sin tiempo de escribirlas.</strong> Refactorizar a ciegas es reescribir con bugs nuevos.</li>
  <li><strong>Justo antes de una entrega.</strong> El riesgo no compensa.</li>
  <li><strong>Por gusto estético.</strong> «No me gusta cómo está escrito» no es una razón; «voy a tener que
  modificarlo y así está muy difícil» sí lo es.</li>
</ul>

<p>La regla del <strong>campamento</strong>: deja el código un poco mejor de como lo encontraste. No reescribas el
módulo entero; mejora lo que tocaste. Con el tiempo, el efecto acumulado es enorme y el riesgo, casi nulo.</p>

<h2>Deuda técnica</h2>
<p>La metáfora es exacta: tomar un atajo hoy es pedir prestado tiempo, y se devuelve con intereses en forma de cambios
más lentos. No es intrínsecamente mala —a veces entregar hoy vale más que el código perfecto—, pero hay que ser
consciente:</p>
<ul>
  <li><strong>Deuda deliberada y prudente:</strong> «sabemos que esto no escala, lo arreglaremos cuando pasemos de 1000
  usuarios». Legítima, si está documentada.</li>
  <li><strong>Deuda inadvertida:</strong> «no sabíamos que había una forma mejor». Inevitable; se paga aprendiendo.</li>
  <li><strong>Deuda imprudente:</strong> «no hay tiempo para diseñar». La que hunde proyectos.</li>
</ul>
<p>Lo importante es <strong>hacerla visible</strong>: anotarla, ponerle un costo estimado y decidir conscientemente
cuándo pagarla, en lugar de descubrirla cuando ya no se puede avanzar.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Mejora este código',
          enunciado: 'Refactoriza aplicando al menos cinco mejoras distintas y nómbralas.<br><pre>def p(l):\n    r = []\n    for i in range(len(l)):\n        if l[i]["t"] == 1:\n            x = l[i]["m"] * 1.18\n            if x > 1000:\n                r.append({"n": l[i]["n"], "v": x * 0.9})\n            else:\n                r.append({"n": l[i]["n"], "v": x})\n    return r</pre>',
          pista: 'Nombres, constantes, estructura, duplicación y el bucle.',
          solucion: `${cod('python', `from dataclasses import dataclass

TASA_IGV = 0.18
UMBRAL_DESCUENTO = 1000
DESCUENTO_VOLUMEN = 0.10
TIPO_PRODUCTO_GRAVADO = 1

@dataclass
class ProductoFacturado:
    nombre: str
    valor: float

def calcular_precio_final(monto_base):
    """Aplica IGV y, si supera el umbral, el descuento por volumen."""
    con_igv = monto_base * (1 + TASA_IGV)
    if con_igv > UMBRAL_DESCUENTO:
        return con_igv * (1 - DESCUENTO_VOLUMEN)
    return con_igv

def facturar_productos_gravados(productos):
    """Devuelve los productos gravados con su precio final calculado."""
    return [
        ProductoFacturado(p["nombre"], calcular_precio_final(p["monto"]))
        for p in productos
        if p["tipo"] == TIPO_PRODUCTO_GRAVADO
    ]`)}
<p><b>Las siete mejoras aplicadas:</b></p>
<ol>
<li><b>Nombres descriptivos:</b> <code>p</code> → <code>facturar_productos_gravados</code>, <code>l</code> → <code>productos</code>, <code>m</code> → <code>monto</code>. El código dejó de ser un criptograma.</li>
<li><b>Números mágicos a constantes:</b> <code>1.18</code>, <code>1000</code>, <code>0.9</code> y <code>1</code> ahora tienen nombre y se cambian en un solo lugar.</li>
<li><b>Extracción de función:</b> el cálculo del precio es una responsabilidad propia, se prueba sola y se reutiliza.</li>
<li><b>Eliminación de duplicación:</b> en el original, <code>r.append({"n": ..., "v": ...})</code> aparecía dos veces con la única diferencia del descuento. Ahora la decisión está dentro del cálculo y el <code>append</code> es uno solo.</li>
<li><b>Recorrer elementos, no índices:</b> <code>for p in productos</code> en lugar de <code>range(len(l))</code>. Menos ruido y un <i>off-by-one</i> menos posible.</li>
<li><b>Comprensión de lista</b> en lugar del bucle acumulador, que expresa la intención («los gravados, transformados») en lugar del mecanismo.</li>
<li><b>Tipo con nombre</b> (<code>dataclass</code>) en lugar de diccionarios con claves de una letra: ahora el editor autocompleta, el tipo documenta y un error de nombre de campo se detecta antes.</li>
</ol>
<p><b>Y lo que no cambió:</b> el comportamiento. Esa es la definición de refactorizar, y es lo que las pruebas deben confirmar antes y después.</p>` },
        { n: 2, titulo: 'Comentarios útiles',
          enunciado: 'Clasifica estos comentarios como útiles o inútiles, y reescribe los inútiles (o elimínalos): (a) <code>// suma 1 al contador</code>; (b) <code>// TODO: arreglar esto</code>; (c) <code>// No usar HashMap aquí: necesitamos orden de inserción garantizado</code>; (d) <code>// función que calcula el total</code> sobre <code>def calcular_total()</code>; (e) <code>// Se duerme 200ms porque la API falla si recibe más de 5 req/seg</code>.',
          pista: 'El qué sobra; el porqué vale oro.',
          solucion: `<p><b>(a) Inútil.</b> Repite lo que el código ya dice. <b>Eliminar.</b></p>
<p><b>(b) Inútil tal como está.</b> No dice qué está mal, ni por qué, ni quién lo escribió ni cuándo. Los TODO así se acumulan hasta que nadie sabe cuáles siguen vigentes. <b>Reescribir:</b> <code>// TODO(rosa, 2026-10): esta consulta hace N+1 queries. Agrupar con un JOIN cuando migremos a la v2 del esquema. Ver ticket #412.</code> Y mejor aún: crear el ticket y poner solo la referencia.</p>
<p><b>(c) Muy útil.</b> Explica una decisión no evidente y <b>previene una «mejora» que rompería el código</b>. Sin ese comentario, alguien cambiaría a <code>HashMap</code> por rendimiento y el orden se perdería silenciosamente. Este es el ejemplo perfecto de comentario que vale oro.</p>
<p><b>(d) Inútil.</b> El nombre de la función ya lo dice. <b>Eliminar.</b> (Una docstring sí tendría sentido si explicara qué incluye el total: ¿impuestos? ¿descuentos? ¿envío? Esa información no está en el nombre.)</p>
<p><b>(e) Muy útil.</b> Sin él, ese <code>sleep(200)</code> parece arbitrario y alguien lo eliminará «porque hace el programa lento», provocando errores intermitentes de límite de peticiones que costarán días de depuración. <b>Mejorable todavía:</b> extraer el valor a una constante <code>PAUSA_LIMITE_API_MS = 200</code> y poner el comentario ahí, para que la razón viaje con el valor.</p>
<p><b>La regla:</b> si el comentario describe <i>qué</i> hace el código, borra el comentario y mejora el código. Si describe <i>por qué</i>, consérvalo: esa información no está en ninguna otra parte y se perderá para siempre.</p>` },
        { n: 3, titulo: 'Detecta los olores',
          enunciado: 'Encuentra al menos cinco olores de código en esta función y di qué refactorización aplicarías a cada uno.<br><pre>def procesar(datos, tipo, formato, enviar, dest, log, debug, reintentos):\n    if tipo == "venta":\n        # calcular totales\n        t = 0\n        for d in datos:\n            t = t + d["monto"] * 1.18\n        ...80 líneas más...\n    elif tipo == "compra":\n        ...otras 80 líneas...\n    # código viejo, por si acaso\n    # if tipo == "devolucion": ...\n</pre>',
          pista: 'Parámetros, longitud, condicional sobre tipo, comentario-sección, código muerto, número mágico.',
          solucion: `<ol>
<li><b>Lista larga de parámetros (8).</b> Es imposible recordar el orden y las llamadas se vuelven ilegibles. <b>Refactorización:</b> agrupar en un objeto de configuración (<code>OpcionesProcesamiento</code>) o separar en funciones distintas si no todos los parámetros se usan en todos los casos.</li>
<li><b>Función larguísima (160+ líneas).</b> <b>Refactorización:</b> extraer funciones con nombre para cada bloque lógico.</li>
<li><b>Condicional sobre el tipo.</b> <b>Refactorización:</b> reemplazar por polimorfismo (módulo 8): una clase <code>ProcesadorVenta</code> y otra <code>ProcesadorCompra</code> con la misma interfaz. Añadir «devolución» pasa a ser una clase nueva en lugar de otro <code>elif</code> y 80 líneas más.</li>
<li><b>Comentario que titula un bloque</b> (<code># calcular totales</code>). <b>Refactorización:</b> es la señal más clara de una función que quiere nacer. Extraer <code>calcular_totales(datos)</code> y el comentario desaparece, convertido en el nombre.</li>
<li><b>Código muerto comentado.</b> <b>Refactorización:</b> borrarlo. Está en el historial de Git, que es exactamente para eso. El código comentado confunde (¿sigue siendo válido? ¿por qué se desactivó?) y nadie se atreve a borrarlo por miedo.</li>
<li><b>Número mágico <code>1.18</code>.</b> <b>Refactorización:</b> constante <code>TASA_IGV</code>.</li>
<li><b>Nombre genérico:</b> <code>procesar</code>, <code>datos</code>, <code>t</code>. <b>Refactorización:</b> nombrar por lo que son.</li>
<li><b>Parámetros booleanos</b> (<code>enviar</code>, <code>debug</code>). Una llamada como <code>procesar(d, "venta", "pdf", True, x, l, False, 3)</code> es indescifrable sin ir a leer la firma. <b>Refactorización:</b> parámetros con nombre, o funciones separadas.</li>
</ol>
<p><b>El orden en que yo las aplicaría</b>, que importa tanto como las refactorizaciones en sí:</p>
<ol>
<li><b>Escribir pruebas primero</b> que capturen el comportamiento actual. Sin red, no se toca.</li>
<li><b>Borrar el código muerto</b> (riesgo cero, beneficio inmediato en legibilidad).</li>
<li><b>Extraer funciones</b> guiándose por los comentarios de sección. Cada extracción, su commit.</li>
<li><b>Nombrar las constantes.</b></li>
<li><b>Separar por tipo en clases</b>, que es el cambio más grande y el que más se beneficia de tener ya todo lo anterior hecho.</li>
</ol>` },
        { n: 4, titulo: 'Refactoriza con seguridad',
          enunciado: 'Tienes que refactorizar una función de 300 líneas sin pruebas, de la que depende el sistema de facturación. Describe el procedimiento paso a paso y qué harías si no puedes escribir pruebas antes.',
          pista: 'Las pruebas de caracterización capturan lo que el código hace, no lo que debería hacer.',
          solucion: `<p><b>Procedimiento completo:</b></p>
<ol>
<li><b>No tocar nada todavía.</b> Entender primero qué hace: leerla, trazarla con datos reales, dibujar su flujo.</li>
<li><b>Escribir pruebas de caracterización.</b> Esta es la técnica clave: en lugar de probar lo que <i>debería</i> hacer (que no sabes), se captura lo que <b>hace hoy</b>. Se le dan entradas variadas, se registra la salida exacta y esa salida se convierte en la expectativa. <b>Incluso si el comportamiento actual tiene bugs</b>, las pruebas los congelan, y eso es lo que quieres: la refactorización no debe cambiar nada, ni siquiera los bugs. (Los bugs se arreglan después, en un cambio aparte y visible.)</li>
<li><b>Obtener entradas reales.</b> Si es posible, registrar entradas y salidas de producción durante unos días y usarlas como casos. Es la mejor fuente de casos de prueba que existe, porque refleja lo que de verdad ocurre.</li>
<li><b>Refactorizar en pasos minúsculos:</b> extraer una función, ejecutar las pruebas, confirmar el commit. Repetir. Cada commit debe dejar el sistema funcionando.</li>
<li><b>Empezar por los extremos:</b> extraer primero los bloques del principio y del final, que suelen tener menos dependencias con el resto.</li>
<li><b>No cambiar comportamiento</b> en ningún paso. Si encuentras un bug, <b>anótalo y arréglalo después</b>, en un commit separado con su propia prueba.</li>
</ol>
<p><b>Si no puedes escribir pruebas antes</b> (el caso real más común, cuando la función depende de medio sistema):</p>
<ul>
<li><b>Usa el «refactor de aproximación»:</b> empieza por extracciones <b>puramente mecánicas</b> que las herramientas del editor pueden hacer automáticamente (extraer método, renombrar variable). Son transformaciones que preservan el comportamiento por construcción y tienen riesgo muy bajo.</li>
<li><b>Rompe las dependencias primero.</b> Objetivo intermedio: conseguir que la función reciba sus dependencias en lugar de crearlas, lo que la hace probable. Es la inversión de dependencias del módulo 8 aplicada como estrategia de rescate.</li>
<li><b>Técnica del <i>sprout</i>:</b> no toques la función vieja; escribe la lógica nueva en una función nueva, bien probada, y llámala desde la vieja. La parte nueva nace con pruebas y la vieja se va vaciando con el tiempo.</li>
<li><b>Compara en paralelo:</b> ejecuta la implementación vieja y la nueva con las mismas entradas y compara las salidas en producción durante un tiempo, registrando las diferencias sin usar todavía la nueva. Es cómo se migran sistemas críticos de verdad.</li>
</ul>
<p>El libro de referencia para esta situación es <i>Working Effectively with Legacy Code</i> de Michael Feathers, cuya definición de «código heredado» es memorable y exacta: <b>código sin pruebas</b>, sin importar su antigüedad.</p>` },
        { n: 5, titulo: 'Evalúa la deuda técnica',
          enunciado: 'Tu proyecto tiene: (a) una función de 400 líneas que nadie toca desde hace un año; (b) código duplicado en tres módulos que se modifican cada semana; (c) nombres de variables en inglés mezclados con español; (d) sin pruebas en el módulo de pagos; (e) una biblioteca sin mantenimiento desde 2019. Prioriza qué atacar y justifica.',
          pista: 'El costo de la deuda depende de cuánto se toca esa parte y del riesgo si falla.',
          solucion: `<p><b>Prioridad 1 — (d) Sin pruebas en pagos.</b> Es el riesgo más alto: un bug en pagos cuesta dinero real, pérdida de confianza y posiblemente problemas legales. Además, sin pruebas no se puede modificar con seguridad, así que bloquea cualquier mejora futura en la parte más crítica del sistema. <b>Acción:</b> escribir pruebas de caracterización de los flujos principales, empezando por los casos que involucran dinero.</p>
<p><b>Prioridad 2 — (b) Duplicación en módulos que cambian semanalmente.</b> Aquí la deuda <b>se paga cada semana</b>: cada cambio hay que hacerlo tres veces y, tarde o temprano, alguien olvida uno y aparece una inconsistencia difícil de rastrear. El costo es recurrente y creciente. <b>Acción:</b> extraer lo común, con pruebas que confirmen que los tres sitios siguen comportándose igual.</p>
<p><b>Prioridad 3 — (e) Biblioteca sin mantenimiento desde 2019.</b> Es un <b>riesgo de seguridad</b>: no recibe parches de vulnerabilidades, y puede dejar de funcionar al actualizar el lenguaje o el sistema operativo. No urge hoy, pero el día que urja será una emergencia. <b>Acción:</b> evaluar alternativas, estimar el esfuerzo de migración y planificarlo antes de que sea forzoso. Aislar su uso detrás de un adaptador (módulo 8) para que la migración futura sea local.</p>
<p><b>Prioridad 4 — (c) Nombres mezclados en dos idiomas.</b> Molesta y aumenta la carga mental, pero no causa fallos. <b>Acción:</b> acordar una convención, documentarla, y aplicar la <b>regla del campamento</b>: cada vez que toques un archivo, normaliza lo que tocaste. Renombrar todo de golpe genera un commit gigante imposible de revisar y conflictos con todo el trabajo en curso.</p>
<p><b>Prioridad 5 — (a) Función de 400 líneas que nadie toca.</b> <b>Acción: dejarla en paz.</b> Si funciona y nadie la modifica, refactorizarla tiene costo y riesgo sin ningún beneficio. La deuda técnica solo cuesta cuando hay que tocar el código. <b>Si mañana hay que modificarla</b>, entonces sí: ese es el momento de escribir pruebas y dividirla.</p>
<p><b>El criterio general que ordena la lista:</b></p>
<p style="text-align:center"><b>prioridad ≈ (frecuencia de cambio) × (riesgo si falla)</b></p>
<p>No «cuán feo es el código». Eso es lo que distingue a quien gestiona deuda técnica con criterio de quien refactoriza por gusto. Y la forma de hacerlo sostenible es <b>hacer la deuda visible</b>: anotarla, estimarla y decidir conscientemente cuándo pagarla, en lugar de descubrirla cuando ya bloquea el avance.</p>` }
      ],
      quiz: [
        { p: 'Un comentario útil es el que explica…',
          ops: ['qué hace el código línea por línea', 'por qué el código es así: decisiones no evidentes y trampas conocidas',
            'quién lo escribió', 'la sintaxis del lenguaje'],
          ok: 1, exp: 'El qué ya está en el código. El porqué —la restricción, el ticket, la trampa de la API— no está en ninguna otra parte.' },
        { p: 'Al refactorizar, lo más importante es…',
          ops: ['hacerlo todo de una vez', 'no cambiar el comportamiento, con pruebas que lo confirmen, en pasos pequeños',
            'mejorar también la funcionalidad', 'reescribir desde cero'],
          ok: 1, exp: 'Si refactorizas y cambias funcionalidad a la vez y algo falla, no sabrás cuál de las dos cosas lo rompió.' },
        { p: 'Una función de 400 líneas que funciona y nadie ha tocado en un año…',
          ops: ['hay que refactorizarla de inmediato', 'se puede dejar como está: la deuda técnica solo cuesta cuando hay que modificar el código',
            'hay que reescribirla desde cero', 'hay que borrarla'],
          ok: 1, exp: 'Prioriza por frecuencia de cambio × riesgo si falla, no por cuán feo te parece el código.' }
      ]
    },

    {
      id: 'm10-4',
      titulo: 'Del código al usuario: despliegue y seguridad',
      resumen: 'Entornos, variables de configuración, despliegue continuo y las prácticas de seguridad que no son opcionales.',
      objetivos: [
        'Separar configuración de código y manejar entornos',
        'Entender el flujo de despliegue moderno',
        'Aplicar las prácticas de seguridad básicas de cualquier aplicación'
      ],
      lectura: `
<p>Un programa que solo funciona en tu máquina no resuelve el problema de nadie. Esta lección cubre lo mínimo para
llevar código a producción sin desastres.</p>

<h2>Entornos</h2>
${tabla(['Entorno', 'Para qué', 'Datos'], [
  ['<b>Desarrollo</b>', 'tu máquina, mientras programas', 'datos de prueba inventados'],
  ['<b>Pruebas / CI</b>', 'ejecutar la batería automática', 'datos generados por las pruebas'],
  ['<b>Preproducción</b> (<i>staging</i>)', 'ensayo final, idéntico a producción', 'copia anonimizada de producción'],
  ['<b>Producción</b>', 'donde están los usuarios reales', 'datos reales']
], 'La regla de oro: preproducción debe parecerse a producción todo lo posible. La mayoría de los fallos de despliegue vienen de diferencias entre ambos.')}

<h2>Configuración fuera del código</h2>
<p>El mismo código debe funcionar en los cuatro entornos cambiando solo la configuración. Eso significa que las URLs,
contraseñas, claves y modos <strong>nunca</strong> van escritas en el código.</p>

${cod('python', `# MAL
conexion = conectar("prod.servidor.com", "admin", "Clave123!")

# BIEN: variables de entorno
import os
conexion = conectar(
    host=os.environ["BD_HOST"],
    usuario=os.environ["BD_USUARIO"],
    clave=os.environ["BD_CLAVE"],
)`)}

<p>Se acompaña de un <code>.env.example</code> versionado con los <em>nombres</em> de las variables y sin los valores,
para que quien instale el proyecto sepa qué debe configurar.</p>

${nota('Las reglas no negociables de los secretos',
  '<ul><li>Nunca en el código ni en el repositorio.</li>' +
  '<li>Distintos por entorno: la clave de desarrollo nunca es la de producción.</li>' +
  '<li>Rotables: hay que poder cambiarlos sin modificar código.</li>' +
  '<li>Con el mínimo privilegio: la cuenta de la aplicación no necesita permisos de administrador.</li></ul>', 'key')}

<h2>El flujo de despliegue moderno</h2>
${cod('txt', `git push
   ↓
Integración continua: se ejecutan las pruebas automáticamente
   ↓  (si fallan, se detiene aquí)
Construcción: se empaqueta la aplicación
   ↓
Despliegue a preproducción → verificación
   ↓
Despliegue a producción
   ↓
Monitoreo: ¿subieron los errores? ¿bajó el rendimiento?`)}

<p>Plataformas como Vercel, Netlify, Railway o Render hacen casi todo esto automáticamente: conectas el repositorio y
cada <code>push</code> a la rama principal despliega. Es una mejora enorme respecto de subir archivos por FTP a mano, y
está al alcance de cualquier proyecto personal.</p>

<h2>Dos técnicas que evitan sustos</h2>
<ul>
  <li><strong>Despliegue azul-verde:</strong> se levanta la versión nueva en paralelo a la vieja y se cambia el tráfico
  de golpe. Si algo falla, se vuelve atrás en segundos.</li>
  <li><strong>Banderas de funcionalidad</strong> (<em>feature flags</em>): el código nuevo se despliega
  <strong>desactivado</strong> y se enciende para un porcentaje de usuarios. Separa «desplegar» de «lanzar», permite
  apagar algo sin volver a desplegar, y hace posible probar con usuarios reales.</li>
</ul>

<h2>Seguridad: lo que no es opcional</h2>

<h3>1. Nunca confíes en la entrada</h3>
<p>Es la regla del módulo 4, y aquí se vuelve crítica. Las tres vulnerabilidades más explotadas son, en el fondo,
fallos de validación:</p>

${tabla(['Ataque', 'Qué ocurre', 'Defensa'], [
  ['<b>Inyección SQL</b>', 'un dato del usuario se ejecuta como SQL', '<b>consultas parametrizadas</b>, nunca concatenar'],
  ['<b>XSS</b>', 'un texto del usuario se ejecuta como JavaScript en el navegador de otro', 'escapar al mostrar; nunca insertar HTML crudo'],
  ['<b>CSRF</b>', 'otro sitio hace peticiones en nombre del usuario', 'tokens anti-CSRF; cookies <code>SameSite</code>'],
  ['<b>Travesía de rutas</b>', '<code>../../etc/passwd</code> en un nombre de archivo', 'validar y normalizar rutas'],
  ['<b>Desbordamiento de búfer</b>', 'se escribe más allá del arreglo', 'lenguajes con comprobación; validar longitudes']
])}

${cod('python', `# MAL: inyección SQL. Si usuario = "'; DROP TABLE clientes; --"
cursor.execute("SELECT * FROM clientes WHERE nombre = '" + usuario + "'")

# BIEN: consulta parametrizada. El motor trata el valor como DATO, nunca como código
cursor.execute("SELECT * FROM clientes WHERE nombre = %s", (usuario,))`)}

<h3>2. Contraseñas</h3>
<ul>
  <li><strong>Nunca se guardan.</strong> Se guarda un <em>hash</em> con <strong>bcrypt</strong>, <strong>scrypt</strong>
  o <strong>Argon2</strong>, que son lentos a propósito para que probar millones de contraseñas sea inviable.</li>
  <li><strong>Nunca MD5 ni SHA-1</strong>, que son rápidos y están rotos. SHA-256 tampoco: es rápido, que es justo lo
  que no se quiere aquí.</li>
  <li><strong>Con sal</strong> (<em>salt</em>) única por usuario, para que dos contraseñas iguales produzcan hashes
  distintos. Las bibliotecas modernas la generan solas.</li>
  <li><strong>Longitud mínima generosa</strong> (12+) en lugar de reglas de símbolos obligatorios, que empujan a
  <code>Password1!</code>.</li>
</ul>

<h3>3. Lo demás</h3>
<ul>
  <li><strong>HTTPS siempre.</strong> Es gratis con Let's Encrypt y no hay excusa.</li>
  <li><strong>Actualiza las dependencias.</strong> La mayoría de las brechas explotan vulnerabilidades <em>conocidas</em>
  con parche disponible.</li>
  <li><strong>Mínimo privilegio:</strong> cada componente con los permisos justos.</li>
  <li><strong>No reveles detalles en los errores.</strong> Al usuario, un mensaje claro; al log, el detalle.</li>
  <li><strong>Limita la tasa de peticiones</strong> en los puntos sensibles (inicio de sesión, recuperación de clave).</li>
  <li><strong>Registra lo importante</strong> —quién hizo qué y cuándo— y <strong>nunca</strong> registres contraseñas,
  tarjetas ni datos personales sensibles.</li>
</ul>

<h2>Después de desplegar</h2>
<p>Desplegar no es terminar. Hace falta saber si funciona:</p>
<ul>
  <li><strong>Registro de errores</strong> centralizado, con alerta cuando algo se dispara.</li>
  <li><strong>Métricas básicas:</strong> tiempo de respuesta, tasa de errores, uso de recursos.</li>
  <li><strong>Comprobación de salud</strong> (<em>health check</em>): una ruta que diga si la aplicación está viva.</li>
  <li><strong>Respaldos probados.</strong> Un respaldo que nunca se ha restaurado no es un respaldo: es una suposición.</li>
</ul>
      `,
      ejercicios: [
        { n: 1, titulo: 'Separa la configuración',
          enunciado: 'Este archivo tiene cinco problemas de configuración y seguridad. Encuéntralos y reescríbelo.<br><pre>DB_HOST = "prod.miempresa.com"\nDB_PASS = "Admin2024!"\nAPI_KEY = "sk-abc123xyz"\nDEBUG = True\nALLOWED_HOSTS = ["*"]</pre>',
          pista: 'Secretos en el código, modo de depuración y permisividad.',
          solucion: `<p><b>Los cinco problemas:</b></p>
<ol>
<li><b>Contraseña de producción en el código</b>, que acabará en el repositorio y será visible para todos, para siempre.</li>
<li><b>Clave de API en el código</b>, igual de grave. Los robots que escanean GitHub buscan exactamente ese patrón <code>sk-</code>.</li>
<li><b><code>DEBUG = True</code></b> en producción: muestra trazas completas con rutas, consultas SQL y a veces variables de entorno a cualquiera que provoque un error. Es un regalo para un atacante.</li>
<li><b><code>ALLOWED_HOSTS = ["*"]</code></b>: acepta peticiones con cualquier cabecera <code>Host</code>, lo que habilita ataques de envenenamiento de caché y de restablecimiento de contraseña con enlaces falsos.</li>
<li><b>Un solo archivo para todos los entornos:</b> no hay forma de usar valores distintos en desarrollo y producción sin editar el código.</li>
</ol>
<p><b>Reescrito:</b></p>
${cod('python', `import os

def requerido(nombre):
    """Falla al arrancar si falta una variable, en lugar de fallar a medias después."""
    valor = os.environ.get(nombre)
    if valor is None:
        raise RuntimeError(f"Falta la variable de entorno {nombre}")
    return valor

DB_HOST   = requerido("DB_HOST")
DB_PASS   = requerido("DB_PASS")
API_KEY   = requerido("API_KEY")

DEBUG         = os.environ.get("DEBUG", "false").lower() == "true"   # falso por defecto
ALLOWED_HOSTS = requerido("ALLOWED_HOSTS").split(",")`)}
<p>Y un <code>.env.example</code> versionado, sin valores reales:</p>
${cod('txt', `DB_HOST=localhost
DB_PASS=cambiame
API_KEY=tu-clave-aqui
DEBUG=true
ALLOWED_HOSTS=localhost,127.0.0.1`)}
<p><b>Tres detalles que marcan la diferencia:</b></p>
<ul>
<li><b>La función <code>requerido</code></b> hace que la aplicación <b>falle al arrancar</b> si falta una variable, con un mensaje claro. Es muchísimo mejor que descubrirlo cuando un usuario provoca ese camino del código. Es <i>fail fast</i> del módulo 0.</li>
<li><b><code>DEBUG</code> por defecto en falso.</b> Los valores por defecto deben ser los seguros: si alguien olvida configurarlo, el error es hacia el lado conservador.</li>
<li><b>El <code>.env.example</code> documenta</b> qué hay que configurar sin filtrar nada, y es lo primero que mira quien instala el proyecto.</li>
</ul>` },
        { n: 2, titulo: 'Previene la inyección',
          enunciado: 'Explica exactamente qué ocurre con esta consulta si el usuario escribe <code>\' OR \'1\'=\'1</code> en el campo usuario, y luego escribe la versión segura.<br><pre>sql = "SELECT * FROM usuarios WHERE user = \'" + u + "\' AND pass = \'" + p + "\'"</pre>',
          pista: 'Sustituye el texto literalmente y lee el SQL resultante.',
          solucion: `<p><b>Con <code>u = "' OR '1'='1"</code> y cualquier contraseña, el SQL que llega al motor es:</b></p>
<pre>SELECT * FROM usuarios WHERE user = '' OR '1'='1' AND pass = 'loquesea'</pre>
<p>Como <code>'1'='1'</code> es siempre verdadero y <code>OR</code> tiene menor precedencia que <code>AND</code>, la condición completa se cumple y <b>la consulta devuelve usuarios sin conocer ninguna contraseña</b>. Con un <code>--</code> al final se comenta el resto y el atacante entra como el primer usuario de la tabla, que suele ser el administrador.</p>
<p><b>Y puede ser mucho peor.</b> Con <code>u = "'; DROP TABLE usuarios; --"</code>:</p>
<pre>SELECT * FROM usuarios WHERE user = ''; DROP TABLE usuarios; --' AND pass = ''</pre>
<p>El motor ejecuta dos instrucciones y la segunda borra la tabla. Variantes de este ataque permiten leer otras tablas con <code>UNION SELECT</code>, extraer el esquema completo o, en algunas configuraciones, ejecutar comandos del sistema.</p>
<p><b>La versión segura — consulta parametrizada:</b></p>
${cod('python', `cursor.execute(
    "SELECT * FROM usuarios WHERE user = %s AND pass_hash = %s",
    (usuario, hash_calculado)
)`)}
<p><b>Por qué esto funciona de verdad:</b> la consulta y los datos viajan <b>por separado</b>. El motor compila primero la consulta con sus huecos y <i>después</i> le entrega los valores, que trata como <b>datos puros</b>: aunque contengan comillas, punto y coma o la palabra DROP, nunca se interpretan como SQL. <b>No es que se «escapen» los caracteres peligrosos: es que los datos nunca llegan a la parte del motor que interpreta sintaxis.</b></p>
<p><b>Tres notas finales:</b></p>
<ul>
<li><b>Escapar manualmente no es una alternativa aceptable.</b> Hay demasiados casos límite (codificaciones, Unicode, comportamientos del motor) y basta un olvido. Las consultas parametrizadas son la única defensa fiable.</li>
<li><b>El ejemplo además revela otro error grave:</b> compara <code>pass</code> directamente, lo que significa que las contraseñas están guardadas en texto plano. Deben guardarse con bcrypt o Argon2 y compararse con la función de verificación de la biblioteca.</li>
<li><b>La inyección SQL lleva más de 25 años en el top 10 de OWASP</b> y sigue causando brechas masivas, con una solución conocida, sencilla y disponible en todos los lenguajes. Es, probablemente, el fallo más evitable de la industria.</li>
</ul>` },
        { n: 3, titulo: 'Diseña el despliegue',
          enunciado: 'Tienes una aplicación web con frontend, API y base de datos. Diseña el flujo completo desde que escribes código hasta que el usuario lo ve, incluyendo qué se automatiza y qué se verifica en cada paso.',
          pista: 'Rama, pruebas, construcción, preproducción, producción, monitoreo.',
          solucion: `<pre>1. Rama de trabajo
   git switch -c agrega-filtro-fechas
   · pruebas unitarias en local en cada guardado

2. Pull request
   · CI automática: linter → pruebas unitarias → pruebas de integración
   · revisión de otra persona
   · despliegue automático a un entorno de vista previa (Vercel y similares
     crean uno por cada PR: permite probar el cambio aislado)
   · no se puede fusionar si algo falla

3. Fusión a main
   · CI completa otra vez sobre el resultado de la fusión
   · construcción de los artefactos (frontend compilado, imagen del API)
   · despliegue automático a PREPRODUCCIÓN

4. Verificación en preproducción
   · pruebas de extremo a extremo automáticas sobre el camino crítico
   · prueba manual del cambio concreto
   · migraciones de base de datos aplicadas y verificadas

5. Despliegue a PRODUCCIÓN
   · migraciones primero, compatibles hacia atrás
   · despliegue del API, luego del frontend
   · health check automático; si falla, vuelta atrás automática

6. Después
   · monitoreo de la tasa de errores durante 30 minutos
   · métricas de tiempo de respuesta
   · bandera de funcionalidad para activar el filtro gradualmente</pre>
<p><b>Las cuatro decisiones importantes:</b></p>
<ol>
<li><b>Las migraciones de base de datos van primero y deben ser compatibles hacia atrás</b>, porque durante unos minutos convivirán la versión vieja y la nueva del código. Añadir una columna es seguro; borrarla o renombrarla, no. La técnica es la <b>expansión-contracción</b>: primero se añade lo nuevo, luego se migra el código, y solo después —en otro despliegue— se elimina lo viejo. <b>Este es el paso que más despliegues rompe.</b></li>
<li><b>Vuelta atrás automática si el health check falla.</b> Debe ser posible volver a la versión anterior en menos de un minuto, sin intervención humana. Poder deshacer vale más que evitar todos los errores.</li>
<li><b>Entornos de vista previa por pull request.</b> Permiten que alguien no técnico vea el cambio antes de fusionarlo, y eliminan el «funcionaba en mi máquina».</li>
<li><b>Banderas de funcionalidad.</b> Separan desplegar de lanzar: el código llega a producción apagado y se enciende cuando se decide, para el 5% de usuarios primero. Si algo va mal, se apaga sin desplegar nada.</li>
</ol>
<p><b>Para un proyecto personal</b>, los pasos 1, 2, 3 y 5 se consiguen prácticamente gratis conectando el repositorio a Vercel, Netlify o Railway y añadiendo un archivo de GitHub Actions con las pruebas. Es media hora de configuración y cambia por completo la forma de trabajar.</p>` },
        { n: 4, titulo: 'Auditoría de seguridad',
          enunciado: 'Revisa esta lista de prácticas de una aplicación y di cuáles son correctas y cuáles son vulnerabilidades: (a) contraseñas guardadas con SHA-256; (b) validación solo en el navegador; (c) mensajes de error que incluyen la consulta SQL; (d) la aplicación se conecta a la base de datos con el usuario root; (e) las dependencias se actualizaron por última vez en 2022; (f) HTTPS solo en la página de login.',
          pista: 'Las seis son problemáticas, cada una por una razón distinta.',
          solucion: `<p><b>(a) Vulnerabilidad.</b> SHA-256 es un hash <b>rápido</b>, y eso es exactamente lo que no se quiere para contraseñas: una GPU moderna prueba miles de millones por segundo. Hay que usar <b>bcrypt, scrypt o Argon2</b>, diseñados para ser lentos y con costo ajustable. Además hace falta <b>sal única por usuario</b>; sin ella, dos usuarios con la misma contraseña tienen el mismo hash y una tabla precomputada los rompe a ambos.</p>
<p><b>(b) Vulnerabilidad grave.</b> La validación del navegador es una comodidad para el usuario, no una barrera: cualquiera envía peticiones directas con curl o Postman. <b>Toda validación debe repetirse en el servidor</b>, que es el único punto que el usuario no controla.</p>
<p><b>(c) Vulnerabilidad.</b> Revela la estructura de la base de datos, los nombres de tablas y columnas, y a veces fragmentos de datos. Es información de reconocimiento valiosísima para un atacante y además facilita afinar una inyección SQL. <b>Al usuario, un mensaje genérico con un número de incidente; al log, el detalle completo.</b></p>
<p><b>(d) Vulnerabilidad.</b> Viola el <b>mínimo privilegio</b>. Si hay una inyección SQL, con root el atacante puede borrar tablas, leer cualquier base del servidor y a veces ejecutar comandos del sistema. Con un usuario limitado a SELECT, INSERT y UPDATE sobre las tablas necesarias, el daño potencial se reduce drásticamente. <b>No evita la vulnerabilidad, pero limita su alcance</b>, que es de lo que trata la defensa en profundidad.</p>
<p><b>(e) Vulnerabilidad.</b> Cuatro años sin actualizar significa decenas de vulnerabilidades conocidas <b>con parche disponible</b>. La mayoría de las brechas reales no usan ataques novedosos: explotan fallos publicados que nadie parcheó. <b>Acción:</b> activar alertas automáticas (Dependabot) y hacer de la actualización una rutina, no un proyecto.</p>
<p><b>(f) Vulnerabilidad.</b> Si el login es HTTPS pero el resto no, la <b>cookie de sesión viaja en claro</b> en cada petición posterior y cualquiera en la misma red la captura y suplanta al usuario sin necesitar la contraseña. HTTPS debe ser <b>total</b>, con redirección automática y la cabecera HSTS. Es gratis con Let's Encrypt.</p>
<p><b>El patrón común de las seis:</b> ninguna requiere un ataque sofisticado. Son fallos conocidos, documentados y con solución estándar. <b>La seguridad básica es sobre todo disciplina</b>, no genialidad: usar las bibliotecas correctas, aplicar el mínimo privilegio y mantener todo actualizado.</p>` },
        { n: 5, titulo: 'Plan de puesta en producción',
          enunciado: 'Vas a publicar tu primer proyecto real. Escribe la lista de verificación completa de lo que debe estar listo antes de que entre el primer usuario.',
          pista: 'Funcionalidad, seguridad, operación y qué hacer cuando algo falle.',
          solucion: `<p><b>Funcionalidad</b></p>
<ul>
<li>El camino crítico funciona de extremo a extremo en preproducción.</li>
<li>Se probó en los navegadores y tamaños de pantalla que vas a soportar.</li>
<li>Los mensajes de error son comprensibles para un usuario no técnico.</li>
<li>Los casos límite probados: sin datos, con muchos datos, con datos raros.</li>
</ul>
<p><b>Seguridad</b></p>
<ul>
<li>HTTPS activo y con redirección desde HTTP.</li>
<li>Secretos en variables de entorno, ninguno en el repositorio.</li>
<li>Contraseñas con bcrypt o Argon2.</li>
<li>Consultas parametrizadas en todas partes, sin excepción.</li>
<li>Validación en el servidor de todas las entradas.</li>
<li>Usuario de base de datos con permisos mínimos.</li>
<li>Dependencias actualizadas y sin vulnerabilidades conocidas.</li>
<li><code>DEBUG</code> desactivado en producción.</li>
<li>Límite de tasa en login y recuperación de contraseña.</li>
</ul>
<p><b>Operación</b></p>
<ul>
<li><b>Respaldos automáticos y una restauración probada de verdad.</b> Un respaldo no restaurado es una suposición, no un respaldo.</li>
<li>Registro de errores centralizado con alertas.</li>
<li>Métricas básicas: tiempo de respuesta, tasa de errores, uso de recursos.</li>
<li>Ruta de health check.</li>
<li>Dominio configurado con un certificado que se renueva solo.</li>
</ul>
<p><b>Cuando algo falle (porque va a fallar)</b></p>
<ul>
<li><b>Procedimiento de vuelta atrás probado</b>, en menos de 5 minutos.</li>
<li>Saber a quién avisar y cómo.</li>
<li>Página de mantenimiento lista por si hay que bajar el servicio.</li>
<li>Los datos de contacto del soporte visibles para el usuario.</li>
</ul>
<p><b>Legal y de producto</b></p>
<ul>
<li>Política de privacidad si recoges datos personales.</li>
<li>Términos de uso.</li>
<li>Una forma de que los usuarios reporten problemas.</li>
</ul>
<p><b>Las tres cosas que la gente olvida y más duelen:</b></p>
<ol>
<li><b>Probar la restauración del respaldo.</b> Muchos equipos descubren que su respaldo estaba vacío o corrupto <i>el día que lo necesitan</i>. Restaurarlo una vez, en un entorno aparte, es la hora mejor invertida de todo el proyecto.</li>
<li><b>El procedimiento de vuelta atrás.</b> Durante un incidente nadie piensa con claridad. Tener escrito y probado cómo volver a la versión anterior convierte una crisis en un trámite de cinco minutos.</li>
<li><b>Una forma de que los usuarios te digan qué está mal.</b> Tus usuarios encontrarán errores que tus pruebas no cubrían. Si no tienen cómo reportarlos, simplemente se van, y tú nunca sabes por qué.</li>
</ol>
<p><b>Y una perspectiva honesta:</b> esta lista parece abrumadora y no hace falta hacerlo todo perfecto el primer día. Pero <b>HTTPS, secretos fuera del código, consultas parametrizadas, contraseñas bien guardadas y respaldos probados</b> son el mínimo innegociable. El resto se puede ir construyendo.</p>` }
      ],
      quiz: [
        { p: 'Las contraseñas deben guardarse…',
          ops: ['cifradas con AES', 'con un hash rápido como SHA-256',
            'con un hash lento y con sal: bcrypt, scrypt o Argon2', 'en texto plano pero en una tabla aparte'],
          ok: 2, exp: 'Los hashes rápidos permiten probar miles de millones por segundo en una GPU. Los algoritmos de contraseña son lentos a propósito.' },
        { p: 'La defensa correcta contra la inyección SQL es…',
          ops: ['escapar las comillas manualmente', 'usar consultas parametrizadas, donde el valor nunca se interpreta como código',
            'validar solo en el navegador', 'usar nombres de tabla difíciles'],
          ok: 1, exp: 'La consulta se compila primero y los datos se entregan después, así que nunca llegan a la parte que interpreta sintaxis.' },
        { p: 'Un respaldo automático que nunca se ha restaurado…',
          ops: ['es suficiente', 'no es un respaldo: es una suposición que hay que verificar',
            'solo importa en empresas grandes', 'se verifica solo'],
          ok: 1, exp: 'Muchos equipos descubren que el respaldo estaba vacío o corrupto el día que lo necesitan. Probar una restauración es la hora mejor invertida del proyecto.' }
      ]
    },

    {
      id: 'm10-5',
      titulo: 'Cómo seguir aprendiendo',
      resumen: 'Qué hacer al terminar este curso: proyectos, especialidades, cómo estudiar y cómo no estancarse.',
      objetivos: [
        'Diseñar tu propio camino de aprendizaje',
        'Elegir proyectos que enseñen de verdad',
        'Reconocer y evitar las trampas más comunes del autodidacta'
      ],
      lectura: `
<p>Si llegaste hasta aquí, tienes los fundamentos: sabes cómo funciona la máquina, cómo se diseña un algoritmo, cómo se
estructura un programa y cómo se entrega. Lo que sigue no es «más teoría», es <strong>uso</strong>.</p>

<h2>La regla principal: construye cosas</h2>
<p>El salto de «entiendo los conceptos» a «sé programar» solo ocurre construyendo. Y no cualquier cosa: proyectos que
te importen y que sean un poco más difíciles de lo que ya sabes hacer.</p>

${tabla(['Nivel', 'Proyecto', 'Qué te obliga a aprender'], [
  ['Primer paso', 'Una calculadora o conversor de unidades', 'entrada/salida, validación, interfaz básica'],
  ['', 'Un gestor de tareas con archivo', 'persistencia, estructuras de datos, CRUD'],
  ['Intermedio', 'Un scraper que recoge datos y los grafica', 'HTTP, parseo, bibliotecas externas, datos sucios'],
  ['', 'Una API REST con base de datos', 'arquitectura, modelos, autenticación'],
  ['', 'Un bot de Telegram o Discord', 'eventos, estado, despliegue permanente'],
  ['Avanzado', 'Un intérprete de un lenguaje pequeño', 'todo el módulo 9'],
  ['', 'Un juego 2D', 'bucle de juego, colisiones, rendimiento'],
  ['', 'Una aplicación completa con usuarios', 'seguridad, despliegue, operación'],
  ['Cualquiera', '<b>Algo que tú necesites de verdad</b>', 'lo que haga falta, y lo terminas porque lo usas']
], 'La última fila es la más importante: un proyecto que usas tú mismo se termina y se mantiene; uno de ejemplo se abandona.')}

${nota('Termina las cosas',
  '<p>Diez proyectos al 80% enseñan menos que dos terminados. El último 20% —los casos límite, el despliegue, el ' +
  'README, los errores de usuarios reales— es donde está casi todo el aprendizaje que no se encuentra en ningún ' +
  'tutorial.</p>', 'key')}

<h2>Las trampas del autodidacta</h2>
<ul>
  <li><strong>El infierno de los tutoriales.</strong> Seguir un tutorial produce la sensación de aprender sin el
  esfuerzo de aprender. Antídoto: después de cada tutorial, construye algo <em>distinto</em> con lo aprendido, sin
  mirar.</li>
  <li><strong>Coleccionar lenguajes.</strong> Saber la sintaxis de ocho lenguajes vale menos que resolver problemas
  difíciles en uno. Profundiza antes de ampliar.</li>
  <li><strong>Esperar a estar listo.</strong> Nunca te vas a sentir preparado. Empieza el proyecto y aprende lo que
  falte en el camino.</li>
  <li><strong>Compararte con quien lleva diez años.</strong> Compárate con tu yo de hace tres meses.</li>
  <li><strong>Saltarse los fundamentos.</strong> Si algo de este curso te costó, vuelve. Los fundamentos son lo que no
  caduca: los frameworks cambian cada tres años, la complejidad algorítmica no.</li>
  <li><strong>No leer código ajeno.</strong> Leer buen código enseña tanto como escribirlo. Elige un proyecto de código
  abierto que uses y lee cómo está hecho.</li>
</ul>

<h2>Cómo estudiar algo nuevo con eficacia</h2>
<ol>
  <li><strong>Construye algo mínimo primero</strong>, aunque sea copiando. Necesitas el contexto para que la teoría
  tenga dónde agarrarse.</li>
  <li><strong>Luego lee la documentación oficial.</strong> Es menos cómoda que un video y mucho más completa y actual.</li>
  <li><strong>Rompe cosas a propósito.</strong> Cambia valores, borra líneas, provoca errores. Entender por qué falla
  enseña más que ver cómo funciona.</li>
  <li><strong>Explícalo.</strong> A alguien, a un foro, en un blog o a un pato de goma. Si no puedes explicarlo, no lo
  entiendes.</li>
  <li><strong>Vuelve a los fundamentos</strong> cuando algo no encaje. Casi siempre el problema es un concepto base
  que estaba borroso.</li>
</ol>

<h2>Hacia dónde seguir</h2>
${tabla(['Especialidad', 'Qué hace', 'Qué estudiar después'], [
  ['<b>Desarrollo web</b>', 'sitios y aplicaciones web', 'HTML/CSS a fondo, JavaScript, un framework, bases de datos, HTTP'],
  ['<b>Backend / sistemas</b>', 'servidores, APIs, infraestructura', 'bases de datos, concurrencia, redes, contenedores, nube'],
  ['<b>Datos / IA</b>', 'análisis, modelos, predicción', 'estadística, álgebra lineal, Python científico, SQL'],
  ['<b>Móvil</b>', 'apps para teléfonos', 'Kotlin/Swift o Flutter/React Native, ciclo de vida, almacenamiento local'],
  ['<b>Videojuegos</b>', 'juegos y simulación', 'matemática 3D, física, motores, rendimiento'],
  ['<b>Sistemas embebidos</b>', 'dispositivos, IoT, firmware', 'C, electrónica, tiempo real, restricciones de memoria'],
  ['<b>Seguridad</b>', 'proteger y auditar sistemas', 'redes, criptografía, sistemas operativos, análisis de vulnerabilidades']
], 'Elige por lo que te dé curiosidad, no por el sueldo: vas a dedicarle miles de horas y la curiosidad es lo que sostiene el esfuerzo.')}

<h2>Lo que no caduca</h2>
<p>Los lenguajes y las herramientas que uses dentro de diez años probablemente todavía no existen. Lo que sí va a seguir
siendo válido es casi todo lo de este curso:</p>
<ul>
  <li>Cómo representa datos una máquina y por qué eso produce errores reales.</li>
  <li>Cómo descomponer un problema y diseñar un algoritmo.</li>
  <li>Las estructuras de datos y sus costos.</li>
  <li>Cómo medir y comparar algoritmos.</li>
  <li>Cómo organizar código para que siga siendo modificable.</li>
  <li>Cómo depurar con método en lugar de adivinar.</li>
  <li>Cómo trabajar con otros: versiones, pruebas, revisión.</li>
</ul>

<p>Eso es lo que hace que un programador con oficio pueda cambiar de lenguaje en semanas y de dominio en meses.</p>

${nota('Una última cosa',
  '<p>Programar es difícil, y la sensación de estar perdido no desaparece: cambia de nivel. Los programadores con ' +
  'veinte años de experiencia también pasan tardes enteras con un bug absurdo y también buscan en internet cómo se ' +
  'hacía algo que ya han hecho cien veces.</p>' +
  '<p>La diferencia no es que ellos no se atasquen: es que tienen un método para desatascarse, y ese método es ' +
  'exactamente lo que has estado aprendiendo en este curso.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Diseña tu proyecto',
          enunciado: 'Elige un problema real de tu entorno y diseña el proyecto completo: qué hace, para quién, qué tecnologías, qué vas a aprender con él y cómo sabrás que está terminado.',
          pista: 'Pequeño, real y tuyo. Y define el «terminado» desde el principio.',
          solucion: `<p>No hay una solución única, pero sí una plantilla para evaluar la tuya:</p>
${tabla(['Elemento', 'Está bien si…'], [
  ['<b>El problema</b>', 'es real, es tuyo o de alguien concreto, y lo puedes describir en una frase'],
  ['<b>El usuario</b>', 'es una persona específica, aunque seas tú'],
  ['<b>El alcance mínimo</b>', 'cabe en 2-4 semanas de trabajo a ratos'],
  ['<b>Las tecnologías</b>', 'conoces al menos la mitad; la otra mitad es lo que vas a aprender'],
  ['<b>La definición de terminado</b>', 'es verificable: «mi hermana puede registrar 10 gastos y ver el total del mes»'],
  ['<b>Lo que vas a aprender</b>', 'lo puedes nombrar: «persistencia en archivo», «desplegar en Vercel»']
])}
<p><b>Tres consejos para que lo termines:</b></p>
<ol>
<li><b>Escribe primero el README</b>, antes del código, describiendo el proyecto terminado. Si no puedes explicar qué hace, todavía no está claro. Y cuando pierdas el rumbo a mitad, el README te lo devuelve.</li>
<li><b>Haz la versión más tonta que funcione de punta a punta</b> antes de mejorar nada: datos fijos en el código, sin estilos, sin validaciones. Tener algo que funciona completo, por feo que sea, es lo que sostiene la motivación. Cinco piezas perfectas que no se conectan no son nada.</li>
<li><b>Define «terminado» desde el principio y no lo amplíes.</b> La mejor forma de no terminar nunca es seguir añadiendo requisitos. Lo que se te ocurra después va a una lista de «versión 2».</li>
</ol>
<p><b>Y el consejo más importante:</b> elige algo que vayas a <b>usar de verdad</b>. Un proyecto que usas lo terminas, lo mantienes y descubres sus fallos reales. Uno «de práctica» se abandona a las tres semanas.</p>` },
        { n: 2, titulo: 'Evalúa tu aprendizaje',
          enunciado: 'Repasa los diez módulos de este curso y para cada uno califica honestamente: lo entendí y puedo aplicarlo / lo entendí pero no lo he usado / se me hizo difícil. Luego diseña un plan de dos semanas para reforzar lo más débil.',
          pista: 'Lo que no puedes explicar, no lo entendiste.',
          solucion: `<p><b>Prueba de autoevaluación honesta</b> — para cada módulo, intenta responder sin mirar:</p>
${tabla(['Módulo', 'Pregunta de control'], [
  ['0 · Pensar', '¿Puedes escribir las cinco propiedades de un algoritmo y un ejemplo que viole cada una?'],
  ['1 · La máquina', '¿Puedes explicar por qué 0.1 + 0.2 ≠ 0.3 y cómo se guarda −5 en 8 bits?'],
  ['2 · Diagramas', '¿Puedes dibujar un diagrama con un bucle anidado y trazarlo?'],
  ['3 · Pseudocódigo', '¿Puedes escribir un algoritmo con funciones y arreglos sin consultar nada?'],
  ['4 · Lógica aplicada', '¿Puedes nombrar seis patrones y su inicialización correcta?'],
  ['5 · Código real', '¿Puedes traducir un algoritmo a dos lenguajes y explicar qué cambia?'],
  ['6 · Estructuras', '¿Puedes decir cuándo usar lista, diccionario, árbol o grafo y por qué?'],
  ['7 · Algoritmos', '¿Puedes calcular la complejidad de un código nuevo y explicar la búsqueda binaria?'],
  ['8 · Objetos', '¿Puedes diseñar tres clases con sus responsabilidades para un problema nuevo?'],
  ['9 · Compiladores', '¿Puedes explicar qué hace cada fase y por qué los errores aparecen donde aparecen?'],
  ['10 · Producto', '¿Puedes listar lo mínimo para publicar algo con seguridad razonable?']
])}
<p><b>Plan de dos semanas para lo más débil</b> (el patrón, adáptalo al módulo que sea):</p>
<pre>Días 1-2   Releer el módulo, haciendo los ejercicios SIN mirar las soluciones.
Días 3-5   Un mini-proyecto que fuerce a usar ese tema concreto.
Días 6-8   Buscar cómo lo resuelve un proyecto de código abierto real y leerlo.
Días 9-11  Explicarlo por escrito, como si se lo enseñaras a alguien.
Días 12-14 Un segundo mini-proyecto, más difícil, sin ayuda.</pre>
<p><b>La prueba definitiva es el paso de explicar.</b> Si al escribirlo descubres huecos —y los vas a descubrir—, ahí está exactamente lo que no habías entendido. Es la técnica de Feynman, y es el método de estudio más eficaz que existe para material técnico.</p>` },
        { n: 3, titulo: 'Lee código ajeno',
          enunciado: 'Elige un proyecto de código abierto pequeño que uses o te interese, y propón un plan para entenderlo: por dónde empezar, qué buscar y cómo no perderte.',
          pista: 'No empieces por la primera línea del archivo más grande.',
          solucion: `<p><b>El plan, en orden:</b></p>
<ol>
<li><b>Úsalo primero como usuario.</b> Entender qué hace desde fuera es imprescindible para entender el código desde dentro.</li>
<li><b>Lee el README y la documentación de arquitectura</b> si existe. Muchos proyectos tienen un <code>ARCHITECTURE.md</code> o una sección en la wiki que ahorra días.</li>
<li><b>Mira la estructura de carpetas</b> antes que ningún archivo. Suele revelar la arquitectura: separación por capas, por funcionalidad, por tipo.</li>
<li><b>Busca el punto de entrada</b> (<code>main</code>, <code>index</code>, <code>app</code>) y sigue el flujo <b>una sola operación</b> de principio a fin. No intentes entenderlo todo: entiende <i>un camino</i> completo.</li>
<li><b>Lee las pruebas.</b> Son documentación ejecutable: muestran cómo se usa cada pieza y qué casos importan. A menudo se entiende antes una clase por sus pruebas que por su código.</li>
<li><b>Mira el historial de Git</b> de un archivo que te interese: <code>git log -p archivo</code> muestra cómo evolucionó y por qué. Los mensajes de commit explican decisiones que el código no.</li>
<li><b>Busca los issues etiquetados «good first issue»</b>. Están pensados para quien llega, y arreglar uno te obliga a entender una parte concreta con un objetivo claro.</li>
<li><b>Modifica algo y ejecuta las pruebas.</b> Rompe algo a propósito y mira qué falla: es la forma más rápida de descubrir qué depende de qué.</li>
</ol>
<p><b>Cómo no perderse:</b></p>
<ul>
<li><b>Acepta no entenderlo todo.</b> Nadie entiende un proyecto grande entero, ni siquiera sus mantenedores. Se entiende por zonas.</li>
<li><b>Ten un objetivo concreto:</b> «quiero entender cómo valida los formularios» es alcanzable; «quiero entender el proyecto» no.</li>
<li><b>Usa el depurador</b> para seguir la ejecución real en lugar de leer y suponer. Ver los valores reales en cada paso vale más que mil lecturas.</li>
<li><b>Dibuja</b> lo que vas entendiendo: qué llama a qué, qué datos fluyen. Un diagrama propio vale más que uno ajeno.</li>
</ul>
<p><b>Por qué merece tanto la pena:</b> leer buen código es la forma más rápida de aprender a escribirlo. Ves decisiones de diseño reales, con sus compromisos, en código que funciona en producción y ha sobrevivido a años de cambios. Ningún tutorial te da eso.</p>` },
        { n: 4, titulo: 'Las trampas',
          enunciado: 'Para cada trampa del autodidacta mencionada en la lección, escribe una señal concreta de que estás cayendo en ella y una acción específica para salir.',
          pista: 'Las señales son conductas observables, no sensaciones.',
          solucion: `${tabla(['Trampa', 'Señal de que estás cayendo', 'Acción concreta'], [
  ['<b>Infierno de tutoriales</b>', 'Has seguido 5 cursos y no tienes ningún proyecto propio terminado', 'Cierra los tutoriales un mes. Construye algo sin seguir ninguna guía, buscando solo dudas puntuales.'],
  ['<b>Coleccionar lenguajes</b>', 'Sabes «lo básico» de 6 lenguajes y no has hecho nada difícil en ninguno', 'Elige uno y resuelve en él un problema que de verdad te cueste: un intérprete, un juego, una app completa.'],
  ['<b>Esperar a estar listo</b>', 'Llevas meses «preparándote» para empezar un proyecto', 'Empieza hoy la versión más tonta posible. Una hora. Lo que falte lo aprendes cuando choques con ello.'],
  ['<b>Compararte mal</b>', 'Sientes que no avanzas al ver a otros', 'Mira tu código de hace tres meses. Si te da vergüenza, estás aprendiendo. Lleva un registro de lo que construiste.'],
  ['<b>Saltarse fundamentos</b>', 'Copias soluciones de internet sin entender por qué funcionan', 'Cuando copies algo, no sigas hasta poder explicar cada línea. Si no puedes, vuelve al módulo correspondiente.'],
  ['<b>No leer código ajeno</b>', 'Solo has leído tu propio código y el de los tutoriales', 'Elige un proyecto de código abierto que uses y lee una parte cada semana.']
])}
<p><b>La trampa que no estaba en la lista y es la peor: abandonar por frustración.</b> Señal: llevas días con un bug y empiezas a pensar que esto no es para ti. Acción: <b>levántate</b>. En serio. El 80% de los bugs imposibles se resuelven al día siguiente en diez minutos, porque el cerebro cansado no ve lo evidente. Y si al día siguiente sigue, pide ayuda explicando el problema por escrito: la mitad de las veces lo resuelves mientras escribes la pregunta.</p>
<p><b>Y una verdad incómoda:</b> sentirse perdido y torpe es el estado <i>normal</i> de aprender a programar, no una señal de que no sirves. La sensación no desaparece con la experiencia; cambia de nivel.</p>` },
        { n: 5, titulo: 'Tu plan de seis meses',
          enunciado: 'Escribe tu plan concreto para los próximos seis meses: qué vas a construir, qué vas a estudiar, cómo vas a medir el avance y qué harás cuando te atasques. Sé específico y realista con el tiempo del que dispones.',
          pista: 'Objetivos verificables, no «aprender más».',
          solucion: `<p><b>Plantilla de plan, con un ejemplo realista para quien dispone de ~8 horas semanales:</b></p>
<pre>MES 1-2 · Consolidar
  Proyecto: una app de [algo que necesito] que funcione de punta a punta.
  Estudio:  profundizar en [lenguaje elegido]: documentación oficial, no tutoriales.
  Medida:   la app desplegada y usada por mí a diario.

MES 3-4 · Ampliar
  Proyecto: versión 2 con base de datos, usuarios y despliegue automático.
  Estudio:  SQL y el módulo 10 aplicado de verdad (CI, pruebas, seguridad).
  Medida:   otra persona la usa sin que yo tenga que explicarle nada.

MES 5-6 · Profundizar
  Proyecto: algo difícil del módulo 7 o 9 (un intérprete, un motor de búsqueda).
  Estudio:  un libro de la bibliografía, con sus ejercicios.
  Medida:   puedo explicar por escrito cómo funciona lo que construí.

CADA SEMANA
  · 4 horas de proyecto, 2 de estudio, 1 de leer código ajeno, 1 de repaso.
  · Un commit al menos cada dos días (la constancia importa más que el volumen).

CUANDO ME ATASQUE
  1. Releer el error completo, en voz alta.
  2. Reducir a un caso mínimo que lo reproduzca.
  3. Imprimir valores / usar el depurador. No adivinar.
  4. Buscar el mensaje de error exacto.
  5. Escribir la pregunta como si fuera a publicarla (se resuelve sola a menudo).
  6. Preguntar de verdad, con el caso mínimo.
  7. Si llevo más de 3 horas: parar y volver mañana.</pre>
<p><b>Las cinco características de un buen plan</b> con las que puedes evaluar el tuyo:</p>
<ol>
<li><b>Realista con tu tiempo.</b> Un plan de 20 horas semanales que no puedes cumplir genera culpa y abandono. Mejor 5 horas sostenidas durante seis meses que 20 durante tres semanas.</li>
<li><b>Medible.</b> «Aprender bases de datos» no se puede verificar; «mi app guarda y consulta datos en PostgreSQL desplegado» sí.</li>
<li><b>Centrado en construir.</b> El estudio sirve al proyecto, no al revés.</li>
<li><b>Con un protocolo para atascarse.</b> Es la parte que nadie escribe y la que más veces salva el plan, porque atascarse es inevitable y la frustración es lo que hace abandonar.</li>
<li><b>Revisable.</b> Al final de cada mes, mira qué funcionó y ajusta. Un plan rígido que no se adapta se rompe al primer imprevisto.</li>
</ol>
<p><b>Y para terminar el curso:</b> lo único que de verdad predice si alguien va a aprender a programar no es el talento ni el punto de partida, sino la <b>constancia</b>. Media hora al día durante seis meses supera con mucho a quince horas en un fin de semana cada dos meses. Si construyes cosas con regularidad, vas a llegar. Mucha suerte.</p>` }
      ],
      quiz: [
        { p: 'La mejor forma de pasar de «entiendo los conceptos» a «sé programar» es…',
          ops: ['ver más tutoriales', 'construir proyectos propios y terminarlos',
            'aprender más lenguajes', 'memorizar algoritmos'],
          ok: 1, exp: 'El último 20% de un proyecto —casos límite, despliegue, usuarios reales— es donde está el aprendizaje que ningún tutorial da.' },
        { p: 'El «infierno de los tutoriales» consiste en…',
          ops: ['seguir tutoriales demasiado difíciles', 'sentir que aprendes siguiendo guías sin construir nunca nada propio',
            'ver tutoriales en inglés', 'hacer demasiados ejercicios'],
          ok: 1, exp: 'Seguir un tutorial produce la sensación de aprender sin el esfuerzo de aprender. El antídoto es construir algo distinto, sin mirar.' },
        { p: 'Lo que no caduca con el tiempo en programación es…',
          ops: ['el framework de moda', 'los fundamentos: algoritmos, estructuras de datos, diseño y método de depuración',
            'la sintaxis de un lenguaje', 'las herramientas de despliegue'],
          ok: 1, exp: 'Los frameworks cambian cada pocos años; la complejidad algorítmica y el criterio de diseño siguen valiendo igual, y son lo que permite cambiar de tecnología rápido.' }
      ]
    }
  ]
});
