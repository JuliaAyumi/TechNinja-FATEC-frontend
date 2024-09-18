import { Link } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  return (
    <div>
      <header className="quiz-header">
        <div className="quiz-header-options">
          <Link to="/quizzes">
            <img
              src="src/assets/icons/icon-back.png"
              title="Voltar"
              alt="Icone Voltar"
            />
          </Link>
        </div>
      </header>

      <main className="quiz-main">
        <div className="area-pergunta">
          <div className="question-block">
            <h2 className="question-title">
              Qual é o operador lógico que representa a negação em muitas
              linguagens de programação?
            </h2>
          </div>

          <div className="answers-block">
            <input
              type="radio"
              className="resposta-item"
              id="resposta1"
              name="resposta1"
            />
            <label htmlFor="resposta1">A) &&</label>
            <input
              type="radio"
              className="resposta-item"
              id="resposta2"
              name="resposta2"
            />
            <label htmlFor="resposta2">B) ||</label>
            <input
              type="radio"
              className="resposta-item"
              id="resposta3"
              name="resposta3"
            />
            <label htmlFor="resposta3">C) !</label>
            <input
              type="radio"
              className="resposta-item"
              id="resposta4"
              name="resposta4"
            />
            <label htmlFor="resposta4">D) ==</label>
          </div>
        </div>

        <div className="area-pergunta">
          <div className="question-block">
            <h2 className="question-title">
              Em qual linguagem de programação a função print() é utilizada para
              exibir mensagens na tela?
            </h2>
          </div>

          <div className="answers-block">
            <input
              type="radio"
              className="resposta-item"
              id="resposta5"
              name="resposta5"
            />
            <label htmlFor="resposta5">A) Python</label>
            <input
              type="radio"
              className="resposta-item"
              id="resposta6"
              name="resposta6"
            />
            <label htmlFor="resposta6">D) JavaScript</label>
            <input
              type="radio"
              className="resposta-item"
              id="resposta7"
              name="resposta7"
            />
            <label htmlFor="resposta7">C) C#</label>
            <input
              type="radio"
              className="resposta-item"
              id="resposta8"
              name="resposta8"
            />
            <label htmlFor="resposta8">D) JavaScript</label>
          </div>
        </div>

        <div className="area-pergunta">
          <div className="question-block">
            <h2 className="question-title">
              Qual linguagem de estilização é utilizada para definir a
              apresentação visual de uma página web?
            </h2>
          </div>

          <div className="answers-block">
            <input
              type="radio"
              className="resposta-item"
              id="resposta9"
              name="resposta9"
            />
            <label htmlFor="resposta9">A) HTML</label>
            <input
              type="radio"
              className="resposta-item"
              id="resposta10"
              name="resposta10"
            />
            <label htmlFor="resposta10">B) CSS</label>
            <input
              type="radio"
              className="resposta-item"
              id="resposta11"
              name="resposta11"
            />
            <label htmlFor="resposta11">C) JavaScript</label>
            <input
              type="radio"
              className="resposta-item"
              id="resposta12"
              name="resposta12"
            />
            <label htmlFor="resposta12">D) SQL</label>
          </div>
        </div>

        <div className="botoes">
          <button className="finalizar-button" id="button2">
            Finalizar
          </button>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
