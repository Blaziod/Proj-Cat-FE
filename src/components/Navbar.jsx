import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { constants } from "../utils";
import { actions, useAppContext } from "./AppContext";

function Navbar() {
  const [appstate, dispatch] = useAppContext();
  const navigate = useNavigate();

  const goToIndex = () => navigate(constants.routes.index);
  const logout = () => dispatch({ action: actions.logout });

  const renderStudentNav = () => (
    <div className="section">
      <Link to={constants.routes.studentDash}>Dashboard</Link>
      <Link to={constants.routes.proposeTopic}>Add Topic</Link>
      <Link to={constants.routes.studentUpload}>Upload Project</Link>
    </div>
  );

  const renderLecturerNav = () => (
    <div className="section">
      <Link to={constants.routes.lecturerDash}>Dashboard</Link>
      <Link to={constants.routes.projectUpload}>View Projects</Link>
    </div>
  );

  const renderUserNavigation = () => {
    return appstate.userType === constants.userTypes.student
      ? renderStudentNav()
      : renderLecturerNav();
  };

  return (
    <nav className="navbar">
      <div className="section">
        <span>
          PTPD <em>PRO</em>
        </span>
      </div>
      {appstate.isLoggedIn && renderUserNavigation()}
      <div className="section">
        {appstate.isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={goToIndex}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
