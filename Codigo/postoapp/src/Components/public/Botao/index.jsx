import './Botao.scss'

const Botao = ({type, text}) => {
    return(
        <>
        <button className='botao' type={type}>{text}</button>
        </>
    )
}

export default Botao