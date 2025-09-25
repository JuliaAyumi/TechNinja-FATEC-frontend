import { useState } from 'react';
import './CompleteAnswer.css';

const CompleteAnswer = ({
  correctAnswer,
  questionIndex,
  userAnswers,
  onAnswerChange,
  showFeedback,
}) => {
  const [answer, setAnswer] = useState(userAnswers[questionIndex] || '');

  const handleInputChange = (value) => {
    if (showFeedback) return;

    setAnswer(value);
    onAnswerChange(questionIndex, value.trim());
  };

  const isCorrect = () => {
    if (!showFeedback || !answer) return false;

    const normalizedAnswer = answer.toLowerCase().trim();
    return correctAnswer.some(
      (option) => option.toLowerCase() === normalizedAnswer,
    );
  };

  const getInputStatus = () => {
    if (!showFeedback) return '';
    return isCorrect() ? 'correct-input' : 'incorrect-input';
  };

  return (
    <div className='complete-answer-container'>
      <div className='input-area'>
        <input
          type='text'
          className={`complete-input ${getInputStatus()}`}
          value={answer}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder='Digite sua resposta...'
          disabled={showFeedback}
          autoComplete='off'
          spellCheck='false'
        />

        {showFeedback && (
          <div className='input-feedback'>
            {isCorrect() ? (
              <span className='feedback-icon correct'>✓</span>
            ) : (
              <span className='feedback-icon incorrect'>✗</span>
            )}
          </div>
        )}
      </div>

      {showFeedback && (
        <div className='answer-feedback'>
          {isCorrect() ? (
            <div className='correct-feedback'>
              <h4>Correto!</h4>
              <p>
                Sua resposta está certa: <strong>{answer}</strong>
              </p>
            </div>
          ) : (
            <div className='incorrect-feedback'>
              <h4>Resposta incorreta</h4>
              <p>
                Sua resposta: <strong>{answer || 'Nenhuma resposta'}</strong>
              </p>
              <p>
                Resposta{correctAnswer.length > 1 ? 's' : ''} correta
                {correctAnswer.length > 1 ? 's' : ''}:
                <strong> {correctAnswer.join(' ou ')}</strong>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompleteAnswer;
