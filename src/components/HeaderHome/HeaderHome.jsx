import { Link } from "react-router-dom";
import "./HeaderHome.css";
import { useState, useEffect } from "react";
import iconTutorial from "../../assets/icons/icon-tutorial.png";
import iconPerfil from "../../assets/icons/icon-profile-white.png";
import iconDarkmode from "../../assets/icons/icon-darkmode-white.png";
import iconLightmode from "../../assets/icons/icon-claro.png";
import iconConfig from "../../assets/icons/icon-configuracoes.png";

const HeaderHome = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const currentMode = localStorage.getItem("accessibilityMode");
    if (currentMode === "dark-mode") {
      localStorage.setItem("accessibilityMode", "light-mode");
      document.body.classList.remove("dark-mode");
      setIsDarkMode(false);
    } else {
      localStorage.setItem("accessibilityMode", "dark-mode");
      document.body.classList.add("dark-mode");
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const currentMode = localStorage.getItem("accessibilityMode");
    if (currentMode === "dark-mode") {
      setIsDarkMode(true);
    }
  }, []);

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
            <img src={iconPerfil} title="Perfil" alt="Icone Meu Perfil" />
          </Link>

          <img
            className="modo-escuro"
            src={isDarkMode ? iconLightmode : iconDarkmode}
            title={isDarkMode ? "Modo claro" : "Modo escuro"}
            alt={
              isDarkMode
                ? "Ícone de sol para ativar modo claro"
                : "Ícone de lua para ativar modo escuro"
            }
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
