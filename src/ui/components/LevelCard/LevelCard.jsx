import { Link } from 'react-router-dom';
import { formatarTexto } from '@utils/formatarTexto';
import './LevelCard.css';

const LevelCard = ({ area, subtema, dificuldade, isCompleted, onClick }) => {
  const getDifficultyClass = () => {
    switch (dificuldade) {
      case 'facil':
        return 'easy';
      case 'medio':
        return 'medium';
      case 'dificil':
        return 'hard';
      default:
        return 'easy';
    }
  };

  return (
    <Link
      to={`/quizzes/${area}/${subtema}/${dificuldade}`}
      className={`level-card ${getDifficultyClass()} ${isCompleted ? 'completed' : ''}`}
      onClick={onClick}
    >
      <h1>{formatarTexto(dificuldade)}</h1>
    </Link>
  );
};

export default LevelCard;
