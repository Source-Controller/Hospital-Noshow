import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => (
  isAuthenticated ? <Route {...rest} element={<Component />} /> : <Navigate to="/" replace />
);

export default PrivateRoute;