import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Quizzes.css";
import HeaderArrowBack from "../../components/HeaderArrowBack/HeaderArrowBack";
import { useAuth } from "../../hooks/AuthContext";
import { showToast } from "../../components/ConfirmToast";
import { Toaster } from "react-hot-toast";
import { formatarTexto } from "../../utils/formatarTexto";

const Quizzes = () => {
  const { area, subtema } = useParams();
  const { user } = useAuth();
  const [dificuldades, setDificuldades] = useState([]);
  const [quizzesCompletados, setQuizzesCompletados] = useState([]);
  const navigate = useNavigate();

  // Função para lidar com clique no quiz
  const handleQuizClick = (event, isCompleted, subtema, dificuldade) => {
    if (isCompleted) {
      event.preventDefault();
      showToast(`${subtema} - ${dificuldade}`, () =>
        navigate(`/quizzes/${area}/${subtema}/${dificuldade}`)
      );
    } else {
      navigate(`/quizzes/${area}/${subtema}/${dificuldade}`);
    }
  };

  useEffect(() => {
    // Função para buscar as dificuldades
    const fetchDificuldades = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.MODE === "development"
              ? `http://localhost:${import.meta.env.VITE_PORT}`
              : import.meta.env.VITE_HEROKU_LINK
          }/api/quiz/${area}/${subtema}/dificuldades`
        );
        const data = await response.json();

        const dificuldadeOrder = ["facil", "medio", "dificil"];
        data.sort(
          (a, b) => dificuldadeOrder.indexOf(a) - dificuldadeOrder.indexOf(b)
        );

        setDificuldades(data);
      } catch (error) {
        console.error("Erro ao buscar dificuldades:", error);
      }
    };

    // Função para buscar quizzes completados
    const fetchQuizzesCompletados = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.MODE === "development"
              ? `http://localhost:${import.meta.env.VITE_PORT}`
              : import.meta.env.VITE_HEROKU_LINK
          }/api/user-quizzes-completed`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        );
        const data = await response.json();
        setQuizzesCompletados(data.quizzesCompletados);
      } catch (error) {
        console.error("Erro ao buscar quizzes completados:", error);
      }
    };

    fetchDificuldades();
    fetchQuizzesCompletados();
  }, [subtema, area, user]);

  return (
    <div>
      <HeaderArrowBack to={`/quizzes/${area}`} />
      <main className="body-quizzes">
        {dificuldades.length > 0 ? (
          dificuldades.map((dificuldade) => {
            const quizId = `${area}-${subtema}-${dificuldade}`;
            const isCompleted = quizzesCompletados.includes(quizId);

            return (
              <Link
                key={dificuldade}
                to={`/quizzes/${area}/${subtema}/${dificuldade}`}
                className={`quiz ${isCompleted ? "completed" : ""}`}
                onClick={(event) =>
                  handleQuizClick(event, isCompleted, subtema, dificuldade)
                }
              >
                <h1>{formatarTexto(dificuldade)}</h1>
              </Link>
            );
          })
        ) : (
          <p>Nenhuma dificuldade encontrada</p>
        )}
      </main>
      <Toaster />
    </div>
  );
};

export default Quizzes;
