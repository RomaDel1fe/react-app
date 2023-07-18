import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const location = useLocation();

  return isLoggedIn 
    ? children 
    : <Navigate to="/" state={{ from: location }} />
}

export default PrivateRoute;
