import IconLinguagemProgramacao from '@assets/icons/icon-linguagem-de-programacao.svg';
import IconSistemasOperacionais from '@assets/icons/icon-sistemas-operacionais.svg';
import IconModelagemDados from '@assets/icons/icon-modelagem-de-dados.svg';
import Sidebar from '@ui/components/Sidebar/Sidebar';
import HeaderHome from '@ui/layout/HeaderHome/HeaderHome';
import AreaConhecimentoCard from '../../ui/components/AreaConhecimentoCard/AreaConhecimentoCard';
import useMediaQuery from '@hooks/UseMediaQuery';
import './Home.css';

const Home = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const areas = [
    {
      name: 'linguagem-programacao',
      title: 'Linguagem de Programação',
      description:
        'Aprenda as bases e técnicas de programação para criar aplicações robustas e eficientes',
      icon: IconLinguagemProgramacao,
    },
    {
      name: 'logica-programacao',
      title: 'Lógica de Programação',
      description:
        'Desenvolva o raciocínio lógico essencial para resolver problemas complexos de forma estruturada',
      icon: IconSistemasOperacionais,
    },
    {
      name: 'modelagem-dados',
      title: 'Modelagem de Dados',
      description:
        'Entenda como organizar e representar dados de maneira eficiente e escalável para sistemas complexos',
      icon: IconModelagemDados,
    },
  ];

  return (
    <div>
      {isMobile ? <HeaderHome /> : <Sidebar />}
      <main className='main-home'>
        {areas.map((area) => (
          <AreaConhecimentoCard
            key={area.name}
            title={area.title}
            description={area.description}
            icon={area.icon}
            to={`/quizzes/${area.name}`}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
