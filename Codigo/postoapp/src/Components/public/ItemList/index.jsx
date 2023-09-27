import './ItemList.scss'
import { useNavigate } from 'react-router-dom';

const ItemList = ({ icone, categoriaNome, categoriaPath, selecionado, clicado}) => {
    const navigate = useNavigate();

    function handleClick () {
        navigate(`/${categoriaPath}`);
    }

    return (
        <div
        onClick={() => {
            handleClick();
            clicado(); 
        }}
        
            style={
                selecionado
                ? { borderRight: '6px solid var(--dark-blue)' }
                : { borderRight: 'none' }
            }
            className='itemList nav-item row'
        >
            <div className='col-md-1'>
                {icone}
            </div>

            <div className='col-md-10'>
                <span>{categoriaNome}</span>
            </div>           
        </div>
    )
}


export default ItemList