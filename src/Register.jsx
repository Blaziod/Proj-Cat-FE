import React, { useState } from "react";

export const Register = (props) => {
const[email, setEmail] = useState ('');
const[pass, setPass] = useState('');
const[name, setName] = useState('');  
const[matric, setMatric] = useState('');   
const[phone, setPhone] = useState('');
const[dept, setDept] = useState('');
const[sem, setSem] = useState('');  
   

const handleSubmit = (e) =>  {
    e.preventDefault();
    console.log(email);
}


    return (
    
        <div className="auth-form-container-register">
                <h2>Register</h2>
        <form className="register-form"onSubmit= {handleSubmit}>
            <label htmlFor="name"> Full Name </label>
            <input className="register-input" value={name} onChange={(e) => setName(e.target.value)} type="name" id="name" placeholder="full name" name="name"/>

            <label htmlFor="matric"> Matric Number </label>
            <input className="register-input" value={matric} onChange={(e) => setMatric(e.target.value)} type="matric" id="matric" placeholder="matric number" matric="matric"/>

            <label htmlFor="phone"> Phone Number </label>
            <input className="register-input" value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" id="phone" placeholder="phone number" phone="phone"/>

            <label htmlFor="dept"> Department </label>
            <input className="register-input" value={dept} onChange={(e) => setDept(e.target.value)} type="dept" id="dept" placeholder="Department" dept="dept"/>

            <label htmlFor="sem"> Semester </label>
            <input className="register-input" value={sem} onChange={(e) => setSem(e.target.value)} type="sem" id="sem" placeholder="Semester" sem="sem"/>

            <label htmlFor="email"> Email </label> 
            <input className="register-input" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder= "youremail@gmail.com" id="email" name="email"/>
            
            <label htmlFor="password"> Password </label>
            <input className="register-input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder= "********" id="password" name="password"/>
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('Login')} >Already have an account? Login here.</button>
     </div>

    )
    }