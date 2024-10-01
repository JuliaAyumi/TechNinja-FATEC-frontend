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
import Esqueceu from "./pages/Esqueceu/Esqueceu";

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
      path: "/esqueceu",
      element: <Esqueceu />,
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
      path: "/quizzes/:area",
      element: (
        <ProtectedRoute>
          <Quizzes />
        </ProtectedRoute>
      ),
    },
    {
      path: "/:area/:topico",
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
