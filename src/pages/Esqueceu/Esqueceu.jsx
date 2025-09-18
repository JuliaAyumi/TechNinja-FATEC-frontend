import { useState } from 'react';
import Header from '@ui/layout/Header/Header';
import Form from '@ui/components/Form/Form';
import Button from '@ui/components/Button/Button';
import usePasswordReset from '@hooks/UsePasswordReset';
import logo from '@assets/images/logoDark.png';
import './Esqueceu.css';

const Esqueceu = () => {
  const [email, setEmail] = useState('');
  const { resetPassword } = usePasswordReset();

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await resetPassword(email);
  };

  return (
    <div>
      <Header />

      <main id='mainEsqueceu'>
        <div className='left-column'>
          <img src={logo} alt='TechNinja logo' className='mainEsqueceu-image' />
        </div>

        <div className='right-column'>
          <h1>
            Identifique-se para receber um e-mail com as instruções e o link
            para modificar sua senha
          </h1>
          <form id='forgot-form' onSubmit={handleSubmit}>
            <Form
              type='email'
              placeholder='Email'
              value={email}
              onChange={handleInputChange}
              required
            />
            <Button option='Enviar email' buttonType='submit' />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Esqueceu;
