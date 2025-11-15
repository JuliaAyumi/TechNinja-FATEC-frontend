import './UserProfileIcon.css';
import logo from '@assets/images/logoDark.png';
import goldenBadge from '@assets/icons/golden.png';
import silverBadge from '@assets/icons/silver.png';
import bronzeBadge from '@assets/icons/bronze.png';

const UserProfileIcon = ({ image, name, position, badge, pontuacao }) => {
  const getBadgeForPosition = (pos) => {
    switch (pos) {
      case 1:
      case '1':
        return goldenBadge;
      case 2:
      case '2':
        return silverBadge;
      case 3:
      case '3':
        return bronzeBadge;
      default:
        return badge;
    }
  };

  const badgeToShow = getBadgeForPosition(position);

  return (
    <div className='user-profile-icon' data-position={position}>
      <div className='user-profile-icon-position'>{position}°</div>
      <div className='user-profile-icon-avatar-container'>
        <img
          src={image || logo}
          alt={`Avatar de ${name}`}
          className='user-profile-icon-image'
        />
        {badgeToShow && (
          <img
            src={badgeToShow}
            alt={`Badge ${position}° lugar`}
            className='user-profile-icon-badge'
          />
        )}
      </div>
      <p className='user-profile-icon-name'>{name}</p>
      {pontuacao !== undefined && (
        <p className='user-profile-icon-score'>{pontuacao} pontos</p>
      )}
    </div>
  );
};

export default UserProfileIcon;
