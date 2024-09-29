import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import iconBack from "../../assets/icons/icon-back.png";
import "./Quiz.css";

const Quiz = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [respostasUsuario, setRespostasUsuario] = useState({});
  const { area, topico } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/quiz/${area}/${topico}`
        );

        if (response.ok) {
          const data = await response.json();
          setPerguntas(data);
        } else {
          console.error("Erro ao buscar o quiz");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchQuiz();
  }, [area, topico]);

  // Função para lidar com a seleção de uma resposta
  const handleRespostaChange = (indexPergunta, opcaoSelecionada) => {
    setRespostasUsuario({
      ...respostasUsuario,
      [indexPergunta]: opcaoSelecionada,
    });
  };

  // Função para calcular o número de acertos e atualizar a pontuação
  const finalizarQuiz = async () => {
    let acertos = 0;

    perguntas.forEach((pergunta, index) => {
      if (respostasUsuario[index] === pergunta.resposta) {
        acertos += 1;
      }
    });

    alert(`Você acertou ${acertos} de ${perguntas.length} perguntas!`);

    const points = acertos * 10;

    try {
      const response = await fetch("http://localhost:5000/api/update-score", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({ points }), // Enviar os pontos para o backend
      });

      const resData = await response.json();

      if (response.ok) {
        alert(`Pontuação atualizada! Nova pontuação: ${resData.newScore}`);
      } else {
        alert(resData.message || "Erro ao atualizar a pontuação");
      }
    } catch (error) {
      console.error("Erro ao atualizar a pontuação:", error);
    }

    navigate(`/quizzes/${area}`);
  };

  return (
    <div>
      <header className="quiz-header">
        <div className="quiz-header-options">
          <Link to={`/quizzes/${area}`}>
            <img src={iconBack} title="Voltar" alt="Icone Voltar" />
          </Link>
        </div>
      </header>

      <main className="quiz-main">
        {perguntas.length > 0 ? (
          perguntas.map((pergunta, index) => (
            <div key={index} className="area-pergunta">
              <div className="question-block">
                <h2 className="question-title">{pergunta.pergunta}</h2>
              </div>
              <div className="answers-block">
                {pergunta.alternativas.map((alt, idx) => (
                  <div key={idx}>
                    <input
                      type="radio"
                      className="resposta-item"
                      id={`resposta${index}-${idx}`}
                      name={`pergunta${index}`}
                      value={alt.opcao}
                      onChange={() => handleRespostaChange(index, alt.opcao)}
                    />
                    <label htmlFor={`resposta${index}-${idx}`}>
                      {alt.opcao}) {alt.textoOpcao}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Carregando perguntas...</p>
        )}

        <div className="botoes">
          <button className="finalizar-button" onClick={finalizarQuiz}>
            Finalizar
          </button>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
