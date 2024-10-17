import { useState, useEffect } from "react";
import "./Configuracoes.css";
import { useAuth } from "../../hooks/AuthContext";
import HeaderArrowBack from "../../components/HeaderArrowBack/HeaderArrowBack";
import { useLocation } from "react-router-dom";
import useUserData from "../../hooks/UseUserData";

const Configuracoes = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("perfil");

  //Obtendo o token e dados do usuario via hook
  const token = localStorage.getItem("jwt");
  const {userData, loading} = useUserData(token);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Erro ao atualizar dados do usuário');
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário", error);
    }
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

  const renderContent = () => {
    if (activeTab === "perfil") {
      return (
        <form className="form-perfil" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="imagem">Alterar Imagem</label>
            <input
              type="file"
              id="imagem"
              name="imagem"
              className="configuracoes-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="configuracoes-input"
              value={userData.nome}
              onChange={(e) => setUserData({...userData, nome: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="configuracoes-input"
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="configuracoes-input"
              value={userData.senha}
              onChange={(e) => setUserData({...userData, senha: e.target.value})}
            />
          </div>
          <button type="submit" className="button1">
            Confirmar
          </button>
        </form>
      );
    } else if (activeTab === "acessibilidade") {
      return (
        <form id="accessibility-form" onSubmit={handleSalvarAcessibilidade}>
          <div className="form-group">
            <label htmlFor="escuro">Modo Escuro</label>
            <label className="switch">
              <input
                type="checkbox"
                id="escuro"
                className="configuracoes-switch"
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
                className="configuracoes-switch"
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
                className="configuracoes-switch"
                checked={modoBaixaVisao}
                onChange={toggleBaixaVisaoMode}
              />
            </label>
          </div>
        </form>
      );
    }
  };

  return (
    <div>
      <HeaderArrowBack />

      <main className="main-configuracoes">
        <div className="opcoes">
          <ul>
            <li>
              <a
                href="#"
                className="link-option"
                onClick={() => setActiveTab("perfil")}
              >
                Perfil
              </a>
            </li>
            <li>
              <a
                href="#"
                className="link-option"
                onClick={() => setActiveTab("acessibilidade")}
              >
                Acessibilidade
              </a>
            </li>
            <li>
              <a onClick={logout} className="link-option">
                Sair
              </a>
            </li>
          </ul>
        </div>

        <div className="conteudo">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Configuracoes;
