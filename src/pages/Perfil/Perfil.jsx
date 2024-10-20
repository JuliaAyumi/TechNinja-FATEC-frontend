import "./Perfil.css";
import HeaderArrowBack from "../../components/HeaderArrowBack/HeaderArrowBack";
import iconUsuario from "../../assets/icons/Shrek.png";
import iconPodio from "../../assets/icons/podio.png";
import iconDiadema from "../../assets/icons/diadema.png";
import iconLiteratura from "../../assets/icons/literatura.png";

const Perfil = () => {
  return (
    <div>
      <HeaderArrowBack to={'/home'}/>

      <main className="main-perfil">
        <div className="user-info">
          <img src={iconUsuario} alt="Icon Usuario" />
          <h2 id="perfil" className="user-name">
            Shrek
          </h2>
          <p id="email" className="user-email">
            shrek@ogre.com
          </p>

          <h2>Estatísticas</h2>
          <div className="stats-info">
            <p className="stats-text">1000 Total de Xp ✨</p>
            <p className="stats-text">3 Cursos Concluídos 👨‍🎓</p>
          </div>

          <h2>Conquistas</h2>
          <div className="awards-info">
            <img src={iconPodio} alt="Foto Conquista" />
            <img src={iconDiadema} alt="Foto Conquista" />
            <img src={iconLiteratura} alt="Foto Conquista" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Perfil;
