import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Subtemas.css';
import Sidebar from '@ui/components/Sidebar/Sidebar';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import useMediaQuery from '@hooks/UseMediaQuery';
import { formatarTexto } from '@utils/formatarTexto';
import { getSubThemes } from '@services/quiz';
import SubthemeCard from '@ui/components/SubthemeCard/SubthemeCard';
import LoadingScreen from '@ui/components/LoadingScreen/LoadingScreen';

const Subtemas = () => {
  const { area } = useParams();
  const [subtemas, setSubtemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const fetchSubtemas = async () => {
      try {
        const data = await getSubThemes(area);
        setSubtemas(data);
      } catch (error) {
        console.error('Erro ao buscar subtemas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubtemas();
  }, [area]);

  if (loading) {
    return (
      <div>
        {isMobile ? <HeaderArrowBack to={`/home`} /> : <Sidebar to={`/home`} />}
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div>
      {isMobile ? <HeaderArrowBack to={`/home`} /> : <Sidebar to={`/home`} />}
      <main className='body-subtemas'>
        {subtemas.length > 0 ? (
          subtemas.map((item) => (
            <SubthemeCard
              key={item.subtema}
              area={area}
              title={item.subtema ? formatarTexto(item.subtema) : 'Subtema'}
              points={item.pontos}
              to={`/quizzes/${area}/${item.subtema}`}
              variant='subtema'
            />
          ))
        ) : (
          <p>Nenhum subtema encontrado</p>
        )}
      </main>
    </div>
  );
};

export default Subtemas;
