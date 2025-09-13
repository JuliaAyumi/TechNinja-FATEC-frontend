import './Answer.css';

const Answer = ({
  alternativas,
  perguntaIndex,
  respostasUsuario,
  onRespostaChange,
  finalizado,
  isRespostaCorreta,
  isRespostaErrada,
}) => {
  return (
    <div className='answers-block'>
      {alternativas.map((alt, idx) => {
        const isSelected = respostasUsuario[perguntaIndex] === alt.opcao;
        return (
          <div key={idx}>
            <input
              type='radio'
              className='resposta-item'
              id={`resposta${perguntaIndex}-${idx}`}
              name={`pergunta${perguntaIndex}`}
              value={alt.opcao}
              onChange={() => onRespostaChange(perguntaIndex, alt.opcao)}
              disabled={finalizado}
            />
            <label
              htmlFor={`resposta${perguntaIndex}-${idx}`}
              className={
                finalizado && isRespostaCorreta && isSelected
                  ? 'resposta-correta'
                  : finalizado && isRespostaErrada && isSelected
                    ? 'resposta-incorreta'
                    : isSelected
                      ? 'resposta-selecionada'
                      : ''
              }
            >
              <span className='opcao-letra'>{alt.opcao})</span>
              <span className='opcao-texto'>{alt['texto-opcao']}</span>
              {finalizado && isRespostaCorreta && isSelected && (
                <span className='feedback-icon'>✓</span>
              )}
              {finalizado && isRespostaErrada && isSelected && (
                <span className='feedback-icon'>✗</span>
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Answer;
