import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/logoDark.png';
import './Inicial.css';

const Inicial = () => {
  return (
    <>
      <Header />

      <main className='main-inicial'>
        <div className='inicial-left-column'>
          <h1>
            Bem vindo(a) ao TechNinja! Aqui você pode realizar seu cadastro ou
            acessar uma conta já cadastrada.
          </h1>

          <Link to='/login'>
            <Button className='button1' option={'Entrar'} />
          </Link>

          <Link to='/cadastrar'>
            <Button className='button1' option={'Cadastrar'} />
          </Link>
        </div>

        <div className='inicial-right-column'>
          <img src={logo} alt='TechNinja logo' className='main-image' />
        </div>
      </main>
    </>
  );
};

export default Inicial;
