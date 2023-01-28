import React, { useState } from "react";

export const LecturerRegister = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
  


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }


    return (

        <div className="auth-form-container-register">
            <h2>Lecturer Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-grid-layout">
                    <div className="input-group">
                        <label htmlFor="name"> Full Name </label>
                        <input className="register-input" value={name} onChange={(e) => setName(e.target.value)} type="name" id="name" placeholder="full name" name="name" />
                    </div>
                
                   
                    <div className="input-group">
                        <label htmlFor="email"> Email </label>
                        <input className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password"> Password </label>
                        <input className="register-input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    </div>
                </div>

                <button className="register-submit-btn" type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('Login')} >Already have an account? Login here.</button>
        </div>

    )
}