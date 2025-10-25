import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './PerfilAcessibilidade.css';
import PageLayout from '@ui/layout/PageLayout/PageLayout';
import AccessibilityOption from '../../ui/components/AccessibilityOption/AccessibilityOption';
import Button from '../../ui/components/Button/Button';
import { toast } from 'react-hot-toast';

const PerfilAcessibilidade = () => {
  const location = useLocation();

  const [toggles, setToggles] = useState({
    daltonico: false,
    baixaVisao: false,
  });

  const loadSavedSettings = useCallback(() => {
    const settings = {
      daltonico: localStorage.getItem('daltonicoMode') === 'daltonico',
      baixaVisao: localStorage.getItem('baixaVisaoMode') === 'baixa-visao',
    };

    setToggles(settings);
    return settings;
  }, []);

  const applyAccessibilityModes = useCallback(
    (settings) => {
      const isPublicPage = ['/', '/login', '/cadastrar', '/esqueceu'].includes(
        location.pathname,
      );

      if (isPublicPage) {
        document.body.classList.remove('daltonico', 'baixa-visao');
        return;
      }

      document.body.classList.toggle('daltonico', settings.daltonico);
      document.body.classList.toggle('baixa-visao', settings.baixaVisao);
    },
    [location],
  );

  useEffect(() => {
    const settings = loadSavedSettings();
    applyAccessibilityModes(settings);
  }, [loadSavedSettings, applyAccessibilityModes]);

  const handleToggle = (mode) => {
    setToggles((prev) => ({
      ...prev,
      [mode]: !prev[mode],
    }));
  };

  const handleSalvar = () => {
    localStorage.setItem(
      'daltonicoMode',
      toggles.daltonico ? 'daltonico' : 'disabled',
    );
    localStorage.setItem(
      'baixaVisaoMode',
      toggles.baixaVisao ? 'baixa-visao' : 'disabled',
    );

    applyAccessibilityModes(toggles);

    toast.success('Configurações de acessibilidade salvas!');
  };

  return (
    <PageLayout backTo='/configuracoes'>
      <main className='layout-app-page main-acessibilidade'>
        <div className='acessibilidade-container'>
          <AccessibilityOption
            option='Modo Daltônico'
            isEnabled={toggles.daltonico}
            onToggle={() => handleToggle('daltonico')}
          />
          <AccessibilityOption
            option='Modo Baixa Visão'
            isEnabled={toggles.baixaVisao}
            onToggle={() => handleToggle('baixaVisao')}
          />
          <Button
            className='button-salvar'
            option='Salvar'
            onClick={handleSalvar}
          />
        </div>
      </main>
    </PageLayout>
  );
};

export default PerfilAcessibilidade;
