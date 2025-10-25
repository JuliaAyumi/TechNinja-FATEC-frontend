import './Perfil.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import iconUsuario from '@assets/images/logoDark.png';
import iconPodio from '@assets/icons/podio.png';
import iconDiadema from '@assets/icons/coroa.png';
import iconLiteratura from '@assets/icons/taca-de-ouro.png';
import useUserData from '@hooks/UseUserData';
import PageLayout from '@ui/layout/PageLayout/PageLayout';
import Button from '@ui/components/Button/Button';
import LoadingScreen from '../../ui/components/LoadingScreen/LoadingScreen';

const Perfil = () => {
  const tokenString = localStorage.getItem('user');
  const tokenArray = JSON.parse(tokenString);
  const token = tokenArray[0];

  const { userData, loading, refetch } = useUserData(token);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserDataUpdate = () => {
      refetch();
    };

    window.addEventListener('userDataUpdated', handleUserDataUpdate);

    return () => {
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
    };
  }, [refetch]);
  return (
    <PageLayout backTo='/home'>
      <main className='main-perfil'>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className='perfil-container'>
            <div className='perfil-card'>
              <div className='perfil-main-row'>
                <div className='perfil-left-section'>
                  <div className='perfil-avatar'>
                    <img
                      src={userData.avatar || iconUsuario}
                      alt='Avatar do usuário'
                      className='avatar-img'
                    />
                  </div>
                  <div className='perfil-info'>
                    <h1 className='perfil-nome'>
                      {userData.nome || 'refatorando essa bagaça'}
                    </h1>
                    <p className='perfil-xp'>{userData.pontuacao || 1926} XP</p>
                    <div className='perfil-status'>
                      <div className='status-dot'></div>
                      Online
                    </div>
                  </div>
                </div>

                <div className='perfil-right-section'>
                  <Button
                    type='tertiary'
                    size='small'
                    option='Editar'
                    onClick={() => navigate('/configuracoes')}
                  />
                </div>
              </div>
            </div>

            <div className='conquistas-section'>
              <h2 className='conquistas-title'>Conquistas</h2>
              <div className='conquistas-content'>
                <div className='conquistas-grid'>
                  <div className='conquista-item'>
                    <img src={iconPodio} alt='Conquista Pódio' />
                  </div>
                  <div className='conquista-item'>
                    <img src={iconDiadema} alt='Conquista Diadema' />
                  </div>
                  <div className='conquista-item'>
                    <img src={iconLiteratura} alt='Conquista Literatura' />
                  </div>
                </div>
                <button className='ver-mais-btn'>Ver mais</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </PageLayout>
  );
};

export default Perfil;
