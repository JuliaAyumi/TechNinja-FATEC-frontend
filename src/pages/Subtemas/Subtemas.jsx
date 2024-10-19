import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Subtemas.css";
import HeaderArrowBack from "../../components/HeaderArrowBack/HeaderArrowBack";

const Subtemas = () => {
  const { area } = useParams();
  const [subtemas, setSubtemas] = useState([]);

  useEffect(() => {
    const fetchSubtemas = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.MODE === "development"
              ? `http://localhost:${import.meta.env.VITE_PORT}`
              : import.meta.env.VITE_HEROKU_LINK
          }/api/quiz/${area}`
        );
        const data = await response.json();
        setSubtemas(data);
      } catch (error) {
        console.error("Erro ao buscar subtemas:", error);
      }
    };

    fetchSubtemas();
  }, [area]);

  return (
    <div>
      <HeaderArrowBack />
      <main className="body-quizzes">
        {subtemas.length > 0 ? (
          subtemas.map((subtema) => (
            <Link
              className="quiz"
              key={subtema}
              to={`/quizzes/${area}/${subtema}`}
            >
              <h1>{subtema}</h1>
            </Link>
          ))
        ) : (
          <p>Nenhum subtema encontrado</p>
        )}
      </main>
    </div>
  );
};

export default Subtemas;
