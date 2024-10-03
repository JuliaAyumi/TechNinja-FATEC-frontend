import Header from "../../components/Header/Header"
import './Esqueceu.css'

const Esqueceu = () => {
    return (
        <div>
            <Header />

            <main id = "mainEsqueceu">
                <div className="left-column">
                    <img src="src/assets/images/logoDark.png" alt="TechNinja logo" className="mainEsqueceu-image" />
                </div>

                <div className="right-column">
                    <h1>Identifique-se para receber um e-mail com as instruções e o link para modificar sua senha</h1>
                    <form id="forgot-form">
                        <input type="email" placeholder="Email" id="" required />
                        <button className="button1">Enviar email</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Esqueceu