import { Link } from "react-router-dom";
import React from "react";

const Home = () => {
  return (

    <div className="auth-form-container">
      <h1>Home</h1>

      <Link to="/Login"><button>STUDENT LOGIN</button></Link> <br></br> <p></p>
      <Link to="/LecturerLogin"><button>LECTURER LOGIN</button></Link>

    </div>
  )
};

export default Home;
