import './TrueFalseAnswer.css';

const TrueFalseAnswer = ({
  alternatives,
  questionIndex,
  userAnswers,
  onAnswerChange,
  showFeedback,
  correctAnswer,
  isCorrect,
  isWrong,
}) => {
  return (
    <div className='true-false-block'>
      {alternatives.map((alt, idx) => {
        const isSelected = userAnswers[questionIndex] === alt.opcao;
        const isCorrectAnswer = alt.opcao === correctAnswer;

        let className = '';
        if (showFeedback && isSelected) {
          className = isCorrect ? 'resposta-correta' : 'resposta-incorreta';
        } else if (showFeedback && isWrong && isCorrectAnswer) {
          className = 'resposta-correta-mostrar';
        } else if (isSelected) {
          className = 'resposta-selecionada';
        }

        return (
          <div key={idx} className='true-false-item'>
            <input
              type='radio'
              className='resposta-item'
              id={`resposta${questionIndex}-${idx}`}
              name={`pergunta${questionIndex}`}
              value={alt.opcao}
              onChange={() => onAnswerChange(questionIndex, alt.opcao)}
              disabled={showFeedback}
              checked={isSelected}
            />
            <label
              htmlFor={`resposta${questionIndex}-${idx}`}
              className={className}
            >
              <span className='opcao-texto'>{alt['texto-opcao']}</span>
              {showFeedback && isSelected && isCorrect && (
                <span className='feedback-icon'>✓</span>
              )}
              {showFeedback && isSelected && isWrong && (
                <span className='feedback-icon'>✗</span>
              )}
              {showFeedback && isWrong && isCorrectAnswer && !isSelected && (
                <span className='feedback-icon'>✓</span>
              )}
            </label>
            {showFeedback && isSelected && alt.explicacao && (
              <div className='explicacao-feedback'>
                <p>{alt.explicacao}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TrueFalseAnswer;
