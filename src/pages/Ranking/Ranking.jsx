import { useEffect, useState } from 'react';
import { getRanking } from '@services/ranking';
import UserProfileIcon from '@components/UserProfileIcon/UserProfileIcon';
import RankingUserCard from '@components/RankingUserCard/RankingUserCard';
import Sidebar from '@ui/components/Sidebar/Sidebar';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import useMediaQuery from '@hooks/UseMediaQuery';
import './Ranking.css';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getRanking();
        setRanking(data || []);
      } catch (error) {
        console.error('Erro ao carregar ranking:', error);
        setRanking([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  if (loading) {
    return (
      <div className='ranking-container'>
        <h1 className='ranking-title'>Ranking</h1>
        <div className='ranking-loading'>Carregando ranking...</div>
      </div>
    );
  }

  return (
    <div className='ranking-container'>
      {isMobile ? (
        <HeaderArrowBack to={'/configuracoes'} />
      ) : (
        <Sidebar to={'/configuracoes'} />
      )}
      <h1 className='ranking-title'>Ranking</h1>
      <div className='ranking-list'>
        {ranking.length > 0 ? (
          ranking.map((user) => {
            const position = parseInt(user.ranking);

            if (position <= 3) {
              return (
                <UserProfileIcon
                  key={user._id}
                  image={user.avatar}
                  name={user.nome}
                  position={user.ranking}
                  badge={null}
                />
              );
            }

            return (
              <RankingUserCard
                key={user._id}
                image={user.avatar}
                name={user.nome}
                position={user.ranking}
                pontuacao={user.pontuacao}
              />
            );
          })
        ) : (
          <div className='ranking-empty'>
            <p>Nenhum usuário encontrado no ranking.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ranking;
