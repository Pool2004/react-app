import React, { useState } from 'react';
import { Award, BookOpen, Clock, CheckCircle2, ChevronRight, Zap, RefreshCw } from 'lucide-react';

export default function Dashboard({
  lessons,
  completedLessons,
  setActiveLesson,
  resetProgress,
  quizScores
}) {
  const [studentName, setStudentName] = useState('');
  const [certificateDate] = useState(() => new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  // Calculate progress stats
  const totalLessons = lessons.length;
  const completedCount = Object.keys(completedLessons).filter(id => completedLessons[id] === true).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Calculate average quiz score
  const quizScoresList = Object.values(quizScores);
  const averageQuizScore = quizScoresList.length > 0
    ? Math.round(quizScoresList.reduce((a, b) => a + b, 0) / quizScoresList.length)
    : 0;

  const isCourseFinished = completedCount === totalLessons && totalLessons > 0;

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Hero Header Banner */}
      <header className="dashboard-hero">
        <div className="hero-content">
          <span className="badge-glow">Curso Interactivo</span>
          <h1>Aprende React desde Cero</h1>
          <p>
            Domina el desarrollo de interfaces declarativas y eficientes con explicaciones visuales,
            laboratorios interactivos en tiempo real y pruebas autoevaluativas.
          </p>
          <div className="hero-stats">
            <div className="hero-stat-item">
              <Clock size={16} />
              <span>~2.5 Horas de Práctica</span>
            </div>
            <div className="hero-stat-item">
              <Zap size={16} color="#c084fc" />
              <span>Interactividad 100% en vivo</span>
            </div>
          </div>
        </div>
        <div className="hero-progress-ring">
          <svg width="120" height="120" viewBox="0 0 120 120" className="progress-ring-svg">
            <circle
              className="progress-ring-bg"
              cx="60"
              cy="60"
              r="50"
              strokeWidth="8"
            />
            <circle
              className="progress-ring-bar"
              cx="60"
              cy="60"
              r="50"
              strokeWidth="8"
              strokeDasharray={314.16}
              strokeDashoffset={314.16 - (314.16 * progressPercent) / 100}
            />
          </svg>
          <div className="progress-ring-text">
            <span className="percent">{progressPercent}%</span>
            <span className="label">Completado</span>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="stats-grid">
        <div className="stat-card card-glow">
          <div className="stat-header">
            <BookOpen className="text-purple" size={24} />
            <span className="stat-value">{completedCount} / {totalLessons}</span>
          </div>
          <p className="stat-label">Módulos Completados</p>
        </div>

        <div className="stat-card card-glow">
          <div className="stat-header">
            <Award className="text-green" size={24} />
            <span className="stat-value">{averageQuizScore}%</span>
          </div>
          <p className="stat-label">Puntaje Promedio Quizzes</p>
        </div>

        <div className="stat-card card-glow">
          <div className="stat-header">
            <Zap className="text-yellow" size={24} />
            <span className="stat-value">{progressPercent === 100 ? 'Máximo' : 'En Curso'}</span>
          </div>
          <p className="stat-label">Estado de Progreso</p>
        </div>
      </section>

      {/* Main Course Path */}
      <section className="course-modules-section">
        <h2>Ruta de Aprendizaje</h2>
        <div className="modules-list">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons[lesson.id];
            return (
              <div
                key={lesson.id}
                className={`module-row-card ${isCompleted ? 'completed' : ''}`}
                onClick={() => setActiveLesson(lesson.id)}
              >
                <div className="module-status-indicator">
                  {isCompleted ? (
                    <CheckCircle2 className="icon-completed" size={24} />
                  ) : (
                    <div className="icon-pending">{index + 1}</div>
                  )}
                </div>
                <div className="module-row-details">
                  <div className="module-row-meta">
                    <span className="module-difficulty">{lesson.difficulty}</span>
                    <span className="dot-sep">•</span>
                    <span className="module-duration">{lesson.duration}</span>
                  </div>
                  <h3>{lesson.title.replace(/^\d+\.\s+/, '')}</h3>
                  <p>{lesson.shortDescription}</p>
                </div>
                <div className="module-row-action">
                  <button className="action-circle-btn">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Certificate Panel */}
      <section className="certificate-section-wrapper">
        {isCourseFinished ? (
          <div className="certificate-unlocked-card animate-scale-up">
            <div className="cert-info-panel">
              <Award className="cert-award-icon animate-pulse" size={48} color="#c084fc" />
              <h2>¡Felicitaciones! Has completado el curso</h2>
              <p>
                Has asimilado todos los fundamentos clave de React, incluyendo JSX, Components, Props,
                State, Eventos, Effects, Refs, Custom Hooks y Context.
                Personaliza tu certificado de React Developer a continuación:
              </p>

              <div className="input-group">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Escribe tu nombre y apellido"
                  className="cert-name-input"
                />
              </div>

              {studentName.trim() && (
                <button
                  onClick={handlePrintCertificate}
                  className="btn-primary cert-print-btn"
                >
                  Imprimir o Guardar como PDF
                </button>
              )}
            </div>

            {/* Visual Digital Certificate Mockup */}
            <div className="certificate-print-container" id="printable-certificate">
              <div className="cert-border-outer">
                <div className="cert-border-inner">
                  <div className="cert-bg-glow-1"></div>
                  <div className="cert-bg-glow-2"></div>
                  <div className="cert-badge">React</div>
                  <div className="cert-content">
                    <span className="cert-subtitle">CERTIFICADO DE FINALIZACIÓN</span>
                    <h1 className="cert-title">React Developer</h1>
                    <span className="cert-given-to">Otorgado a:</span>
                    <h2 className="cert-student-name">{studentName || 'Tu Nombre Aquí'}</h2>
                    <p className="cert-text">
                      Por haber completado con éxito el plan de estudios teórico y práctico de la
                      <strong> Academia React Interactiva</strong>, demostrando conocimientos avanzados en
                      Arquitectura de Componentes, Reactividad, Hooks y Manejo de Estado Global.
                    </p>
                    <div className="cert-footer">
                      <div className="cert-signature-box">
                        <span className="signature-line">Antigravity AI</span>
                        <span className="signature-title">Instructor Principal</span>
                      </div>
                      <div className="cert-date-box">
                        <span className="cert-date-val">{certificateDate}</span>
                        <span className="date-title">Fecha de Emisión</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="certificate-locked-card">
            <Award className="text-gray" size={36} />
            <div>
              <h3>Certificado React Developer</h3>
              <p>Completa el 100% del contenido del curso para desbloquear tu certificado personalizado.</p>
              <div className="lock-progress-bar">
                <div className="lock-progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Danger Zone / Reset Progress */}
      {completedCount > 0 && (
        <div className="reset-progress-area">
          <button onClick={resetProgress} className="btn-text btn-danger">
            <RefreshCw size={14} /> Reiniciar todo el progreso
          </button>
        </div>
      )}
    </div>
  );
}
