import '../../../Components/public/Logo'
import Textfield from '../../../Components/public/Textfield';
import './Formulario.scss'  
import { faEnvelope, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Botao from '../../../Components/public/Botao';
import Swal from 'sweetalert2';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../Context/UserContext';


const Formulario = () => {
    const [senhaStatus, setSenhaStatus] = useState('password')
    const [senhaIcone, setSenhaIcone] = useState(faEyeSlash)
    const {dadosUserContext, setDadosUserContext} = useContext(UserContext);
    const [dadosUsuario, setDadosUsuario] = useState({ 
      email: '',
      senha: ''
    });
    const [emailRecuperação, setEmailRecuperacao] = useState('')
    const navigate = useNavigate();

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
      switch (e.target.id) {
        case 'email':
          setDadosUsuario({ ...dadosUsuario, email: e.target.value });
          break;
    
        case 'senha':
          setDadosUsuario({ ...dadosUsuario, senha: e.target.value });
          break;
      }
    }
    

   

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
      if (!dadosUsuario.email || !dadosUsuario.senha) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Por favor, preencha todos os campos.',
        });
        return;
      } else if (!emailRegex.test(dadosUsuario.email)) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'O email não está em um formato correto',
        });
        return;
      }
    
      try {
        const response = await fetch('http://localhost:7000/usuarios/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosUsuario),
        });
    
        if (!response.ok) {
          throw new Error('Não foi possível enviar os dados');
        }
    
        const responseData = await response.json();
        setDadosUserContext({
          status: 'logado',
          userId: responseData.id
        })
        localStorage.setItem('status', 'logado')
        localStorage.setItem('userID', responseData.id);
        localStorage.setItem('perfil', responseData.perfil);
     
        if(responseData.perfil === 'ADMINISTRADOR') {
          localStorage.setItem('itemMenu', 'listausuarios');
          navigate('/listausuarios');
        }
        else {
          localStorage.setItem('itemMenu', 'listaprodutos');
          navigate('/listaprodutos');
        }
      
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
              inputValue={dadosUsuario.email}
              inputOnchange={aoDigitado}
              inputPlaceholder={'Digite o seu email'}
              idName={'email'}
              maxL={100}
              />
                
                <Textfield 
                vetor={<FontAwesomeIcon icon={faLock} style={{ color: 'white' }} />}
                textLabel={'Senha'}
                inputType={senhaStatus}
                inputValue={dadosUsuario.senha}
                inputOnchange={aoDigitado}
                inputPlaceholder={'Digite a sua senha'}
                idName={'senha'}
                maxL={50}
                mostrarSenha={<FontAwesomeIcon onClick={mostrarSenha} className='senha' icon={senhaIcone} style={{ color: 'white' }} />}
                />    
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