import './BarraPesquisa.scss'

const BarraPesquisa =({inputType,inputPlaceholder,vetor}) => {

return (

    <div className='input-pesquisa col-md-4'>
    {vetor}
    <input type={inputType} placeholder={inputPlaceholder}/>
    </div>

)

}

export default BarraPesquisa