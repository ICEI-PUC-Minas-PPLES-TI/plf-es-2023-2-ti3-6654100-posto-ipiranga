import './Usuario.scss'

const Usuario = ({email, id}) => {

    function handleClick() {
        
    }
    
    return(
        <div className="col-md-12 usuario" style={{}}>
            <span>Logado como: <br/>{email}</span>
            <br/>
            <a onClick={handleClick} id='verPerfil'>Ver perfil</a>
        </div> 
    )
}

export default Usuario