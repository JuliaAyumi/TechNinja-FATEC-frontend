import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <p>
          TECHNINJA
          <img
            src="src/assets/images/logoDark.png"
            align="right"
            alt="TechNinja logo"
            id="img-header"
          />
        </p>
      </Link>
    </header>
  );
};

export default Header;
