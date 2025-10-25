import { Link } from 'react-router-dom';
import './HeaderHome.css';
import iconPerfil from '@assets/icons/icon-profile-white.png';
import iconConfig from '@assets/icons/icon-configuracoes.png';

const HeaderHome = () => {
  return (
    <header className='header-home'>
      <h3>TECHNINJA</h3>
      <div className='icons'>
        <div className='header-home-options'>
          <Link to='/perfil'>
            <img src={iconPerfil} title='Perfil' alt='Icone Meu Perfil' />
          </Link>

          <Link to='/configuracoes'>
            <img
              src={iconConfig}
              title='Configurações'
              alt='Icone de engrenagem para ir para Configurações'
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderHome;
