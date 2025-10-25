import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@hooks/AuthContext';
import { showToast } from '@ui/components/ConfirmToast';
import { Toaster } from 'react-hot-toast';
import { getLevels, getCompletedQuizzes } from '@services/quiz';
import Sidebar from '@ui/components/Sidebar/Sidebar';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import useMediaQuery from '@hooks/UseMediaQuery';
import LevelCard from '@ui/components/LevelCard/LevelCard';
import logo from '@assets/images/logoDark.png';
import './Quizzes.css';

const Quizzes = () => {
  const { area, subtema } = useParams();
  const { user } = useAuth();
  const [dificuldades, setDificuldades] = useState([]);
  const [quizzesCompletados, setQuizzesCompletados] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleQuizClick = (event, isCompleted, subtema, dificuldade) => {
    if (isCompleted) {
      event.preventDefault();
      showToast(subtema, dificuldade, () =>
        navigate(`/quizzes/${area}/${subtema}/${dificuldade}`),
      );
    } else {
      navigate(`/quizzes/${area}/${subtema}/${dificuldade}`);
    }
  };

  useEffect(() => {
    const fetchDificuldades = async () => {
      try {
        const data = await getLevels(area, subtema);

        const dificuldadeOrder = ['facil', 'medio', 'dificil'];
        data.sort(
          (a, b) => dificuldadeOrder.indexOf(a) - dificuldadeOrder.indexOf(b),
        );

        setDificuldades(data);
      } catch (error) {
        console.error('Erro ao buscar dificuldades:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchQuizzesCompletados = async () => {
      try {
        const data = await getCompletedQuizzes(user);
        setQuizzesCompletados(data.quizzesCompletados);
      } catch (error) {
        console.error('Erro ao buscar quizzes completados:', error);
      }
    };

    fetchDificuldades();
    fetchQuizzesCompletados();
  }, [subtema, area, user]);

  return (
    <div>
      {isMobile ? (
        <HeaderArrowBack to={`/quizzes/${area}`} />
      ) : (
        <Sidebar to={`/quizzes/${area}`} />
      )}
      <main className='body-quizzes'>
        {loading ? (
          <div className='loading-screen'>
            <img src={logo} alt='Logo TechNinja' className='logo-loading' />
            <p>Carregando...</p>
          </div>
        ) : dificuldades.length > 0 ? (
          dificuldades.map((dificuldade) => {
            const quizId = `${area}-${subtema}-${dificuldade}`;
            const isCompleted = quizzesCompletados.includes(quizId);

            return (
              <LevelCard
                key={dificuldade}
                area={area}
                subtema={subtema}
                dificuldade={dificuldade}
                isCompleted={isCompleted}
                onClick={(event) =>
                  handleQuizClick(event, isCompleted, subtema, dificuldade)
                }
              />
            );
          })
        ) : (
          <p>Nenhuma dificuldade encontrada</p>
        )}
      </main>
      <Toaster />
    </div>
  );
};

export default Quizzes;
