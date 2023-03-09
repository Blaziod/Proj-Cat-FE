import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions, useAppContext } from "../components/AppContext";
import Login from "../components/Login";
import { useLoggedOut } from "../hooks/useProtected";

import * as api from "../services/apiservice";
import { constants } from "../utils";

export default function StudentLogin() {
  useLoggedOut();
  const navigate = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false);
  const [_appState, dispatch] = useAppContext();

  const handleSubmit = ({ id, authKey }) => {
    setIsRequesting(true);

    api
      .studentLogin({ matricNo: id, password: authKey })
      .then((data) => {
        dispatch({ action: actions.setIsLoggedIn, payload: true });
        dispatch({ action: actions.setUser, payload: data.body });
        dispatch({
          action: actions.setUserType,
          payload: constants.userTypes.student,
        });
        toast(data.message);
        navigate(constants.routes.studentDash);
      })
      .catch((errorData) => {
        console.log(errorData);
        toast(errorData.message);
      })
      .finally(() => setIsRequesting(false));
  };

  return (
    <Login
      title="Student Login"
      handleSubmit={handleSubmit}
      actionKeyDisabled={isRequesting}
      idField={{
        id: "matricNo",
        placeholder: "aa/aa/aaa/11/11111",
        name: "matricNo",
        label: "Matric Number",
      }}
      authField={{
        id: "password",
        placeholder: "**********",
        name: "password",
        label: "Password",
      }}
      registerLink={constants.routes.studentRegister}
    />
  );
}
