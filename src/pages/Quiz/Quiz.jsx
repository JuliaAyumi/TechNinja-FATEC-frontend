import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { useAuth } from '@hooks/AuthContext';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import Button from '@ui/components/Button/Button';
import Question from '@ui/components/Question/Question';
import Answer from '@ui/components/Answer/Answer';
import './Quiz.css';

const Quiz = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [respostasUsuario, setRespostasUsuario] = useState({});
  const [finalizado, setFinalizado] = useState(false);

  const { area, subtema, dificuldade } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const API_BASE_URL =
    import.meta.env.VITE_MODE === 'development'
      ? `http://localhost:${import.meta.env.VITE_PORT}`
      : import.meta.env.VITE_HEROKU_LINK;

  const todasRespondidas = () => {
    return (
      perguntas.length > 0 &&
      perguntas.every((_, index) => respostasUsuario[index])
    );
  };

  const calcularAcertos = () => {
    return perguntas.reduce((acertos, pergunta, index) => {
      return respostasUsuario[index] === pergunta.resposta
        ? acertos + 1
        : acertos;
    }, 0);
  };

  const getProgressPercentage = () => {
    if (perguntas.length === 0) return 0;
    return (Object.keys(respostasUsuario).length / perguntas.length) * 100;
  };

  const handleRespostaChange = (indexPergunta, opcaoSelecionada) => {
    setRespostasUsuario((prev) => ({
      ...prev,
      [indexPergunta]: opcaoSelecionada,
    }));
  };

  const handleSair = () => {
    const acertos = calcularAcertos();
    const pontos = acertos * 10;

    navigate(`/quizzes/${area}/${subtema}/${dificuldade}/resultado`, {
      state: {
        dificuldade,
        acertos,
        totalPerguntas: perguntas.length,
        pontos,
      },
    });
  };

  const updateScore = async (points) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/update-score`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({ points }),
      });

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
  };

  const markQuizCompleted = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/mark-quiz-completed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({ area, subtema, dificuldade }),
      });
    } catch (error) {
      console.error('Erro ao marcar o quiz como completado:', error);
    }
  };

  const finalizarQuiz = async () => {
    if (!todasRespondidas()) {
      toast.error(
        'Por favor, responda todas as perguntas antes de finalizar o quiz.',
      );
      return;
    }

    const acertos = calcularAcertos();
    const points = acertos * 10;

    toast.success(`Você acertou ${acertos} de ${perguntas.length} perguntas!`);
    setFinalizado(true);

    await Promise.all([updateScore(points), markQuizCompleted()]);
  };

  const ProgressBar = () => (
    <div className='quiz-progress'>
      <div className='progress-bar'>
        <div
          className='progress-fill'
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
      <div className='progress-text'>
        {Object.keys(respostasUsuario).length} de {perguntas.length} perguntas
        respondidas
      </div>
    </div>
  );

  const QuestionItem = ({ pergunta, index }) => {
    const isRespostaCorreta =
      finalizado && respostasUsuario[index] === pergunta.resposta;
    const isRespostaErrada =
      finalizado &&
      respostasUsuario[index] !== pergunta.resposta &&
      respostasUsuario[index];

    return (
      <div key={index} className='area-pergunta'>
        <Question title={pergunta.pergunta} />
        <Answer
          alternativas={pergunta.alternativas}
          perguntaIndex={index}
          respostasUsuario={respostasUsuario}
          onRespostaChange={handleRespostaChange}
          finalizado={finalizado}
          isRespostaCorreta={isRespostaCorreta}
          isRespostaErrada={isRespostaErrada}
        />
      </div>
    );
  };

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/quiz/${area}/${subtema}/${dificuldade}`,
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

    loadQuiz();
  }, [area, subtema, dificuldade, API_BASE_URL]);

  return (
    <div>
      <HeaderArrowBack to={`/quizzes/${area}/${subtema}`} />

      <main className='quiz-main'>
        {perguntas.length > 0 && <ProgressBar />}

        {perguntas.length > 0 ? (
          perguntas.map((pergunta, index) => (
            <QuestionItem key={index} pergunta={pergunta} index={index} />
          ))
        ) : (
          <p>Carregando perguntas...</p>
        )}

        <div className='botoes'>
          <Button
            onClick={finalizado ? handleSair : finalizarQuiz}
            option={finalizado ? 'Sair do Quiz' : 'Finalizar'}
          />
        </div>
      </main>

      <Toaster />
    </div>
  );
};

export default Quiz;
