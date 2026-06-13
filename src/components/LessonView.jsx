import React, { useState, useEffect } from 'react';
import { BookOpen, HelpCircle, GitCommit, Check, X, ArrowRight, RotateCcw, Award } from 'lucide-react';
import VisualLab from './VisualLab';

export default function LessonView({
  lesson,
  onCompleteLesson,
  onSaveQuizScore,
  savedQuizScore
}) {
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' | 'lab' | 'quiz'

  // Quiz States
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);

  // Reset quiz states when changing lessons
  useEffect(() => {
    setActiveTab('theory');
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setWrongAnswersCount(0);
  }, [lesson.id]);

  const handleSelectOption = (idx) => {
    if (isSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIdx === null || isSubmitted) return;

    setIsSubmitted(true);
    const question = lesson.quiz[currentQuestionIdx];

    if (selectedOptionIdx === question.correctIndex) {
      setScore(s => s + 1);
    } else {
      setWrongAnswersCount(w => w + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx < lesson.quiz.length) {
      setCurrentQuestionIdx(nextIdx);
      setSelectedOptionIdx(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      // Save quiz score
      const finalPercentage = Math.round(((score + (selectedOptionIdx === lesson.quiz[currentQuestionIdx].correctIndex ? 1 : 0)) / lesson.quiz.length) * 100);
      onSaveQuizScore(lesson.id, finalPercentage);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setWrongAnswersCount(0);
  };

  const handleFinishAndSave = () => {
    onCompleteLesson(lesson.id);
  };

  // Render Quiz View
  const renderQuizContent = () => {
    if (quizFinished) {
      const totalQuestions = lesson.quiz.length;
      const percent = Math.round((score / totalQuestions) * 100);
      const isPass = percent >= 70;

      return (
        <div className="quiz-result-card animate-scale-up">
          <Award className={`result-award-icon ${isPass ? 'success' : 'fail'}`} size={48} />
          <h3>¡Cuestionario Completado!</h3>
          <div className="score-display">
            <span className="score-number">{score} / {totalQuestions}</span>
            <span className="score-percent">({percent}%)</span>
          </div>
          <p className="result-text">
            {isPass
              ? "¡Excelente trabajo! Has demostrado una sólida comprensión de este módulo."
              : "No has alcanzado la puntuación mínima (70%). Te sugerimos repasar la teoría y el laboratorio interactivo antes de reintentarlo."}
          </p>

          <div className="quiz-result-actions">
            <button onClick={handleResetQuiz} className="btn-secondary">
              <RotateCcw size={16} /> Reintentar Quiz
            </button>
            {isPass && (
              <button onClick={handleFinishAndSave} className="btn-primary">
                <Check size={16} /> Completar Módulo
              </button>
            )}
          </div>
        </div>
      );
    }

    const question = lesson.quiz[currentQuestionIdx];
    const letters = ['A', 'B', 'C', 'D'];

    return (
      <div className="quiz-question-box">
        {/* Progress header */}
        <div className="quiz-progress-bar">
          <span>Pregunta {currentQuestionIdx + 1} de {lesson.quiz.length}</span>
          <div className="quiz-bar-bg">
            <div
              className="quiz-bar-fill"
              style={{ width: `${((currentQuestionIdx) / lesson.quiz.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h3 className="question-title">{question.question}</h3>

        {/* Options list */}
        <div className="quiz-options-list">
          {question.options.map((option, idx) => {
            let optionState = ''; // 'selected' | 'correct' | 'wrong' | ''
            if (isSubmitted) {
              if (idx === question.correctIndex) optionState = 'correct';
              else if (idx === selectedOptionIdx) optionState = 'wrong';
            } else if (idx === selectedOptionIdx) {
              optionState = 'selected';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isSubmitted}
                className={`quiz-option-btn ${optionState}`}
              >
                <div className="option-indicator">
                  {isSubmitted && idx === question.correctIndex ? (
                    <Check size={14} />
                  ) : isSubmitted && idx === selectedOptionIdx ? (
                    <X size={14} />
                  ) : (
                    <span>{letters[idx]}</span>
                  )}
                </div>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Action / Explanation Box */}
        {isSubmitted ? (
          <div className="quiz-explanation-box animate-slide-up">
            <div className="explanation-header">
              {selectedOptionIdx === question.correctIndex ? (
                <span className="text-green font-bold">✓ ¡Correcto!</span>
              ) : (
                <span className="text-red font-bold">✗ Incorrecto</span>
              )}
            </div>
            <p className="explanation-text">{question.explanation}</p>
            <button onClick={handleNextQuestion} className="btn-primary btn-next">
              Siguiente <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOptionIdx === null}
            className="btn-primary submit-quiz-btn"
          >
            Enviar Respuesta
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="lesson-view-container">
      {/* Lesson Heading Header */}
      <header className="lesson-header-bar">
        <div className="lesson-title-meta">
          <span className="lesson-badge">{lesson.difficulty}</span>
          <span className="lesson-time-badge">⏳ {lesson.duration}</span>
        </div>
        <h2>{lesson.title}</h2>
        <p className="lesson-subtitle">{lesson.shortDescription}</p>
      </header>

      {/* Tabs Navigation */}
      <div className="lesson-tabs-nav">
        <button
          onClick={() => setActiveTab('theory')}
          className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
        >
          <BookOpen size={16} /> <span>Teoría</span>
        </button>
        <button
          onClick={() => setActiveTab('lab')}
          className={`tab-btn ${activeTab === 'lab' ? 'active' : ''}`}
        >
          <GitCommit size={16} /> <span>Laboratorio Visual</span>
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
        >
          <HelpCircle size={16} /> <span>Cuestionario</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="lesson-main-content">
        {activeTab === 'theory' && (
          <article className="theory-article animate-fade-in">
            {lesson.theory.map((section, idx) => (
              <section key={idx} className="theory-section">
                <h3>{section.subtitle}</h3>
                {/* Format bullet points or plain paragraphs */}
                {section.content.split('\n').map((para, pidx) => {
                  if (para.trim().startsWith('-') || para.trim().match(/^\d+\./)) {
                    return <p key={pidx} className="list-paragraph">{para}</p>;
                  }
                  return <p key={pidx}>{para}</p>;
                })}
              </section>
            ))}

            {/* Template Preview Section */}
            {lesson.playgroundCode && (
              <section className="theory-playground-snippet">
                <h4>Código del Módulo</h4>
                <p>Puedes jugar con este código en el Playground del curso.</p>
                <pre className="code-block-dark">
                  <code>{lesson.playgroundCode}</code>
                </pre>
              </section>
            )}
          </article>
        )}

        {activeTab === 'lab' && (
          <div className="lab-wrapper animate-fade-in">
            <VisualLab lessonId={lesson.id} />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="quiz-wrapper animate-fade-in">
            {renderQuizContent()}
          </div>
        )}
      </main>
    </div>
  );
}
