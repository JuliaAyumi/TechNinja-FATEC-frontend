// import HeaderArrowBack from "../../components/HeaderArrowBack/HeaderArrowBack";
import { Link } from "react-router-dom";
import "./Perfil.css";

const Perfil = () => {
  return (
    <div>
      <header className="header-arrow-back">
        <div className="header-options">
          <Link to="/home">
            <img
              src="src/assets/icons/icon-back.png"
              title="Voltar"
              alt="Icone Voltar para Home"
            />
          </Link>
        </div>
      </header>

      <main className="main-perfil">
        <div className="user-info">
          <img src="src/assets/icons/Shrek.png" alt="Icon Usuario" />
          <h2 id="perfil" className="user-name">
            Shrek
          </h2>
          <p id="email" className="user-email">
            shrek@ogre.com
          </p>

          <h2>Estatísticas</h2>
          <div className="stats-info">
            <p className="stats-text">1000 Total de Xp ✨</p>
            <p className="stats-text">3 Cursos Concluídos 👨‍🎓</p>
          </div>

          <h2>Conquistas</h2>
          <div className="awards-info">
            <img src="src/assets/icons/podio.png" alt="Foto Conquista" />
            <img src="src/assets/icons/diadema.png" alt="Foto Conquista" />
            <img src="src/assets/icons/literatura.png" alt="Foto Conquista" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Perfil;
