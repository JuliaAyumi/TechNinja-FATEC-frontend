import { useState, useEffect } from 'react';
import { JwtDecode } from 'jwt-js-decode';
import { updateUser } from '@services/user';
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
      await updateUser(userId, updatedUserData, token);
      toast.success('Dados atualizados com sucesso!');
      setSenha('');
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário', error);
      toast.error('Erro ao atualizar dados');
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
