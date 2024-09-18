import "./Cadastrar.css";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/AuthContext";
import { useState } from "react";

const Cadastrar = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCadastrar = async (e) => {
    e.preventDefault();

    const userData = {
      nome: name,
      email: email,
      senha: password,
    };

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem");
      return;
    }

    try {
      await register(userData);
      alert("Usuário cadastrado!");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setErrorMessage("Erro ao cadastrar");
    }
  };

  return (
    <div>
      <Header />

      <main className="main-cadastrar">
        <div className="cadastrar-left-column">
          <form
            id="register-form"
            className="form-cadastrar"
            onSubmit={handleCadastrar}
          >
            {errorMessage && (
              <div className="error-message" id="error-message">
                {errorMessage}
              </div>
            )}
            <input
              className="cadastrar-input"
              type="text"
              placeholder="Nome"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="cadastrar-input"
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="cadastrar-input"
              type="password"
              placeholder="Senha"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="cadastrar-input"
              type="password"
              placeholder="Confirmar senha"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="button-cadastrar">
              Cadastrar
            </button>
          </form>
        </div>

        <div className="cadastrar-right-column">
          <img
            src="src/assets/images/logoDark.png"
            alt="TechNinja logo"
            className="main-image"
          />
        </div>
      </main>
    </div>
  );
};

export default Cadastrar;
