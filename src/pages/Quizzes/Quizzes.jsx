import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Quizzes.css";
import HeaderArrowBack from "../../components/HeaderArrowBack/HeaderArrowBack";
import { useAuth } from "../../hooks/AuthContext";
import { showToast } from "../../components/ConfirmToast";
import { Toaster } from "react-hot-toast";

const Quizzes = () => {
  const { area } = useParams();
  const { user } = useAuth();
  const [topics, setTopics] = useState([]);
  const [quizzesCompletados, setQuizzesCompletados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.MODE === "development"
              ? `http://localhost:${import.meta.env.VITE_PORT}`
              : import.meta.env.VITE_HEROKU_LINK
          }/api/quiz/${area}`
        );
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Erro ao buscar tópicos:", error);
      }
    };

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

    fetchTopics();
    fetchQuizzesCompletados();
  }, [area, user]);

  const handleQuizClick = (event, isCompleted, topic) => {
    if (isCompleted) {
      event.preventDefault();

      showToast(topic, () => navigate(`/${area}/${topic}`));
    } else {
      navigate(`/${area}/${topic}`);
    }
  };

  return (
    <div>
      <HeaderArrowBack />
      <main className="body-quizzes">
        {topics.length > 0 ? (
          topics.map((topic) => {
            const quizId = `${area}-${topic}`;
            const isCompleted = quizzesCompletados.includes(quizId);
            return (
              <Link
                key={topic}
                to={`/${area}/${topic}`}
                className={`quiz ${isCompleted ? "completed" : ""}`}
                onClick={(event) => handleQuizClick(event, isCompleted, topic)}
              >
                <h1>{topic}</h1>
              </Link>
            );
          })
        ) : (
          <p>Nenhum tópico encontrado</p>
        )}
      </main>
      <Toaster />
    </div>
  );
};

export default Quizzes;
