import { useState } from 'react';
import '../../../Components/public/Logo'
import Textfield from '../../../Components/public/Textfield';
import './Formulario.scss'  
import { faE, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Botao from '../../../Components/public/Botao';
import Swal from 'sweetalert2';

const Formulario = () => {
    const [senhaStatus, setSenhaStatus] = useState('password')
    const [senhaIcone, setSenhaIcone] = useState(faEyeSlash)
    const [inputNome, setInputNome] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputTelefone, setInputTelefone] = useState('')
    const [inputSenha, setInputSenha] = useState('')
    const [dadosUsuario, setDadosUsuario] = useState({    nome: '',
        email: '',
        telefone: '', 
        senha: ''
    })

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

    function formatarTelefone(telefone) {
        // Remove todos os caracteres não numéricos do número de telefone
        const numeroLimpo = telefone.replace(/\D/g, '');
      
        // Verifica o comprimento do número e formata de acordo com o padrão desejado
        if (numeroLimpo.length === 11) {
          // Formato para números de telefone com 11 dígitos (DDDCelular)
          return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (numeroLimpo.length === 10) {
          // Formato para números de telefone com 10 dígitos (DDDFixo)
          return numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
          // Retorna o número sem formatação se não corresponder a nenhum padrão
          return numeroLimpo;
        }
      } 
  
    function aoDigitado(e) {  
        switch(e.target.id){
        case 'nome':
            setInputNome(e.target.value);
            break;

        case 'email': 
            setInputEmail(e.target.value)
            break

        case 'telefone': 
            setInputTelefone(formatarTelefone(e.target.value))
            break;

        case 'senha': 
            setInputSenha(e.target.value)
            break;
        }
        setDadosUsuario({    nome: inputNome,
            email: inputEmail,
            telefone: inputTelefone, 
            senha: inputSenha
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
              if (!inputEmail || !inputSenha || !inputTelefone || !inputNome) {
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
                else if (inputSenha.length < 6) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'A senha deve ter ao menos 6 caracteres',
                      });
                    return;
                  }

                  else if (inputNome.length < 5) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'O nome deve ter ao menos 5 caracteres',
                      });
                    return;     
                  }

                  else if (inputTelefone.length < 11) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'O telefone deve ter ao menos 11 caracteres',
                      });
                    return;     
                  }


                  try {
                    const response = await fetch('https://api.example.com/postEndpoint', {
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
                  } catch (error) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Erro ao enviar os dados',
                      text: error.message,
                    });
                  }
      };

    
    return( 
        <form className='col-md-5 container-fluid formulario-cadastro'>
            <div className='card-top col-md-12'>
                <h1><b>Cadastre o seu</b> usuário</h1>
            </div>
            <div className='card-bottom col-md-12'>
            <div className='campos'>
              <Textfield 
              vetor={<FontAwesomeIcon icon={faUser} style={{ color: 'white' }} />}
              textLabel={'Nome completo'}
              inputType={'text'}
              inputValue={inputNome}
              inputOnchange={aoDigitado}
              inputPlaceholder={'Digite o seu email'}
              idName={'nome'}
              maxL={100}
              />
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
              vetor={<FontAwesomeIcon icon={faPhone} style={{ color: 'white' }} />}
              textLabel={'Telefone'}
              inputType={'text'}
              inputValue={inputTelefone}
              inputOnchange={aoDigitado}
              inputPlaceholder={'Digite o seu telefone'}
              idName={'telefone'}
              maxL={15}
              
              />
                
                <Textfield 
                vetor={<FontAwesomeIcon icon={faLock} style={{ color: 'white' }} />}
                textLabel={'Senha'}
                inputType={senhaStatus}
                inputValue={inputSenha}
                inputOnchange={aoDigitado}
                inputPlaceholder={'Digite a sua senha'}
                mostrarSenha={<FontAwesomeIcon onClick={mostrarSenha} className='senha' icon={senhaIcone} style={{ color: 'white' }} />}
                idName={'senha'}
                maxL={50}
                />    
                </div>            
                <Botao 
                text={'Cadastrar >>'}
                type={'submit'}
                botaoSubmit={handleSubmit}
                />
            </div>
        </form>  
    )
}

export default Formulario