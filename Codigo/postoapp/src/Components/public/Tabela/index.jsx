import './Tabela.scss'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tabela = ({url, selectAtivo, checkAtivo, listaTh, listaDados, isUsuario, tipo }) => {
const [lista, setLista] = useState([]);
const [listaEditar, setListaEditar] = useState([]);

const [editarDisplay, setEditarDisplay] = useState('none')
const [formValues, setFormValues] = useState({
  descricao: '',
  marca: '',
  unidadeMedida: '',
  quantidade: '',
  preco: '',
});
const[titulo, setTitulo] = useState('')

const deleteItem = (e) => {
  Swal.fire({
    title: 'Tem certeza que deseja apagar o item?',
    text: 'Essa ação não pode ser desfeita!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, apagar!',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${url}/${e}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Não foi possível enviar os dados');
          }
          Swal.fire({
            icon: 'success',
            title: 'Item apagado!',
            text: 'O item foi apagado com sucesso.',
          });
          setTimeout(recarregarPagina, 800);
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar os dados',
            text: error.message,
          });
        });
    }
  });
};

const editarItem = (item) => {
  setEditarDisplay('flex');
  setFormValues({
    id: item.id,
    descricao: item.nome,
    marca: item.marca,
    unidadeMedida: item.unidadeMedida,
    quantidade: item.quantidade,
    preco: item.preco,
  });
  setTitulo('Editar')
}

const criarItem = () => {
  setEditarDisplay('flex');
  setFormValues({
    descricao: '',
    marca: '',
    unidadeMedida: '',
    quantidade: '',
    preco: '',
  });
  setTitulo('Criar')
}


const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormValues({
    ...formValues,
    [name]: value,
  });
};

