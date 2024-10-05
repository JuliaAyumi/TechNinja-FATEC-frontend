import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Quizzes.css";
import HeaderArrowBack from "../../components/HeaderArrowBack/HeaderArrowBack";

const Quizzes = () => {
  const { area } = useParams();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quiz/${area}`);
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Erro ao buscar tópicos:", error);
      }
    };

    fetchTopics();
  }, [area]);

  return (
    <div>
    <HeaderArrowBack />

      <main className="body-quizzes">
          {topics.length > 0 ? (
            topics.map((topic) => (
              <Link
                key={topic}
                to={`/${area}/${topic}`} // A URL fica /nome-area/nome-topico
                className="quiz"
              >
                <h1>{topic}</h1>
              </Link>
            ))
          ) : (
            <p>Nenhum tópico encontrado</p>
          )}
      </main>
    </div>
  );
};

export default Quizzes;
