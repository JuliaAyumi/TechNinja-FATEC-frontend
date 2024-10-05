import { useState, useEffect } from "react";
import "./Configuracoes.css";
import { useAuth } from "../../hooks/AuthContext";
import HeaderArrowBack from "../../components/HeaderArrowBack/HeaderArrowBack";
import { useLocation } from "react-router-dom";

const Configuracoes = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const [modoEscuro, setModoEscuro] = useState(
    localStorage.getItem("accessibilityMode") === "dark-mode"
  );
  const [modoDaltonico, setModoDaltonico] = useState(
    localStorage.getItem("daltonicoMode") === "daltonico"
  );
  const [modoBaixaVisao, setModoBaixaVisao] = useState(
    localStorage.getItem("baixaVisaoMode") === "baixa-visao"
  );

  const applyAccessibilityMode = () => {
    const accessibilityMode = localStorage.getItem("accessibilityMode");
    const daltonicoMode = localStorage.getItem("daltonicoMode");
    const baixaVisaoMode = localStorage.getItem("baixaVisaoMode");

    if (
      ["/", "/login", "/cadastrar", "/esqueceu"].includes(location.pathname)
    ) {
      document.body.classList.remove("dark-mode", "daltonico", "baixa-visao");
    } else {
      if (accessibilityMode === "dark-mode") {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }

      if (daltonicoMode === "daltonico") {
        document.body.classList.add("daltonico");
      } else {
        document.body.classList.remove("daltonico");
      }

      if (baixaVisaoMode === "baixa-visao") {
        document.body.classList.add("baixa-visao");
      } else {
        document.body.classList.remove("baixa-visao");
      }
    }
  };

  useEffect(() => {
    applyAccessibilityMode();
  }, [location]);

  const toggleDarkMode = () => {
    const newMode = modoEscuro ? "light-mode" : "dark-mode";
    setModoEscuro(!modoEscuro);
    localStorage.setItem("accessibilityMode", newMode);
    applyAccessibilityMode();
  };

  const toggleDaltonicoMode = () => {
    const newMode = modoDaltonico ? "light-mode" : "daltonico";
    setModoDaltonico(!modoDaltonico);
    localStorage.setItem("daltonicoMode", newMode);
    applyAccessibilityMode();
  };

  const toggleBaixaVisaoMode = () => {
    const newMode = modoBaixaVisao ? "light-mode" : "baixa-visao";
    setModoBaixaVisao(!modoBaixaVisao);
    localStorage.setItem("baixaVisaoMode", newMode);
    applyAccessibilityMode();
  };

  const handleSalvarAcessibilidade = (event) => {
    event.preventDefault();
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Configurações salvas!");
        }
      });
    }
  };

  return (
    <div>
      <HeaderArrowBack />

      <main className="main-configuracoes">
        <div className="opcoes">
          <ul>
            <li>
              <a href="#" className="link-option">
                Perfil
              </a>
            </li>
            <li>
              <a href="#acessibilidade" className="link-option">
                Acessibilidade
              </a>
            </li>
            <li>
              <a onClick={toggleDarkMode} className="link-option">
                Tema Escuro
              </a>
            </li>
            <li>
              <a onClick={logout} className="link-option">
                Sair
              </a>
            </li>
          </ul>
        </div>

        <div className="campos-acessibilidade" id="acessibilidade">
          <form id="accessibility-form" onSubmit={handleSalvarAcessibilidade}>
            <div className="form-group">
              <label htmlFor="escuro">Modo Escuro</label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="escuro"
                  checked={modoEscuro}
                  onChange={toggleDarkMode}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="daltonico">Modo Daltônico</label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="daltonico"
                  checked={modoDaltonico}
                  onChange={toggleDaltonicoMode}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="baixa-visao">Modo Baixa Visão</label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="baixa-visao"
                  checked={modoBaixaVisao}
                  onChange={toggleBaixaVisaoMode}
                />
              </label>
            </div>
            <button type="submit" className="button1">
              Salvar Mudanças
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Configuracoes;
