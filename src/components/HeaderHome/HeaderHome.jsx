import { Link } from "react-router-dom";
import "./HeaderHome.css";
import iconTutorial from "../../assets/icons/icon-tutorial.png";
import iconPerfil from "../../assets/icons/icon-profile-white.png";
import iconDarkmode from "../../assets/icons/icon-darkmode-white.png";
import iconConfig from "../../assets/icons/icon-configuracoes.png"

const HeaderHome = () => {
  const toggleDarkMode = () => {
    const currentMode = localStorage.getItem("accessibilityMode");
    if (currentMode === "dark-mode") {
      localStorage.setItem("accessibilityMode", "light-mode");
      document.body.classList.remove("dark-mode");
    } else {
      localStorage.setItem("accessibilityMode", "dark-mode");
      document.body.classList.add("dark-mode");
    }
  };
  
  return (
    <header className="header-home">
      <h3>TECHNINJA</h3>
      <div className="icons">
        <div className="header-home-options">
          <a href="">
            <img
              src={iconTutorial}
              title="Tutorial"
              alt="Icone tutorial"
              id="tutorial"
            />
          </a>

          <Link to="/perfil">
            <img
              src={iconPerfil}
              title="Perfil"
              alt="Icone Meu Perfil"
            />
          </Link>

          <img
            src={iconDarkmode}
            title="Modo escuro"
            alt="Icone de uma lua para ativar modo escuro"
            id="modoescuro"
            onClick={toggleDarkMode}
          />
          <Link to="/configuracoes">
            <img
              src={iconConfig}
              title="Configurações"
              alt="Icone de engrenagem para ir para Configurações"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderHome;
