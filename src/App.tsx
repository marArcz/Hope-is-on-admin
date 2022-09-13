import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import PetsPage from './components/PetsPage';
import SignInPage from './components/SignInPage';
import { ToastContainer } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignInPage />} />
        <Route path="/success/*" element={<HomePage />} />
      </Routes>

    </div>
  );
}

export default App;
