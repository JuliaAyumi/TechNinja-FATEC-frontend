import logo from '@assets/images/logoDark.png';
import './LoadingScreen.css';

const LoadingScreen = ({ message = 'Carregando...' }) => {
  return (
    <div className='loading-screen'>
      <img src={logo} alt='Logo TechNinja' className='logo-loading' />
      <p>{message}</p>
    </div>
  );
};

export default LoadingScreen;
