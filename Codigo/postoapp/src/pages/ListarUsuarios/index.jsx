import './listausuarios.scss'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Textfield from '../../Components/public/Textfield';
import BarraPesquisa from '../../Components/public/BarraPesquisa';
import Tabela from '../../Components/public/Tabela'

const ListarUsuarios = () => {
    return(
        <main className="listausuarios">
            <div className='topbar'>
                <h1 id="titulo">Listagem de Usuários</h1>
                <BarraPesquisa
                vetor={ <FontAwesomeIcon icon={faSearch} style={{ color: '#1879bf', fontSize: '2.2rem', transform: 'scaleX(-1)' }} />}
                />
            </div>

            <div>
                <Tabela />
            </div>
            
            
           

        </main>
    )
}

export default ListarUsuarios