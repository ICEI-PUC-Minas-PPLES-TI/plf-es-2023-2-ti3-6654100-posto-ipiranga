import { useState } from 'react';
import '../../../Components/public/Logo'
import Logo from '../../../Components/public/Logo'
import Textfield from '../../../Components/public/Textfield';
import './Formulario.scss'  
import { faE, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Botao from '../../../Components/public/Botao';

const Formulario = () => {
    const [senhaStatus, setSenhaStatus] = useState('password')
    const [senhaIcone, setSenhaIcone] = useState(faEyeSlash)

    function mostrarSenha() {
        if(senhaStatus == 'password'){
        setSenhaStatus('text')
        setSenhaIcone(faEye)
        }
        else{
            setSenhaStatus('password')
            setSenhaIcone(faEyeSlash)
        }
    }

    return( 
        <div className='col-md-5 container-fluid formulario-login'>
            <div className='card-top col-md-12'>
                <h1><b>Acesso ao </b><br />Sistema Gerencial</h1>
            </div>
            <div className='card-bottom col-md-12'>
            <div className='campos'>
              <Textfield 
              vetor={<FontAwesomeIcon icon={faEnvelope} style={{ color: 'white' }} />}
              textLabel={'Email'}
              inputType={'text'}
              inputPlaceholder={'Digite o seu email'}
              />
                
                <Textfield 
                vetor={<FontAwesomeIcon icon={faLock} style={{ color: 'white' }} />}
                textLabel={'Senha'}
                inputType={senhaStatus}
                inputPlaceholder={'Digite a sua senha'}
                mostrarSenha={<FontAwesomeIcon onClick={mostrarSenha} className='senha' icon={senhaIcone} style={{ color: 'white' }} />}
                />    
                <span className='col-md-12'>Esqueci a senha</span>
                </div>            
                <Botao 
                text={'Entrar >>'}
                type={'submit'}
                />
            </div>
        </div>  
    )
}

export default Formulario