import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RankingIcon from '@assets/icons/icon-ranking.png';
import ProfileIcon from '@assets/icons/icon-profile.png';
import SettingsIcon from '@assets/icons/icon-configuracoes.png';
import HomeIcon from '@assets/icons/icon-home.png';
import logo from '@assets/images/logoDark.png';
import arrowBack from '@assets/icons/icon-back.png';
import useUserData from '@hooks/UseUserData';
import './Sidebar.css';

const Sidebar = ({ to }) => {
  const location = useLocation();
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);

  const tokenString = localStorage.getItem('user');
  const tokenArray = JSON.parse(tokenString);
  const token = tokenArray[0];
  const { userData } = useUserData(token);

  useEffect(() => {
    const savedStreak = localStorage.getItem('userStreak') || 0;
    const savedXp = localStorage.getItem('userXp') || 0;

    setStreak(parseInt(savedStreak));
    setXp(parseInt(savedXp));
  }, []);

  const isActive = (path) => {
    if (path === '/home') {
      return (
        location.pathname === '/home' ||
        location.pathname.startsWith('/quizzes')
      );
    }
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: '/home',
      icon: HomeIcon,
      label: 'Home',
      tooltip: 'Página Inicial',
    },
    {
      path: '/ranking',
      icon: RankingIcon,
      label: 'Ranking',
      tooltip: 'Classificação Global',
    },
    {
      path: '/perfil',
      icon: ProfileIcon,
      label: 'Perfil',
      tooltip: 'Meu Perfil',
    },
    {
      path: '/configuracoes',
      icon: SettingsIcon,
      label: 'Configurações',
      tooltip: 'Configurações',
    },
  ];

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

      {!to && (
        <div className='sidebar-stats'>
          <div className='stat-item'>
            <span className='stat-icon'>🔥</span>
            <span className='stat-value'>{streak}</span>
          </div>
          <div className='xp-bar'>
            <div
              className='xp-progress'
              style={{ width: `${xp % 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className='sidebar-links'>
        {menuItems.map((item) => (
          <div key={item.path} className='sidebar-link-container'>
            <Link
              to={item.path}
              className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
              title={item.tooltip}
            >
              <img src={item.icon} alt={item.label} className='sidebar-icon' />
              {isActive(item.path) && <div className='active-indicator'></div>}
            </Link>
            <span className='sidebar-tooltip'>{item.tooltip}</span>
          </div>
        ))}
      </div>

      {!to && (
        <div className='sidebar-footer'>
          <div className='achievement-badge'>
            <span className='badge-text'>{userData.pontuacao}</span>
            <span className='badge-icon'>⭐</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
