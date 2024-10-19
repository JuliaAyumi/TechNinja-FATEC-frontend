import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./UseLocalStorage";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.MODE === "development"
            ? `http://localhost:${import.meta.env.VITE_PORT}`
            : import.meta.env.VITE_HEROKU_LINK
        }/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      console.log(response);

      const resData = await response.json();

      if (response.ok) {
        toast.success("Logado com sucesso!");
        setUser(resData.token);

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        toast.error(resData.message || "Erro ao fazer login");
      }
    } catch (error) {
      toast.error("Erro ao fazer login", error);
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.MODE === "development"
            ? `http://localhost:${import.meta.env.VITE_PORT}`
            : import.meta.env.VITE_HEROKU_LINK
        }/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const resData = await response.json();
      if (response.ok) {
        toast.success("Usuário registrado com sucesso!");
        setUser(resData.token);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(resData.message || "Erro ao registrar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
