import './ListarEstoque.scss'
import BarraPesquisa from '../../Components/public/BarraPesquisa';
import Tabela from '../../Components/public/Tabela';
import LeftNavMenu from '../../Layout/LeftNavMenu';


const ListarEstoque = () => {
    //LISTA DE TITULOS DAS COLUNAS
    const listaThProdutos = ['ID', 'NOME', 'MARCA', 'UNIDADE DE MEDIDA', 'PREÇO', 'OPÇÕES']

    //LISTA DE TIPO DO INPUT DE CRIAR E EDITAR NA ORDEM
    const listaTypes = ['text', 'text', 'text', 'number'];

    //LISTA DE ATRIBUTOS COMO VEM DO BANCO
    const listaDadosProdutos = ['id', 'nome', 'marca', 'unidadeMedida','preco' ]

    return(
        <main className="container-fluid">
            <div className='row'  id="listausuarios">
                <div className='col-md-2 text-center' style={{background: 'var(--main-color)', paddingTop: '1rem'}}>
                    <LeftNavMenu />
                </div>
                <div className='topbar col-md-9'>
        
                    <h1 id="titulo">Controle de Estoque</h1>
                    <BarraPesquisa />

                    <Tabela 
                    url={'http://localhost:7000/produtos'}
                    listaTh={listaThProdutos}
                    listaDados={listaDadosProdutos}
                    listaTypes={listaTypes}
                    tipo={'produtos'}
                    />
                </div>
            </div>
           

        </main>
    )
}

export default ListarEstoque