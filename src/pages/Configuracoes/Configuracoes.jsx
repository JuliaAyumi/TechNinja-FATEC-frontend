import { useState, useEffect } from "react";
import "./configuracoes.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

const Configuracoes = () => {
  const [modoDaltonico, setModoDaltonico] = useState(false);
  const [modoBaixaVisao, setModoBaixaVisao] = useState(false);
  const [exibirPerfil, setExibirPerfil] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const isModoBaixaVisaoAtivado =
      sessionStorage.getItem("baixa-visao") === "true";
    const isModoDaltonicoAtivado =
      sessionStorage.getItem("daltonico") === "true";

    setModoBaixaVisao(isModoBaixaVisaoAtivado);
    setModoDaltonico(isModoDaltonicoAtivado);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("baixa-visao", modoBaixaVisao);
    sessionStorage.setItem("baixa-visao", modoBaixaVisao);
  }, [modoBaixaVisao]);

  useEffect(() => {
    document.body.classList.toggle("daltonico", modoDaltonico);
    sessionStorage.setItem("daltonico", modoDaltonico);
  }, [modoDaltonico]);

  const handlePerfilClick = () => {
    setExibirPerfil(true);
  };

  const handleAcessibilidadeClick = () => {
    setExibirPerfil(false);
  };

  const handleSalvarPerfil = (event) => {
    event.preventDefault();
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Configurações salvas!");
        }
      });
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

  return (
    <div>
      <header
        className={`configuracoes-header-options ${modoBaixaVisao ? "baixa-visao" : ""}`}
      >
        <Link to="/home">
          <img
            src="src/assets/icons/icon-back.png"
            title="Voltar"
            alt="Icone Voltar para Home"
          />
        </Link>
      </header>

      <main className="main-configuracoes">
        <div className="opcoes">
          <ul>
            <li>
              <a href="#" className="link-option" id="perfil-link" onClick={handlePerfilClick}>
                Perfil
              </a>
            </li>
            <li>
              <a
                href="#"
                id="acessibilidade-link"
                onClick={handleAcessibilidadeClick}
              >
                Acessibilidade
              </a>
            </li>
            <li>
              <a href="#" className="link-option">Tema Escuro</a>
            </li>
            <li>
              <a onClick={logout} className="link-option">Sair</a>
            </li>
          </ul>
        </div>

        {exibirPerfil ? (
          <div className="campos-perfil" id="perfil">
            <form id="profile-form" onSubmit={handleSalvarPerfil}>
              <div className="form-group">
                <label htmlFor="avatar">Alterar Avatar</label>
                <br />
                <input type="image" />
              </div>

              <div className="form-group">
                <label htmlFor="username">Alterar Nome</label>
                <br />
                <input type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Alterar Email</label>
                <br />
                <input type="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Alterar Senha</label>
                <br />
                <input type="text" />
              </div>

              <button type="submit">Salvar Mudanças</button>
            </form>
          </div>
        ) : (
          <div className="campos-acessibilidade" id="acessibilidade">
            <form id="accessibility-form" onSubmit={handleSalvarAcessibilidade}>
              <div className="form-group">
                <label htmlFor="daltonico">Modo Daltônico</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="daltonico"
                    checked={modoDaltonico}
                    onChange={() => setModoDaltonico(!modoDaltonico)}
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
                    onChange={() => setModoBaixaVisao(!modoBaixaVisao)}
                  />
                </label>
              </div>
              <button type="submit" id="buttonSalvar">
                Salvar Mudanças
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Configuracoes;
