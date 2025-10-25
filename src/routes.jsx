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
import PerfilAcessibilidade from '@pages/PerfilAcessibilidade/PerfilAcessibilidade';
import PerfilConfiguracoes from '@pages/PerfilConfiguracoes/PerfilConfiguracoes';
import PerfilSeguranca from '@pages/PerfilSeguranca/PerfilSeguranca';
import About from '@pages/About/About';
import Ranking from '@pages/Ranking/Ranking';

export const routes = [
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
    path: '/ranking',
    element: (
      <ProtectedRoute>
        <Ranking />
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
];
