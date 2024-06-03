//rafce
import React from 'react'
//import { BrowserRouter as  Route,Routes,Router} from 'react-router-dom'
import {Route,Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/SignUp'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import ResetPassword from './pages/forgotPassword/ResetPassword'

//const routes=(
    //<Router>
        //<Routes>
            //<Route path="/dashboard" exact element={<Home/>} />
            //<Route path="/login" exact element={<Login/>} />
            //<Route path="/signup" exact element={<Signup/>} />
       //</Routes>
    //</Router>
//


function App(){
  return (
    <div>
        <Routes>
            <Route path="/dashboard" element={<Home/>} />
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password/:id/:token" element={<ResetPassword/>} />
        </Routes>
    </div>
  );
}

export default App;

