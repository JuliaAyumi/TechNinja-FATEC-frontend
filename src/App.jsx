import { useRoutes } from "react-router-dom";
import Cadastrar from "./pages/Cadastrar/Cadastrar";
import Configuracoes from "./pages/Configuracoes/Configuracoes";
import Home from "./pages/Home/Home";
import Inicial from "./pages/Inicial/Inicial";
import Login from "./pages/Login/Login";
import Perfil from "./pages/Perfil/Perfil";
import Quiz from "./pages/Quiz/Quiz";
import Quizzes from "./pages/Quizzes/Quizzes";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Inicial />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/cadastrar",
      element: <Cadastrar />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/perfil",
      element: (
        <ProtectedRoute>
          <Perfil />
        </ProtectedRoute>
      ),
    },
    {
      path: "/quizzes",
      element: (
        <ProtectedRoute>
          <Quizzes />
        </ProtectedRoute>
      ),
    },
    {
      path: "/quiz",
      element: (
        <ProtectedRoute>
          <Quiz />
        </ProtectedRoute>
      ),
    },
    {
      path: "/configuracoes",
      element: (
        <ProtectedRoute>
          <Configuracoes />
        </ProtectedRoute>
      ),
    },
  ]);

  return routes;
};

export default App;
