(function () {
var D = SDC.D;
SDC.XM('teo', { prof: true });

D('teo.auto', `## Propiedades de cierre de los lenguajes regulares
Los lenguajes regulares son **cerrados** bajo muchas operaciones: si L₁ y L₂ son regulares, también lo son su unión, su intersección, su concatenación, la estrella de Kleene, el complemento y la diferencia. Las demostraciones son constructivas: por ejemplo, para la intersección se construye el **autómata producto**, cuyos estados son pares (estado de M₁, estado de M₂) y que acepta cuando ambos aceptan; para el complemento basta intercambiar estados de aceptación y de rechazo de un AFD completo. Estas propiedades permiten razonar de forma modular: "las placas válidas que no empiezan con Z" es regular porque es la intersección de dos lenguajes regulares.

## Minimización y el teorema de Myhill-Nerode
Muchos AFD distintos reconocen el mismo lenguaje. El **teorema de Myhill-Nerode** (John Myhill y Anil Nerode, 1958) caracteriza los lenguajes regulares: L es regular si y solo si la relación "x y z son indistinguibles" (para toda continuación w, xw y zw están ambos en L o ambos fuera) tiene un número **finito** de clases; ese número es exactamente la cantidad de estados del **AFD mínimo**, que es único salvo el nombre de los estados. El algoritmo de Hopcroft (1971) lo calcula en O(n log n) uniendo estados equivalentes. Consecuencias prácticas: se puede decidir si dos expresiones regulares describen el mismo lenguaje (minimizando ambos autómatas y comparándolos), y los generadores de analizadores léxicos producen autómatas pequeños y rápidos. El teorema también da otra forma de probar que un lenguaje no es regular: para {aⁿbⁿ}, las cadenas a, aa, aaa, … son todas distinguibles entre sí (aⁱ se completa con bⁱ pero aʲ no), así que harían falta infinitos estados.

## Ejemplo resuelto: un analizador léxico para las consultas de PatioApp
El buscador de PatioApp acepta consultas como «placa:ABC-123 zona:B dias>3». El analizador léxico se especifica con expresiones regulares para cada tipo de **token**: campo «[a-z]+», operador «(:|>|<|>=)», placa «[A-Z0-9]{3}-[0-9]{3}», número «[0-9]+», espacio «\\s+». El generador combina todas en un AFN (unión), lo convierte en AFD (construcción de subconjuntos) y lo minimiza. Al leer la entrada, aplica la regla de la **coincidencia más larga** (ante «>=», toma el operador de dos caracteres y no «>» seguido de «=») y, si empatan, la del token definido primero. Así se obtiene en tiempo lineal la secuencia de tokens que luego procesa el analizador sintáctico.`);

D('teo.gram', `## Precedencia, asociatividad y ambigüedad
La gramática «E → E + E | E * E | número» es **ambigua**: «2 + 3 * 4» tiene dos árboles, uno que da 20 y otro 14. Se resuelve de dos formas:
- **Reescribir la gramática** con un no terminal por nivel de precedencia: «E → E + T | T», «T → T * F | F», «F → número | ( E )». Ahora el * se agrupa antes que el +, y la recursión a la izquierda hace ambos operadores asociativos a la izquierda (2 − 3 − 4 se lee (2 − 3) − 4).
- **Declarar precedencia y asociatividad** en el generador de analizadores (como en yacc o Bison), que resuelve los conflictos según esas declaraciones.
Un caso clásico es el **else colgante**: en «if a then if b then x else y», ¿el else es del primer if o del segundo? La gramática natural es ambigua; casi todos los lenguajes lo asignan al if más cercano, y Python lo evita con la indentación obligatoria.

## Gramáticas de expresiones de análisis
Bryan Ford propuso en 2004 las **gramáticas de expresiones de análisis** (PEG), una alternativa a las gramáticas libres de contexto para escribir analizadores: en lugar de la alternativa «|», que es simétrica, usan la **elección ordenada** «/», que prueba las opciones en orden y se queda con la primera que funciona. Por diseño, una PEG **nunca es ambigua** y se analiza en tiempo lineal con la técnica de *packrat parsing* (memorizando resultados). Son populares para lenguajes de configuración y herramientas; el analizador de CPython pasó a ser un analizador PEG en la versión 3.9 (2020). La contrapartida es que el orden de las alternativas cambia el lenguaje y algunos errores de diseño de la gramática quedan ocultos.

## Ejemplo resuelto: la gramática de las reglas de tarifa
PatioApp permite que gerencia escriba reglas como «si tipo = camion y dias > 7 entonces tarifa = 45». Una gramática en BNF:
~~~txt
regla      ::= "si" condicion "entonces" asignacion
condicion  ::= termino { "o" termino }
termino    ::= factor { "y" factor }
factor     ::= comparacion | "no" factor | "(" condicion ")"
comparacion::= campo operador valor
asignacion ::= "tarifa" "=" numero
~~~
Separar «condicion», «termino» y «factor» da al «y» mayor precedencia que al «o», como en la lógica: «a o b y c» se lee «a o (b y c)». Las llaves indican repetición y evitan la recursión a la izquierda, lo que permite un **analizador descendente recursivo** escrito a mano, con una función por regla.`);

D('teo.turing', `## Modelos equivalentes
Una de las evidencias más fuertes a favor de la tesis de Church-Turing es que **todos** los modelos de cómputo razonables propuestos resultaron equivalentes en poder:
- Máquinas de Turing con **varias cintas**, con cinta infinita en ambas direcciones o **no deterministas**: todas se simulan con una máquina de una cinta (a veces con un costo de tiempo polinomial o, para las no deterministas, exponencial, pero el **conjunto** de problemas que resuelven es el mismo).
- El **cálculo lambda** de Alonzo Church (1936), base de los lenguajes funcionales.
- Las **funciones recursivas** de Kurt Gödel y Stephen Kleene.
- Los **sistemas de Post**, las **máquinas de registros** con dos contadores, los **autómatas celulares** como la regla 110 (demostrada universal por Matthew Cook en 2004) y el Juego de la vida de John Conway (1970).
- Cualquier lenguaje de programación con condicionales, bucles o recursión y memoria ilimitada: es **Turing completo**.

## Turing completo sin querer
Muchos sistemas resultan Turing completos sin haber sido diseñados para eso, lo que tiene consecuencias de seguridad y de análisis: las plantillas de C++, las fórmulas de Excel con la función LAMBDA (2021), el sistema de tipos de TypeScript, la instrucción MOV de x86 por sí sola (Stephen Dolan, 2013), las reglas de juegos como *Magic: The Gathering*, e incluso combinaciones de HTML y CSS con interacción del usuario. La consecuencia práctica: si un sistema es Turing completo, preguntas como "¿esta configuración termina?" o "¿esta plantilla produce un resultado válido?" son en general **indecidibles**. Por eso los lenguajes de configuración y de consulta suelen limitarse a propósito (SQL básico sin recursión, los filtros de correo, los lenguajes de configuración como Dhall que garantizan terminación): perder poder expresivo a cambio de poder analizar los programas.

## Ejemplo resuelto: ¿puede PatioApp verificar que toda regla de tarifa termina?
Gerencia pide que las reglas de tarifa puedan llamarse entre sí ("si es feriado, aplica la regla de domingo") y que el sistema rechace las reglas que podrían ejecutarse sin fin.
1. Si el lenguaje de reglas permite recursión arbitraria y aritmética ilimitada, es Turing completo, y decidir si una regla termina equivale al **problema de la parada**: es imposible en general.
2. **Solución de diseño:** restringir el lenguaje. Las reglas pueden llamar a otras, pero el grafo de llamadas debe ser **acíclico** (se verifica con una búsqueda de ciclos en tiempo lineal) y no hay bucles. Con esa restricción, toda regla termina, y el sistema puede garantizarlo.
3. El costo es expresivo: no se puede escribir una regla "repetir hasta que…". Para tarifas, nadie la necesita.
Es la misma decisión que tomaron los diseñadores de muchos lenguajes de consulta y configuración.`);

D('teo.np', `## Una reducción paso a paso: de 3-SAT a conjunto independiente
Para mostrar que un problema nuevo es NP-difícil, se reduce **desde** uno ya conocido. Ejemplo clásico: 3-SAT (¿se puede satisfacer una fórmula en forma normal conjuntiva con tres literales por cláusula?) se reduce a CONJUNTO INDEPENDIENTE (¿hay k vértices sin aristas entre ellos?).
1. Por cada cláusula (x ∨ ¬y ∨ z), se crea un **triángulo** con un vértice por literal.
2. Se une con una arista cada par de vértices que representan literales **contradictorios** (x en una cláusula y ¬x en otra).
3. Se pide un conjunto independiente de tamaño k = número de cláusulas.
Un conjunto independiente de ese tamaño debe tomar exactamente un vértice de cada triángulo (dos del mismo triángulo están unidos), y nunca dos literales contradictorios: es exactamente elegir un literal verdadero por cláusula de forma consistente. La construcción es polinomial, así que si CONJUNTO INDEPENDIENTE tuviera un algoritmo polinomial, 3-SAT también lo tendría. Como 3-SAT es NP-completo, CONJUNTO INDEPENDIENTE es NP-difícil (y como sus soluciones se verifican rápido, NP-completo).

## Los resolvedores SAT en la práctica
Que SAT sea NP-completo no impide resolver en la práctica fórmulas enormes. Los resolvedores modernos basados en **CDCL** (*conflict-driven clause learning*, desarrollado en los noventa por João Marques-Silva y Karem Sakallah con GRASP, y popularizado por Chaff en 2001) resuelven a menudo fórmulas industriales con millones de variables: cuando una asignación parcial lleva a un conflicto, **aprenden** una cláusula nueva que evita repetirlo. Se usan para verificar hardware, planificar, resolver dependencias de paquetes (el resolvedor de dependencias de varios gestores de paquetes de Linux traduce el problema a SAT) y en la verificación de software. Los **resolvedores SMT** (como Z3, de Microsoft, 2008) extienden SAT con teorías de aritmética, arreglos y bits, y son el motor de muchas herramientas de verificación y de pruebas automáticas. La lección: NP-completo describe el **peor caso**; muchas instancias reales tienen estructura que los buenos algoritmos aprovechan.

Para un ingeniero, la consecuencia práctica es doble: reconocer cuándo un problema es NP-difícil (para no buscar un algoritmo exacto y rápido que probablemente no existe) y saber que, aun así, codificarlo como SAT, SMT o programación entera y usar un resolvedor maduro suele ser mucho mejor que escribir una búsqueda a mano.`);
})();
