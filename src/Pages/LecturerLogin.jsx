import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LecturerLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    axios
      .post("https://project-catalog.onrender.com/api/auth/login/lecturer", {
        password,
        email,
      })

      .then((response) => {
        console.log(response);
        toast(response.data.message);
        navigate("/LecturerDashboard");
      })
      .catch((error) => {
        console.log(error);
        toast(error.response.data.message);
      });
  };

  return (
    <div className="auth-form-container">
      <h2 className="app-container">Lecturer Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email"> Email </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />

        <label htmlFor="password"> Password </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />

        <button type="submit">Log In</button>
      </form>
      <Link to="/LecturerRegister">
        <button className="link-btn">
          Don't have an account? Register here.
        </button>
      </Link>
    </div>
  );
};
