import './Perfil.css';
import iconUsuario from '@assets/images/logoDark.png';
import iconPodio from '@assets/icons/podio.png';
import iconDiadema from '@assets/icons/coroa.png';
import iconLiteratura from '@assets/icons/taca-de-ouro.png';
import xp from '@assets/icons/placar.png';
import quizzes from '@assets/icons/pontuacao-maxima.png';
import useUserData from '@hooks/UseUserData';
import Sidebar from '../../ui/components/Sidebar/Sidebar';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import useMediaQuery from '@hooks/UseMediaQuery';

const Perfil = () => {
  const tokenString = localStorage.getItem('user');
  const tokenArray = JSON.parse(tokenString);
  const token = tokenArray[0];
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { userData, loading } = useUserData(token);
  const quizzesCompletados = userData?.quizzesCompletados?.length || 0;

  return (
    <div>
      {isMobile ? <HeaderArrowBack to={'/home'} /> : <Sidebar to={'/home'} />}
      <main className='main-perfil'>
        {loading ? (
          <div className='loading-container'>
            <p>Carregando...</p>
          </div>
        ) : (
          <div className='user-info'>
            <img
              src={userData.avatar || iconUsuario}
              alt='Icon Usuario'
              className='iconUsuario'
            />
            <h2 id='perfil' className='user-name'>
              {userData.nome || 'Nome do usuário'}
            </h2>
            <p id='email' className='user-email'>
              {userData.email || 'Email do usuário'}
            </p>

            <h2>Pontuação</h2>
            <div className='stats-info'>
              <p className='stats-text'>
                <img src={xp} alt='icone xp' className='icone-xp' />
                {userData.pontuacao || 0} xp
              </p>
              <p className='stats-text'>
                <img
                  src={quizzes}
                  alt='icone quizzes'
                  className='icone-quizzes'
                />
                {quizzesCompletados} quizzes completos
              </p>
            </div>

            <h2>Conquistas</h2>
            <div className='awards-info'>
              <img src={iconPodio} alt='Foto Conquista' />
              <img src={iconDiadema} alt='Foto Conquista' />
              <img src={iconLiteratura} alt='Foto Conquista' />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Perfil;
