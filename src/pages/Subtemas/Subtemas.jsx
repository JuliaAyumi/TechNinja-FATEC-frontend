import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Subtemas.css';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import { formatarTexto } from '@utils/formatarTexto';
import logo from '@assets/images/logoDark.png';

const Subtemas = () => {
  const { area } = useParams();
  const [subtemas, setSubtemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubtemas = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_MODE === 'development'
              ? `http://localhost:${import.meta.env.VITE_PORT}`
              : import.meta.env.VITE_HEROKU_LINK
          }/api/quiz/${area}`,
        );
        const data = await response.json();
        setSubtemas(data);
      } catch (error) {
        console.error('Erro ao buscar subtemas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubtemas();
  }, [area]);

  return (
    <div>
      <HeaderArrowBack to={`/home`} />
      <main className='body-quizzes'>
        {loading ? (
          <div className='loading-screen'>
            <img src={logo} alt='Logo TechNinja' className='logo-loading' />
            <p>Carregando...</p>
          </div>
        ) : subtemas.length > 0 ? (
          subtemas.map((item) => (
            <Link
              className='quiz'
              key={item.subtema}
              to={`/quizzes/${area}/${item.subtema}`}
            >
              <h1>{item.subtema ? formatarTexto(item.subtema) : 'Subtema'}</h1>
            </Link>
          ))
        ) : (
          <p>Nenhum subtema encontrado</p>
        )}
      </main>
    </div>
  );
};

export default Subtemas;
