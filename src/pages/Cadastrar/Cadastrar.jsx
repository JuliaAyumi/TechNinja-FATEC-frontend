import "./Cadastrar.css";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/AuthContext";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../assets/images/logoDark.png";

const Cadastrar = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCadastrar = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    const userData = {
      nome: name,
      email: email,
      senha: password,
    };

    setIsLoading(true);

    try {
      await register(userData);
    } catch (error) {
      console.error("Erro no cadastro:", error);
    } finally {
      setIsLoading(false);
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
            <button type="submit" className="button1" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </div>

        <div className="cadastrar-right-column">
          <img src={logo} alt="TechNinja logo" className="main-image" />
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Cadastrar;
