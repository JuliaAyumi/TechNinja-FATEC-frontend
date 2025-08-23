import { Link } from 'react-router-dom';
import logo from '../../assets/images/logoDark.png';
import './Header.css';

const Header = () => {
  return (
    <header id='headerInicial'>
      <Link to='/'>
        <p>TECHNINJA</p>
      </Link>
      <img
        src={logo}
        align='right'
        alt='TechNinja logo'
        id='headerInicial-img'
      />
    </header>
  );
};

export default Header;
