import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/home';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={<Home />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
