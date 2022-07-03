import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import Page404 from './components/Page404/Page404';
import PrivateRoute from './PrivateRoutes';

const MainRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<div>login</div>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default MainRoute;
