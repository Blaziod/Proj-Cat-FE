import React, { useEffect } from "react";
import { useLoggedIn } from "../hooks/useProtected";
import { useState } from "react";
import * as apiservice from "../services/apiservice";
import { useAppContext } from "../components/AppContext";
import { constants } from "../utils";
import { Link } from "react-router-dom";
import ProjectUpload from "./ProjectUpload";

export default function studentUpload() {
  useLoggedIn();

  const [appState] = useAppContext();

  return (
    <div className="auth-form-container">
      <h1 className="app-container">Project Upload</h1>
      Fill in your project name, and upload your file. Files can only be in pdf
      or DOC format.
      <form className="login-form">
        <input
          type="text"
          placeholder="Project name"
          name={ProjectUpload}
          required
        />
      </form>
      <button type="submit">UPLOAD FILE</button>
    </div>
  );
}
