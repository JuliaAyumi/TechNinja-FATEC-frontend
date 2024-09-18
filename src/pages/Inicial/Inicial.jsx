import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import "./Inicial.css";

const Inicial = () => {
  return (
    <>
      <Header />

      <main className="main-inicial">
        <div className="inicial-left-column">
          <h1>
            Bem vindo(a) ao TechNinja! Aqui você pode realizar seu cadastro ou
            acessar uma conta já cadastrada.
          </h1>

          <Link to="/login">
            <Button option={"Entrar"} />
          </Link>

          <Link to="/cadastrar">
            <Button option={"Cadastrar"} />
          </Link>
        </div>

        <div className="inicial-right-column">
          <img
            src="src/assets/images/logoDark.png"
            alt="TechNinja logo"
            className="main-image"
          />
        </div>
      </main>
    </>
  );
};

export default Inicial;
