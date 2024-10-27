import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Quizzes.css";
import HeaderArrowBack from "../../components/HeaderArrowBack/HeaderArrowBack";
import { useAuth } from "../../hooks/AuthContext";
import { showToast } from "../../components/ConfirmToast";
import { Toaster } from "react-hot-toast";
import { formatarTexto } from "../../utils/formatarTexto";
import logo from "../../assets/images/logoDark.png";

const Quizzes = () => {
  const { area, subtema } = useParams();
  const { user } = useAuth();
  const [dificuldades, setDificuldades] = useState([]);
  const [quizzesCompletados, setQuizzesCompletados] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    const fetchDificuldades = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_MODE === "development"
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
      } finally {
        setLoading(false);
      }
    };

    const fetchQuizzesCompletados = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_MODE === "development"
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
        {loading ? (
          <div className="loading-screen">
            <img src={logo} alt="Logo TechNinja" className="logo-loading" />
            <p>Carregando...</p>
          </div>
        ) : dificuldades.length > 0 ? (
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
