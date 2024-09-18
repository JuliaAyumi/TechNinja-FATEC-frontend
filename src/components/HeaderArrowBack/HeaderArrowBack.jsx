import { Link } from "react-router-dom";
import "./HeaderArrowBack.css";

const HeaderArrowBack = () => {
  return (
    <header>
      <div className="header-options">
        <Link href="../Home/Home.html">
          <img
            src="src//assets/icons/icon-back.png"
            title="Voltar"
            alt="Icone Voltar para Home"
          />
        </Link>
      </div>
    </header>
  );
};

export default HeaderArrowBack;
