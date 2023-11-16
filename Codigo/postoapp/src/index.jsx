import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWithEffect = () => {
  useEffect(() => {
    // Obter e exibir os valores do localStorage
    const status = localStorage.getItem('status');
    const perfil = localStorage.getItem('perfil');

    console.log('Status:', status);
    console.log('Perfil:', perfil);
  }, []); // O array de dependências está vazio para que o useEffect seja executado apenas uma vez

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

root.render(<AppWithEffect />);

reportWebVitals();
