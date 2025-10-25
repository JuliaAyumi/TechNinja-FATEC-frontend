import { createContext, useContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@hooks/UseLocalStorage';
import { toast } from 'react-hot-toast';
import {
  login as loginService,
  register as registerService,
} from '@services/user';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = useCallback(
    async (data) => {
      try {
        const resData = await loginService(data);

        if (resData.token) {
          toast.success('Logado com sucesso!');
          setUser(resData.token);

          setTimeout(() => {
            navigate('/home');
          }, 1500);
        } else {
          toast.error(resData.message || 'Erro ao fazer login');
        }
      } catch (error) {
        toast.error('Erro ao fazer login');
        console.error(error);
      }
    },
    [navigate, setUser],
  );

  const register = useCallback(
    async (userData) => {
      try {
        const resData = await registerService(userData);

        if (resData.token) {
          toast.success('Usuário registrado com sucesso!');
          setUser(resData.token);

          setTimeout(() => {
            navigate('/login');
          }, 1500);
        } else {
          toast.error(resData.message || 'Erro ao registrar');
        }
      } catch (error) {
        toast.error('Erro ao registrar');
        console.error(error);
      }
    },
    [navigate, setUser],
  );

  const logout = useCallback(() => {
    setUser(null);
    navigate('/', { replace: true });
  }, [navigate, setUser]);

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
