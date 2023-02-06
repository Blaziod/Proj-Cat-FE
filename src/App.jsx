import React, { useState } from "react";
import "./App.css";
import { Login } from "./Login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ProposeTopic } from "./Pages/ProposeTopic";
import { Register } from "./Register";
import { LecturerRegister } from "./LecturerRegister";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";
import LecturerDashboard from "./LecturerDashboard";
import { LecturerLogin } from "./LecturerLogin";
import ApiTrial from "./Pages/ApiTrial";
import PostApi from "./Pages/PostApi";

function App() {
  const [currentForm, setCurrentForm] = useState("Login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      {
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route index element={<Home />} />
            <Route path="ProposeTopic" element={<ProposeTopic />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="LecturerRegister" element={<LecturerRegister />} />
            <Route path="LecturerLogin" element={<LecturerLogin />} />
            <Route path="LecturerDashboard" element={<LecturerDashboard />} />
            <Route path="PostApi" element={<PostApi />} />
            <Route path="ApiTrial " element={<ApiTrial />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
