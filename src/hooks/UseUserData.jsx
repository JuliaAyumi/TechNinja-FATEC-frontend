import { useEffect, useState, useCallback } from 'react';
import { JwtDecode } from 'jwt-js-decode';
import { getUserData } from '@services/user';

const useUserData = (token) => {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    avatar: '',
    pontuacao: '',
    nivelmodulo: '',
    ranking: '',
    quizzesCompletados: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    if (!token) return;

    const decodedToken = new JwtDecode(token);
    const userId = decodedToken.payload.id;

    try {
      const data = await getUserData(userId, token);
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { userData, loading, error, refetch: fetchUserData };
};

export default useUserData;
