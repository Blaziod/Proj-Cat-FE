import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function LecturerRegister(props) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [fullName, setFullName] = useState('')
	const [departmentName, setDepartmentName] = useState('')

	let navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		console.log(email, password, fullName)

		axios
			.post('https://project-catalog.onrender.com/api/auth/register/lecturer', {
				password,
				fullName,
				departmentName,
				email
			})

			.then(response => {
				console.log(response)
				toast(response.data.message)
				navigate('/LecturerLogin')
				return response.data.message
			})
			.catch(error => {
				console.log(error)
				toast(error.response.data.message)
			})
	}

	return (
		<div className='auth-form-container-register'>
			<h2 className='app-container'>Lecturer Register</h2>
			<form className='register-form' onSubmit={handleSubmit}>
				<div className='form-grid-layout'>
					<div className='input-group'>
						<label htmlFor='fullName'> Full Name </label>
						<input
							className='register-input'
							value={fullName}
							onChange={e => setFullName(e.target.value)}
							type='string'
							id='name'
							placeholder='full name'
							name='name'
						/>
					</div>

					<div className='input-group'>
						<label htmlFor='email'> Email </label>
						<input
							className='register-input'
							value={email}
							onChange={e => setEmail(e.target.value)}
							type='string'
							placeholder='youremail@gmail.com'
							id='email'
							name='email'
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='departmentName'> Department </label>
						<input
							className='register-input'
							value={departmentName}
							onChange={e => setDepartmentName(e.target.value)}
							type='string'
							placeholder='type in your department'
							id='department'
							name='department'
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='password'> Password </label>
						<input
							className='register-input'
							value={password}
							onChange={e => setPassword(e.target.value)}
							type='password'
							placeholder='********'
							id='password'
							name='password'
						/>
					</div>
				</div>

				<button className='register-submit-btn' type='submit'>
					Register
				</button>
			</form>
			<Link to='/LecturerLogin'>
				<button className='link-btn'>Already have an account? Login here</button>
			</Link>
		</div>
	)
}
