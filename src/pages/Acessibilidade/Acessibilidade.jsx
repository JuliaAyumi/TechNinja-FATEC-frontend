import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './Acessibilidade.css';
import Sidebar from '@ui/components/Sidebar/Sidebar';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import useMediaQuery from '@hooks/UseMediaQuery';
import AccessibilityOption from '../../ui/components/AccessibilityOption/AccessibilityOption';
import Button from '../../ui/components/Button/Button';
import { toast } from 'react-hot-toast';

const Acessibilidade = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();

  const [modoEscuro, setModoEscuro] = useState(
    localStorage.getItem('accessibilityMode') === 'dark-mode',
  );
  const [modoDaltonico, setModoDaltonico] = useState(
    localStorage.getItem('daltonicoMode') === 'daltonico',
  );
  const [modoBaixaVisao, setModoBaixaVisao] = useState(
    localStorage.getItem('baixaVisaoMode') === 'baixa-visao',
  );

  const applyAccessibilityMode = useCallback(() => {
    const accessibilityMode = localStorage.getItem('accessibilityMode');
    const daltonicoMode = localStorage.getItem('daltonicoMode');
    const baixaVisaoMode = localStorage.getItem('baixaVisaoMode');

    if (
      ['/', '/login', '/cadastrar', '/esqueceu'].includes(location.pathname)
    ) {
      document.body.classList.remove('dark-mode', 'daltonico', 'baixa-visao');
    } else {
      if (accessibilityMode === 'dark-mode') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }

      if (daltonicoMode === 'daltonico') {
        document.body.classList.add('daltonico');
      } else {
        document.body.classList.remove('daltonico');
      }

      if (baixaVisaoMode === 'baixa-visao') {
        document.body.classList.add('baixa-visao');
      } else {
        document.body.classList.remove('baixa-visao');
      }
    }
  }, [location]);

  useEffect(() => {
    applyAccessibilityMode();
  }, [applyAccessibilityMode]);

  const toggleDarkMode = () => {
    const newMode = modoEscuro ? 'light-mode' : 'dark-mode';
    setModoEscuro(!modoEscuro);
    localStorage.setItem('accessibilityMode', newMode);
    applyAccessibilityMode();
  };

  const toggleDaltonicoMode = () => {
    const newMode = modoDaltonico ? 'light-mode' : 'daltonico';
    setModoDaltonico(!modoDaltonico);
    localStorage.setItem('daltonicoMode', newMode);
    applyAccessibilityMode();
  };

  const toggleBaixaVisaoMode = () => {
    const newMode = modoBaixaVisao ? 'light-mode' : 'baixa-visao';
    setModoBaixaVisao(!modoBaixaVisao);
    localStorage.setItem('baixaVisaoMode', newMode);
    applyAccessibilityMode();
  };

  const handleSalvar = () => {
    toast.success('Configurações de acessibilidade salvas!');
  };

  return (
    <div>
      {isMobile ? (
        <HeaderArrowBack to={'/configuracoes'} />
      ) : (
        <Sidebar to={'/configuracoes'} />
      )}
      <main className='main-acessibilidade'>
        <div className='acessibilidade-container'>
          <AccessibilityOption
            option='Modo Daltônico'
            isEnabled={modoDaltonico}
            onToggle={toggleDaltonicoMode}
          />
          <AccessibilityOption
            option='Modo Baixa Visão'
            isEnabled={modoBaixaVisao}
            onToggle={toggleBaixaVisaoMode}
          />
          <Button
            className='button-salvar'
            option='Salvar'
            onClick={handleSalvar}
          />
        </div>
      </main>
    </div>
  );
};

export default Acessibilidade;
