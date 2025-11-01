import './AchievementsView.css';

const AchievementsView = ({ badges = [], limit = null, onViewMore }) => {
  const displayBadges = limit ? badges.slice(0, limit) : badges;

  if (badges.length === 0) {
    return (
      <div className='achievements-empty'>
        <p>Nenhuma conquista ainda. Complete quizzes para ganhar badges!</p>
      </div>
    );
  }

  return (
    <div className='achievements-container'>
      <div className='achievements-grid'>
        {displayBadges.map((badge, index) => (
          <div key={index} className='achievement-item'>
            <img src={badge} alt={`Badge ${index + 1}`} />
          </div>
        ))}
      </div>
      {limit && badges.length > limit && onViewMore && (
        <button className='ver-mais-btn' onClick={onViewMore}>
          Ver mais
        </button>
      )}
    </div>
  );
};

export default AchievementsView;
