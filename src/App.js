import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Forms from './components/Forms';
import LoginAdmin from './components/LoginAdmin'
// import Questions from './components/Questions';
// import { useState } from 'react';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forms" element={<Forms />} />
        {/* <Route path="/question" element={<Questions />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
