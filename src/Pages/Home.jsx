import { Link } from "react-router-dom";
import React from "react";
import { constants } from "../utils";
import { useLoggedOut } from "../hooks/useProtected";

const Home = () => {
  useLoggedOut();
  return (
    <div>
      <h1 className="app-container">Home</h1>
      <Link to={constants.routes.studentLogin}>
        <button>STUDENT LOGIN</button>
      </Link>{" "}
      <Link to={constants.routes.lecturerLogin}>
        <button>LECTURER LOGIN</button>
      </Link>
    </div>
  );
};

export default Home;
