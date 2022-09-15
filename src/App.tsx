import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import PetsPage from './components/PetsPage';
import SignInPage from './components/SignInPage';
import { ToastContainer } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import BackendAPI from './backendApi/BackendAPI';
import { showErrorToast, showSuccessToast } from './components/ToastNotification';
import { AdminModel } from './Models/TypeModels';
import SignUpPage from './components/SignUpPage';

function App() {
  type token = {
    type: string,
    value: string
  }

  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminModel | {}>({})

  const onLogin = (email: string, password: string) => {
    BackendAPI.admin.login({ email, password })
      .then((res) => {
        if (res.status === 200) {
          res = res as AxiosResponse;

          let userToken = {
            type: res.data.token_type,
            value: res.data.access_token
          }
          localStorage.setItem("userToken", JSON.stringify(userToken))
          navigate("/success");
        } else {
          console.log(res)
          showSuccessToast("Invalid login credentials!");
          alert("Invalid login credentials!")
        }
      })
  }
  const onSignUp = (admin:AdminModel) =>{

  }

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<SignInPage onLogin={onLogin} />} />
        <Route path='/signup' element={<SignUpPage onSignUp={onSignUp} />} />
        <Route path="/success/*" element={<HomePage admin={admin} />} />
      </Routes>

    </div>
  );
}

export default App;
