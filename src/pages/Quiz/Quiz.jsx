import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { useAuth } from '@hooks/AuthContext';
import { getQuiz, updateScore, markQuizCompleted } from '@services/quiz';
import useUserData from '@hooks/UseUserData';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import LoadingScreen from '@ui/components/LoadingScreen/LoadingScreen';
import Button from '@ui/components/Button/Button';
import Question from '@ui/components/Question/Question';
import Answer from '@ui/components/Answer/Answer';
import TrueFalseAnswer from '@ui/components/TrueFalseAnswer/TrueFalseAnswer';
import MatchColumnsAnswer from '@ui/components/MatchColumnsAnswer/MatchColumnsAnswer';
import DragDropAnswer from '@ui/components/DragDropAnswer/DragDropAnswer';
import CompleteAnswer from '@ui/components/CompleteAnswer/CompleteAnswer';
import './Quiz.css';

const Quiz = () => {
  // esse código ficou retardado e gigante e uma merda, mas funciona. entao eu nao me importo. fodase, eu NAO me importo!

  const [perguntas, setPerguntas] = useState([]);
  const [respostasUsuario, setRespostasUsuario] = useState({});
  const [finalizado, setFinalizado] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);

  const { area, subtema, dificuldade } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const tokenString = localStorage.getItem('user');
  const tokenArray = JSON.parse(tokenString);
  const token = tokenArray ? tokenArray[0] : null;
  const { refetch } = useUserData(token);

  const todasRespondidas = () => {
    return (
      perguntas.length > 0 &&
      perguntas.every((pergunta, index) => {
        const resposta = respostasUsuario[index];

        if (!pergunta.categoria || pergunta.categoria === 'multipla-escolha') {
          return !!resposta;
        }

        switch (pergunta.categoria) {
          case 'verdadeiro-falso':
          case 'completar':
            return resposta && resposta !== '';

          case 'relacionar-colunas':
            return (
              resposta &&
              typeof resposta === 'object' &&
              Object.keys(resposta).length ===
                Object.keys(pergunta.pares).length
            );

          case 'drag-drop':
            return (
              Array.isArray(resposta) &&
              resposta.length === pergunta.respostaCorreta.length &&
              resposta.every((item) => item !== null && item !== undefined)
            );

          default:
            return !!resposta;
        }
      })
    );
  };

  const calcularAcertos = () => {
    return perguntas.reduce((acertos, pergunta, index) => {
      const respostaUsuario = respostasUsuario[index];

      if (!pergunta.categoria || pergunta.categoria === 'multipla-escolha') {
        return respostaUsuario === pergunta.resposta ? acertos + 1 : acertos;
      }

      switch (pergunta.categoria) {
        case 'verdadeiro-falso':
          return respostaUsuario === pergunta.resposta ? acertos + 1 : acertos;

        case 'relacionar-colunas': {
          if (!respostaUsuario || typeof respostaUsuario !== 'object')
            return acertos;
          const paresCorretos = Object.keys(pergunta.pares).every(
            (chave) => respostaUsuario[chave] === pergunta.pares[chave],
          );
          return paresCorretos ? acertos + 1 : acertos;
        }

        case 'drag-drop': {
          if (!Array.isArray(respostaUsuario)) return acertos;
          const dragDropCorreto = pergunta.respostaCorreta.every(
            (resposta, idx) => respostaUsuario[idx] === resposta,
          );
          return dragDropCorreto ? acertos + 1 : acertos;
        }

        case 'completar': {
          if (!respostaUsuario) return acertos;
          const respostaNormalizada = respostaUsuario.toLowerCase().trim();
          const completarCorreto = pergunta.respostaCorreta.some(
            (opcao) => opcao.toLowerCase() === respostaNormalizada,
          );
          return completarCorreto ? acertos + 1 : acertos;
        }

        default:
          return respostaUsuario === pergunta.resposta ? acertos + 1 : acertos;
      }
    }, 0);
  };

  const handleRespostaChange = (indexPergunta, opcaoSelecionada) => {
    setRespostasUsuario((prev) => ({
      ...prev,
      [indexPergunta]: opcaoSelecionada,
    }));

    const pergunta = perguntas[perguntaAtual];

    if (
      !pergunta.categoria ||
      pergunta.categoria === 'multipla-escolha' ||
      pergunta.categoria === 'verdadeiro-falso'
    ) {
      setMostrarFeedback(true);
      return;
    }

    if (pergunta.categoria === 'drag-drop') {
      const todosPreenchidos =
        Array.isArray(opcaoSelecionada) &&
        opcaoSelecionada.length === pergunta.respostaCorreta.length &&
        opcaoSelecionada.every((item) => item !== null);

      if (todosPreenchidos) {
        setMostrarFeedback(true);
      }
      return;
    }

    if (pergunta.categoria === 'relacionar-colunas') {
      const todasAssociacoes =
        opcaoSelecionada &&
        typeof opcaoSelecionada === 'object' &&
        Object.keys(opcaoSelecionada).length ===
          Object.keys(pergunta.pares).length;

      if (todasAssociacoes) {
        setMostrarFeedback(true);
      }
      return;
    }

    setMostrarFeedback(true);
  };

  const proximaPergunta = () => {
    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      setMostrarFeedback(false);
    } else {
      finalizarQuiz();
    }
  };

  const calculatePoints = (level) => {
    switch (level) {
      case 'facil':
        return 1;
      case 'medio':
        return 5;
      case 'dificil':
        return 10;
      default:
        return 0;
    }
  };

  const handleSair = () => {
    const acertos = calcularAcertos();
    const pontosporquestao = calculatePoints(dificuldade);
    const pontos = acertos * pontosporquestao;

    navigate(`/quizzes/${area}/${subtema}/${dificuldade}/resultado`, {
      state: {
        dificuldade,
        acertos,
        totalPerguntas: perguntas.length,
        pontos,
      },
    });
  };

  const handleUpdateScore = async (points) => {
    try {
      const data = await updateScore(user, points);

      setTimeout(() => {
        toast.success(`Pontuação atualizada! Nova pontuação: ${data.newScore}`);
      }, 2500);
    } catch (error) {
      console.error('Erro ao atualizar a pontuação:', error);
      toast.error('Erro ao atualizar a pontuação');
    }
  };

  const handleMarkQuizCompleted = async () => {
    try {
      await markQuizCompleted(user, area, subtema, dificuldade);
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

    if (finalizado) return;

    setFinalizado(true);

    const acertos = calcularAcertos();
    const pontosporquestao = calculatePoints(dificuldade);
    const points = acertos * pontosporquestao;

    toast.success(`Você acertou ${acertos} de ${perguntas.length} perguntas!`);

    Promise.all([handleUpdateScore(points), handleMarkQuizCompleted()])
      .then(() => refetch())
      .then(() => {
        window.dispatchEvent(new CustomEvent('userDataUpdated'));
      });
  };

  const ProgressBar = () => (
    <div className='quiz-progress'>
      <div className='progress-bar'>
        <div
          className='progress-fill'
          style={{
            width: `${((perguntaAtual + 1) / perguntas.length) * 100}%`,
          }}
        />
      </div>
      <div className='progress-text'>
        Pergunta {perguntaAtual + 1} de {perguntas.length}
      </div>
    </div>
  );

  const QuestionItem = ({ pergunta, index }) => {
    const respostaUsuario = respostasUsuario[index];
    const jaRespondeu =
      respostaUsuario !== undefined &&
      respostaUsuario !== null &&
      respostaUsuario !== '';

    let acertou = false;
    if (jaRespondeu) {
      if (!pergunta.categoria || pergunta.categoria === 'multipla-escolha') {
        acertou = respostaUsuario === pergunta.resposta;
      } else {
        switch (pergunta.categoria) {
          case 'verdadeiro-falso':
            acertou = respostaUsuario === pergunta.resposta;
            break;
          case 'relacionar-colunas':
            acertou =
              typeof respostaUsuario === 'object' &&
              Object.keys(pergunta.pares).every(
                (chave) => respostaUsuario[chave] === pergunta.pares[chave],
              );
            break;
          case 'drag-drop':
            acertou =
              Array.isArray(respostaUsuario) &&
              pergunta.respostaCorreta.every(
                (resposta, idx) => respostaUsuario[idx] === resposta,
              );
            break;
          case 'completar': {
            const respostaNormalizada = respostaUsuario.toLowerCase().trim();
            acertou = pergunta.respostaCorreta.some(
              (opcao) => opcao.toLowerCase() === respostaNormalizada,
            );
            break;
          }
          default:
            acertou = respostaUsuario === pergunta.resposta;
        }
      }
    }

    const errou = jaRespondeu && !acertou;

    const renderAnswerComponent = () => {
      if (!pergunta.categoria || pergunta.categoria === 'multipla-escolha') {
        return (
          <Answer
            alternativas={pergunta.alternativas}
            perguntaIndex={index}
            respostasUsuario={respostasUsuario}
            onRespostaChange={handleRespostaChange}
            mostrarFeedback={mostrarFeedback}
            respostaCorreta={pergunta.resposta}
            acertou={acertou}
            errou={errou}
          />
        );
      }

      switch (pergunta.categoria) {
        case 'verdadeiro-falso':
          return (
            <TrueFalseAnswer
              alternatives={pergunta.alternativas}
              questionIndex={index}
              userAnswers={respostasUsuario}
              onAnswerChange={handleRespostaChange}
              showFeedback={mostrarFeedback}
              correctAnswer={pergunta.resposta}
              isCorrect={acertou}
              isWrong={errou}
            />
          );

        case 'relacionar-colunas':
          return (
            <MatchColumnsAnswer
              pairs={pergunta.pares}
              questionIndex={index}
              userAnswers={respostasUsuario}
              onAnswerChange={handleRespostaChange}
              showFeedback={mostrarFeedback}
            />
          );

        case 'drag-drop':
          return (
            <DragDropAnswer
              question={pergunta.pergunta}
              itemsToRearrange={pergunta.itensParaArrastar}
              correctAnswer={pergunta.respostaCorreta}
              questionIndex={index}
              userAnswers={respostasUsuario}
              onAnswerChange={handleRespostaChange}
              showFeedback={mostrarFeedback}
            />
          );

        case 'completar':
          return (
            <CompleteAnswer
              correctAnswer={pergunta.respostaCorreta}
              questionIndex={index}
              userAnswers={respostasUsuario}
              onAnswerChange={handleRespostaChange}
              showFeedback={mostrarFeedback}
            />
          );

        default:
          return (
            <Answer
              alternativas={pergunta.alternativas}
              perguntaIndex={index}
              respostasUsuario={respostasUsuario}
              onRespostaChange={handleRespostaChange}
              mostrarFeedback={mostrarFeedback}
              respostaCorreta={pergunta.resposta}
              acertou={acertou}
              errou={errou}
            />
          );
      }
    };

    return (
      <div key={index} className='area-pergunta'>
        <Question title={pergunta.pergunta} />
        {renderAnswerComponent()}
      </div>
    );
  };

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await getQuiz(area, subtema, dificuldade);
        setPerguntas(data);
      } catch (error) {
        console.error('Erro ao carregar o quiz:', error);
      }
    };

    loadQuiz();
  }, [area, subtema, dificuldade]);

  return (
    <div>
      <HeaderArrowBack to={`/quizzes/${area}/${subtema}`} />

      <main className='quiz-main'>
        {perguntas.length > 0 && <ProgressBar />}

        {perguntas.length > 0 ? (
          <div className='quiz-container'>
            <QuestionItem
              key={perguntaAtual}
              pergunta={perguntas[perguntaAtual]}
              index={perguntaAtual}
            />

            <div className='navigation-buttons'>
              {mostrarFeedback && !finalizado && (
                <Button
                  onClick={proximaPergunta}
                  option={
                    perguntaAtual === perguntas.length - 1
                      ? 'Finalizar Quiz'
                      : 'Próxima'
                  }
                />
              )}

              {finalizado && (
                <Button
                  className='button-resultado'
                  onClick={handleSair}
                  option='Ver Resultado'
                />
              )}
            </div>
          </div>
        ) : (
          <LoadingScreen message='Carregando perguntas...' />
        )}
      </main>

      <Toaster />
    </div>
  );
};

export default Quiz;
