import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { dadosUserContext } = useContext(UserContext);
  console.log(dadosUserContext);

  const value = localStorage.getItem('status');
  const tipoUsuario = localStorage.getItem('perfil');

  if (value !== 'logado') {
    return <Navigate to="/" />;
  }

  if (tipoUsuario === 'GERENTE' && rest.path === 'listausuarios') {
    return <Navigate to="/listaprodutos" />;
  }

  if (tipoUsuario === 'USUARIO' && rest.path !== 'listaprodutos') {
    return <Navigate to="/listaprodutos" />;
  }

  return <Element {...rest} />;
};

export default PrivateRoute;
