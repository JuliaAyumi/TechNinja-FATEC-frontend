import { useState } from 'react';
import { useNavigate } from "react-router-dom";


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
            const response = await fetch(`${
                import.meta.env.MODE === "development"
                  ? `http://localhost:${import.meta.env.VITE_PORT}`
                  : import.meta.env.VITE_HEROKU_LINK
              }/api/users/recuperar/:${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: senha }),
            });

            if (response.ok) {
                alert('Senha redefinida com sucesso!');
                navigate('/login'); // Redireciona para a página de login após sucesso
            } else {
                const data = await response.json();
                setErro(data.message || 'Erro ao redefinir a senha');
            }
        } catch (error) {
            setErro('Erro ao conectar ao servidor', error);
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
