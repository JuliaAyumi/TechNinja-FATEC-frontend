import { useNavigate } from 'react-router-dom';
import arrowRight from '@assets/icons/icon-arrow-right.png';
import './SettingsOption.css';

const SettingsOption = ({ option, to }) => {
  const navigate = useNavigate();

  return (
    <div className='settings-option' onClick={() => navigate(to)}>
      <p className='settings-option-text'>{option}</p>
      <img
        src={arrowRight}
        alt='Arrow Right'
        className='settings-option-arrow'
      />
    </div>
  );
};

export default SettingsOption;
