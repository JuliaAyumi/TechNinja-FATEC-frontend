import { useEffect, useState } from "react";
import { JwtDecode } from "jwt-js-decode";

const useUserData = (token) => {
  const [userData, setUserData] = useState({
      nome: "",
      email: "",
      senha: "",
      imagem: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
      if (!token) return;

      const decodedToken = new JwtDecode(token);
      const userId = decodedToken.payload.id;

      console.log(decodedToken)

      try {
          const response = await fetch(`${
            import.meta.env.MODE === "development"
              ? `http://localhost:${import.meta.env.VITE_PORT}`
              : import.meta.env.VITE_HEROKU_LINK
          }/api/users/user/${userId}`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
          });

          if (!response.ok) {
              throw new Error('Erro ao buscar os dados do usuário');
          }

          const data = await response.json();
          setUserData(data);
      } catch (err) {
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchUserData();
      setUserData(userData);
  }, [token]);

  return { userData, loading, error };
};

export default useUserData;
