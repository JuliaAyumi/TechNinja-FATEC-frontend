import './Perfil.css';
import { useNavigate } from 'react-router-dom';
import iconUsuario from '@assets/images/logoDark.png';
import iconPodio from '@assets/icons/podio.png';
import iconDiadema from '@assets/icons/coroa.png';
import iconLiteratura from '@assets/icons/taca-de-ouro.png';
import useUserData from '@hooks/UseUserData';
import Sidebar from '../../ui/components/Sidebar/Sidebar';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import useMediaQuery from '@hooks/UseMediaQuery';
import Button from '@ui/components/Button/Button';

const Perfil = () => {
  const tokenString = localStorage.getItem('user');
  const tokenArray = JSON.parse(tokenString);
  const token = tokenArray[0];
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { userData, loading } = useUserData(token);
  const navigate = useNavigate();
  return (
    <div>
      {isMobile ? <HeaderArrowBack to={'/home'} /> : <Sidebar to={'/home'} />}
      <main className='main-perfil'>
        {loading ? (
          <div className='loading-container'>
            <p>Carregando...</p>
          </div>
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
    </div>
  );
};

export default Perfil;
