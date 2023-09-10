import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import ListarUsuarios from './pages/ListarUsuarios'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/listausuarios" element={<ListarUsuarios />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
