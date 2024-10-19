import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Quizzes.css";
import HeaderArrowBack from "../../components/HeaderArrowBack/HeaderArrowBack";
import { useAuth } from "../../hooks/AuthContext";
import { showToast } from "../../components/ConfirmToast";
import { Toaster } from "react-hot-toast";

const Quizzes = () => {
  const { area, subtema } = useParams();
  const { user } = useAuth();
  const [dificuldades, setDificuldades] = useState([]); // Alterado para capturar dificuldades
  const [quizzesCompletados, setQuizzesCompletados] = useState([]);

  useEffect(() => {
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
        setDificuldades(data);
      } catch (error) {
        console.error("Erro ao buscar dificuldades:", error);
      }
    };

    fetchDificuldades();
  }, [subtema]);

  return (
    <div>
      <HeaderArrowBack />
      <main className="body-quizzes">
        {dificuldades.length > 0 ? (
          dificuldades.map((dificuldade) => {
            const quizId = `${subtema}-${dificuldade}`;
            const isCompleted = quizzesCompletados.includes(quizId);
            return (
              <Link
                key={dificuldade}
                to={`/quizzes/${area}/${subtema}/${dificuldade}`}
                className={`quiz ${isCompleted ? "completed" : ""}`}
              >
                <h1>{dificuldade}</h1>
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
