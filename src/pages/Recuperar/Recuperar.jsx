import { useLocation } from 'react-router-dom';
import Header from "../../components/Header/Header";
import './Recuperar.css';
import useResetPassword from '../../hooks/UsePasswordReset2';

const Recuperar = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get('token'); // Obtém o token da URL

    const {
        senha,
        setSenha,
        confirmarSenha,
        setConfirmarSenha,
        erro,
        handleSubmit,
    } = useResetPassword(token);

    return (
        <div>
            <Header />
            <main id="mainRecuperar">
                <div className="left-column">
                    <img src="src/assets/images/logoDark.png" alt="TechNinja logo" className="mainRecuperar-image" />
                </div>

                <div className="right-column">
                    <h1>Crie uma nova senha</h1>
                    {erro && <p className="error">{erro}</p>}
                    <form id="recover-form" onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Digite sua nova senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Digite novamente a senha para confirmar"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
                        <button className="button1">Mudar senha</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Recuperar;
