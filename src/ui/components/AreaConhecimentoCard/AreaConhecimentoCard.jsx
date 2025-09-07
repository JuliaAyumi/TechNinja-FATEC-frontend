import { Link } from 'react-router-dom';
import './AreaConhecimentoCard.css';

const AreaConhecimentoCard = ({ title, description, icon, to }) => {
  return (
    <main>
      <Link to={to} className='area-conhecimento'>
        <div id='ac1'>
          <h1>{title}</h1>
          <p>{description}</p>
          <img
            src={icon}
            alt={`Ícone de um computador para ir para a área de conhecimento de ${title}`}
          />
        </div>
      </Link>
    </main>
  );
};

export default AreaConhecimentoCard;
