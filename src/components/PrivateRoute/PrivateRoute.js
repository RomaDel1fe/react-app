import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  return isLoggedIn 
    ? children 
    : <Navigate to="/" state={{ from: location }} />
}

export default PrivateRoute;
