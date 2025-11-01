import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import iconUsuario from '@assets/images/logoDark.png';
import badgePrimeiroQuizLinguagem from '@assets/icons/primeiro_quiz_linguagem-programacao.png';
import badgePrimeiroQuizLogica from '@assets/icons/primeiro_quiz_logica-programacao.png';
import badgePrimeiroQuizModelagem from '@assets/icons/primeiro_quiz_modelagem-dados.png';
import badgeQuizPerfeito from '@assets/icons/quiz_perfeito.png';
import badgePerfilFoto from '@assets/icons/perfil_foto.png';
import useUserData from '@hooks/UseUserData';
import PageLayout from '@ui/layout/PageLayout/PageLayout';
import Button from '@ui/components/Button/Button';
import LoadingScreen from '@ui/components/LoadingScreen/LoadingScreen';
import AchievementsView from '@ui/components/AchievementsView/AchievementsView';
import './Perfil.css';

const Perfil = () => {
  const tokenString = localStorage.getItem('user');
  const tokenArray = JSON.parse(tokenString);
  const token = tokenArray[0];

  const { userData, loading, refetch } = useUserData(token);
  const navigate = useNavigate();

  const badgeImages = useMemo(
    () => ({
      'primeiro_quiz_linguagem-programacao': badgePrimeiroQuizLinguagem,
      'primeiro_quiz_logica-programacao': badgePrimeiroQuizLogica,
      'primeiro_quiz_modelagem-dados': badgePrimeiroQuizModelagem,
      quiz_perfeito: badgeQuizPerfeito,
      perfil_foto: badgePerfilFoto,
    }),
    [],
  );

  const userBadgeImages = useMemo(() => {
    if (!userData.badges || !Array.isArray(userData.badges)) return [];

    return userData.badges
      .map((badgeName) => badgeImages[badgeName])
      .filter((img) => img !== undefined);
  }, [userData.badges, badgeImages]);

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
      <main className='layout-app-page main-perfil'>
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
                <AchievementsView badges={userBadgeImages} />
              </div>
            </div>
          </div>
        )}
      </main>
    </PageLayout>
  );
};

export default Perfil;
