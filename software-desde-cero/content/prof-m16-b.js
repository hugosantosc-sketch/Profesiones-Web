(function () {
var S = SDC.S;

S('m16', 'm16.supply', { title: 'Seguridad de la cadena de suministro de software',
  ask: '¿Qué concepto de seguridad de la cadena de suministro se aplica?',
  lesson: `
> **La idea en simple.** Un restaurante puede tener la cocina más limpia del mundo y aun así enfermar a sus clientes si un proveedor le vende ingredientes contaminados. El software moderno es igual: una aplicación típica está hecha en un 80 % o 90 % de código de terceros (bibliotecas, imágenes de contenedores, herramientas de construcción). Si cualquiera de esos proveedores es comprometido, el atacante entra por la puerta de servicio. Proteger la cadena de suministro es saber qué ingredientes usas, de dónde vienen y que nadie los alteró en el camino.

## El problema
Una aplicación de Node.js mediana declara unas pocas decenas de dependencias directas, pero al instalarlas trae **cientos o miles** de dependencias transitivas (las dependencias de las dependencias). Cada una es código que se ejecuta con los mismos permisos que la aplicación, mantenido muchas veces por una sola persona voluntaria. Los ataques a la cadena de suministro crecieron con fuerza en la última década porque comprometer una pieza muy usada da acceso a miles de víctimas a la vez.

## Casos que conviene conocer
- **left-pad (2016):** un desarrollador retiró de npm su paquete de 11 líneas que rellenaba textos a la izquierda; miles de proyectos, incluidos React y Babel, dejaron de compilar. No fue un ataque, pero mostró la fragilidad: npm cambió sus políticas para impedir retirar paquetes de los que otros dependen.
- **event-stream (2018):** el mantenedor de un paquete popular, cansado, cedió el control a un desconocido que había ofrecido ayuda; este agregó una dependencia con código oculto que robaba billeteras de criptomonedas de una aplicación específica.
- **SolarWinds (2020):** atacantes comprometieron el **sistema de construcción** de la empresa y lograron que las actualizaciones oficiales de su software Orion, firmadas legítimamente, incluyeran una puerta trasera. Unas 18 000 organizaciones instalaron la actualización, entre ellas agencias del gobierno de Estados Unidos.
- **Codecov (2021):** se modificó un script de su herramienta de integración continua para enviar a los atacantes las variables de entorno (con secretos) de los pipelines de sus clientes.
- **Log4Shell (diciembre de 2021):** una vulnerabilidad en Log4j, biblioteca de registros de Java presente en millones de sistemas, permitía ejecutar código remoto con solo hacer que la aplicación registrara un texto como «\${jndi:ldap://atacante/a}». El problema principal fue que muchas organizaciones **no sabían** si usaban Log4j, ni dónde.
- **xz Utils (2024):** durante unos dos años, alguien con el seudónimo "Jia Tan" se ganó la confianza del único mantenedor de la biblioteca de compresión xz, se volvió comantenedor y escondió una puerta trasera, ofuscada en archivos de prueba, que afectaba al servidor SSH en ciertas distribuciones de Linux. La descubrió por casualidad Andres Freund, un ingeniero de Microsoft, al notar que las conexiones SSH tardaban medio segundo más de lo normal. Fue detectada antes de llegar a las versiones estables de las grandes distribuciones.
Las lecciones: las amenazas vienen del código de terceros, del proceso de construcción y de la ingeniería social sobre mantenedores agotados; y no saber qué se usa impide reaccionar.

## Gestionar las dependencias
- **Elegir con criterio:** antes de agregar una dependencia, preguntar si es necesaria (¿cuántas líneas me ahorra?), si está mantenida (último commit, número de mantenedores, tiempo de respuesta a problemas de seguridad) y si es popular y revisada. La iniciativa **OpenSSF Scorecard** puntúa automáticamente estas prácticas en proyectos de código abierto.
- **Fijar versiones con un archivo de bloqueo** (package-lock.json, poetry.lock, go.sum), que registra la versión exacta y un **hash de integridad** de cada paquete, incluidas las transitivas. Así todos instalan exactamente lo mismo, y un paquete alterado no coincide con el hash.
- **Escanear vulnerabilidades conocidas** en el pipeline con herramientas de análisis de composición de software (SCA): npm audit, OWASP Dependency-Check, Snyk, Trivy, Dependabot, que comparan las versiones usadas con bases de vulnerabilidades como la **CVE** y la **GitHub Advisory Database**.
- **Actualizar seguido y en pequeño:** herramientas como Dependabot o Renovate abren pull requests automáticos con cada actualización, que pasan las pruebas. Actualizar una vez al año convierte cada actualización en un proyecto riesgoso.
- **Cuidado con la confusión de dependencias:** en 2021, Alex Birsan demostró que publicando en los registros públicos paquetes con los **mismos nombres** que paquetes internos de empresas como Apple, Microsoft y PayPal, sus sistemas de construcción descargaban la versión pública maliciosa. Se evita usando prefijos de organización (*scopes*) y configurando el registro de cada paquete.
- **Typosquatting:** paquetes con nombres parecidos a los populares («reqeusts» en lugar de «requests»); se revisa con atención lo que se instala.
- **Scripts de instalación:** npm ejecuta por defecto scripts al instalar paquetes; en entornos sensibles se desactivan («--ignore-scripts») o se revisan.

## Inventario: el SBOM
Un **SBOM** (*Software Bill of Materials*, lista de materiales del software) es un inventario de todos los componentes de un software, con sus versiones, proveedores y licencias, en un formato estándar legible por máquinas: **SPDX** (de la Fundación Linux, norma ISO/IEC 5962:2021) o **CycloneDX** (de OWASP). La Orden Ejecutiva 14028 de Estados Unidos (mayo de 2021), dictada tras SolarWinds, exigió SBOM a los proveedores de software del gobierno federal, y la Ley de Ciberresiliencia de la Unión Europea (2024) exige gestión de vulnerabilidades y documentación de componentes en los productos con elementos digitales. Con SBOM, ante el próximo Log4Shell, la pregunta "¿dónde usamos esta biblioteca?" se responde en minutos con una búsqueda, no en semanas de revisión manual.

## Proteger la construcción: SLSA
Proteger el código fuente no basta si alguien puede alterar lo que se construye a partir de él (como en SolarWinds). **SLSA** (*Supply-chain Levels for Software Artifacts*, que se pronuncia "salsa"), impulsado por Google y hoy en la OpenSSF, define niveles de garantía para el proceso de construcción:
- **Procedencia** (*provenance*): un documento firmado que dice qué fuente, qué proceso y qué parámetros produjeron un artefacto.
- **Construcción en una plataforma alojada y endurecida**, no en la computadora de un desarrollador.
- **Aislamiento** entre construcciones y protección de las claves de firma, de modo que ni siquiera un usuario con acceso pueda falsificar la procedencia.
Las **construcciones reproducibles**, que proyectos como Debian y Tor impulsan, van más allá: cualquiera puede reconstruir el artefacto desde la fuente y obtener exactamente los mismos bytes, lo que permite verificar que nadie lo alteró.

## Firmar y verificar
Los artefactos (paquetes, imágenes de contenedor, binarios) se **firman** para que quien los usa pueda verificar quién los produjo y que no cambiaron. El proyecto **Sigstore** (Linux Foundation, 2021) simplificó mucho la firma con:
- **Cosign** para firmar imágenes de contenedores y otros artefactos.
- **Fulcio**, una autoridad de certificación que emite certificados de corta duración ligados a una identidad (una cuenta de GitHub o el pipeline que construye), sin que nadie tenga que custodiar claves de larga duración.
- **Rekor**, un registro de transparencia público, de solo agregar, donde quedan las firmas.
npm y PyPI ya permiten publicar paquetes con **procedencia** verificable generada desde la integración continua. En el despliegue, una política de admisión (en Kubernetes, con herramientas como Kyverno) puede rechazar imágenes sin firma válida.

## Secretos
Los secretos (contraseñas de bases de datos, claves de API, certificados) son el objetivo favorito en la cadena de suministro:
- Nunca en el código ni en las imágenes; en un **gestor de secretos** y con permisos mínimos.
- **Escaneo de secretos** en cada commit (gitleaks, el escaneo de GitHub) y bloqueo antes de subir.
- **Credenciales de corta duración:** los pipelines modernos se autentican en la nube con **OIDC** (la plataforma de integración continua emite un token de identidad de corta duración y la nube lo intercambia por credenciales temporales), sin guardar claves permanentes en el pipeline.
- **Rotación inmediata** si un secreto se expone: borrarlo del repositorio no basta, porque queda en el historial y puede haber sido copiado.

## Ejemplo resuelto: la cadena de suministro de PatioApp
1. **Inventario:** se genera un SBOM CycloneDX en cada construcción y se guarda junto a la imagen. La aplicación tiene 38 dependencias directas y 912 transitivas.
2. **Política de dependencias:** agregar una dependencia nueva requiere justificarla en el pull request; se revisan su Scorecard y su mantenimiento.
3. **Escaneo:** Trivy en cada pull request; las vulnerabilidades críticas con parche disponible bloquean la fusión. Renovate abre actualizaciones semanales agrupadas.
4. **Paquetes internos** con el prefijo «@patioapp/» y el registro configurado para ese prefijo, contra la confusión de dependencias.
5. **Construcción:** solo en la integración continua, con procedencia SLSA generada automáticamente; la imagen se firma con Cosign usando la identidad del pipeline.
6. **Despliegue:** el clúster rechaza imágenes sin firma válida del pipeline de PatioApp.
7. **Secretos:** OIDC entre el pipeline y la nube, sin claves permanentes; escaneo de secretos en cada push.
8. **Simulacro:** "si mañana aparece un Log4Shell en una biblioteca X, ¿cuánto tardamos en saber si la usamos?" Respuesta con los SBOM: 4 minutos.`,
  links: [['m15.cicd', 'el pipeline de construcción es parte de la cadena de suministro'], ['m16.crypto', 'las firmas digitales garantizan la integridad de los artefactos'], ['man.scm', 'la gestión de dependencias es parte de la gestión de la configuración']],
  read: 'OpenSSF, especificación de SLSA (slsa.dev); documentación de Sigstore; CISA y NTIA sobre SBOM; Freund, aviso de la puerta trasera de xz (oss-security, marzo de 2024).',
  terms: [
    ['Ataque a la cadena de suministro', 'ataque que compromete un componente, herramienta o proceso de terceros para llegar a sus usuarios', ['SolarWinds, 2020.', 'event-stream, 2018.', 'xz Utils, 2024.']],
    ['Dependencia transitiva', 'dependencia de una dependencia, que se instala sin declararla directamente', ['Cientos en una app de Node.', 'Se fijan en el archivo de bloqueo.', 'También ejecuta código.']],
    ['Archivo de bloqueo', 'archivo que registra la versión exacta y el hash de cada paquete instalado', ['package-lock.json.', 'Instalaciones reproducibles.', 'Detecta paquetes alterados.']],
    ['SBOM', 'inventario estándar de los componentes de un software con sus versiones y licencias', ['SPDX o CycloneDX.', 'Exigido tras SolarWinds.', 'Responde dónde usamos X.']],
    ['Confusión de dependencias', 'ataque que publica en un registro público un paquete con el nombre de uno interno', ['Birsan, 2021.', 'Se evita con prefijos.', 'El sistema descarga el público.']],
    ['SLSA', 'marco de niveles de garantía para la integridad del proceso de construcción', ['Procedencia firmada.', 'Construcción aislada.', 'Se pronuncia salsa.']],
    ['Procedencia', 'documento firmado que indica qué fuente y qué proceso produjeron un artefacto', ['Generada en la integración continua.', 'Verificable por los usuarios.', 'npm y PyPI la admiten.']],
    ['Sigstore', 'proyecto para firmar y verificar artefactos con certificados de corta duración y un registro de transparencia', ['Cosign, Fulcio, Rekor.', 'Linux Foundation, 2021.', 'Sin claves de larga duración.']]
  ],
  q: [
    ['¿Qué enseñó Log4Shell además de la vulnerabilidad en sí?', 'Que muchas organizaciones no sabían si usaban Log4j ni dónde', ['Que Java es inseguro', 'Que no hay que registrar nada', 'Que las bibliotecas no tienen fallas'], 'De ahí la importancia del SBOM.', 3],
    ['¿Qué tuvo de particular el ataque a SolarWinds?', 'Se comprometió el sistema de construcción y las actualizaciones oficiales firmadas llevaban la puerta trasera', ['Fue un error de tipeo', 'Solo afectó a un usuario', 'Se robó una contraseña de correo'], 'Por eso importa proteger la construcción.', 3],
    ['¿Para qué sirve el archivo de bloqueo?', 'Para que todos instalen exactamente las mismas versiones, verificadas con su hash', ['Para bloquear el acceso al repositorio', 'Para cifrar el código', 'Para impedir actualizaciones'], 'Incluye las transitivas.', 2],
    ['¿Cómo se evita la confusión de dependencias?', 'Con prefijos de organización y configurando el registro de cada paquete', ['Usando nombres largos', 'Instalando sin internet siempre', 'No es evitable'], 'Birsan, 2021.', 3],
    ['¿Qué aporta un SBOM ante una vulnerabilidad nueva?', 'Saber en minutos qué sistemas usan el componente afectado', ['Corregir la vulnerabilidad automáticamente', 'Cifrar las dependencias', 'Nada'], 'Inventario legible por máquinas.', 2],
    ['¿Cómo se descubrió la puerta trasera de xz Utils en 2024?', 'Un ingeniero notó que las conexiones SSH tardaban medio segundo más', ['Un escáner automático la detectó al instante', 'Los atacantes la anunciaron', 'Nunca se descubrió'], 'Andres Freund, por casualidad.', 3],
    ['¿Qué ventaja da autenticar el pipeline en la nube con OIDC?', 'No hace falta guardar claves permanentes en el pipeline: se usan credenciales temporales', ['Es más rápido de compilar', 'Elimina las pruebas', 'Cifra el código fuente'], 'Credenciales de corta duración.', 4],
    { tf: 'Borrar del repositorio un secreto subido por error es suficiente para protegerlo.', v: false, e: 'Queda en el historial y pudo copiarse; hay que rotarlo.', l: 2 },
    { tf: 'Actualizar las dependencias seguido y en pequeño es más seguro que hacerlo una vez al año.', v: true, e: 'Cada actualización es pequeña y verificable.', l: 2 },
    { c: 'Escribe «vulnerables(sbom, avisos)»: sbom es una lista de {nombre, version}; avisos, una lista de {nombre, versiones} (versiones afectadas). Devuelve los nombres de los componentes del sbom cuya versión está afectada.', f: 'vulnerables', p: ['sbom', 'avisos'], t: [[[[{ nombre: 'log4j', version: '2.14.1' }, { nombre: 'express', version: '4.19.2' }], [{ nombre: 'log4j', versiones: ['2.14.1', '2.15.0'] }]], ['log4j']], [[[], []], []]], sol: '  return sbom.filter(c => avisos.some(a => a.nombre === c.nombre && a.versiones.includes(c.version))).map(c => c.nombre);', l: 2 },
    { c: 'Escribe «sospechoso(nombre, populares)»: true si el nombre no está en populares pero difiere en exactamente una letra (misma longitud) de alguno de ellos (typosquatting simple).', f: 'sospechoso', p: ['nombre', 'populares'], t: [[['reqests', ['requests']], false], [['requeste', ['requests']], true], [['requests', ['requests']], false]], sol: '  if (populares.includes(nombre)) return false;\n  return populares.some(p => p.length === nombre.length && [...p].filter((c, i) => c !== nombre[i]).length === 1);', l: 3 },
    { c: 'Escribe «contarTransitivas(grafo, raiz)»: grafo es {paquete: [dependencias]}; devuelve cuántos paquetes distintos se instalan desde raiz (sin contar la raíz).', f: 'contarTransitivas', p: ['grafo', 'raiz'], t: [[[{ app: ['a', 'b'], a: ['c'], b: ['c', 'd'], c: [], d: [] }, 'app'], 4], [[{ app: [] }, 'app'], 0]], sol: '  const vistos = new Set(), pila = [...(grafo[raiz] || [])];\n  while (pila.length) { const p = pila.pop(); if (!vistos.has(p)) { vistos.add(p); pila.push(...(grafo[p] || [])); } }\n  return vistos.size;', l: 3 }
  ],
  gen: function (g) {
    var ca = [['Un paquete de 11 líneas retirado rompió miles de proyectos', 'left-pad, 2016'], ['El nuevo mantenedor de un paquete agregó código que robaba billeteras', 'event-stream, 2018'], ['Las actualizaciones oficiales firmadas traían una puerta trasera', 'SolarWinds, 2020'], ['Una biblioteca de registros permitía ejecutar código remoto', 'Log4Shell, 2021'], ['Un comantenedor escondió una puerta trasera durante dos años', 'xz Utils, 2024'], ['Se alteró un script de integración continua que enviaba secretos', 'Codecov, 2021']];
    ca.forEach(function (c) { g.mcq(2, '¿Qué caso describe esto? ' + c[0], c[1], ['left-pad, 2016', 'event-stream, 2018', 'SolarWinds, 2020', 'Log4Shell, 2021', 'xz Utils, 2024', 'Codecov, 2021'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Casos de la cadena de suministro.'); });
    var de = [['Saber qué componentes y versiones usa cada sistema', 'SBOM'], ['Registrar versión exacta y hash de cada paquete', 'Archivo de bloqueo'], ['Demostrar con qué fuente y proceso se construyó un artefacto', 'Procedencia SLSA'], ['Firmar imágenes con la identidad del pipeline', 'Sigstore y Cosign'], ['Detectar dependencias con vulnerabilidades conocidas', 'Análisis de composición (SCA)'], ['Evitar claves permanentes en el pipeline', 'OIDC con credenciales temporales']];
    de.forEach(function (d) { g.mcq(3, '¿Qué práctica o herramienta sirve para esto? ' + d[0], d[1], ['SBOM', 'Archivo de bloqueo', 'Procedencia SLSA', 'Sigstore y Cosign', 'Análisis de composición (SCA)', 'OIDC con credenciales temporales'].filter(function (x) { return x !== d[1]; }).slice(0, 3), 'Defensas de la cadena de suministro.'); });
  },
  checks: [
    ['¿Por qué la cadena de suministro es un objetivo atractivo?', 'Porque las aplicaciones están hechas mayormente de código de terceros, y comprometer una pieza muy usada da acceso a miles de víctimas a la vez.'],
    ['Explica qué es un SBOM y para qué sirve.', 'Un inventario estándar de componentes, versiones y licencias; permite saber en minutos dónde se usa un componente vulnerable.'],
    ['¿Qué protege SLSA que no protege el escaneo de dependencias?', 'La integridad del proceso de construcción: que el artefacto provenga de la fuente y el proceso declarados, sin alteraciones.'],
    ['Lista cinco prácticas para gestionar dependencias con seguridad.', 'Elegir con criterio, fijar versiones con archivo de bloqueo, escanear vulnerabilidades, actualizar seguido y en pequeño, y usar prefijos contra la confusión de dependencias.']
  ],
  cites: ['Ohm, M. et al. (2020). Backstabber’s Knife Collection: A Review of Open Source Software Supply Chain Attacks. *DIMVA 2020*.', 'Birsan, A. (2021). Dependency Confusion: How I Hacked Into Apple, Microsoft and Dozens of Other Companies. *Medium*.', 'The White House (2021). *Executive Order 14028 on Improving the Nation’s Cybersecurity*.', 'OpenSSF. *Supply-chain Levels for Software Artifacts (SLSA) v1.0*. slsa.dev.', 'Newman, Z., Meyers, J. y Torres-Arias, S. (2022). Sigstore: Software Signing for Everybody. *ACM CCS 2022*.', 'Freund, A. (2024). backdoor in upstream xz/liblzma leading to ssh server compromise. *oss-security mailing list*, 29 de marzo de 2024.'],
  project: { t: 'Asegurar la cadena de suministro de un proyecto',
    goal: 'Aplicar inventario, escaneo, procedencia y firmas a un proyecto propio.',
    steps: ['Genera el SBOM de un proyecto propio y cuenta sus dependencias directas y transitivas.', 'Escanea las vulnerabilidades conocidas y corrige o justifica cada una crítica.', 'Configura actualizaciones automáticas de dependencias y escaneo de secretos en el pipeline.', 'Firma la imagen del contenedor con Cosign desde la integración continua y verifica la firma.', 'Escribe una política de dependencias de una página para tu equipo.'],
    deliver: 'El SBOM, el informe de vulnerabilidades, la configuración del pipeline y la política.' },
  hito: ['Genera el SBOM de PatioApp en cada construcción y bloquea la fusión de cambios con vulnerabilidades críticas que tengan parche.', 'Firma las imágenes de PatioApp con la identidad del pipeline y configura el clúster para rechazar imágenes sin firma.']
});
SDC.after('m16.supply', 'm16.crypto');

S('m16', 'm16.ssdlc', { title: 'Desarrollo seguro, pruebas de seguridad y gestión de vulnerabilidades',
  ask: '¿Qué práctica de desarrollo seguro o de gestión de vulnerabilidades se aplica?',
  lesson: `
> **La idea en simple.** La seguridad no se "agrega" al final como una capa de pintura: si los cimientos tienen grietas, la pintura no las arregla. El desarrollo seguro integra actividades de seguridad en **cada etapa** del ciclo de vida, desde los requisitos hasta la operación; y cuando, pese a todo, aparece una vulnerabilidad (siempre aparece), un proceso claro permite encontrarla, priorizarla y corregirla antes de que la exploten.

## Del parche al proceso
A comienzos de los años 2000, Microsoft sufría gusanos como Code Red y Nimda (2001) y su reputación de seguridad era pésima. En enero de 2002, Bill Gates envió el memorando **Trustworthy Computing**, que pedía priorizar la seguridad sobre las funcionalidades nuevas. La empresa detuvo el desarrollo de Windows durante meses para capacitar a miles de ingenieros y revisar el código, y creó el **Ciclo de Vida de Desarrollo de Seguridad** (SDL), publicado por Michael Howard y Steve Lipner en 2006. Las vulnerabilidades graves de sus productos bajaron de forma notable en los años siguientes, y el SDL se volvió una referencia para la industria.

## Actividades por etapa
| Etapa | Actividades de seguridad |
| Capacitación | formación básica de todos los desarrolladores en desarrollo seguro |
| Requisitos | requisitos de seguridad y privacidad, umbrales de calidad (cero críticas), análisis de riesgos |
| Diseño | modelado de amenazas, reducción de la superficie de ataque, principios de diseño seguro |
| Implementación | estándares de codificación, bibliotecas aprobadas, prohibir funciones peligrosas, análisis estático (SAST) |
| Verificación | análisis dinámico (DAST), fuzzing, revisión de código de seguridad, pruebas de penetración |
| Entrega | plan de respuesta a incidentes, revisión final de seguridad, firma de artefactos |
| Operación | monitoreo, gestión de vulnerabilidades, respuesta a incidentes |
La idea moderna de **desplazar a la izquierda** (*shift left*) dice que cuanto antes se detecta un problema de seguridad, más barato es corregirlo; pero la seguridad también se "desplaza a la derecha": el monitoreo en producción encuentra lo que nada antes detectó.

## Modelos de madurez
- **OWASP SAMM** (*Software Assurance Maturity Model*, versión 2 de 2020): organiza las prácticas en cinco funciones de negocio (gobierno, diseño, implementación, verificación y operaciones) con tres niveles de madurez cada una. Es abierto y sirve para evaluarse y planificar mejoras graduales.
- **BSIMM** (*Building Security In Maturity Model*): en lugar de prescribir, **describe** lo que hacen realmente más de cien organizaciones encuestadas cada año, para compararse.
- **NIST SSDF** (*Secure Software Development Framework*, SP 800-218, 2022): conjunto de prácticas de alto nivel que el gobierno de Estados Unidos exige a sus proveedores de software.
- **OWASP ASVS** (*Application Security Verification Standard*): lista detallada de requisitos de seguridad verificables en tres niveles, útil para escribir requisitos y para auditar.

## Pruebas de seguridad
| Técnica | Cómo funciona | Fortaleza | Limitación |
| SAST | analiza el código fuente sin ejecutarlo | temprano, señala la línea exacta | falsos positivos, no ve la configuración real |
| DAST | ataca la aplicación en ejecución desde fuera (OWASP ZAP, Burp Suite) | ve lo que ve un atacante, sin depender del lenguaje | no sabe qué línea causa el problema, cobertura limitada |
| IAST | instrumenta la aplicación mientras se prueba | combina contexto interno y comportamiento real | requiere agentes en tiempo de ejecución |
| SCA | revisa las dependencias contra bases de vulnerabilidades | cubre el código de terceros | solo vulnerabilidades ya conocidas |
| Fuzzing | envía entradas aleatorias o mutadas masivamente | encuentra fallas que nadie imaginó | requiere objetivos bien definidos |
| Prueba de penetración | expertos atacan el sistema como lo haría un adversario | encuentra fallas de lógica y combinaciones | caro, puntual en el tiempo |
El **fuzzing** merece una mención: Barton Miller lo inventó en 1988 (tras notar que el ruido de una línea telefónica en una tormenta hacía fallar programas de Unix), y hoy herramientas guiadas por cobertura como AFL y libFuzzer, y el servicio **OSS-Fuzz** de Google (2016), encontraron decenas de miles de errores en proyectos de código abierto. Las **pruebas de penetración** suelen hacerse antes de lanzamientos importantes y periódicamente; los ejercicios de **equipo rojo** van más allá y simulan un ataque completo, incluida la ingeniería social, contra un equipo azul que defiende.

## Vulnerabilidades: identificar y medir
- **CVE** (*Common Vulnerabilities and Exposures*), creado por MITRE en 1999: un identificador único por vulnerabilidad pública, como CVE-2021-44228 (Log4Shell).
- **CWE** (*Common Weakness Enumeration*): catálogo de **tipos** de debilidades (CWE-79 es XSS, CWE-89 es inyección SQL); MITRE publica cada año las 25 más peligrosas.
- **CVSS** (*Common Vulnerability Scoring System*, versión 4.0 de 2023): puntaje de 0 a 10 que mide la **gravedad** técnica según cómo se explota (por red o local, complejidad, privilegios necesarios, interacción del usuario) y su impacto en confidencialidad, integridad y disponibilidad. Rangos: bajo (0,1 a 3,9), medio (4,0 a 6,9), alto (7,0 a 8,9) y crítico (9,0 a 10). Log4Shell tuvo 10.
- **EPSS** (*Exploit Prediction Scoring System*, de FIRST): estima la **probabilidad** de que una vulnerabilidad sea explotada en los próximos 30 días.
- El catálogo **KEV** de la agencia CISA de Estados Unidos lista las vulnerabilidades que **ya se están explotando**.
Priorizar solo por CVSS lleva a perseguir miles de vulnerabilidades "altas" que nadie explotará. Una práctica más efectiva combina gravedad, probabilidad de explotación (EPSS, KEV), exposición (¿el componente es accesible desde internet?) y valor del activo.
~~~js
// Priorizar vulnerabilidades combinando gravedad, explotación y exposición
const vulns = [
  { id: 'CVE-A', cvss: 9.8, epss: 0.02, kev: false, expuesto: false },
  { id: 'CVE-B', cvss: 7.5, epss: 0.91, kev: true, expuesto: true },
  { id: 'CVE-C', cvss: 5.3, epss: 0.40, kev: false, expuesto: true },
  { id: 'CVE-D', cvss: 8.1, epss: 0.01, kev: false, expuesto: true }
];
const prioridad = v => (v.kev ? 'URGENTE' : v.epss > 0.3 && v.expuesto ? 'ALTA' : v.cvss >= 9 ? 'MEDIA' : 'BAJA');
vulns.forEach(v => console.log(v.id, 'CVSS', v.cvss, '→', prioridad(v)));
~~~
Nota cómo CVE-B, con menor CVSS que CVE-A, es la más urgente: ya se está explotando y está expuesta a internet.

## Gestión de vulnerabilidades y divulgación
Un proceso de gestión de vulnerabilidades: **descubrir** (escaneos, reportes, avisos de proveedores), **evaluar y priorizar**, **corregir o mitigar** dentro de **plazos** acordados según la prioridad (por ejemplo, críticas explotadas en 48 horas, altas en 7 días, medias en 30), **verificar** y **reportar** métricas (tiempo medio de corrección, vulnerabilidades vencidas).

Las vulnerabilidades también las encuentran personas de fuera. Las organizaciones maduras ofrecen un canal para recibirlas:
- **Divulgación coordinada:** el investigador informa en privado, la organización corrige, y se publica después de un plazo razonable (Google Project Zero usa 90 días). El archivo «security.txt» (RFC 9116, 2022) en «/.well-known/» indica cómo reportar.
- **Programas de recompensas** (*bug bounty*): se paga a quienes reportan vulnerabilidades válidas, a veces a través de plataformas como HackerOne o Bugcrowd.
- **Puerto seguro legal:** comprometerse a no denunciar a quienes investigan de buena fe y siguen las reglas.
Atención al marco legal: en el Perú, la **Ley N.º 30096 de Delitos Informáticos** sanciona el acceso no autorizado a sistemas. Investigar la seguridad de sistemas ajenos **sin autorización** es ilegal aunque la intención sea buena; se practica solo en entornos propios, en laboratorios preparados o dentro de un programa que lo autorice expresamente.

## Ejemplo resuelto: el programa de seguridad de PatioApp
1. **Autoevaluación con OWASP SAMM:** nivel 1 en casi todo; se elige subir a nivel 2 en modelado de amenazas, verificación y gestión de defectos durante el año.
2. **Requisitos:** se adopta el nivel 1 de ASVS como lista de requisitos de seguridad mínimos, y el nivel 2 para pagos y datos personales.
3. **Pipeline:** SAST (CodeQL), SCA (Trivy), escaneo de secretos y DAST con OWASP ZAP contra el entorno de pruebas en cada versión.
4. **Prueba de penetración anual** por una empresa externa antes de la temporada alta; la primera encuentra un IDOR en el portal de dueños, corregido en 48 horas, y una debilidad en la recuperación de contraseñas.
5. **Gestión de vulnerabilidades:** plazos de 48 horas para las del catálogo KEV, 7 días para altas expuestas y 30 para medias; tablero con el tiempo medio de corrección.
6. **Divulgación:** archivo security.txt con un correo de seguridad, compromiso de respuesta en 3 días hábiles y política de puerto seguro.`,
  links: [['m16.threat', 'el modelado de amenazas es la actividad central del diseño seguro'], ['m14.static', 'el SAST es una forma de análisis estático'], ['m15.incident', 'la respuesta a incidentes de seguridad usa el mismo proceso de incidentes']],
  read: 'Howard y Lipner, *The Security Development Lifecycle* (2006); OWASP SAMM v2 y ASVS; NIST SP 800-218 (SSDF); FIRST, especificación de CVSS v4.0.',
  terms: [
    ['SDL', 'ciclo de vida de desarrollo seguro que integra actividades de seguridad en cada etapa', ['Microsoft, 2002-2006.', 'Trustworthy Computing.', 'Modelo de referencia.']],
    ['Desplazar a la izquierda', 'llevar las actividades de seguridad y calidad a las etapas tempranas del desarrollo', ['Shift left.', 'Más barato corregir antes.', 'SAST en cada pull request.']],
    ['OWASP SAMM', 'modelo abierto de madurez de seguridad del software con cinco funciones y tres niveles', ['Versión 2 de 2020.', 'Sirve para autoevaluarse.', 'Planificación gradual.']],
    ['DAST', 'prueba de seguridad que ataca la aplicación en ejecución desde fuera', ['OWASP ZAP.', 'Ve lo que ve un atacante.', 'No señala la línea del error.']],
    ['CVE', 'identificador único de una vulnerabilidad pública', ['CVE-2021-44228.', 'MITRE, 1999.', 'Se distingue de CWE.']],
    ['CVSS', 'sistema de puntaje de 0 a 10 de la gravedad técnica de una vulnerabilidad', ['Versión 4.0 de 2023.', 'Crítico desde 9,0.', 'No mide la probabilidad de explotación.']],
    ['EPSS', 'sistema que estima la probabilidad de que una vulnerabilidad sea explotada en 30 días', ['De FIRST.', 'Complementa a CVSS.', 'Mejora la priorización.']],
    ['Divulgación coordinada', 'proceso en que el investigador informa en privado y se publica tras la corrección', ['Project Zero: 90 días.', 'security.txt.', 'Puerto seguro legal.']]
  ],
  q: [
    ['¿Qué originó el SDL de Microsoft?', 'El memorando Trustworthy Computing de 2002, tras gusanos como Code Red y Nimda', ['Una ley europea', 'Un concurso de programación', 'La invención de Internet'], 'Bill Gates priorizó la seguridad.', 2],
    ['¿Qué ventaja tiene DAST frente a SAST?', 'Prueba la aplicación real en ejecución, como un atacante, sin depender del lenguaje', ['Señala la línea exacta del error', 'Se ejecuta antes de escribir código', 'No tiene limitaciones'], 'A cambio no sabe qué línea causa el problema.', 3],
    ['¿Qué diferencia hay entre CVE y CWE?', 'CVE identifica una vulnerabilidad concreta; CWE, un tipo de debilidad', ['Son lo mismo', 'CWE es más reciente', 'CVE solo es para hardware'], 'CWE-79 es XSS en general.', 2],
    ['¿Qué rango de CVSS corresponde a "crítico"?', 'De 9,0 a 10,0', ['De 7,0 a 8,9', 'De 4,0 a 6,9', 'De 0,1 a 3,9'], 'Log4Shell tuvo 10.', 1],
    ['Una vulnerabilidad con CVSS 7,5 está en el catálogo KEV y expuesta a internet; otra tiene 9,8 pero no se explota ni está expuesta. ¿Cuál se corrige primero?', 'La de 7,5, porque ya se explota y está expuesta', ['La de 9,8, por su puntaje', 'Ninguna', 'Da igual'], 'Priorizar solo por CVSS es ineficaz.', 4],
    ['¿Qué indica el archivo security.txt?', 'Cómo reportar vulnerabilidades a la organización', ['La contraseña del servidor', 'La versión del sistema operativo', 'Las cookies del sitio'], 'RFC 9116, en /.well-known/.', 2],
    ['Un estudiante quiere probar la seguridad del sitio de una tienda sin permiso "para ayudar". ¿Qué corresponde?', 'No hacerlo: sin autorización es ilegal (en el Perú, Ley 30096); se practica en entornos propios o programas autorizados', ['Hacerlo si no causa daño', 'Hacerlo de noche', 'Hacerlo y avisar después'], 'La buena intención no autoriza el acceso.', 3],
    { tf: 'El fuzzing consiste en enviar masivamente entradas aleatorias o mutadas para encontrar fallas.', v: true, e: 'Barton Miller lo inventó en 1988.', l: 1 },
    { tf: 'Si un sistema pasó una prueba de penetración, ya no puede tener vulnerabilidades.', v: false, e: 'Es una evaluación puntual con cobertura limitada.', l: 2 },
    { c: 'Escribe «nivelCVSS(puntaje)»: "ninguno" para 0, "bajo" hasta 3,9, "medio" hasta 6,9, "alto" hasta 8,9 y "crítico" desde 9,0.', f: 'nivelCVSS', p: ['puntaje'], t: [[[0], 'ninguno'], [[3.9], 'bajo'], [[5.3], 'medio'], [[7.5], 'alto'], [[9.8], 'crítico']], sol: '  if (puntaje === 0) return "ninguno";\n  if (puntaje < 4) return "bajo";\n  if (puntaje < 7) return "medio";\n  if (puntaje < 9) return "alto";\n  return "crítico";', l: 1 },
    { c: 'Escribe «vencidas(vulns, hoy, plazos)»: cada vuln es {id, prioridad, detectada} (días); plazos es {prioridad: días}. Devuelve los id con hoy − detectada mayor que su plazo.', f: 'vencidas', p: ['vulns', 'hoy', 'plazos'], t: [[[[{ id: 'a', prioridad: 'alta', detectada: 0 }, { id: 'b', prioridad: 'media', detectada: 0 }], 10, { alta: 7, media: 30 }], ['a']], [[[], 5, {}], []]], sol: '  return vulns.filter(v => hoy - v.detectada > plazos[v.prioridad]).map(v => v.id);', l: 2 },
    { c: 'Escribe «prioridad(v)»: v es {cvss, epss, kev, expuesto}; "URGENTE" si kev; "ALTA" si epss > 0.3 y expuesto; "MEDIA" si cvss >= 9; "BAJA" en otro caso.', f: 'prioridad', p: ['v'], t: [[[{ cvss: 7.5, epss: 0.9, kev: true, expuesto: true }], 'URGENTE'], [[{ cvss: 5, epss: 0.4, kev: false, expuesto: true }], 'ALTA'], [[{ cvss: 9.8, epss: 0.01, kev: false, expuesto: false }], 'MEDIA'], [[{ cvss: 8, epss: 0.01, kev: false, expuesto: true }], 'BAJA']], sol: '  if (v.kev) return "URGENTE";\n  if (v.epss > 0.3 && v.expuesto) return "ALTA";\n  if (v.cvss >= 9) return "MEDIA";\n  return "BAJA";', l: 3 }
  ],
  gen: function (g) {
    var te = [['Analizar el código fuente en cada pull request', 'SAST'], ['Atacar el entorno de pruebas desde fuera con OWASP ZAP', 'DAST'], ['Revisar las bibliotecas contra la base de CVE', 'SCA'], ['Enviar millones de entradas mutadas al analizador de archivos', 'Fuzzing'], ['Contratar expertos que intenten entrar al sistema', 'Prueba de penetración'], ['Instrumentar la aplicación mientras corren las pruebas', 'IAST']];
    te.forEach(function (t) { g.mcq(2, '¿Qué técnica de prueba de seguridad es? ' + t[0], t[1], ['SAST', 'DAST', 'SCA', 'Fuzzing', 'Prueba de penetración', 'IAST'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Técnicas de pruebas de seguridad.'); });
    g.times(8, function (R) { var p = R.pick([0, 2.1, 3.9, 4.0, 5.3, 6.9, 7.0, 7.5, 8.8, 9.0, 9.8, 10]); var n = p === 0 ? 'Ninguno' : p < 4 ? 'Bajo' : p < 7 ? 'Medio' : p < 9 ? 'Alto' : 'Crítico'; g.mcq(1, '¿Qué nivel de gravedad tiene un puntaje CVSS de ' + String(p).replace('.', ',') + '?', n, ['Ninguno', 'Bajo', 'Medio', 'Alto', 'Crítico'].filter(function (x) { return x !== n; }).slice(0, 3), 'Rangos de CVSS.'); });
    var et = [['Modelado de amenazas', 'Diseño'], ['Análisis estático en cada pull request', 'Implementación'], ['Pruebas de penetración', 'Verificación'], ['Requisitos de seguridad con ASVS', 'Requisitos'], ['Monitoreo y gestión de vulnerabilidades', 'Operación']];
    et.forEach(function (e) { g.mcq(2, '¿En qué etapa del SDL va esta actividad? ' + e[0], e[1], ['Requisitos', 'Diseño', 'Implementación', 'Verificación', 'Operación'].filter(function (x) { return x !== e[1]; }).slice(0, 3), 'Actividades por etapa.'); });
  },
  checks: [
    ['¿Qué significa integrar la seguridad en todo el ciclo de vida? Da un ejemplo por etapa.', 'Requisitos (ASVS), diseño (modelado de amenazas), implementación (SAST), verificación (DAST, pentest), entrega (firma) y operación (monitoreo y parches).'],
    ['Compara SAST, DAST y SCA.', 'SAST analiza el código propio sin ejecutarlo; DAST ataca la aplicación en ejecución; SCA revisa las dependencias contra vulnerabilidades conocidas.'],
    ['¿Por qué no basta priorizar vulnerabilidades por CVSS?', 'Porque CVSS mide gravedad, no probabilidad de explotación ni exposición; conviene combinarlo con EPSS, KEV y el contexto.'],
    ['¿Qué es la divulgación coordinada y qué límites legales hay?', 'El investigador informa en privado y se publica tras corregir; investigar sistemas ajenos sin autorización es ilegal (Ley 30096 en el Perú).']
  ],
  cites: ['Howard, M. y Lipner, S. (2006). *The Security Development Lifecycle*. Microsoft Press.', 'OWASP Foundation (2020). *Software Assurance Maturity Model (SAMM) v2.0*.', 'Souppaya, M., Scarfone, K. y Dodson, D. (2022). *Secure Software Development Framework (SSDF) Version 1.1*. NIST SP 800-218.', 'FIRST (2023). *Common Vulnerability Scoring System v4.0: Specification Document*.', 'Miller, B., Fredriksen, L. y So, B. (1990). An Empirical Study of the Reliability of UNIX Utilities. *Communications of the ACM*, 33(12).', 'Congreso de la República del Perú (2013). Ley N.º 30096, Ley de Delitos Informáticos.'],
  project: { t: 'Programa de seguridad de una aplicación',
    goal: 'Evaluar y mejorar la seguridad de un proyecto con un modelo de madurez y pruebas.',
    steps: ['Evalúa un proyecto propio con OWASP SAMM y elige tres prácticas para mejorar.', 'Selecciona 20 requisitos de ASVS nivel 1 aplicables y verifica cuáles cumple.', 'Configura SAST, SCA y DAST en el pipeline y analiza los resultados.', 'Prioriza las vulnerabilidades encontradas con CVSS, EPSS y exposición, con plazos de corrección.', 'Publica un security.txt y una política de divulgación para el proyecto.'],
    deliver: 'La evaluación SAMM, la lista ASVS, la configuración del pipeline, la priorización y la política.' },
  hito: ['Evalúa PatioApp con OWASP SAMM y adopta ASVS nivel 1 (nivel 2 para pagos y datos personales) como requisitos de seguridad.', 'Agrega DAST al pipeline de PatioApp y define los plazos de corrección de vulnerabilidades con un tablero de seguimiento.']
});
SDC.after('m16.ssdlc', 'm16.supply');
})();
