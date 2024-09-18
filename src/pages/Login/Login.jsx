import "./Login.css";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      senha: password,
    };

    try {
      await login(userData);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div>
      <Header />
      <main className="main-login">
        <div className="left-column">
          <img
            src="src/assets/images/logoDark.png"
            alt="TechNinja logo"
            className="login-main-image"
          />
        </div>

        <div className="right-column">
          <form id="login-form" className="form-login" onSubmit={handleLogin}>
            <div className="error-message" id="error-message"></div>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Senha"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="button-entrar">
              Entrar
            </button>
            <Link href="../Esqueceu/esqueceu.html" className="esqueceu">
              <p className="esqueceu-text">Esqueceu a senha?</p>
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
