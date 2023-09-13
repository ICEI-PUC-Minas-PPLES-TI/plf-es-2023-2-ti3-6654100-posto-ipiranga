import './listausuarios.scss'
import { faBackspace, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Textfield from '../../Components/public/Textfield';
import BarraPesquisa from '../../Components/public/BarraPesquisa';
import Tabela from '../../Components/public/Tabela';
import LeftNavMenu from '../../Layout/LeftNavMenu';

const ListarUsuarios = () => {

    return(
        <main className="listausuarios container-fluid">
            <div className='row'>
            <div className='col-md-2' style={{background: 'black'}}>
                  <LeftNavMenu />
            </div>
            <div className='topbar col-md-8'>
                <h1 id="titulo">Listagem de Usuários</h1>
                <BarraPesquisa
                vetor={ <FontAwesomeIcon icon={faSearch} style={{ color: '#1879bf', fontSize: '2.2rem', transform: 'scaleX(-1)' }} />}
                />
            <Tabela />
            </div>
            </div>
           

        </main>
    )
}

export default ListarUsuarios