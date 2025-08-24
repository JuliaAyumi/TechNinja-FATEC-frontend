import { Link } from 'react-router-dom';
import iconBack from '@assets/icons/icon-back.png';
import './HeaderArrowBack.css';

const HeaderArrowBack = ({ to }) => {
  return (
    <header id='headerArrowBack'>
      <div className='headerArrowBack-options'>
        <Link to={to}>
          <img src={iconBack} title='Voltar' alt='Icone Voltar' />
        </Link>
      </div>
    </header>
  );
};

export default HeaderArrowBack;
