import './Tabela.scss'

const Tabela =() => {
  return (
   <div className='table-responsive-lg'>
    
   
    <table className="table col-md-12">
    <thead>
      <tr>
        <th scope="col-md-2 text center">ID</th>
        <th scope="col-md-2 text center">NOME</th>
        <th scope="col-md-2 text center">STATUS</th>
        <th scope="col-md-2 text center">EMAIL</th>
        <th scope="col-md-2 text center">TELEFONE</th>
        <th scope="col-md-2 text center">PERFIL</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
       
        <td>Test</td>
       <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="statusSwitch1" />
                <label className="form-check-label" htmlFor="statusSwitch1">
                Desativado
                </label>
              </div>
        <td>Test</td>
        <td>Test</td>
        <td className='td'>    
        <select id ='formSelect'class="form-select" aria-label="Default select example">
            <option value="1">Administrador</option>
            <option value="2">Funcionário</option>
            <option value="3">Consulta</option>    
        </select>
        </td>
      
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Test</td>
        <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="statusSwitch1" />
                <label className="form-check-label" htmlFor="statusSwitch1">
                Desativado
                </label>
              </div>
        <td>Test</td>   
        <td>Test</td>
        <td>    
        <select id ='formSelect'class="form-select" aria-label="Default select example">
            <option value="1">Administrador</option>
            <option value="2">Funcionário</option>
            <option value="3">Consulta</option>    
        </select>
        </td>
       
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Test</td>
        <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="statusSwitch1" />
                <label className="form-check-label" htmlFor="statusSwitch1">
                Desativado
                </label>
              </div>
        <td>Test</td>
        <td>Test</td>
        <td>
        <select id ='formSelect'class="form-select" aria-label="Default select example">
            <option value="1">Administrador</option>
            <option value="2">Funcionário</option>
            <option value="3">Consulta</option>    
        </select>
        </td>
      
      </tr>
      <tr>
        <th scope="row">4</th>
        <td>Test</td>
        <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="statusSwitch1" />
                <label className="form-check-label" htmlFor="statusSwitch1">
                  Desativado
                </label>
              </div>
        <td>Test</td>
        <td>Test</td>
        <td>
        <select id ='formSelect'class="form-select" aria-label="Default select example">
            <option value="1">Administrador</option>
            <option value="2">Funcionário</option>
            <option value="3">Consulta</option>    
        </select>
        </td>
        
       
      </tr>
    </tbody>
  </table>
  </div>

  )
}

export default Tabela