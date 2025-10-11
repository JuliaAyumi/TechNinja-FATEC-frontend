import './RankingUserCard.css';
import UserProfileIcon from '@components/UserProfileIcon/UserProfileIcon';

const RankingUserCard = ({ image, name, position, pontuacao }) => {
  return (
    <div className='ranking-user-card'>
      <div className='ranking-user-card-position'>{position}°</div>
      <div className='ranking-user-card-avatar'>
        <UserProfileIcon
          image={image}
          name={name}
          position={position}
          badge={null}
        />
      </div>
      <div className='ranking-user-card-info'>
        <span className='ranking-user-card-name'>{name}</span>
        <span className='ranking-user-card-score'>{pontuacao} pontos</span>
      </div>
    </div>
  );
};

export default RankingUserCard;
