import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Layers, HelpCircle, GitCommit, Radio, Zap, ArrowDown, Activity } from 'lucide-react';

export default function VisualLab({ lessonId }) {
  // 1. JSX Intro State
  const [jsxText, setJsxText] = useState('¡Hola Mundo!');
  const [jsxColor, setJsxColor] = useState('#c084fc');

  // 2. Component/Props State
  const [childProps, setChildProps] = useState({
    1: { name: 'Card A', color: '#a855f7', active: true },
    2: { name: 'Card B', color: '#10b981', active: false },
    3: { name: 'Card C', color: '#3b82f6', active: true }
  });

  // 3. State & Events Logger
  const [count, setCount] = useState(0);
  const [textVal, setTextVal] = useState('');
  const [stateLogs, setStateLogs] = useState([]);
  const addStateLog = (msg) => {
    setStateLogs(prev => [
      { id: Date.now(), time: new Date().toLocaleTimeString(), text: msg },
      ...prev.slice(0, 7)
    ]);
  };

  // 4. Lifecycle Logger
  const [isMounted, setIsMounted] = useState(true);
  const [depId, setDepId] = useState(1);
  const [lifecycleLogs, setLifecycleLogs] = useState([]);
  
  const addLifecycleLog = (text, type) => {
    setLifecycleLogs(prev => [
      { id: Date.now(), text, type, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 8)
    ]);
  };

  // 5. useRef vs useState
  const [stateValue, setStateValue] = useState(0);
  const refValue = useRef(0);
  const [refDisplay, setRefDisplay] = useState(0);
  const [inputRefText, setInputRefText] = useState('');
  const domInputRef = useRef(null);

  // 6. Context API
  const [themeMode, setThemeMode] = useState('dark');

  // React flash effects on render
  const renderCountRef = useRef({ count: 0, props: 0, state: 0 });
  const [flashCard, setFlashCard] = useState(null);

  const triggerFlash = (cardId) => {
    setFlashCard(cardId);
    setTimeout(() => setFlashCard(null), 500);
  };

  // --- Effects for Lifecycle Demo ---
  useEffect(() => {
    if (!isMounted) return;
    addLifecycleLog("🟢 Montado: useEffect(() => {}, []) ejecutado", "mount");
    return () => {
      addLifecycleLog("🔴 Desmontado: Cleanup del efecto de montaje ejecutado", "unmount");
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    addLifecycleLog(`🔵 Actualizado: useEffect ejecutado por cambio de dependencia (ID = ${depId})`, "update");
    return () => {
      addLifecycleLog(`🟡 Limpieza: Cleanup ejecutado antes de actualizar dependencia ID`, "cleanup");
    };
  }, [depId, isMounted]);

  // Render Visualizer based on module ID
  const renderVisualizer = () => {
    switch (lessonId) {
      case 'jsx-intro':
        return (
          <div className="lab-module-box">
            <div className="lab-controls">
              <h4>Controles del Laboratorio</h4>
              <div className="input-group">
                <label>Texto en JSX:</label>
                <input 
                  type="text" 
                  value={jsxText} 
                  onChange={(e) => setJsxText(e.target.value)} 
                  style={{ color: '#000' }}
                />
              </div>
              <div className="input-group">
                <label>Color de Texto:</label>
                <div className="color-palette">
                  {['#c084fc', '#f43f5e', '#3b82f6', '#10b981', '#f59e0b'].map(c => (
                    <button 
                      key={c}
                      onClick={() => setJsxColor(c)}
                      className={`color-btn ${jsxColor === c ? 'active' : ''}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lab-visuals split-view">
              <div className="visual-panel">
                <h5>1. Código Escrito en JSX</h5>
                <pre className="code-block-lite">
{`const element = (
  <div className="card">
    <h3 style={{ color: '${jsxColor}' }}>
      ${jsxText}
    </h3>
    <p>Renderizado por JSX</p>
  </div>
);`}
                </pre>
              </div>

              <div className="visual-panel">
                <h5>2. Compilación (JS Equivalente)</h5>
                <pre className="code-block-lite compiler-output">
{`const element = React.createElement(
  "div",
  { className: "card" },
  React.createElement(
    "h3",
    { style: { color: "${jsxColor}" } },
    "${jsxText}"
  ),
  React.createElement("p", null, "Renderizado por JSX")
);`}
                </pre>
              </div>
            </div>

            <div className="lab-output-preview">
              <h5>3. Vista Previa en el DOM Real</h5>
              <div className="dom-result-card" style={{ borderLeft: `4px solid ${jsxColor}` }}>
                <h3 style={{ color: jsxColor, margin: '0 0 8px 0' }}>{jsxText}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#9ca3af' }}>Renderizado por JSX</p>
              </div>
            </div>
          </div>
        );

      case 'components-props':
        return (
          <div className="lab-module-box">
            <div className="lab-controls">
              <h4>Parámetros de las Props</h4>
              <p className="help-text">Modifica las props enviadas desde el Componente Padre y observa el flujo de datos unidireccional.</p>
              
              {Object.keys(childProps).map(id => (
                <div key={id} className="prop-control-card">
                  <h5>Hijo {id} ({childProps[id].name})</h5>
                  <div className="control-row">
                    <input 
                      type="text" 
                      value={childProps[id].name}
                      onChange={(e) => {
                        setChildProps(prev => ({
                          ...prev,
                          [id]: { ...prev[id], name: e.target.value }
                        }));
                        triggerFlash(id);
                      }}
                      className="input-sm"
                      style={{ color: '#000' }}
                    />
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={childProps[id].active}
                        onChange={(e) => {
                          setChildProps(prev => ({
                            ...prev,
                            [id]: { ...prev[id], active: e.target.checked }
                          }));
                          triggerFlash(id);
                        }}
                      />
                      Activo
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="lab-visuals hierarchy-view">
              {/* Parent Node */}
              <div className="tree-node parent-node animate-float">
                <div className="node-box">
                  <Layers size={18} />
                  <span>ComponentePadre</span>
                </div>
                <div className="props-outgoing">
                  <ArrowDown size={24} className="arrow-pulse" />
                  <span className="props-label">Props Fluyen Abajo</span>
                </div>
              </div>

              {/* Children Nodes */}
              <div className="tree-children-row">
                {Object.keys(childProps).map(id => {
                  const item = childProps[id];
                  const isFlashing = flashCard === id;
                  return (
                    <div 
                      key={id} 
                      className={`tree-node child-node ${item.active ? 'active' : ''} ${isFlashing ? 'flash-render' : ''}`}
                    >
                      <div className="node-box" style={{ borderColor: item.color }}>
                        <Zap size={14} color={item.color} />
                        <span>Hijo {id}</span>
                      </div>
                      
                      <div className="props-receiver">
                        <pre className="props-code">
{`props = {
  nombre: "${item.name}",
  activo: ${item.active}
}`}
                        </pre>
                      </div>

                      {/* Display representation */}
                      <div className="card-mockup" style={{ backgroundColor: item.active ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.2)' }}>
                        <strong style={{ color: item.color }}>{item.name}</strong>
                        <span className="status-badge" style={{ backgroundColor: item.active ? '#10b981' : '#4b5563' }}>
                          {item.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'state-events':
        return (
          <div className="lab-module-box">
            <div className="lab-controls">
              <h4>Interactores</h4>
              <p className="help-text">Modifica el estado usando botones o inputs y observa cómo se desencadena un re-renderizado.</p>
              
              <div className="interactive-actions">
                <div className="btn-group">
                  <button 
                    onClick={() => {
                      setCount(c => c + 1);
                      addStateLog(`setCount(count => ${count + 1})`);
                      triggerFlash('ui-screen');
                    }}
                    className="btn-primary"
                  >
                    Incrementar Contador
                  </button>
                  <button 
                    onClick={() => {
                      setCount(0);
                      addStateLog(`setCount(0)`);
                      triggerFlash('ui-screen');
                    }}
                    className="btn-secondary"
                  >
                    Reiniciar
                  </button>
                </div>

                <div className="input-group" style={{ marginTop: '16px' }}>
                  <label>Escribir en Estado:</label>
                  <input 
                    type="text" 
                    value={textVal}
                    onChange={(e) => {
                      setTextVal(e.target.value);
                      addStateLog(`setTextVal("${e.target.value}")`);
                      triggerFlash('ui-screen');
                    }}
                    placeholder="Escribe algo..."
                    style={{ color: '#000' }}
                  />
                </div>
              </div>
            </div>

            <div className="lab-visuals split-view">
              {/* Virtual State Monitor */}
              <div className="visual-panel">
                <h5>1. Memoria de React (useState)</h5>
                <div className="state-monitor-box">
                  <div className="state-variable-pill">
                    <span className="var-name">const [count, setCount]</span>
                    <span className="var-value">{count}</span>
                  </div>
                  <div className="state-variable-pill" style={{ marginTop: '8px' }}>
                    <span className="var-name">const [textVal, setTextVal]</span>
                    <span className="var-value">"{textVal}"</span>
                  </div>

                  <div className="log-console">
                    <div className="log-title">Historial de setEstado():</div>
                    <div className="log-lines">
                      {stateLogs.length === 0 ? (
                        <div className="log-line empty">Esperando interacciones...</div>
                      ) : (
                        stateLogs.map(log => (
                          <div key={log.id} className="log-line">
                            <span className="log-time">[{log.time}]</span> {log.text}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulated UI Screen with Re-render flashes */}
              <div className={`visual-panel ui-simulator-screen ${flashCard === 'ui-screen' ? 'flash-active' : ''}`}>
                <h5>2. Pantalla Simulada (UI)</h5>
                <div className="simulator-body">
                  {flashCard === 'ui-screen' && (
                    <div className="render-overlay">⚡ Re-renderizado disparado</div>
                  )}
                  <div className="screen-content">
                    <div className="widget-box">
                      <span className="widget-label">Contador:</span>
                      <span className="widget-value">{count}</span>
                    </div>
                    
                    <div className="widget-box" style={{ marginTop: '12px' }}>
                      <span className="widget-label">Texto en pantalla:</span>
                      <span className="widget-value">{textVal || '(Vacio)'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'effects-lifecycle':
        return (
          <div className="lab-module-box">
            <div className="lab-controls">
              <h4>Acciones de Ciclo de Vida</h4>
              <div className="btn-group-vertical">
                <button 
                  onClick={() => setIsMounted(!isMounted)}
                  className={`btn-primary ${isMounted ? 'btn-danger' : 'btn-success'}`}
                >
                  {isMounted ? 'Desmontar Componente' : 'Montar Componente'}
                </button>
                
                <button 
                  onClick={() => {
                    setDepId(d => d + 1);
                  }}
                  disabled={!isMounted}
                  className="btn-secondary"
                  style={{ marginTop: '10px' }}
                >
                  Cambiar Dependencia (ID: {depId})
                </button>
              </div>
            </div>

            <div className="lab-visuals split-view">
              {/* Component UI Box */}
              <div className="visual-panel">
                <h5>Estado del Componente en el DOM</h5>
                <div className="component-container-mock">
                  {isMounted ? (
                    <div className="active-component-card animate-pulse">
                      <Activity size={24} color="#a855f7" className="rotate-icon" />
                      <h4>Componente Activo</h4>
                      <p>Dependencia (ID): <strong className="text-accent">{depId}</strong></p>
                      <span className="badge-live">Escuchando Efectos</span>
                    </div>
                  ) : (
                    <div className="inactive-component-card">
                      <Zap size={24} className="text-gray" />
                      <h4>Componente Desmontado</h4>
                      <p>No existe en el DOM. No consume memoria.</p>
                      <span className="badge-dead">Inactivo</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Console Logs of Effects */}
              <div className="visual-panel">
                <h5>Consola del Ciclo de Vida (useEffect)</h5>
                <div className="lifecycle-console">
                  {lifecycleLogs.length === 0 ? (
                    <div className="console-empty">Espera a que se ejecuten efectos...</div>
                  ) : (
                    lifecycleLogs.map(log => (
                      <div key={log.id} className={`log-entry log-${log.type}`}>
                        <span className="log-time">[{log.time}]</span> {log.text}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'advanced-hooks':
        return (
          <div className="lab-module-box">
            <div className="lab-controls">
              <h4>useState vs useRef</h4>
              <p className="help-text">Observa por qué mutar una referencia no re-renderiza la UI, mientras que cambiar el estado sí lo hace.</p>
              
              <div className="btn-group-vertical">
                <button 
                  onClick={() => {
                    setStateValue(s => s + 1);
                    triggerFlash('ref-state-split');
                  }}
                  className="btn-primary"
                >
                  Actualizar useState (Valor: {stateValue + 1})
                </button>

                <button 
                  onClick={() => {
                    refValue.current += 1;
                    addStateLog(`Modificado refValue.current = ${refValue.current} (No hay Render)`);
                  }}
                  className="btn-secondary"
                  style={{ marginTop: '10px' }}
                >
                  Actualizar useRef (Valor: {refValue.current + 1})
                </button>

                <button 
                  onClick={() => {
                    setRefDisplay(refValue.current);
                    triggerFlash('ref-state-split');
                    addStateLog("Forzado re-renderizado leyendo ref.current");
                  }}
                  className="btn-accent"
                  style={{ marginTop: '10px' }}
                >
                  Forzar Lectura (Re-render)
                </button>
              </div>

              <hr style={{ borderColor: '#374151', margin: '20px 0' }} />
              
              <h4>useRef enfocando el DOM</h4>
              <div className="btn-group" style={{ marginTop: '10px' }}>
                <input 
                  ref={domInputRef}
                  type="text" 
                  value={inputRefText} 
                  onChange={(e) => setInputRefText(e.target.value)}
                  placeholder="Input de prueba DOM"
                  style={{ color: '#000', padding: '6px' }}
                />
                <button 
                  onClick={() => domInputRef.current.focus()}
                  className="btn-sm btn-primary"
                >
                  Enfocar
                </button>
              </div>
            </div>

            <div id="ref-state-split" className={`lab-visuals split-view ${flashCard === 'ref-state-split' ? 'flash-active' : ''}`}>
              <div className="visual-panel ref-state-card state-card">
                <div className="card-header">
                  <div className="pill-active">useState</div>
                </div>
                <h3>{stateValue}</h3>
                <p>Muestra el valor exacto en tiempo real porque cada cambio provoca un re-renderizado automático.</p>
                <div className="render-indicator triggered">Render disparado en cada click</div>
              </div>

              <div className="visual-panel ref-state-card ref-card">
                <div className="card-header">
                  <div className="pill-inactive">useRef (.current)</div>
                </div>
                <h3>{refValue.current}</h3>
                <p>
                  El valor real en memoria es <strong>{refValue.current}</strong>, pero la UI muestra <strong>{refDisplay}</strong>. 
                  No se re-renderiza al hacer click.
                </p>
                <div className="render-indicator disabled">Cero renders al mutar .current</div>
              </div>
            </div>
          </div>
        );

      case 'context-api':
        return (
          <div className="lab-module-box">
            <div className="lab-controls">
              <h4>Context API Provider</h4>
              <p className="help-text">Modifica el tema en la raíz y observa cómo la propiedad viaja instantáneamente sin pasar por props intermedias.</p>
              
              <div className="theme-selector-lab">
                {['light', 'dark', 'solarized'].map(t => (
                  <button 
                    key={t}
                    onClick={() => {
                      setThemeMode(t);
                      triggerFlash('context-tree');
                    }}
                    className={`theme-btn theme-${t} ${themeMode === t ? 'active' : ''}`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div id="context-tree" className={`lab-visuals context-tree-view ${flashCard === 'context-tree' ? 'flash-active' : ''}`}>
              <div className="context-provider-badge">
                &lt;TemaContext.Provider value="{themeMode}"&gt;
              </div>

              <div className="nested-components-box">
                {/* Grandparent */}
                <div className={`nested-box box-grandparent theme-preview-${themeMode}`}>
                  <div className="box-title">Abuelo Component (Proveedor)</div>
                  
                  {/* Parent */}
                  <div className={`nested-box box-parent theme-preview-${themeMode}`}>
                    <div className="box-title">Padre Component (Intermedio)</div>
                    <span className="prop-skip-badge">¡Ignora Tema! No recibe props.</span>
                    
                    {/* Child */}
                    <div className={`nested-box box-child theme-preview-${themeMode}`}>
                      <div className="box-title">Hijo Component (Consumidor)</div>
                      <div className="context-consumer-pill">
                        useContext(TemaContext) = "{themeMode}"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Selecciona un módulo para visualizar.</div>;
    }
  };

  return (
    <div className="visual-lab-container card-glow">
      <div className="visual-lab-header">
        <GitCommit className="text-purple animate-pulse" size={20} />
        <h3>Laboratorio Visual e Interactivo</h3>
      </div>
      <div className="visual-lab-content">
        {renderVisualizer()}
      </div>
    </div>
  );
}
