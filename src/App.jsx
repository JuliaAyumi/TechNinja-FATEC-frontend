import { useLocation, useRoutes } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import Cadastrar from '@pages/Cadastrar/Cadastrar';
import Configuracoes from '@pages/Configuracoes/Configuracoes';
import Home from '@pages/Home/Home';
import Inicial from '@pages/Inicial/Inicial';
import Login from '@pages/Login/Login';
import Perfil from '@pages/Perfil/Perfil';
import Quiz from '@pages/Quiz/Quiz';
import Quizzes from '@pages/Quizzes/Quizzes';
import ProtectedRoute from '@ui/components/ProtectedRoute';
import Esqueceu from '@pages/Esqueceu/Esqueceu';
import Recuperar from '@pages/Recuperar/Recuperar';
import Subtemas from '@pages/Subtemas/Subtemas';
import FinishedQuiz from '@pages/FinishedQuiz/FinishedQuiz';
import PerfilAcessibilidade from './pages/PerfilAcessibilidade/PerfilAcessibilidade';
import PerfilConfiguracoes from './pages/PerfilConfiguracoes/PerfilConfiguracoes';
import PerfilSeguranca from './pages/PerfilSeguranca/PerfilSeguranca';
import '@styles/variables.css';
import '@styles/design-system.css';
import About from './pages/About/About';

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

  const routes = useRoutes([
    {
      path: '/',
      element: <Inicial />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/cadastrar',
      element: <Cadastrar />,
    },
    {
      path: '/esqueceu',
      element: <Esqueceu />,
    },
    {
      path: '/recuperar/:token',
      element: <Recuperar />,
    },
    {
      path: '/home',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: '/perfil',
      element: (
        <ProtectedRoute>
          <Perfil />
        </ProtectedRoute>
      ),
    },
    {
      path: '/quizzes/:area',
      element: (
        <ProtectedRoute>
          <Subtemas />
        </ProtectedRoute>
      ),
    },
    {
      path: '/quizzes/:area/:subtema',
      element: (
        <ProtectedRoute>
          <Quizzes />
        </ProtectedRoute>
      ),
    },
    {
      path: '/quizzes/:area/:subtema/:dificuldade',
      element: (
        <ProtectedRoute>
          <Quiz />
        </ProtectedRoute>
      ),
    },
    {
      path: '/quizzes/:area/:subtema/:dificuldade/resultado',
      element: (
        <ProtectedRoute>
          <FinishedQuiz />
        </ProtectedRoute>
      ),
    },
    {
      path: '/configuracoes',
      element: (
        <ProtectedRoute>
          <Configuracoes />
        </ProtectedRoute>
      ),
    },
    {
      path: '/configuracoes/perfil',
      element: (
        <ProtectedRoute>
          <PerfilConfiguracoes />
        </ProtectedRoute>
      ),
    },
    {
      path: '/configuracoes/acessibilidade',
      element: (
        <ProtectedRoute>
          <PerfilAcessibilidade />
        </ProtectedRoute>
      ),
    },
    {
      path: '/configuracoes/seguranca',
      element: (
        <ProtectedRoute>
          <PerfilSeguranca />
        </ProtectedRoute>
      ),
    },
    {
      path: '/configuracoes/sobre',
      element: (
        <ProtectedRoute>
          <About />
        </ProtectedRoute>
      ),
    },
  ]);

  return routes;
};

export default App;
