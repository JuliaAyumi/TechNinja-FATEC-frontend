import './Login.css';
import Header from '@ui/layout/Header/Header';
import { useAuth } from '@hooks/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import logo from '@assets/images/logoDark.png';
import Button from '@ui/components/Button/Button';
import Form from '@ui/components/Form/Form';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    const userData = {
      email: email,
      senha: password,
    };

    try {
      await login(userData);
    } catch (error) {
      console.error('Erro no login:', error);
    } finally {
      setTimeout(() => setIsButtonDisabled(false), 2000);
    }
  };

  return (
    <div>
      <Header />
      <main className='main-login'>
        <div className='left-column'>
          <img src={logo} alt='TechNinja logo' className='login-main-image' />
        </div>

        <div className='right-column'>
          <form id='login-form' className='form-login' onSubmit={handleLogin}>
            <div className='error-message' id='error-message'></div>
            <Form
              type='email'
              placeholder='Email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form
              type='password'
              placeholder='Senha'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type='action'
              buttonType='submit'
              option={isButtonDisabled ? 'Aguarde...' : 'Entrar'}
              disabled={isButtonDisabled}
            />
            <Link to='/esqueceu' className='esqueceu'>
              <p className='esqueceu-text'>Esqueceu a senha?</p>
            </Link>
          </form>
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Login;
