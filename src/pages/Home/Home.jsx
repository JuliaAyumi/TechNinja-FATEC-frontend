import { Link } from "react-router-dom";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import "./Home.css";

const Home = () => {
  const areas = [
    {
      name: "historia-tecnologia",
      title: "História da Tecnologia",
      icon: "icon-sistemas-operacionais.svg",
    },
    {
      name: "linguagem-programacao",
      title: "Linguagem de Programação",
      icon: "icon-linguagem-de-programacao.svg",
    },
    {
      name: "modelagem-dados",
      title: "Modelagem de Dados",
      icon: "icon-modelagem-de-dados.svg",
    },
  ];

  return (
    <div>
      <HeaderHome />
      <main className="main-home">
        {areas.map((area) => (
          <Link
            key={area.name}
            to={`/quizzes/${area.name}`}
            className="area-conhecimento"
          >
            <div id={`ac-${area.name}`}>
              <h1>{area.title}</h1>
              <img
                src={`src/assets/icons/${area.icon}`}
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
