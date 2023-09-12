import '../../../Components/public/Logo'
import Textfield from '../../../Components/public/Textfield';
import './Formulario.scss'  
import { faE, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Botao from '../../../Components/public/Botao';
import Swal from 'sweetalert2';
import React, { useEffect,  useState } from 'react';


const Formulario = () => {
    const [senhaStatus, setSenhaStatus] = useState('password')
    const [senhaIcone, setSenhaIcone] = useState(faEyeSlash)
    const [inputEmail, setInputEmail] = useState('')
    const [inputSenha, setInputSenha] = useState('')
    const [dadosUsuario, setDadosUsuario] = useState({ 
        email: '',
        senha: ''
    })
    const [emailRecuperação, setEmailRecuperacao] = useState('')

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

    function aoDigitado(e) {  
        switch(e.target.id){

        case 'email': 
            setInputEmail(e.target.value)
            break

        case 'senha': 
            setInputSenha(e.target.value)
            break;
        }
        setDadosUsuario({   
            email: inputEmail,  
            senha: inputSenha
        })
    }

    function esqueciSenha() {
      Swal.fire({
        title: 'Recuperação de senha',
        html: '<p>Informe o email cadastrado:</p><input style="width: 20vw"type="email"/>',
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: 'Voltar ',
        confirmButtonText: 'Enviar',
        customClass: {
          title: 'custom-title-class' 
        }
      });
  
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!inputEmail || !inputSenha) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Por favor, preencha todos os campos.',
          });
          return;
        }
        else if (!emailRegex.test(inputEmail)) {
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'O email não está em um formato correto',
            });
            return;
          }
    
        console.log(dadosUsuario);
      
        try {
          const response = await fetch('http://localhost:3000/usuarios/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosUsuario),
          }).then(() => {
            localStorage.setItem('status', 'logado');
          })
      
          if (!response.ok) {
            throw new Error('Não foi possível enviar os dados');
          }
          const responseData = await response.json();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar os dados',
            text: error.message,
          });
        }
      };
      



    return( 
        <form className='col-md-5 container-fluid formulario-login'>
            <div className='card-top col-md-12'>
                <h1><b>Acesso ao </b><br />Sistema Gerencial</h1>
            </div>
            <div className='card-bottom col-md-12'>
            <div className='campos'>
              <Textfield 
              vetor={<FontAwesomeIcon icon={faEnvelope} style={{ color: 'white' }} />}
              textLabel={'Email'}
              inputType={'email'}
              inputValue={inputEmail}
              inputOnchange={aoDigitado}
              inputPlaceholder={'Digite o seu email'}
              idName={'email'}
              maxL={100}
              />
                
                <Textfield 
                vetor={<FontAwesomeIcon icon={faLock} style={{ color: 'white' }} />}
                textLabel={'Senha'}
                inputType={senhaStatus}
                inputValue={inputSenha}
                inputOnchange={aoDigitado}
                inputPlaceholder={'Digite a sua senha'}
                idName={'senha'}
                maxL={50}
                mostrarSenha={<FontAwesomeIcon onClick={mostrarSenha} className='senha' icon={senhaIcone} style={{ color: 'white' }} />}
                />    
                <span onClick={esqueciSenha} className='col-md-12'>Esqueci a senha</span>
                </div>            
                <Botao 
                botaoSubmit={handleSubmit}
                text={'Entrar >>'}
                type={'submit'}
                />
            </div>
        </form>  
    )
}

export default Formulario