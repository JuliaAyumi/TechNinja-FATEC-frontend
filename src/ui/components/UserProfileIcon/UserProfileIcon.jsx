import './UserProfileIcon.css';
import logo from '@assets/images/logoDark.png';

const UserProfileIcon = ({ image, name, position, badge }) => {
  const getBadgeForPosition = (pos) => {
    switch (pos) {
      case 1:
      case '1':
        return '/src/assets/icons/golden.png';
      case 2:
      case '2':
        return '/src/assets/icons/silver.png';
      case 3:
      case '3':
        return '/src/assets/icons/bronze.png';
      default:
        return badge;
    }
  };

  const badgeToShow = getBadgeForPosition(position);

  return (
    <div className='user-profile-icon'>
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
    </div>
  );
};

export default UserProfileIcon;
