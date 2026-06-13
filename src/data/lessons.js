export const lessonsData = [
  {
    id: "jsx-intro",
    title: "1. Introducción a React y JSX",
    shortDescription: "Comprende qué es React, el DOM Virtual y cómo funciona la sintaxis JSX.",
    difficulty: "Principiante",
    duration: "15 min",
    theory: [
      {
        subtitle: "¿Qué es React?",
        content: "React es una biblioteca de JavaScript orientada a la creación de interfaces de usuario basadas en componentes. En lugar de manipular directamente el DOM (Document Object Model) del navegador, lo cual es costoso en términos de rendimiento, React utiliza un **DOM Virtual**. Esto es una copia ligera en memoria del DOM real. Cuando algo cambia, React calcula la diferencia mínima necesaria (proceso llamado *reconciliación*) y actualiza el DOM real de forma óptima."
      },
      {
        subtitle: "Sintaxis JSX (JavaScript XML)",
        content: "JSX es una extensión de la sintaxis de JavaScript que se asemeja visualmente a HTML. Nos permite estructurar la interfaz de forma declarativa dentro del código JavaScript. Bajo el capó, las herramientas de compilación (como Babel o Vite) traducen JSX a llamadas de función `React.createElement` o al nuevo JSX runtime de React."
      },
      {
        subtitle: "Reglas de JSX",
        content: "1. **Un solo elemento raíz**: Todo bloque JSX debe estar envuelto en un único elemento contenedor (o un Fragment vacío `<></>`).\n2. **Cierre de etiquetas**: Todas las etiquetas deben cerrarse, incluso las auto-conclusivas como `<img />` o `<br />`.\n3. **camelCase**: Los atributos HTML cambian a camelCase en JSX. Por ejemplo, `class` se convierte en `className` y `onclick` se convierte en `onClick`.\n4. **Expresiones dinámicas**: Puedes insertar cualquier expresión válida de JavaScript dentro de llaves `{}`."
      }
    ],
    playgroundCode: `// Explora JSX insertando variables dinámicas y viendo el resultado.
function App() {
  const titulo = "¡Bienvenido a JSX!";
  const clases = "curso-box active";
  const mostrarDetalle = true;
  
  return (
    <div className={clases} style={{ padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: '#c084fc' }}>{titulo}</h2>
      <p>La fecha de hoy es: {new Date().toLocaleDateString()}</p>
      {mostrarDetalle ? (
        <p style={{ color: '#4ade80' }}>✓ Las expresiones booleanas y ternarios funcionan perfectamente aquí.</p>
      ) : (
        <p>No se muestra el detalle</p>
      )}
      <button onClick={() => alert("¡Hiciste click en JSX!")}>
        Probar Evento
      </button>
    </div>
  );
}`,
    quiz: [
      {
        question: "¿Cuál es el principal beneficio del DOM Virtual en React?",
        options: [
          "Permite que el navegador cargue páginas web sin internet.",
          "Evita actualizaciones innecesarias del DOM real calculando las diferencias mínimas en memoria.",
          "Reemplaza por completo el HTML del proyecto por archivos binarios.",
          "Hace que los estilos CSS se ejecuten el doble de rápido en Chrome."
        ],
        correctIndex: 1,
        explanation: "El DOM Virtual de React calcula los cambios en memoria primero (reconciliación) y solo actualiza en el DOM real lo que realmente ha cambiado, lo que optimiza significativamente el rendimiento."
      },
      {
        question: "¿Por qué se utiliza 'className' en lugar de 'class' en JSX?",
        options: [
          "Porque 'class' es una palabra reservada en JavaScript para definir clases orientadas a objetos.",
          "Porque en React no se permite usar estilos CSS.",
          "Porque 'className' se ejecuta más rápido que 'class'.",
          "No hay diferencia, se pueden usar indistintamente."
        ],
        correctIndex: 0,
        explanation: "Dado que JSX se compila a JavaScript y 'class' es una palabra reservada del lenguaje (para clases de ES6), React utiliza 'className' para definir clases de CSS en elementos HTML."
      },
      {
        question: "¿Qué ocurre si intentas retornar dos elementos adyacentes sin un contenedor en un componente React?",
        options: [
          "React los envuelve automáticamente en un div.",
          "Se produce un error de sintaxis al compilar.",
          "El navegador los renderiza como texto plano.",
          "Solo se renderiza el primer elemento y se ignora el segundo."
        ],
        correctIndex: 1,
        explanation: "JSX requiere que el componente retorne un único elemento raíz. Si necesitas retornar múltiples elementos adyacentes, debes envolverlos en un contenedor común como un <div> o un Fragment de React (<></>)."
      }
    ]
  },
  {
    id: "components-props",
    title: "2. Componentes y Props",
    shortDescription: "Aprende a crear piezas de UI reutilizables y a pasarles datos.",
    difficulty: "Principiante",
    duration: "20 min",
    theory: [
      {
        subtitle: "¿Qué es un Componente?",
        content: "Los componentes son los bloques de construcción de una aplicación React. Piensa en ellos como funciones de JavaScript que reciben entradas (llamadas **props**) y devuelven elementos de React que describen lo que debe aparecer en la pantalla. Un componente debe comenzar siempre con **letra mayúscula** (por ejemplo, `TarjetaUsuario` y no `tarjetaUsuario`), para que React lo distinga de una etiqueta HTML nativa."
      },
      {
        subtitle: "¿Qué son las Props?",
        content: "Las 'props' (abreviatura de propiedades) son objetos que contienen los parámetros de entrada que se pasan a un componente desde su padre. Son **inmutables** (de solo lectura); un componente nunca debe modificar sus propias props. Si las props cambian, el componente se re-renderizará de forma automática con los nuevos valores."
      },
      {
        subtitle: "Destructuración y Props Especiales",
        content: "Es una práctica común destructurar las props en la firma de la función del componente, lo que hace el código más limpio. Además, existe una prop especial llamada `children` que contiene todo el contenido colocado entre las etiquetas de apertura y cierre del componente, permitiendo la composición de componentes."
      }
    ],
    playgroundCode: `// Definimos un componente hijo reusable
function TarjetaUsuario({ nombre, rol, activo, children }) {
  return (
    <div style={{
      border: '2px solid' + (activo ? '#a855f7' : '#374151'),
      padding: '16px',
      borderRadius: '8px',
      margin: '10px 0',
      background: 'rgba(255, 255, 255, 0.03)'
    }}>
      <h3>{nombre} 👤</h3>
      <p style={{ color: '#9ca3af', fontSize: '14px' }}>Rol: {rol}</p>
      
      {/* Contenido extra enviado mediante la prop children */}
      <div style={{ marginTop: '10px', fontSize: '13px', italic: 'true' }}>
        {children}
      </div>
    </div>
  );
}

// Componente Padre
function App() {
  return (
    <div>
      <TarjetaUsuario nombre="Lucía Gómez" rol="Directora de UX" activo={true}>
        <p>💡 Le encanta liderar talleres de diseño y prototipado.</p>
      </TarjetaUsuario>
      
      <TarjetaUsuario nombre="Mateo Díaz" rol="Backend Developer" activo={false}>
        <p>⚡ Experto en bases de datos PostgreSQL y Node.js.</p>
      </TarjetaUsuario>
    </div>
  );
}`,
    quiz: [
      {
        question: "¿Qué afirmación describe correctamente el comportamiento de las props?",
        options: [
          "Las props pueden ser modificadas directamente por el componente que las recibe.",
          "Las props son inmutables para el componente hijo; solo el componente padre puede alterarlas.",
          "Las props solo pueden contener cadenas de texto simples.",
          "Las props se reinician a null en cada re-renderizado."
        ],
        correctIndex: 1,
        explanation: "Las props tienen un flujo de datos unidireccional y son de solo lectura para el componente que las recibe. Si el componente necesita almacenar datos mutables, debe usar el 'estado' (state)."
      },
      {
        question: "¿Para qué sirve la propiedad especial 'children'?",
        options: [
          "Para registrar qué componentes hijos tienen errores de consola.",
          "Para renderizar elementos o texto colocados dentro de las etiquetas de apertura y cierre de un componente.",
          "Para crear de forma automática un componente tipo formulario de registro.",
          "Para limitar la cantidad de hijos que puede renderizar un componente."
        ],
        correctIndex: 1,
        explanation: "La prop 'children' permite inyectar contenido dinámico en la estructura interna de un componente envolvente, facilitando la composición de layouts y contenedores reusables."
      },
      {
        question: "¿Por qué los componentes de React deben empezar obligatoriamente con letra mayúscula?",
        options: [
          "Para que el compilador de JavaScript los identifique como variables globales.",
          "Para que React pueda distinguirlos de las etiquetas HTML estándar (como div, h1, button) al renderizar.",
          "Es una convención estética opcional y no afecta el funcionamiento.",
          "Porque las minúsculas provocan un error crítico en el navegador Chrome."
        ],
        correctIndex: 1,
        explanation: "React distingue los componentes personalizados de las etiquetas HTML mediante la primera letra. Las etiquetas nativas comienzan con minúscula, mientras que los componentes de React deben iniciar con mayúscula."
      }
    ]
  },
  {
    id: "state-events",
    title: "3. Estado y Eventos (useState)",
    shortDescription: "Añade interactividad a tus componentes controlando la memoria interna con useState.",
    difficulty: "Intermedio",
    duration: "25 min",
    theory: [
      {
        subtitle: "¿Qué es el Estado (State)?",
        content: "A diferencia de las props que vienen de fuera, el **estado** es la memoria interna de un componente. Es un objeto o valor que el componente posee y puede cambiar a lo largo del tiempo. Cuando el estado cambia, React se entera de que la interfaz está desactualizada y re-renderiza el componente (y sus descendientes si es necesario) para reflejar los nuevos datos en la pantalla."
      },
      {
        subtitle: "El Hook `useState`",
        content: "En componentes funcionales, declaramos estado usando el hook `useState`. Este hook toma el valor inicial como argumento y devuelve un arreglo con exactamente dos elementos:\n1. El **valor actual** del estado.\n2. Una **función de actualización** para cambiar el valor del estado.\n\nEjemplo: `const [contador, setContador] = useState(0);`"
      },
      {
        subtitle: "Inmutabilidad del Estado",
        content: "Nunca debes modificar directamente la variable de estado (ej: `contador = contador + 1`). En su lugar, debes llamar a la función de actualización (`setContador(contador + 1)`). Si el nuevo estado depende del estado anterior, se recomienda pasar una función callback: `setContador(prev => prev + 1)` para evitar problemas con actualizaciones asíncronas."
      }
    ],
    playgroundCode: `import { useState } from 'react';

function App() {
  const [contador, setContador] = useState(0);
  const [nombre, setNombre] = useState('');
  
  return (
    <div style={{ padding: '15px' }}>
      <h3>Contador Reactivo ⏱️</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{contador}</p>
      
      <button onClick={() => setContador(c => c + 1)} style={{ marginRight: '8px' }}>
        Incrementar
      </button>
      <button onClick={() => setContador(c => c - 1)} style={{ marginRight: '8px' }}>
        Decrementar
      </button>
      <button onClick={() => setContador(0)}>
        Reiniciar
      </button>
      
      <hr style={{ margin: '20px 0', borderColor: '#374151' }} />
      
      <h3>Formulario Controlado ✍️</h3>
      <input 
        type="text" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
        placeholder="Escribe tu nombre..."
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #4b5563', color: '#000' }}
      />
      {nombre && <p style={{ marginTop: '10px', color: '#a855f7' }}>¡Hola, {nombre}!</p>}
    </div>
  );
}`,
    quiz: [
      {
        question: "¿Por qué no se debe modificar directamente una variable de estado en React (ej. 'estado = nuevoValor')?",
        options: [
          "Porque causa un bucle infinito que rompe la computadora del cliente.",
          "Porque React no detectará la mutación directa y no activará el re-renderizado del componente.",
          "Porque el navegador arrojará un error de tipo 'Read Only'.",
          "Sí se puede, y es la forma recomendada en React 19."
        ],
        correctIndex: 1,
        explanation: "React detecta los cambios de estado comparando las referencias a través de la función de actualización. Si mutas el estado directamente, la referencia no cambia y React no se entera de que debe re-renderizar el componente."
      },
      {
        question: "Dada la declaración 'const [valor, setValor] = useState(10);', ¿cuál es la forma correcta de duplicar el valor?",
        options: [
          "setValor(valor * 2)",
          "valor = valor * 2",
          "setValor(prev => prev * 2)",
          "Tanto la primera como la tercera opción son correctas (siendo la tercera más segura si hay múltiples actualizaciones rápidas)."
        ],
        correctIndex: 3,
        explanation: "Ambas opciones de setValor funcionan. Sin embargo, pasar un callback 'prev => prev * 2' es la mejor práctica y la más segura cuando el nuevo estado depende del anterior, garantizando trabajar siempre con el valor más actualizado."
      },
      {
        question: "¿Qué es un componente controlado en React?",
        options: [
          "Un componente que no permite clicks del usuario.",
          "Un input de formulario cuyo valor es manejado por el estado de React y no por el DOM del navegador.",
          "Un componente de clase que ha sido obsoleto.",
          "Un componente que se renderiza únicamente en el servidor (SSR)."
        ],
        correctIndex: 1,
        explanation: "En un componente controlado, el valor del input se vincula a una variable de estado de React, y cualquier cambio en el input se maneja a través de una función `onChange` que actualiza dicho estado, centralizando la verdad en React."
      }
    ]
  },
  {
    id: "effects-lifecycle",
    title: "4. Efectos y Ciclo de Vida (useEffect)",
    shortDescription: "Sincroniza tus componentes con sistemas externos y maneja efectos secundarios.",
    difficulty: "Intermedio",
    duration: "25 min",
    theory: [
      {
        subtitle: "¿Qué son los Efectos Secundarios?",
        content: "El renderizado de React debe ser puro e idealmente libre de efectos colaterales. Sin embargo, las aplicaciones reales necesitan interactuar con APIs externas, configurar suscripciones, modificar el DOM manualmente o configurar temporizadores. En React, estas acciones que ocurren fuera del flujo de renderizado se conocen como **efectos secundarios** (side effects)."
      },
      {
        subtitle: "El Hook `useEffect`",
        content: "El hook `useEffect` te permite ejecutar efectos secundarios en tus componentes funcionales. Recibe dos parámetros:\n1. Una **función de efecto** que contiene el código a ejecutar.\n2. Un **arreglo de dependencias** opcional que determina cuándo debe volver a ejecutarse el efecto."
      },
      {
        subtitle: "Comportamiento del Arreglo de Dependencias",
        content: "- **Sin arreglo (`useEffect(fn)`)**: El efecto se ejecuta después de **cada** renderizado del componente. (Rara vez deseado).\n- **Arreglo vacío (`useEffect(fn, [])`)**: El efecto se ejecuta **solo una vez**, después de que el componente se monte por primera vez.\n- **Con variables (`useEffect(fn, [a, b])`)**: El efecto se ejecuta en el montaje y cada vez que cualquiera de las variables (`a` o `b`) cambie."
      },
      {
        subtitle: "Función de Limpieza (Cleanup)",
        content: "Si tu función de efecto retorna otra función, React la ejecutará antes de que el componente se desmonte o antes de volver a ejecutar el efecto. Esto es crucial para limpiar recursos, apagar temporizadores (`clearInterval`), cancelar suscripciones o peticiones HTTP y prevenir fugas de memoria."
      }
    ],
    playgroundCode: `import { useState, useEffect } from 'react';

function App() {
  const [personajeId, setPersonajeId] = useState(1);
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [segundos, setSegundos] = useState(0);

  // 1. Efecto con dependencias: Cambia cuando personajeId cambia
  useEffect(() => {
    let activo = true;
    setCargando(true);
    
    fetch(\`https://jsonplaceholder.typicode.com/users/\${personajeId}\`)
      .then(res => res.json())
      .then(data => {
        if (activo) {
          setDatos(data);
          setCargando(false);
        }
      })
      .catch(err => {
        console.error(err);
        setCargando(false);
      });
      
    // Limpieza: previene actualizar el estado si el componente se desmonta antes de que acabe la petición.
    return () => {
      activo = false;
    };
  }, [personajeId]);

  // 2. Efecto con arreglo vacío (montaje) y función de limpieza (desmontaje)
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos(s => s + 1);
    }, 1000);
    
    return () => {
      clearInterval(intervalo);
      console.log("⏰ Temporizador apagado. ¡Recursos liberados!");
    };
  }, []);

  return (
    <div style={{ padding: '15px' }}>
      <p style={{ color: '#a855f7' }}>⏱️ Tiempo activo en esta lección: {segundos}s</p>
      <hr style={{ borderColor: '#374151', margin: '15px 0' }} />
      
      <h4>Simulador de Consulta de Usuarios</h4>
      <div style={{ display: 'flex', gap: '8px', margin: '10px 0' }}>
        {[1, 2, 3, 4].map(id => (
          <button 
            key={id} 
            onClick={() => setPersonajeId(id)}
            style={{ backgroundColor: personajeId === id ? '#a855f7' : '' }}
          >
            Usuario {id}
          </button>
        ))}
      </div>
      
      {cargando ? (
        <p>Cargando datos del usuario...</p>
      ) : datos ? (
        <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px' }}>
          <strong>Nombre:</strong> {datos.name}<br />
          <strong>Email:</strong> {datos.email}<br />
          <strong>Ciudad:</strong> {datos.address?.city}
        </div>
      ) : (
        <p>No hay datos cargados.</p>
      )}
    </div>
  );
}`,
    quiz: [
      {
        question: "¿Cuándo se ejecuta un efecto declarado como 'useEffect(() => { ... }, [])' (con un arreglo de dependencias vacío)?",
        options: [
          "Nunca se ejecuta.",
          "Se ejecuta después de cada renderizado del componente.",
          "Se ejecuta exactamente una vez, inmediatamente después del primer renderizado (montaje).",
          "Se ejecuta cada vez que el componente recibe nuevas props."
        ],
        correctIndex: 2,
        explanation: "Un array de dependencias vacío le dice a React que el efecto no depende de ningún estado o prop de la renderización, por lo que solo se ejecuta al montar el componente en el DOM."
      },
      {
        question: "¿Qué es y para qué sirve la función de limpieza (cleanup) en useEffect?",
        options: [
          "Es una función de ayuda para borrar variables del localStorage automáticamente.",
          "Es la función retornada por el efecto para limpiar recursos (como temporizadores o suscripciones) y evitar fugas de memoria.",
          "Es una función que limpia el código fuente eliminando los comentarios de desarrollo.",
          "Es un método para vaciar el estado del componente."
        ],
        correctIndex: 1,
        explanation: "La función de limpieza se devuelve dentro de la función de efecto de `useEffect`. React la ejecuta antes de volver a correr el efecto o cuando el componente se destruye (desmonta), ideal para liberar listeners o timers."
      },
      {
        question: "¿Qué ocurre si omites por completo el segundo parámetro (el arreglo de dependencias) en un useEffect?",
        options: [
          "El hook lanzará un error de compilación obligatorio.",
          "El efecto se ejecutará únicamente una vez al montar.",
          "El efecto se ejecutará en cada renderizado que sufra el componente, lo que puede causar problemas graves de rendimiento.",
          "El efecto quedará inhabilitado."
        ],
        correctIndex: 2,
        explanation: "Si omites el array de dependencias, React ejecutará el efecto después de cada renderizado de forma indefinida, lo cual es ineficiente y puede provocar bucles infinitos si actualizas estado dentro."
      }
    ]
  },
  {
    id: "advanced-hooks",
    title: "5. Hooks Avanzados: useRef y Custom Hooks",
    shortDescription: "Aprende a usar useRef para controlar el DOM real y encapsula lógica en Custom Hooks.",
    difficulty: "Avanzado",
    duration: "30 min",
    theory: [
      {
        subtitle: "Acceso al DOM y Valores Persistentes con `useRef`",
        content: "El hook `useRef` nos permite crear un objeto mutable con una propiedad `.current`. Tiene dos propósitos principales:\n1. **Referencia al DOM**: Al pasar una ref a un elemento HTML de JSX (`ref={miRef}`), React vincula el nodo del DOM real a `miRef.current`. Esto permite enfocar inputs, medir elementos o controlar archivos multimedia directamente.\n2. **Persistencia de variables**: Puedes almacenar cualquier valor en `useRef`. A diferencia del estado (`useState`), cambiar el valor de `.current` **NO** provoca un re-renderizado del componente."
      },
      {
        subtitle: "¿Qué es un Hook Personalizado (Custom Hook)?",
        content: "Los Custom Hooks son funciones de JavaScript que comienzan con la palabra `use` y pueden llamar a otros hooks de React. Nos permiten extraer la lógica del estado y del comportamiento de un componente para que pueda ser compartida y reutilizada fácilmente en múltiples componentes independientes."
      }
    ],
    playgroundCode: `import { useState, useEffect, useRef } from 'react';

// 1. Custom Hook reusable para controlar el ancho de ventana
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

function App() {
  const width = useWindowWidth();
  const inputRef = useRef(null);
  const clicksRef = useRef(0);
  const [renderCount, setRenderCount] = useState(1);

  const enfocarInput = () => {
    // Acceso directo al DOM real para enfocar el input
    inputRef.current.focus();
  };

  const registrarClickSilencioso = () => {
    // Esto cambia el valor pero NO re-renderiza la interfaz
    clicksRef.current += 1;
    console.log("Clicks acumulados en useRef (sin re-render):", clicksRef.current);
  };

  return (
    <div style={{ padding: '15px' }}>
      <p style={{ color: '#a855f7' }}>📏 Ancho de ventana detectado por Custom Hook: <strong>{width}px</strong></p>
      <hr style={{ borderColor: '#374151', margin: '15px 0' }} />

      <h4>Ejemplo 1: Control de Enfoque con useRef</h4>
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="Haz click en el botón para enfocarme..."
        style={{ padding: '8px', width: '250px', borderRadius: '4px', border: '1px solid #4b5563', color: '#000' }}
      />
      <button onClick={enfocarInput} style={{ marginLeft: '10px' }}>
        Enfocar Input
      </button>

      <hr style={{ borderColor: '#374151', margin: '15px 0' }} />

      <h4>Ejemplo 2: Variable Persistente sin Renderizado</h4>
      <p>Cantidad de re-renders actuales de la UI: <strong>{renderCount}</strong></p>
      <p>Clicks en botón silencioso: <strong>{clicksRef.current}</strong> (actualiza useRef.current)</p>
      
      <button onClick={registrarClickSilencioso} style={{ marginRight: '8px' }}>
        Click Silencioso (Modifica Ref)
      </button>
      <button onClick={() => setRenderCount(r => r + 1)}>
        Forzar Re-render (Actualiza UI)
      </button>
    </div>
  );
}`,
    quiz: [
      {
        question: "¿Cuál de las siguientes afirmaciones sobre 'useRef' es correcta?",
        options: [
          "Cambiar la propiedad 'current' de un ref provoca el re-renderizado automático del componente.",
          "Cambiar la propiedad 'current' de un ref NO provoca un re-renderizado del componente.",
          "Solo sirve para almacenar números enteros.",
          "Solo se ejecuta una vez y no se puede mutar."
        ],
        correctIndex: 1,
        explanation: "Modificar la propiedad '.current' de un objeto `useRef` es un efecto de mutación directa que persiste a través de los renderizados pero no activa un nuevo flujo de renderizado en React."
      },
      {
        question: "¿Qué es un Custom Hook en React?",
        options: [
          "Una librería externa que se descarga de npm para manejar estilos.",
          "Una función de JavaScript que empieza con 'use' y encapsula lógica de hooks de React para ser reutilizada.",
          "Un componente de clase que ha sido renombrado.",
          "Una directiva especial para bases de datos."
        ],
        correctIndex: 1,
        explanation: "Un custom hook es simplemente una función JS normal cuyo nombre inicia con 'use' y que internamente consume otros hooks (useState, useEffect, etc.), abstrayendo lógica compleja de componentes."
      },
      {
        question: "¿Cómo se asocia un hook useRef a un elemento del DOM en JSX?",
        options: [
          "Usando el atributo de estilo style={ref}",
          "Pasando la variable ref en el atributo HTML 'ref' del elemento en JSX.",
          "Llamando a document.getElementById() dentro del renderizado.",
          "Asignando directamente la etiqueta a una variable let."
        ],
        correctIndex: 1,
        explanation: "Para enlazar un useRef a un elemento del DOM, declaras el ref y luego se lo pasas al elemento JSX correspondiente a través del atributo `ref={tuRef}`. React se encarga del enlace."
      }
    ]
  },
  {
    id: "context-api",
    title: "6. Manejo de Estado Global (Context API)",
    shortDescription: "Evita el acoplamiento y el prop drilling enviando variables a cualquier nivel del árbol.",
    difficulty: "Avanzado",
    duration: "30 min",
    theory: [
      {
        subtitle: "El problema de Prop Drilling",
        content: "En React, los datos fluyen hacia abajo a través de props. Cuando un estado que está arriba en el árbol necesita ser utilizado por un componente muy profundo, debes pasar la prop a través de todos los componentes intermedios, incluso si estos componentes no la utilizan para nada. Este patrón problemático se denomina **prop drilling**."
      },
      {
        subtitle: "¿Qué es Context API?",
        content: "Context API proporciona una forma de pasar valores por el árbol de componentes sin tener que pasar props manualmente en cada nivel. Es excelente para compartir datos 'globales' para todo un árbol de componentes, como el tema actual (oscuro/claro), el idioma seleccionado, o la información del usuario autenticado."
      },
      {
        subtitle: "Cómo Utilizar Context en 3 Pasos",
        content: "1. **Creación**: Se crea el contexto usando `createContext`. Ej: `const TemaContext = createContext();`.\n2. **Proveer**: Envolvemos los componentes hijos en un componente **Provider** y le pasamos el valor global: `<TemaContext.Provider value={tema}>`.\n3. **Consumir**: En cualquier componente secundario dentro del Provider, consumimos el valor usando el hook `useContext`: `const tema = useContext(TemaContext);`."
      }
    ],
    playgroundCode: `import { useState, createContext, useContext } from 'react';

// 1. Creación del Contexto
const IdiomaContext = createContext();

// Componente Intermedio (No utiliza ni pasa la prop idioma)
function TarjetaInfo() {
  return (
    <div style={{ padding: '10px', border: '1px solid #4b5563', borderRadius: '6px' }}>
      <p style={{ fontSize: '13px', color: '#9ca3af' }}>[Componente Intermedio sin Props]</p>
      <BotonSaludo />
    </div>
  );
}

// Componente Hijo Profundo (Consume el contexto directo de la raíz)
function BotonSaludo() {
  const { idioma, setIdioma } = useContext(IdiomaContext);
  
  const textos = {
    es: { saludo: "¡Hola Mundo!", texto: "Estás consumiendo el contexto en español." },
    en: { saludo: "Hello World!", texto: "You are consuming the context in English." },
    pt: { saludo: "Olá Mundo!", texto: "Você está consumiendo o contexto em Português." }
  };
  
  return (
    <div style={{ marginTop: '10px' }}>
      <h4 style={{ color: '#a855f7' }}>{textos[idioma].saludo}</h4>
      <p style={{ fontSize: '14px' }}>{textos[idioma].texto}</p>
      
      <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
        <button onClick={() => setIdioma('es')}>Español</button>
        <button onClick={() => setIdioma('en')}>English</button>
        <button onClick={() => setIdioma('pt')}>Português</button>
      </div>
    </div>
  );
}

// Componente Raíz / Proveedor
function App() {
  const [idioma, setIdioma] = useState('es');
  
  return (
    // 2. Proveer el contexto a todo el árbol
    <IdiomaContext.Provider value={{ idioma, setIdioma }}>
      <div style={{ padding: '15px' }}>
        <h3>Demo Context API 🌐</h3>
        <p>Idioma global seleccionado: <strong>{idioma.toUpperCase()}</strong></p>
        
        <TarjetaInfo />
      </div>
    </IdiomaContext.Provider>
  );
}`,
    quiz: [
      {
        question: "¿Qué problema resuelve principalmente Context API en React?",
        options: [
          "La lentitud de los efectos secundarios con APIs.",
          "El 'prop drilling', es decir, pasar props manualmente a través de componentes intermedios que no las necesitan.",
          "La persistencia de datos en bases de datos externas.",
          "La compilación de código JSX a JavaScript."
        ],
        correctIndex: 1,
        explanation: "Context API provee un mecanismo para compartir datos globales en el árbol de componentes de manera directa, evitando pasar props manualmente en múltiples capas intermedias sin necesidad."
      },
      {
        question: "¿Cuáles son las partes esenciales para implementar Context API?",
        options: [
          "Un compilador de TypeScript y un bundler de Webpack.",
          "Un archivo de configuración JSON y un tag HTML.",
          "El método createContext(), el componente Proveedor (Provider) y el hook useContext() para consumir el valor.",
          "Un archivo CSS y un evento onClick."
        ],
        correctIndex: 2,
        explanation: "Para implementar Context se crea el contexto con createContext, se envuelven los componentes bajo un Provider suministrando el valor, y se extrae el valor en los hijos usando useContext."
      },
      {
        question: "¿Qué ocurre con los componentes que consumen un contexto cuando el valor provisto por el Provider cambia?",
        options: [
          "Deben ser recargados refrescando la página del navegador.",
          "Se re-renderizan automáticamente para reflejar el nuevo valor del contexto.",
          "Ignoran el cambio a menos que el usuario vuelva a interactuar.",
          "Lanzan un error de advertencia en la consola."
        ],
        correctIndex: 1,
        explanation: "Cada vez que el valor del proveedor del contexto cambia, todos los componentes descendientes que consumen ese contexto con `useContext` se vuelven a renderizar automáticamente para estar sincronizados."
      }
    ]
  }
];
