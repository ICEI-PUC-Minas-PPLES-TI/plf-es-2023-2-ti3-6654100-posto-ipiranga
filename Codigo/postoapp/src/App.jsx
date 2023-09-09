import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
