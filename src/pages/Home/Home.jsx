import { Link } from 'react-router-dom';
import HeaderHome from '../../components/HeaderHome/HeaderHome';
import IconLinguagemProgramacao from '../../assets/icons/icon-linguagem-de-programacao.svg';
import IconSistemasOperacionais from '../../assets/icons/icon-sistemas-operacionais.svg';
import IconModelagemDados from '../../assets/icons/icon-modelagem-de-dados.svg';
import './Home.css';

const Home = () => {
  const areas = [
    {
      name: 'linguagem-programacao',
      title: 'Linguagem de Programação',
      icon: IconLinguagemProgramacao,
    },
    {
      name: 'logica-programacao',
      title: 'Lógica de Programação',
      icon: IconSistemasOperacionais,
    },
    {
      name: 'modelagem-dados',
      title: 'Modelagem de Dados',
      icon: IconModelagemDados,
    },
  ];

  return (
    <div>
      <HeaderHome />
      <main className='main-home'>
        {areas.map((area) => (
          <Link
            key={area.name}
            to={`/quizzes/${area.name}`}
            className='area-conhecimento'
          >
            <div id={`ac-${area.name}`}>
              <h1>{area.title}</h1>
              <img
                src={area.icon}
                alt={`Ícone da área de conhecimento de ${area.title}`}
              />
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Home;
