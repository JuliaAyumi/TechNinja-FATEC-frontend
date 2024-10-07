import { useState } from "react";

const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/users/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        alert('Email enviado com sucesso!!!!!!!!!');
      } else {
        setError(data.message || "Erro ao enviar o e-mail");
        alert("Erro ao enviar o email 1.");
      }
    } catch (err) {
      console.error('Erro:', err);
      setError("Erro ao enviar email 2.");
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, success };
};

export default usePasswordReset;
