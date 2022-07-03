import React from 'react';
import { Navigate } from 'react-router-dom';
// import { store } from './redux/store';

interface PrivateRouteProps {
  children: JSX.Element;
}

// TODO: to use reducer and to see if isLoggedIn
const isLoggedIn = () => {
  return true;
};

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element | null => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
