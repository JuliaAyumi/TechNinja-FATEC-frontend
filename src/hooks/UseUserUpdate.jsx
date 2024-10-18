import { useState, useEffect } from 'react';
import { JwtDecode } from "jwt-js-decode";

const useUserUpdate = (userData, token) => {
  const [nome, setNome] = useState(userData?.nome || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [senha, setSenha] = useState("");

  const decodedToken = new JwtDecode(token);
  const userId = decodedToken.payload.id;

  useEffect(() => {
    if (userData) {
      setNome(userData.nome || "");
      setEmail(userData.email || "");
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUserData = {
      nome,
      email,
      senha,
      userId,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_HEROKU_LINK}/api/users/update/${updatedUserData.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) throw new Error('Erro ao atualizar dados do usuário');
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário", error);
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
  };
};

export default useUserUpdate;
