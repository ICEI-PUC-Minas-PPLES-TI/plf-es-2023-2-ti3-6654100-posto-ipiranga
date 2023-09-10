import './Tabela.scss'
import React, { useState } from 'react';

const Tabela =() => {
  const [status, setStatus] = useState('desativado')
  
  function handlleClick() {
    if(status === 'ativado'){
      setStatus('desativado')
    }
    else{
      setStatus('ativado')
    }
  }

  return (
    <table className="table">
    <thead>
      <tr>
        <th scope="text center">ID</th>
        <th scope="text center">NOME</th>
        <th scope=" text center">STATUS</th>
        <th scope=" text center">EMAIL</th>
        <th scope="text center">TELEFONE</th>
        <th scope="text center">PERFIL</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
       
        <td>Test</td>
        <td style={{width: '13vw'}}>
       <div className="form-check form-switch">
                <input onChange={handlleClick} className="form-check-input" type="checkbox" id="statusSwitch1" />
                <label className="form-check-label" htmlFor="statusSwitch1">
                {status}
                </label>
              </div>
              </td>
        <td>Test</td>
        <td>Test</td>
        <td className='seleciona'>    
        <select id ='formSelect'class="form-select">
            <option value="1">Administrador</option>
            <option value="2">Funcionário</option>
            <option value="3">Consulta</option>    
        </select>
        </td>
      </tr>
    </tbody>
  </table>


  )
}

export default Tabela