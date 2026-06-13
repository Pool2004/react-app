import React, { useState, useEffect } from 'react';
import { lessonsData } from './data/lessons';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import Playground from './components/Playground';

function App() {
  // Navigation State
  const [activeLesson, setActiveLesson] = useState(() => {
    return localStorage.getItem('react_course_active') || 'dashboard';
  });

  // Course Progress State
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('react_course_completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Quiz Scores State
  const [quizScores, setQuizScores] = useState(() => {
    try {
      const saved = localStorage.getItem('react_course_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('react_course_theme');
    return saved !== null ? saved === 'true' : true; // Dark mode by default
  });

  // Confetti / Celebration Trigger
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState('');

  // Persist Navigation
  useEffect(() => {
    localStorage.setItem('react_course_active', activeLesson);
  }, [activeLesson]);

  // Persist Theme
  useEffect(() => {
    localStorage.setItem('react_course_theme', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // Save Progress helpers
  const handleCompleteLesson = (lessonId) => {
    const updated = { ...completedLessons, [lessonId]: true };
    setCompletedLessons(updated);
    localStorage.setItem('react_course_completed', JSON.stringify(updated));

    // Show celebratory animation/overlay
    const lesson = lessonsData.find(l => l.id === lessonId);
    setCelebrationMsg(`¡Has completado con éxito: ${lesson?.title || 'la lección'}!`);
    setShowCelebration(true);
    
    // Redirect to dashboard after a delay
    setTimeout(() => {
      setShowCelebration(false);
      setActiveLesson('dashboard');
    }, 2500);
  };

  const handleSaveQuizScore = (lessonId, percentage) => {
    const updated = { ...quizScores, [lessonId]: percentage };
    setQuizScores(updated);
    localStorage.setItem('react_course_scores', JSON.stringify(updated));
  };

  const handleResetProgress = () => {
    if (window.confirm("¿Estás seguro de que deseas reiniciar todo tu progreso del curso? Esto borrará tus cuestionarios completados y tus notas.")) {
      setCompletedLessons({});
      setQuizScores({});
      localStorage.removeItem('react_course_completed');
      localStorage.removeItem('react_course_scores');
      setActiveLesson('dashboard');
    }
  };

  // Render right panel based on active navigation
  const renderMainContent = () => {
    if (activeLesson === 'dashboard') {
      return (
        <Dashboard 
          lessons={lessonsData}
          completedLessons={completedLessons}
          setActiveLesson={setActiveLesson}
          resetProgress={handleResetProgress}
          quizScores={quizScores}
        />
      );
    }

    if (activeLesson === 'playground') {
      return <Playground />;
    }

    // Otherwise it is a lesson ID
    const lesson = lessonsData.find(l => l.id === activeLesson);
    if (lesson) {
      return (
        <LessonView 
          lesson={lesson}
          onCompleteLesson={handleCompleteLesson}
          onSaveQuizScore={handleSaveQuizScore}
          savedQuizScore={quizScores[lesson.id] || 0}
        />
      );
    }

    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Lección no encontrada</h2>
        <button className="btn-primary" onClick={() => setActiveLesson('dashboard')}>
          Volver al Dashboard
        </button>
      </div>
    );
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : ''}`}>
      {/* Celebration Overlay Popup */}
      {showCelebration && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(9, 10, 15, 0.95)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center',
            padding: '20px'
          }}
          className="animate-fade-in"
        >
          <div style={{ fontSize: '70px', marginBottom: '20px' }} className="animate-float">🏆</div>
          <h1 style={{ color: '#c084fc', fontSize: '2.5rem', marginBottom: '10px' }} className="animate-scale-up">
            ¡Felicitaciones!
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '500px' }}>
            {celebrationMsg}
          </p>
          <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#64748b' }}>
            Regresando al panel de control...
          </div>
        </div>
      )}

      {/* Navigation sidebar */}
      <Sidebar 
        lessons={lessonsData}
        activeLesson={activeLesson}
        setActiveLesson={setActiveLesson}
        completedLessons={completedLessons}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Content pane */}
      <main className="main-content">
        {renderMainContent()}
      </main>
    </div>
  );
}

export default App;
