import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword as resetPasswordService } from '@services/user';

const useResetPassword = (token) => {
  const navigate = useNavigate();
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      await resetPasswordService(token, senha);
      alert('Senha redefinida com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setErro(error.message || 'Erro ao conectar ao servidor');
    }
  };

  return {
    senha,
    setSenha,
    confirmarSenha,
    setConfirmarSenha,
    erro,
    handleSubmit,
  };
};

export default useResetPassword;
