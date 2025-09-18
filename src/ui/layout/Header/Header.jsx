import { Link, useLocation } from 'react-router-dom';
import Button from '@ui/components/Button/Button';
import logo from '@assets/images/logoDark.png';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const getButtonConfig = () => {
    switch (location.pathname) {
      case '/login':
        return { text: 'Criar conta', to: '/cadastrar' };
      case '/cadastrar':
        return { text: 'Entrar', to: '/login' };
      default:
        return null;
    }
  };

  const buttonConfig = getButtonConfig();

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
      {buttonConfig && (
        <Link to={buttonConfig.to}>
          <Button type='tertiary' size='small' option={buttonConfig.text} />
        </Link>
      )}
    </header>
  );
};

export default Header;
