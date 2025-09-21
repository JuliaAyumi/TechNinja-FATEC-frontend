import './Answer.css';

const Answer = ({
  alternativas,
  perguntaIndex,
  respostasUsuario,
  onRespostaChange,
  mostrarFeedback,
  respostaCorreta,
  acertou,
  errou,
}) => {
  return (
    <div className='answers-block'>
      {alternativas.map((alt, idx) => {
        const isSelected = respostasUsuario[perguntaIndex] === alt.opcao;
        const isCorrectAnswer = alt.opcao === respostaCorreta;

        let className = '';
        if (mostrarFeedback && isSelected) {
          className = acertou ? 'resposta-correta' : 'resposta-incorreta';
        } else if (mostrarFeedback && errou && isCorrectAnswer) {
          className = 'resposta-correta-mostrar';
        } else if (isSelected) {
          className = 'resposta-selecionada';
        }

        return (
          <div key={idx}>
            <input
              type='radio'
              className='resposta-item'
              id={`resposta${perguntaIndex}-${idx}`}
              name={`pergunta${perguntaIndex}`}
              value={alt.opcao}
              onChange={() => onRespostaChange(perguntaIndex, alt.opcao)}
              disabled={mostrarFeedback}
              checked={isSelected}
            />
            <label
              htmlFor={`resposta${perguntaIndex}-${idx}`}
              className={className}
            >
              <span className='opcao-letra'>{alt.opcao})</span>
              <span className='opcao-texto'>{alt['texto-opcao']}</span>
              {mostrarFeedback && isSelected && acertou && (
                <span className='feedback-icon'>✓</span>
              )}
              {mostrarFeedback && isSelected && errou && (
                <span className='feedback-icon'>✗</span>
              )}
              {mostrarFeedback && errou && isCorrectAnswer && !isSelected && (
                <span className='feedback-icon'>✓</span>
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Answer;
