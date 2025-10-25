import { Link } from 'react-router-dom';
import { formatarTexto } from '@utils/formatarTexto';
import subthemeIcon from '@assets/icons/subtheme.png';
import Points from '@ui/components/Points/Points';
import './SubthemeCard.css';

const SubthemeCard = ({
  area,
  subtema,
  points,
  dificuldade,
  isCompleted = false,
  onQuizClick,
  title,
  to,
  variant = 'default',
}) => {
  const handleClick = (event) => {
    if (onQuizClick) {
      onQuizClick(event, isCompleted, subtema, dificuldade);
    }
  };

  const linkTo = to || `/quizzes/${area}/${subtema}/${dificuldade}`;
  const displayTitle = title || formatarTexto(dificuldade);

  return (
    <Link
      to={linkTo}
      className={`quiz ${variant} ${isCompleted ? 'completed' : ''}`}
      onClick={handleClick}
    >
      {variant === 'subtema' && (
        <div className='quiz-icon'>
          <img src={subthemeIcon} alt='Ícone do subtema' />
        </div>
      )}
      <h1>{displayTitle}</h1>
      <Points points={points} />
    </Link>
  );
};

export default SubthemeCard;
