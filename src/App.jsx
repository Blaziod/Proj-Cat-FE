import React, { useState } from "react";
import './App.css';
import { Login } from "./Login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ProposeTopic } from "./Pages/ProposeTopic";
import { Register } from "./Register";
import { LecturerRegister } from "./LecturerRegister";
import  Layout  from "./Pages/Layout";
import  Home  from "./Pages/Home";
import NoPage  from "./Pages/NoPage";
import { LecturerLogin } from "./LecturerLogin";



function App() {
  const [currentForm, setCurrentForm] = useState('Login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    
    <div className="App">
      {
        // currentForm === "Login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
       
        <BrowserRouter>

        <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route index element={<Home />} />
        <Route path="ProposeTopic" element={<ProposeTopic />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="LecturerRegister" element={<LecturerRegister />} />
        <Route path="LecturerLogin" element={<LecturerLogin />} />
        <Route path="*" element={<NoPage />} />
  
         
        </Routes>
        </BrowserRouter>
      }
    </div>

  );
}

export default App;
