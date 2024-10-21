import "./Perfil.css";
import HeaderArrowBack from "../../components/HeaderArrowBack/HeaderArrowBack";
import iconUsuario from "../../assets/images/logoDark.png";
import iconPodio from "../../assets/icons/podio.png";
import iconDiadema from "../../assets/icons/coroa.png";
import iconLiteratura from "../../assets/icons/taca-de-ouro.png";
import xp from "../../assets/icons/placar.png"
import quizzes from "../../assets/icons/pontuacao-maxima.png"

const Perfil = () => {
  return (
    <div>
      <HeaderArrowBack to={'/home'}/>
      <main className="main-perfil">
        <div className="user-info">
          <img src={iconUsuario} alt="Icon Usuario" className="iconUsuario" />
          <h2 id="perfil" className="user-name">
            Nome do usuário
          </h2>
          <p id="email" className="user-email">
            email do usuário
          </p>

          <h2>Pontuação</h2>
          <div className="stats-info">
            <p className="stats-text"> <img src={xp} alt="icone xp" className="icone-xp"/>100 Xp</p>
            <p className="stats-text"> <img src={quizzes} alt="icone quizzes" className="icone-quizzes"/> N Quizzes Concluídos</p>
          </div>

          <h2>Conquistas</h2>
          <div className="awards-info">
            <img src={iconPodio} alt="Foto Conquista" />
            <img src={iconDiadema} alt="Foto Conquista" />
            <img src={iconLiteratura} alt="Foto Conquista" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Perfil;
