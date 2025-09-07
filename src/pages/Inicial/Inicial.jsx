import { Link } from 'react-router-dom';
import Button from '@ui/components/Button/Button';
import Header from '@ui/layout/Header/Header';
import logo from '@assets/images/logoDark.png';
import './Inicial.css';

const Inicial = () => {
  return (
    <>
      <Header />

      <main className='main-inicial'>
        <div className='inicial-left-column'>
          <h1>Desafie seu conhecimento em tecnologia com o TechNinja</h1>

          <Link to='/cadastrar'>
            <Button type='action' option={'Cadastrar'} />
          </Link>

          <Link to='/login'>
            <Button type='secondary' option={'Já tenho uma conta'} />
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
