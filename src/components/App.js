import React from 'react'
import '../App.css';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Register from './register';

const App = () => {


  return (
    <div id="main"> 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}


export default App;
