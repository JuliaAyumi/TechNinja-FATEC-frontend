import { useLocation, useRoutes } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { routes } from './routes';
import '@styles/variables.css';
import '@styles/design-system.css';

const App = () => {
  const location = useLocation();

  const applyAccessibilityMode = useCallback(() => {
    const accessibilityMode = localStorage.getItem('accessibilityMode');
    const daltonico = localStorage.getItem('daltonicoMode');
    const baixaVisao = localStorage.getItem('baixaVisaoMode');

    window._mfq.push(['trackPageView']);

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
      if (daltonico === 'daltonico') {
        document.body.classList.add('daltonico');
      } else {
        document.body.classList.remove('daltonico');
      }
      if (baixaVisao === 'baixa-visao') {
        document.body.classList.add('baixa-visao');
      } else {
        document.body.classList.remove('baixa-visao');
      }
    }
  }, [location]);

  useEffect(() => {
    applyAccessibilityMode();
  }, [applyAccessibilityMode]);

  return useRoutes(routes);
};

export default App;
