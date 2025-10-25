import './Configuracoes.css';
import { useAuth } from '@hooks/AuthContext';
import { Toaster } from 'react-hot-toast';
import PageLayout from '@ui/layout/PageLayout/PageLayout';
import SettingsOption from '@ui/components/SettingsOption/SettingsOption';
import Button from '@ui/components/Button/Button';

const Configuracoes = () => {
  const { logout } = useAuth();

  return (
    <PageLayout backTo='/home'>
      <main className='main-configuracoes'>
        <div className='configuracoes-container'>
          <div className='configuracoes-section'>
            <h2 className='section-title'>Geral</h2>
            <div className='settings-group'>
              <SettingsOption option='Minha conta' to='/configuracoes/perfil' />
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
              <SettingsOption
                option='Sobre esse sistema'
                to='/configuracoes/sobre'
              />
            </div>
          </div>

          <div className='logout-section'>
            <Button type='danger' size='large' option='Sair' onClick={logout} />
          </div>
        </div>
        <Toaster />
      </main>
    </PageLayout>
  );
};

export default Configuracoes;
