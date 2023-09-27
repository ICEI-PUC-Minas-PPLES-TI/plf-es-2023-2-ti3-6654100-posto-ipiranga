import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import ListarUsuarios from './pages/ListarUsuarios'
import PrivateRoute from './pages/PrivateRoute'
import UserContext from './Context/UserContext'
import ListarProdutos from './pages/ListarProdutos'
import { useState } from 'react';

function App() {
  const [dadosUserContext, setDadosUserContext] = useState({ 
      status: '',
      userId: ''
  })
  return (
    <UserContext.Provider value={{dadosUserContext, setDadosUserContext}}>
      <Router>
        <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/listausuarios" element={<PrivateRoute element={ListarUsuarios} />} /> 
          <Route path="/listaprodutos" element={<PrivateRoute element={ListarProdutos} />} /> 
            {/*  <Route path="/listausuarios" element={<ListarUsuarios />} />*/}
          <Route path="/" element={<Login />} />
        </Routes>
      </Router> 
    </UserContext.Provider>
  )
}

export default App;
