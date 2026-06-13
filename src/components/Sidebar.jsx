import React from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Circle, 
  Award, 
  Code, 
  Menu, 
  Moon, 
  Sun, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function Sidebar({ 
  lessons, 
  activeLesson, 
  setActiveLesson, 
  completedLessons, 
  darkMode, 
  setDarkMode 
}) {
  const [collapsed, setCollapsed] = React.useState(false);

  // Calculate percentage progress
  const totalLessons = lessons.length;
  const completedCount = Object.keys(completedLessons).filter(id => completedLessons[id] === true).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <GraduationCap className="logo-icon animate-float" size={32} color="#c084fc" />
          {!collapsed && (
            <span className="logo-text">
              Academia<span className="text-accent">React</span>
            </span>
          )}
        </div>
        <button 
          className="collapse-btn" 
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="progress-section">
        {!collapsed ? (
          <>
            <div className="progress-labels">
              <span>Progreso del Curso</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </>
        ) : (
          <div className="collapsed-progress" title={`Progreso: ${progressPercent}%`}>
            {progressPercent}%
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${activeLesson === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveLesson('dashboard')}
        >
          <Award size={20} className="nav-icon" />
          {!collapsed && <span>Panel & Certificado</span>}
        </button>

        <button 
          className={`nav-item ${activeLesson === 'playground' ? 'active' : ''}`}
          onClick={() => setActiveLesson('playground')}
        >
          <Code size={20} className="nav-icon" />
          {!collapsed && <span>Playground Interactivo</span>}
        </button>

        <div className="nav-divider">
          {!collapsed && <span>Lecciones</span>}
        </div>

        {lessons.map((lesson) => {
          const isCompleted = completedLessons[lesson.id];
          const isActive = activeLesson === lesson.id;
          
          return (
            <button
              key={lesson.id}
              className={`nav-item lesson-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveLesson(lesson.id)}
              title={lesson.title}
            >
              <div className="lesson-icon-wrapper">
                {isCompleted ? (
                  <CheckCircle size={18} className="lesson-completed-icon" />
                ) : (
                  <Circle size={18} className="lesson-pending-icon" />
                )}
              </div>
              {!collapsed && (
                <span className="lesson-title-text">{lesson.title}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button 
          className="theme-toggle" 
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Activar Modo Claro" : "Activar Modo Oscuro"}
        >
          {darkMode ? (
            <>
              <Sun size={20} className="text-yellow" />
              {!collapsed && <span>Modo Claro</span>}
            </>
          ) : (
            <>
              <Moon size={20} className="text-purple" />
              {!collapsed && <span>Modo Oscuro</span>}
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
