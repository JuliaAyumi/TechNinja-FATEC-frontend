import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import PageLayout from '@ui/layout/PageLayout/PageLayout';
import AccessibilityOption from '@ui/components/AccessibilityOption/AccessibilityOption';
import Button from '@ui/components/Button/Button';
import './PerfilSeguranca.css';

const PerfilSeguranca = () => {
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
    <PageLayout backTo='/configuracoes'>
      <main className='layout-app-page main-seguranca'>
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
    </PageLayout>
  );
};

export default PerfilSeguranca;
