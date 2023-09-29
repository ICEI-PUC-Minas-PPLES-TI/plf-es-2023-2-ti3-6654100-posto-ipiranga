import Logo from "../../Components/public/Logo"
import ItemList from "../../Components/public/ItemList"
import { faUser, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Usuario from "../../Components/ListarUsuarios/Usuario";
import { useEffect, useState } from 'react';

const LeftNavMenu = () => {
    const [dadosUsuario, setDadosUsuario] = useState({
        nomeCompleto: "",
        perfil: "",
        email: "",
        telefone: "",
        statusUsuario: "",
        senha: ""
      });
      
    const [selectedItem, setSelectedItem] = useState(localStorage.getItem('itemMenu'));
  
    const alterarSelecionado = (selecionado) => {
      localStorage.setItem('itemMenu', selecionado);
    }

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:7000/usuarios/${localStorage.getItem('userID')}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (!response.ok) {
              throw new Error('Não foi possível enviar os dados');
            }
      
            const responseData = await response.json();
            
      
            setDadosUsuario((prevDadosUsuario) => ({
              ...prevDadosUsuario,
              nomeCompleto: responseData.nomeCompleto,
              perfil: responseData.perfil,
              email: responseData.email,
              telefone: responseData.telefone,
              statusUsuario: responseData.status,
              senha: responseData.senha,
            }));

            localStorage.setItem('userData', JSON.stringify({
                nomeCompleto: responseData.nomeCompleto,
                perfil: responseData.perfil,
                email: responseData.email,
                telefone: responseData.telefone,
                statusUsuario: responseData.status,
                senha: responseData.senha,
              }));
        

          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao enviar os dados',
              text: error.message,
            });
          }
        };
      
        fetchUserData(); 
      
      }, []); 

    return(
   
        <nav className="left-menu ">
            <Logo 
            maxw={'10rem'}
            />
           <div className="col-md-12">
          
            <Usuario 
            email = {dadosUsuario.email}
            />
           
            <ItemList
              icone={<FontAwesomeIcon icon={faUser} style={{ color: 'var(--dark-blue)' }} />}
              categoriaNome={'Controle de Usuários'}
              categoriaPath={'listausuarios'}
              selecionado={selectedItem === 'listausuarios'} 
              clicado={() => alterarSelecionado('listausuarios')} 
            />

            <ItemList
              icone={<FontAwesomeIcon icon={faList} style={{ color: 'var(--dark-blue)' }} />}
              categoriaNome={'Controle de Estoque'}
              categoriaPath={'listaprodutos'}
              selecionado={selectedItem === 'listaprodutos'} 
              clicado={() => alterarSelecionado('listaprodutos')} 
            />
            </div>
        </nav>

    )
}

export default LeftNavMenu