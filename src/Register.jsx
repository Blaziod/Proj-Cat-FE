import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  const data = [
    { departmentName: "Computer Science", id: 1 },
    { departmentName: "Electrical Engineering", id: 2 },
  ];

  let navigate = useNavigate();

  const sem = [
    { Semester: "One", id: 1 },
    { Semester: "Two", id: 2 },
    { Semester: "Three", id: 1 },
    { Semester: "Four", id: 2 },
  ];

  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [matricNo, setMatricNo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [semester, setSemester] = useState(1);
  const [departmentName, setDepartmentName] = useState("");

  const [options] = useState(data);
  const [ooptions] = useState(sem);

  const handleDepartmentSelected = (_, selectedValue) => {
    console.log(selectedValue);
    setDepartmentName(selectedValue.departmentName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(matricNo, password, fullName, phoneNumber, data, sem);

    axios
      .post("https://project-catalog.onrender.com/api/auth/register/student", {
        password,
        fullName,
        matricNo,
        phoneNumber,
        departmentName,
        semester,
      })

      .then((response) => {
        console.log(response);
        toast(response.data.message);
        navigate("/Login");
      })
      .catch((error) => {
        console.log(error);
        toast(error.response.data.message);
      });
  };

  return (
    <div className="auth-form-container-register">
      <h2 className="app-container">Student Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-grid-layout">
          <div className="input-group">
            <label htmlFor="full-name"> Full Name </label>
            <input
              className="register-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="string"
              id="full-name"
              placeholder="full name"
              name="full-name"
              required="required"
            />
          </div>
          <div className="input-group">
            <label htmlFor="matric-no"> Matric Number </label>
            <input
              className="register-input"
              value={matricNo}
              onChange={(e) => setMatricNo(e.target.value)}
              type="string"
              id="matric-no"
              placeholder="matric number"
              name="matric-no"
              required="required"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone-number"> Phone Number </label>
            <input
              className="register-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="string"
              id="phone-number"
              placeholder="phone number"
              name="phone-number"
              required="required"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password"> Password </label>
            <input
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="string"
              placeholder="********"
              id="password"
              name="password"
              required="required"
            />
          </div>

          <div className="input-group">
            <label htmlFor="department-name"> Select your department</label>
            <Multiselect
              singleSelect={true}
              style={{
                multiselectContainer: {
                  width: 200,
                  height: 90,
                  color: "black",
                },
              }}
              options={options}
              displayValue="departmentName"
              className="register-input"
              id="department-name"
              name="department-name"
              onSelect={handleDepartmentSelected}
              required="required"
            />
          </div>

          <div className="input-group">
            <label htmlFor="semester"> Semester </label>
            <input
              className="register-input"
              value={semester}
              onChange={(e) => setSemester(parseInt(e.target.value))}
              type="number"
              placeholder="********"
              id="semester"
              name="semester"
              required="required"
            />
          </div>
        </div>

        <button className="register-submit-btn" type="submit">
          Register
        </button>
      </form>

      <Link to="/Login">
        <button className="link-btn">
          Already have an account? Login here
        </button>
      </Link>
    </div>
  );
};
