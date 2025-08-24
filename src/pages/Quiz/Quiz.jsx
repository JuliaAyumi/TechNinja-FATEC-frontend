import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/AuthContext';
import './Quiz.css';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import { toast, Toaster } from 'react-hot-toast';

const Quiz = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [respostasUsuario, setRespostasUsuario] = useState({});
  const [acertos, setAcertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const { area, subtema, dificuldade } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_MODE === 'development'
              ? `http://localhost:${import.meta.env.VITE_PORT}`
              : import.meta.env.VITE_HEROKU_LINK
          }/api/quiz/${area}/${subtema}/${dificuldade}`,
        );
        if (response.ok) {
          const data = await response.json();
          setPerguntas(data);
        } else {
          console.error('Erro ao buscar o quiz');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchQuiz();
  }, [area, subtema, dificuldade]);

  const handleRespostaChange = (indexPergunta, opcaoSelecionada) => {
    setRespostasUsuario({
      ...respostasUsuario,
      [indexPergunta]: opcaoSelecionada,
    });
  };

  const todasRespondidas = () => {
    return (
      perguntas.length > 0 &&
      perguntas.every((_, index) => respostasUsuario[index])
    );
  };

  const finalizarQuiz = async () => {
    if (!todasRespondidas()) {
      toast.error(
        'Por favor, responda todas as perguntas antes de finalizar o quiz.',
      );
      return;
    }

    let acertosContador = 0;
    perguntas.forEach((pergunta, index) => {
      if (respostasUsuario[index] === pergunta.resposta) {
        acertosContador += 1;
      }
    });

    toast.success(
      `Você acertou ${acertosContador} de ${perguntas.length} perguntas!`,
    );
    const points = acertosContador * 10;
    setAcertos(acertosContador);
    setFinalizado(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_MODE === 'development'
            ? `http://localhost:${import.meta.env.VITE_PORT}`
            : import.meta.env.VITE_HEROKU_LINK
        }/api/update-score`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify({ points }),
        },
      );
      const resData = await response.json();
      if (response.ok) {
        setTimeout(() => {
          toast.success(
            `Pontuação atualizada! Nova pontuação: ${resData.newScore}`,
          );
        }, 2500);
      } else {
        toast.error(resData.message || 'Erro ao atualizar a pontuação');
      }
    } catch (error) {
      console.error('Erro ao atualizar a pontuação:', error);
    }

    try {
      await fetch(
        `${
          import.meta.env.VITE_MODE === 'development'
            ? `http://localhost:${import.meta.env.VITE_PORT}`
            : import.meta.env.VITE_HEROKU_LINK
        }/api/mark-quiz-completed`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify({ area, subtema, dificuldade }),
        },
      );
    } catch (error) {
      console.error('Erro ao marcar o quiz como completado:', error);
    }
  };

  const handleSair = () => {
    navigate(`/quizzes/${area}/${subtema}`);
  };

  return (
    <div>
      <HeaderArrowBack to={`/quizzes/${area}/${subtema}`} />

      <main className='quiz-main'>
        {perguntas.length > 0 ? (
          perguntas.map((pergunta, index) => {
            const isRespostaCorreta =
              finalizado && respostasUsuario[index] === pergunta.resposta;
            const isRespostaErrada =
              finalizado &&
              respostasUsuario[index] !== pergunta.resposta &&
              respostasUsuario[index];

            return (
              <div key={index} className='area-pergunta'>
                <div className='question-block'>
                  <h2 className='question-title'>{pergunta.pergunta}</h2>
                </div>
                <div className='answers-block'>
                  {pergunta.alternativas.map((alt, idx) => {
                    const isSelected = respostasUsuario[index] === alt.opcao;
                    return (
                      <div key={idx}>
                        <input
                          type='radio'
                          className='resposta-item'
                          id={`resposta${index}-${idx}`}
                          name={`pergunta${index}`}
                          value={alt.opcao}
                          onChange={() =>
                            handleRespostaChange(index, alt.opcao)
                          }
                          disabled={finalizado}
                        />
                        <label
                          htmlFor={`resposta${index}-${idx}`}
                          style={{
                            backgroundColor:
                              finalizado && isRespostaCorreta && isSelected
                                ? 'green'
                                : finalizado && isRespostaErrada && isSelected
                                  ? 'red'
                                  : isSelected,
                          }}
                        >
                          {alt.opcao}) {alt['texto-opcao']}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <p>Carregando perguntas...</p>
        )}

        <div className='botoes'>
          <button
            className='button1'
            onClick={finalizado ? handleSair : finalizarQuiz}
          >
            {finalizado ? 'Sair do Quiz' : 'Finalizar'}
          </button>
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Quiz;
