import './Textfield.scss'

const Textfield = ({vetor, textLabel, inputType, inputPlaceholder, mostrarSenha }) => {

    
    return(
        <div className="textfield">
            <div className='label-block'>
            {vetor}
            <label>{textLabel}</label>
            </div>
            <div className='input-block'>
            <input type={inputType} placeholder={inputPlaceholder}/> {mostrarSenha}
            </div>
        </div>
    )
}

export default Textfield