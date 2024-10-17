import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Doctor from './pages/doctor';
import Login from './components/auth/login';
import Register from './components/auth/register';
import PrivateRoute from './config/privateRoute';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";

library.add(fas, faTwitter, faFontAwesome);

function App() {

  return (
    <div id="page-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login  />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/dashboard" element={<Dashboard  />} />
          <Route path="/doctor" element={<Doctor  />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;