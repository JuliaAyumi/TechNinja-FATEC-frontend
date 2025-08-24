import { Link } from 'react-router-dom';
import './AreaConhecimentoCard.css';

const AreaConhecimentoCard = ({ title, icon }) => {
  return (
    <main>
      <Link to='/quizzes' className='area-conhecimento'>
        <div id='ac1' onClick="window.location.href='../Quizes/quizes.html'">
          <h1>{title}</h1>
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
