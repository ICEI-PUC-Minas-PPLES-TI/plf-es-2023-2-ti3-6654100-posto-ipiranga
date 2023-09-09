import Formulario from "../../Layout/Cadastro/Formulario"
import './Cadastro.scss'
import Logo from "../../Components/public/Logo"

const Cadastro = () => {
    return(
        <main className="cadastro">
              <Logo 
            maxw={'18rem'}
            />
            <Formulario />
        </main>
    )
}

export default Cadastro