import React, { useState, useEffect, useRef } from 'react';
import { Play, Code, Eye, AlertCircle, RefreshCw, Terminal, CheckCircle } from 'lucide-react';

const PRESETS = {
  jsx: {
    title: "1. Demo JSX",
    code: `// Módulo 1: Introducción a JSX
function App() {
  const nombre = "Estudiante de React";
  const fecha = new Date().toLocaleTimeString();
  const tecnologias = ["React", "JSX", "Vite", "CSS Moderno"];
  
  return (
    <div style={{
      padding: '24px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, rgba(192,132,252,0.1), rgba(168,85,247,0.05))',
      border: '1px solid rgba(168,85,247,0.2)',
      color: '#e9ecef'
    }}>
      <h3 style={{ color: '#c084fc', marginTop: 0 }}>¡Hola, {nombre}! 👋</h3>
      <p>Estás editando en tiempo real. La hora actual es: <strong>{fecha}</strong></p>
      
      <h4 style={{ color: '#a855f7', marginBottom: '8px' }}>Tecnologías clave aprendidas:</h4>
      <ul style={{ paddingLeft: '20px', margin: 0 }}>
        {tecnologias.map((tech, idx) => (
          <li key={idx} style={{ margin: '4px 0' }}>{tech}</li>
        ))}
      </ul>
      
      <button 
        style={{
          marginTop: '16px',
          background: '#a855f7',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500'
        }}
        onClick={() => alert('¡Compilación e interactividad logradas!')}
      >
        ¡Probar Interactividad!
      </button>
    </div>
  );
}`
  },
  props: {
    title: "2. Components & Props",
    code: `// Módulo 2: Componentes y Props
// Componente Hijo Reusable
function TarjetaCurso({ titulo, duracion, instructor, destacado }) {
  return (
    <div style={{
      padding: '16px',
      borderRadius: '8px',
      background: '#1e1b29',
      border: destacado ? '2px solid #a855f7' : '1px solid #2d2d3d',
      marginBottom: '12px',
      position: 'relative'
    }}>
      {destacado && (
        <span style={{
          position: 'absolute',
          top: '-10px',
          right: '10px',
          background: '#a855f7',
          color: '#fff',
          fontSize: '10px',
          padding: '2px 8px',
          borderRadius: '10px',
          fontWeight: 'bold'
        }}>RECOMENDADO</span>
      )}
      <h4 style={{ margin: '0 0 6px 0', color: '#f3f4f6' }}>{titulo}</h4>
      <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#9ca3af' }}>
        Instructor: {instructor} | ⏳ {duracion}
      </p>
    </div>
  );
}

// Componente Padre
function App() {
  return (
    <div>
      <h3 style={{ color: '#c084fc', marginTop: 0 }}>Cursos Disponibles</h3>
      <TarjetaCurso 
        titulo="Fundamentos de React 19" 
        duracion="4 horas" 
        instructor="Antigravity AI" 
        destacado={true} 
      />
      <TarjetaCurso 
        titulo="Estilos con CSS Avanzado" 
        duracion="6 horas" 
        instructor="Diseñador Senior" 
        destacado={false} 
      />
    </div>
  );
}`
  },
  state: {
    title: "3. useState & Eventos",
    code: `// Módulo 3: Estado y Eventos
function App() {
  const [contador, setContador] = React.useState(0);
  const [colorFondo, setColorFondo] = React.useState('#1e1b29');
  
  const colores = ['#1e1b29', '#1a365d', '#14532d', '#581c87', '#701a75'];
  
  return (
    <div style={{
      padding: '20px',
      borderRadius: '10px',
      background: colorFondo,
      transition: 'background 0.3s ease',
      border: '1px solid #374151',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#fff', marginTop: 0 }}>Contador reactivo: {contador}</h3>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
        <button 
          onClick={() => setContador(c => c + 1)}
          style={{ padding: '8px 16px', background: '#a855f7', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}
        >
          Incrementar
        </button>
        <button 
          onClick={() => setContador(c => c - 1)}
          style={{ padding: '8px 16px', background: '#374151', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}
        >
          Decrementar
        </button>
      </div>
      
      <h4 style={{ color: '#e5e7eb', marginBottom: '8px' }}>Cambiar color de fondo:</h4>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
        {colores.map((c) => (
          <button
            key={c}
            onClick={() => setColorFondo(c)}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: c,
              border: colorFondo === c ? '2px solid #fff' : '1px solid #9ca3af',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
}`
  },
  effect: {
    title: "4. useEffect & APIs",
    code: `// Módulo 4: Efectos secundarios
function App() {
  const [actividad, setActividad] = React.useState(null);
  const [cargando, setCargando] = React.useState(false);
  const [id, setId] = React.useState(1);
  
  React.useEffect(() => {
    let activo = true;
    setCargando(true);
    
    // Consultando una API de prueba mockeada
    fetch('https://jsonplaceholder.typicode.com/todos/' + id)
      .then(res => res.json())
      .then(data => {
        if (activo) {
          setActividad(data);
          setCargando(false);
        }
      })
      .catch(() => setCargando(false));
      
    return () => {
      activo = false; // Cleanup
    };
  }, [id]);
  
  return (
    <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid #374151' }}>
      <h3 style={{ marginTop: 0, color: '#c084fc' }}>Consultas con useEffect</h3>
      <p style={{ fontSize: '14px', color: '#9ca3af' }}>
        Al presionar otro botón, cambia la dependencia ID, disparando un nuevo useEffect.
      </p>
      
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button 
            key={n} 
            onClick={() => setId(n)}
            style={{
              padding: '6px 12px',
              background: id === n ? '#a855f7' : '#2d2d3d',
              border: 'none',
              color: '#fff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Tarea {n}
          </button>
        ))}
      </div>
      
      {cargando ? (
        <p>Cargando datos de la API...</p>
      ) : actividad ? (
        <div style={{ padding: '12px', background: '#1e1b29', borderRadius: '6px' }}>
          <strong>Título de Tarea:</strong> {actividad.title}<br />
          <strong>Completado:</strong> {actividad.completed ? '✅ Sí' : '❌ No'}
        </div>
      ) : (
        <p>Ninguna actividad cargada.</p>
      )}
    </div>
  );
}`
  }
};

