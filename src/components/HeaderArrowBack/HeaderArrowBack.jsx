import { Link } from "react-router-dom";
import iconBack from "../../assets/icons/icon-back.png";
import "./HeaderArrowBack.css";

const HeaderArrowBack = () => {
  return (
    <header id = "headerArrowBack">
      <div className="headerArrowBack-options">
        <Link to="/home">
          <img
            src={iconBack}
            title="Voltar"
            alt="Icone Voltar para Home"
          />
        </Link>
      </div>
    </header>
  );
};

export default HeaderArrowBack;
