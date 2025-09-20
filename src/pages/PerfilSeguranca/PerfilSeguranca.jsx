import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import Sidebar from '@ui/components/Sidebar/Sidebar';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import useMediaQuery from '@hooks/UseMediaQuery';
import AccessibilityOption from '../../ui/components/AccessibilityOption/AccessibilityOption';
import Button from '../../ui/components/Button/Button';
import './PerfilSeguranca.css';

const PerfilSeguranca = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [twoFactorAuth, setTwoFactorAuth] = useState(
    localStorage.getItem('twoFactorAuth') === 'enabled',
  );

  useEffect(() => {
    const savedTwoFactor = localStorage.getItem('twoFactorAuth');
    if (savedTwoFactor) {
      setTwoFactorAuth(savedTwoFactor === 'enabled');
    }
  }, []);

  const toggleTwoFactorAuth = () => {
    const newMode = twoFactorAuth ? 'disabled' : 'enabled';
    setTwoFactorAuth(!twoFactorAuth);
    localStorage.setItem('twoFactorAuth', newMode);

    if (!twoFactorAuth) {
      toast.success('Autenticação de dois fatores ativada!');
    } else {
      toast.success('Autenticação de dois fatores desativada!');
    }
  };

  const handleSalvar = () => {
    toast.success('Configurações de segurança salvas!');
  };

  return (
    <div>
      {isMobile ? (
        <HeaderArrowBack to={'/configuracoes'} />
      ) : (
        <Sidebar to={'/configuracoes'} />
      )}
      <main className='main-seguranca'>
        <div className='seguranca-container'>
          <AccessibilityOption
            option='Autenticação de dois fatores'
            isEnabled={twoFactorAuth}
            onToggle={toggleTwoFactorAuth}
          />
          <Button
            className='button-salvar'
            option='Salvar'
            onClick={handleSalvar}
          />
        </div>
        <Toaster />
      </main>
    </div>
  );
};

export default PerfilSeguranca;
