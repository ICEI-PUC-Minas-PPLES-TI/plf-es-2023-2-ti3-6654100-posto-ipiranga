import './ListarProdutos.scss'
import { faBackspace, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BarraPesquisa from '../../Components/public/BarraPesquisa';
import Tabela from '../../Components/public/Tabela';
import LeftNavMenu from '../../Layout/LeftNavMenu';

const ListarProdutos = () => {
    const listaThProdutos = [
        'ID',
        'DESCRIÇÃO',
        'MARCA',
        'UNIDADE DE MEDIDA', 
        'QNT', 
        'PREÇO',
        'OPÇÕES'
    ]
    const listaDadosProdutos = [
        'id',
        'nome',
        'marca', 
        'unidadeMedida',
        'quantidade',
        'preco',    
    ]

    return(
        <main className="container-fluid">
            <div className='row'  id="listausuarios">
            <div className='col-md-2 text-center' style={{background: 'var(--main-color)', paddingTop: '1rem'}}>
                  <LeftNavMenu />
            </div>
            <div className='topbar col-md-9'>
       
                <h1 id="titulo">Controle de estoque</h1>
                <BarraPesquisa
                vetor={ <FontAwesomeIcon icon={faSearch} style={{ color: '#1879bf', fontSize: '2.2rem', transform: 'scaleX(-1)' }} />}
                />
            <Tabela 
            url={'http://localhost:7000/produtos'}
            listaTh={listaThProdutos}
            listaDados={listaDadosProdutos}
            tipo={'produtos'}
            />
            </div>
            </div>
           

        </main>
    )
}

export default ListarProdutos