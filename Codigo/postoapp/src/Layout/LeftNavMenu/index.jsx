import Logo from "../../Components/public/Logo"
import ItemList from "../../Components/public/ItemList"
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Usuario from "../../Components/ListarUsuarios/Usuario";

const LeftNavMenu = () => {
    return(
   
        <nav className="left-menu ">
            <Logo 
            maxw={'10rem'}
            />
           <div className="col-md-12">
          
                <Usuario 
                email = {'example@email.com'}
                id = {'1    '}
                 />
           
                <ItemList 
                icone={<FontAwesomeIcon icon={faUser} style={{ color: 'var(--dark-blue)' }} />}
                categoriaNome={'Controle de Usuários'}
                categoriaPath={'listausuarios'}
                />
            </div>
        </nav>

    )
}

export default LeftNavMenu