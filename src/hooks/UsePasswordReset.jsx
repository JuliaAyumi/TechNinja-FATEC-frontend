import { useState } from 'react';
import { requestPasswordReset } from '@services/user';

const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await requestPasswordReset(email);
      setSuccess(true);
      alert('Email enviado com sucesso!');
    } catch (err) {
      console.error('Erro:', err);
      setError(err.message || 'Erro ao enviar email');
      alert('Erro ao enviar o email.');
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, success };
};

export default usePasswordReset;
