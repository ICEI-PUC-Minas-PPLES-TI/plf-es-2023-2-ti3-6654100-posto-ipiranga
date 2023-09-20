import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../../Context/UserContext';

const PrivateRoute = ({element: Element, ...rest}) => {
    const {dadosUserContext} = useContext(UserContext);
    console.log(dadosUserContext);

    var value = localStorage.getItem('status');

    if(value !== 'logado'){
    return <Navigate to="/"/> 
    }

    return <Element {...rest} />
}

export default PrivateRoute