export default function Playground() {
  const [activePreset, setActivePreset] = useState('jsx');
  const [editorCode, setEditorCode] = useState(PRESETS.jsx.code);
  const [compilerError, setCompilerError] = useState(null);
  const [compiledComponent, setCompiledComponent] = useState(null);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isBabelLoaded, setIsBabelLoaded] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  const containerRef = useRef(null);

  // Dynamically load Babel Standalone
  useEffect(() => {
    if (window.Babel) {
      setIsBabelLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@babel/standalone/babel.min.js';
    script.async = true;
    script.onload = () => {
      setIsBabelLoaded(true);
    };
    script.onerror = () => {
      setCompilerError("No se pudo cargar el compilador Babel desde CDN. Verifica tu conexión a internet.");
    };
    document.body.appendChild(script);

    return () => {
      // Clean up script if unmounted before loading
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Update editor when preset changes
  const handleLoadPreset = (key) => {
    setActivePreset(key);
    setEditorCode(PRESETS[key].code);
    setConsoleLogs([]);
    setRenderCount(0);
  };

  // Compile and run the code
  const handleRunCode = () => {
    if (!isBabelLoaded) {
      setCompilerError("Babel se está cargando, por favor espera...");
      return;
    }

    setCompilerError(null);
    try {
      // Intercept console.log inside evaluated script
      const originalLog = console.log;
      const logs = [];
      const customLog = (...args) => {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        originalLog(...args);
      };

      // Wrap code in React scope and execute
      const cleanedCode = editorCode.replace(/import\s+.*?;\n?/g, '');
      const transformed = window.Babel.transform(cleanedCode, {
        presets: ['react']
      }).code;

      // Create function execution context
      const creator = new Function(
        'React', 
        'useState', 
        'useEffect', 
        'useRef', 
        'useContext', 
        'createContext', 
        'customLog', 
        `
        const console = { log: customLog, error: customLog, warn: customLog };
        const { useState, useEffect, useRef, useContext, createContext } = React;
        ${transformed}
        return typeof App !== 'undefined' ? App : null;
        `
      );

      const App = creator(
        React, 
        useState, 
        useEffect, 
        useRef, 
        useContext, 
        createContext, 
        customLog
      );

      if (!App) {
        throw new Error("No se definió la función component 'App' en tu código. Asegúrate de declarar 'function App() { ... }'.");
      }

      // Track re-renders inside the custom wrapper component
      const RenderTrackerWrapper = () => {
        const renders = useRef(0);
        renders.current += 1;
        
        useEffect(() => {
          setRenderCount(renders.current);
        });

        return <App />;
      };

      setCompiledComponent(() => RenderTrackerWrapper);
      if (logs.length > 0) {
        setConsoleLogs(prev => [...prev, ...logs]);
      }
    } catch (err) {
      setCompilerError(err.message);
      setCompiledComponent(null);
    }
  };

  // Run initial code on mount/load once Babel is active
  useEffect(() => {
    if (isBabelLoaded) {
      handleRunCode();
    }
  }, [isBabelLoaded, editorCode]);

  return (
    <div className="playground-container animate-fade-in">
      <header className="playground-header">
        <div>
          <span className="badge-glow">Zona Práctica</span>
          <h2>Playground de React</h2>
          <p>Escribe JSX y React nativo. Compilado y renderizado en vivo en tu navegador.</p>
        </div>
        
        {/* Preset Selector */}
        <div className="preset-selector">
          {Object.keys(PRESETS).map((key) => (
            <button
              key={key}
              onClick={() => handleLoadPreset(key)}
              className={`preset-btn ${activePreset === key ? 'active' : ''}`}
            >
              {PRESETS[key].title}
            </button>
          ))}
        </div>
      </header>

      {/* Editor & Preview Grid */}
      <div className="playground-grid">
        {/* Code Editor Column */}
        <div className="editor-column card-glow">
          <div className="column-title-bar">
            <div className="title-left">
              <Code size={16} />
              <span>Editor de Código (JSX)</span>
            </div>
            <button 
              onClick={handleRunCode} 
              className="run-code-btn"
              disabled={!isBabelLoaded}
            >
              <Play size={14} /> Ejecutar
            </button>
          </div>
          <div className="editor-textarea-wrapper">
            <textarea
              value={editorCode}
              onChange={(e) => setEditorCode(e.target.value)}
              className="code-textarea"
              spellCheck="false"
              placeholder="// Escribe tu código de React aquí..."
            />
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="preview-column card-glow">
          <div className="column-title-bar">
            <div className="title-left">
              <Eye size={16} />
              <span>Vista Previa en Vivo</span>
            </div>
            <div className="preview-status-pills">
              <span className="pill pill-green">
                Renders: {renderCount}
              </span>
            </div>
          </div>

          <div className="preview-canvas-wrapper">
            {!isBabelLoaded ? (
              <div className="preview-loading">
                <RefreshCw size={24} className="animate-spin text-purple" />
                <p>Cargando compilador React/JSX en tiempo real...</p>
                <span className="subtext">Babel standalone está cargándose desde un CDN...</span>
              </div>
            ) : compilerError ? (
              <div className="preview-error animate-shake">
                <AlertCircle size={24} color="#f87171" />
                <h4>Error de Compilación</h4>
                <pre>{compilerError}</pre>
              </div>
            ) : compiledComponent ? (
              <div className="live-preview-box">
                {/* Dynamically instantiate the compiled component */}
                {React.createElement(compiledComponent)}
              </div>
            ) : (
              <div className="preview-empty">
                <Play size={36} className="text-gray" />
                <p>Presiona el botón de 'Ejecutar' para renderizar el componente.</p>
              </div>
            )}
          </div>

          {/* Console / Terminal Section */}
          <div className="playground-console">
            <div className="console-bar">
              <div className="title-left">
                <Terminal size={14} />
                <span>Consola del Sistema</span>
              </div>
              <button 
                onClick={() => setConsoleLogs([])} 
                className="clear-console-btn"
              >
                Limpiar
              </button>
            </div>
            <div className="console-logs">
              {consoleLogs.length === 0 ? (
                <div className="console-placeholder">&gt; Los logs de console.log() aparecerán aquí...</div>
              ) : (
                consoleLogs.map((log, index) => (
                  <div key={index} className="console-log-line">
                    <span className="prompt">&gt;</span> {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