const salvar = () => {


  const requestBody = {
    nome: formValues.descricao,
    marca: formValues.marca,
    unidadeMedida: formValues.unidadeMedida,
    quantidade: formValues.quantidade,
    preco: formValues.preco,
  };
  if(!formValues.id) {
    fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível enviar os dados');
        }
        Swal.fire({
          icon: 'success',
          title: 'Item criado!',
          text: 'O item foi criado com sucesso.',
        });
        setTimeout(recarregarPagina, 800);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao enviar os dados',
          text: error.message,
        });
      });
  }

  else{
  fetch(`${url}/${formValues.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody), 
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Não foi possível enviar os dados');
      }
      Swal.fire({
        icon: 'success',
        title: 'Item atualizado!',
        text: 'O item foi editado com sucesso.',
      });
      setTimeout(recarregarPagina, 800);
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao enviar os dados',
        text: error.message,
      });
    });
  }
};


function recarregarPagina() {
  window.location.reload();
}
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(url, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Não foi possível obter os dados');
        }

        const responseData = await response.json();

        const resposta = responseData.map((item) => {
          const obj = {};
          listaDados.forEach((prop, index) => {
            obj[prop] = item[prop];
          });
          return obj;
        });

        setLista(resposta);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao obter os dados',
          text: error.message,
        });
      }
    };

    fetchUserData();
  }, [url]);


  function formatarTelefone(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');

    if (numeroLimpo.length === 11) {
      return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeroLimpo.length === 10) {
      return numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numeroLimpo;
    }
  }   

  const handleStatusChange = (index) => {
    if (listaUsuarios[index].status === true) {
      listaUsuarios[index].status = false;
    } else {
      listaUsuarios[index].status = true;
    }
    
    listaUsuarios[index].telefone = listaUsuarios[index].telefone.replace(/\D/g, '');

    fetch(`http://localhost:7000/usuarios/${listaUsuarios[index].id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listaUsuarios[index]),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update user data');
        }
      })
      .then((updatedUserData) => {    
        Swal.fire('Dados atualizados com sucesso!', '', 'success');
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire('Erro ao atualizar dados', error.message, 'error');
      });
  };

  const handlePerfilChange = (index, value) => {
    listaUsuarios[index].perfil = value;

    listaUsuarios[index].telefone = listaUsuarios[index].telefone.replace(/\D/g, '');

    fetch(`http://localhost:7000/usuarios/${listaUsuarios[index].id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listaUsuarios[index]),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update user data');
        }
      })
      .then((updatedUserData) => {
        Swal.fire('Dados atualizados com sucesso!', '', 'success');
        window.location.reload();
      })
      .catch((error) => {

        Swal.fire('Erro ao atualizar dados', error.message, 'error');
      });
  };

  
  return (
    <>
    <table className="table">
    <div className='modal' style={{display: editarDisplay}}>
      <h1>{titulo} {tipo}</h1>
      <label>Descrição</label>
      <input
        type="text"
        name="descricao"
        value={formValues.descricao}
        onChange={handleInputChange}
      />
      <label>Marca</label>
      <input
        type="text"
        name="marca"
        value={formValues.marca}
        onChange={handleInputChange}
      />
      <label>Unidade de medida</label>
      <input
        type="text"
        name="unidadeMedida"
        value={formValues.unidadeMedida}
        onChange={handleInputChange}
      />
      <label>Quantidade</label>
      <input
        type="number"
        name="quantidade"
        value={formValues.quantidade}
        onChange={handleInputChange}
      />
      <label>Preço</label>
      <input
        type="number"
        name="preco"
        value={formValues.preco}
        onChange={handleInputChange}
      />
      <div className='botoes'>
      <button onClick={salvar} style={{backgroundColor: 'var(--light-blue)'}}>Salvar</button>
      <button style={{backgroundColor: '#d64e4e'}} onClick={()=>setEditarDisplay('none')} >Sair</button>
      </div>
    </div>

      <thead>
      <tr>
        {listaTh.map((item, index) => (
          <th key={index} scope="col">{item}</th>
        ))}
      </tr>
      </thead>
      <tbody>
        {lista.map((item, index) => (
          <tr key={index}>


            {
               !isUsuario ? (
                Object.keys(item).map((key) => (
                  <td className='col-md-auto' key={key}>{item[key]}</td>
                ))
             
              ) : (
                <>
                  <td scope="row">{item.id}</td>
                  <td>{item.nomeCompleto}</td>
                  <td>{item.email}</td>
                  <td>{item.telefone}</td>
                </>
              )
            }
            
            <td className='opcoes col-md-auto' style={!isUsuario ? { display: 'flex' } : { display: 'none' }}> 
            <FontAwesomeIcon onClick={() =>editarItem(item)} className='opcao text-secondary' icon={faPencil} />
            <FontAwesomeIcon onClick={() => deleteItem(item.id)} className='opcao text-danger' icon={faTrash}  />
            </td>
              
            <td style={checkAtivo ? { display: 'flex-box' } : { display: 'none' }}>
              <div className="form-check form-switch">
                <input
                  onChange={() => handleStatusChange(index)}
                  className="form-check-input"
                  type="checkbox"
                  id={`statusSwitch${index}`}
                  checked={item.status}
                />
                <label className="form-check-label" htmlFor={`statusSwitch${index}`}>
                  {item.status ? 'Ativo' : 'Inativo'}
                </label>
              </div>
            </td>

            <td className='seleciona'  style={checkAtivo ? { display: 'flex-box' } : { display: 'none' }}>
              <select
                
                id='formSelect'
                className="form-select"
                value={item.perfil}
                onChange={(e) => handlePerfilChange(index, e.target.value)}
              >
                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                <option value="CONSULTA">CONSULTA</option>
              </select>
            </td>

          </tr>
        ))}
      </tbody> 
    </table>
       <button style={{display: isUsuario? 'none' : 'flex', backgroundColor: 'var(--light-blue)'}} className='adicionar' onClick={criarItem} >Adicionar item</button>
       </>
  );
}

export default Tabela;
