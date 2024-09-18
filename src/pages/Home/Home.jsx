import { Link } from "react-router-dom";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import "./Home.css";
// import AreaConhecimentoCard from "../../components/AreaConhecimentoCard/AreaConhecimentoCard";

const Home = () => {
  return (
    <div>
      <HeaderHome />

      <main className="main-home">
        {/* <AreaConhecimentoCard
          title="Sistemas Operacionais"
          icon="src/assets/icons/icon-sistemas-operacionais.svg"
          link="/quizzes"
        /> */}

        <Link to="/quizzes" className="area-conhecimento">
          <div id="ac1" onClick="window.location.href='../Quizes/quizes.html'">
            <h1>Sistemas Operacionais</h1>
            <img
              src="src/assets/icons/icon-sistemas-operacionais.svg"
              alt="Ícone de uma computador para ir para a área de conhecimento de Sistemas Operacionais"
            />
          </div>
        </Link>

        <Link to="/quizzes" className="area-conhecimento">
          <div id="ac2" onClick="window.location.href='../Quizes/quizes.html'">
            <h1>Linguagem de Programação</h1>
            <img
              src="src/assets/icons/icon-linguagem-de-programacao.svg"
              alt="Ícone de um código para ir para a área de conhecimento de Linguagem de Programação"
            />
          </div>
        </Link>

        <Link to="/quizzes" className="area-conhecimento">
          <div id="ac3" onClick="window.location.href='../Quizes/quizes.html'">
            <h1>Modelagem de Dados</h1>
            <img
              src="src/assets/icons/icon-modelagem-de-dados.svg"
              alt="Ícone de um banco de dados para ir para a área de conhecimento de Modelagem de Dados"
            />
          </div>
        </Link>
      </main>
    </div>
  );
};

export default Home;
