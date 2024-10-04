import Header from "../../components/Header/Header"
import './Recuperar.css'


const Recuperar = () => {
    return (
        <div>
            <Header />

            <main id = "mainRecuperar">
                <div className="left-column">
                    <img src="src/assets/images/logoDark.png" alt="TechNinja logo" className="mainRecuperar-image" />
                </div>

                <div className="right-column">
                    <h1>Crie uma nova senha</h1>
                    <form id="recover-form">
                        <input type="password" placeholder="Digite sua nova senha" id="" required />
                        <input type="password" placeholder="Digite novmente a senha para confirmar" id="" required />
                        <button className="button1">Mudar senha</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Recuperar