import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Quizzes.css";

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
      <header className="header-quizzes">
        <div className="header-quizzes-options">
          <Link to="/home">
            <img
              src="src/assets/icons/icon-back.png"
              title="Voltar"
              alt="Icone Voltar"
            />
          </Link>
        </div>
      </header>

      <main className="main-quizzes">
        <div className="quizzes-area">
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
        </div>
      </main>
    </div>
  );
};

export default Quizzes;
