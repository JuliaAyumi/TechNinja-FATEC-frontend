import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const useResetPassword = (token) => {
    const history = useHistory();
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
            const response = await fetch(`/api/reset-password/${token}`, { // Ajuste a URL conforme necessário
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: senha }),
            });

            if (response.ok) {
                alert('Senha redefinida com sucesso!');
                history.push('/login'); // Redireciona para a página de login após sucesso
            } else {
                const data = await response.json();
                setErro(data.message || 'Erro ao redefinir a senha');
            }
        } catch (error) {
            setErro('Erro ao conectar ao servidor');
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
