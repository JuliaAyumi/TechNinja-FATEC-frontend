import { useEffect, useState } from 'react';
import { getRanking } from '@services/ranking';
import UserProfileIcon from '@components/UserProfileIcon/UserProfileIcon';
import RankingUserCard from '@components/RankingUserCard/RankingUserCard';
import PageLayout from '@ui/layout/PageLayout/PageLayout';
import LoadingScreen from '@ui/components/LoadingScreen/LoadingScreen';
import './Ranking.css';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchRanking();
  }, []);

  useEffect(() => {
    const handleUserDataUpdate = () => {
      fetchRanking();
    };

    window.addEventListener('userDataUpdated', handleUserDataUpdate);

    return () => {
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
    };
  }, []);

  if (loading) {
    return (
      <PageLayout backTo='/configuracoes'>
        <div className='ranking-container'>
          <h1 className='ranking-title'>Ranking</h1>
          <LoadingScreen />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout backTo='/configuracoes'>
      <div className='ranking-container'>
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
                    pontuacao={user.pontuacao}
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
    </PageLayout>
  );
};

export default Ranking;
