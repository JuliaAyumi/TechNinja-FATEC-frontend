import { Link } from "react-router-dom";
import "./Quizzes.css";

const Quizzes = () => {
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
          <Link
            to="/quiz"
            className="quiz"
            onClick="window.location.href='../Quiz/quizBloco.html'"
          >
            <h1>01 - O que é Programação?</h1>
          </Link>

          <div
            className="quiz"
            onClick="window.location.href='../Quiz/quizBloco.html'"
          >
            <h1>02 - Primeiros Passos com Python</h1>
          </div>

          <div
            className="quiz"
            onClick="window.location.href='../Quiz/quizBloco.html'"
          >
            <h1>03 - Tipos de Dados</h1>
          </div>

          <div
            className="quiz"
            onClick="window.location.href='../Quiz/quizBloco.html'"
          >
            <h1>04 - Tipos de Coleções</h1>
          </div>

          <div
            className="quiz"
            onClick="window.location.href='../Quiz/quizBloco.html'"
          >
            <h1>05 - Estrutura de Condição e Repetição</h1>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quizzes;
