import './Configuracoes.css';
import { useAuth } from '@hooks/AuthContext';
import Sidebar from '../../ui/components/Sidebar/Sidebar';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import useMediaQuery from '@hooks/UseMediaQuery';
import SettingsOption from '@ui/components/SettingsOption/SettingsOption';
import Button from '@ui/components/Button/Button';
import { Toaster } from 'react-hot-toast';

const Configuracoes = () => {
  const { logout } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      {isMobile ? <HeaderArrowBack to={'/home'} /> : <Sidebar to={'/home'} />}

      <main className='main-configuracoes'>
        <div className='configuracoes-container'>
          <div className='configuracoes-section'>
            <h2 className='section-title'>Geral</h2>
            <div className='settings-group'>
              <SettingsOption option='Minha conta' to='/perfil' />
              <SettingsOption
                option='Acessibilidade'
                to='/configuracoes/acessibilidade'
              />
              <SettingsOption
                option='Segurança'
                to='/configuracoes/seguranca'
              />
            </div>
          </div>

          <div className='configuracoes-section'>
            <div className='settings-group'>
              <SettingsOption option='Sobre esse app' />
            </div>
          </div>

          <div className='logout-section'>
            <Button type='danger' size='large' option='Sair' onClick={logout} />
          </div>
        </div>
        <Toaster />
      </main>
    </div>
  );
};

export default Configuracoes;
