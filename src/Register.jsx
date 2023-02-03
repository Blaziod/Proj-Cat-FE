import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import axios from "axios";

export const Register = (props) => {

    const data = [
        { departmentName: 'Computer Science', id: 1 },
        { departmentName: 'Electrical Engineering', id: 2 }
    ]

    const sem = [
        { Semester: "One", id: 1 },
        { Semester: 'Two', id: 2 },
        { Semester: 'Three', id: 1 },
        { Semester: 'Four', id: 2 }

    ]

    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [matricNo, setMatricNo] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [semester, setSemester] = useState(1,2,3,4,5,6,7,8);
    const [departmentName, setdepartmentName] = useState('');


    const [options] = useState(data);
    const [ooptions] = useState(sem);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(matricNo, password, fullName, phoneNumber, data, sem);

        axios.post('https://project-cataloging.onrender.com/api/auth/register/student',
        {
            password,
            fullName,
            matricNo,
            phoneNumber,
            departmentName,
            semester
        }
       
        )

            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

    }


    return (

        <div className="auth-form-container-register">
            <h2 className="app-container">Student Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-grid-layout">
                    <div className="input-group">
                        <label htmlFor="fullName"> Full Name </label>
                        <input className="register-input" value={fullName} onChange={(e) => setFullName(e.target.value)} type="string" id="fullName" placeholder="full name" name="fullName" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="matricNo"> Matric Number </label>
                        <input className="register-input" value={matricNo} onChange={(e) => setMatricNo(e.target.value)} type="string" id="matricNo" placeholder="matric number" name="matricNo" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="phoneNumber"> Phone Number </label>
                        <input className="register-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="string" id="phoneNumber" placeholder="phone number" name="phoneNumber" />
                    </div>
                    {/* <div className="input-group">
                        <label htmlFor='departmentName'> Select your department</label>
                        <Multiselect singleSelect={true} style={{ multiselectContainer: { width: 200, height: 90, color: 'black' } }} options={options} displayValue={'departmentName'} className="register-input" id="departmentName" departmentName="departmentName" type="string" />
                    </div> */}
                    <div className="input-group">
                        <label htmlFor="password"> Password </label>
                        <input className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} type="string" placeholder="********" id="password" name="password" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="departmentName"> Passwordafdwe </label>
                        <input className="register-input" value={departmentName} onChange={(e) => setdepartmentName(e.target.value)} type="string" placeholder="********" id="departmentName" name="departmentName" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="semester"> Semester </label>
                        <input className="register-input" value={semester} onChange={(e) => setSemester(e.target.value)} type="number" placeholder="********" id="semester" name="semester" />
                    </div>

                    {/* <div className="input-group">
                        <label htmlFor='semester'> Select your semester</label>
                        <Multiselect singleSelect={true} style={{ multiselectContainer: { width: 200, height: 90, color: 'black' } }} options={ooptions} displayValue={'semester'} className="register-input" id="semester" type="number" />
                    </div> */}
                </div>

                <button className="register-submit-btn" type="submit">Register</button>
            </form>
            <Link to="/Login"><button className="link-btn">Already have an account? Login here</button></Link>
        </div>

    )
}