import { Link } from 'react-router-dom';
import RankingIcon from '@assets/icons/icon-ranking.png';
import ProfileIcon from '@assets/icons/icon-profile.png';
import SettingsIcon from '@assets/icons/icon-configuracoes.png';
import HomeIcon from '@assets/icons/icon-home.png';
import logo from '@assets/images/logoDark.png';
import arrowBack from '@assets/icons/icon-back.png';
import './Sidebar.css';

const Sidebar = ({ to }) => {
  return (
    <nav className='sidebar'>
      <div className='sidebar-logo'>
        {to ? (
          <Link to={to}>
            <img
              src={arrowBack}
              alt='Seta para voltar'
              className='sidebar-back'
            />
          </Link>
        ) : (
          <img src={logo} alt='Logo TechNinja' className='sidebar-logo-img' />
        )}
      </div>

      <div className='sidebar-links'>
        <Link to='/home' className='sidebar-link'>
          <img src={HomeIcon} alt='Home' className='sidebar-icon' />
        </Link>
        <Link to='/ranking' className='sidebar-link'>
          <img src={RankingIcon} alt='Ranking' className='sidebar-icon' />
        </Link>
        <Link to='/perfil' className='sidebar-link'>
          <img src={ProfileIcon} alt='Perfil' className='sidebar-icon' />
        </Link>
        <Link to='/configuracoes' className='sidebar-link'>
          <img
            src={SettingsIcon}
            alt='Configurações'
            className='sidebar-icon'
          />
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
