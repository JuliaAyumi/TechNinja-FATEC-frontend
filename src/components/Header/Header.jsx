import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header id="headerInicial">
      <Link to="/">
        <p>
          TECHNINJA
        </p>
      </Link>
      <img
        src="src/assets/images/logoDark.png"
        align="right"
        alt="TechNinja logo"
        id="headerInicial-img"
      />
    </header>
  );
};

export default Header;
