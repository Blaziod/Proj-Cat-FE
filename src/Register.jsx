import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';

export const Register = (props) => {

    const data = [
        { Department: 'Computer Science', id: 1 },
        { Department: 'Electrical Engineering', id: 2 }
    ]

    const sem = [
        { Semester: "One", id: 1 },
        { Semester: 'Two', id: 2 },
        { Semester: 'Three', id: 1 },
        { Semester: 'Four', id: 2 }

    ]

    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [matric, setMatric] = useState('');
    const [phone, setPhone] = useState('');
   

    const [options] = useState(data);
    const [ooptions] = useState(sem);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(matric);
    }


    return (

        <div className="auth-form-container-register">
            <h2 className="app-container">Student Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-grid-layout">
                    <div className="input-group">
                        <label htmlFor="name"> Full Name </label>
                        <input className="register-input" value={name} onChange={(e) => setName(e.target.value)} type="name" id="name" placeholder="full name" name="name" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="matric"> Matric Number </label>
                        <input className="register-input" value={matric} onChange={(e) => setMatric(e.target.value)} type="matric" id="matric" placeholder="matric number" matric="matric" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone"> Phone Number </label>
                        <input className="register-input" value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" id="phone" placeholder="phone number" phone="phone" />
                    </div>
                    <div className="input-group">
                        <label htmlFor='Department'> Select your department</label>
                        <Multiselect singleSelect={true} style={{ multiselectContainer: { width: 200, height: 90, color: 'black' } }} options={options} displayValue={'Department'} className="register-input" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password"> Password </label>
                        <input className="register-input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    </div>

                    <div className="input-group">
                        <label htmlFor='Semester'> Select your semester</label>
                        <Multiselect singleSelect={true} style={{ multiselectContainer: { width: 200, height: 90, color: 'black' } }} options={ooptions} displayValue={'Semester'} className="register-input" />
                    </div>
                </div>

                <button className="register-submit-btn" type="submit">Register</button>
            </form>
            <Link to="/Login"><button className="link-btn">Already have an account? Login here</button></Link>
        </div>

    )
}