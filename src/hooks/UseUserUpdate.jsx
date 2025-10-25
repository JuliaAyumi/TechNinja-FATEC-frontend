import { useState, useEffect } from 'react';
import { JwtDecode } from 'jwt-js-decode';
import { apiUrl } from '@utils/apiUrl';
import toast from 'react-hot-toast';

const useUserUpdate = (userData, token) => {
  const [nome, setNome] = useState(userData?.nome || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [senha, setSenha] = useState('');
  const [avatar, setAvatar] = useState(userData?.avatar || null);

  const decodedToken = new JwtDecode(token);
  const userId = decodedToken.payload.id;

  useEffect(() => {
    if (userData) {
      setNome(userData.nome || '');
      setEmail(userData.email || '');
      setAvatar(userData.avatar || '');
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUserData = {
      nome,
      email,
      avatar,
    };

    if (senha) {
      updatedUserData.senha = senha;
    }

    try {
      const response = await fetch(`${apiUrl()}/api/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) throw new Error('Erro ao atualizar dados do usuário');
      toast.success('Dados atualizados com sucesso!');
      setSenha('');
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário', error);
    }
  };

  return {
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    handleSubmit,
    avatar,
    setAvatar,
  };
};

export default useUserUpdate;
