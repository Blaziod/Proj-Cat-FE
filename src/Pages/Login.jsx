import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../services/apiservice'
import { constants } from '../utils'

export const Login = () => {
	const [password, setPassword] = useState('')
	const [matricNo, setMatricNo] = useState('')
	const [isRequestingLogin, setIsRequestingLogin] = useState(false)

	let navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		console.log(password, matricNo)

		setIsRequestingLogin(true)

		api.studentLogin({ matricNo, password })
			.then(data => {
				console.log(data)
				toast(data.message)
				navigate(constants.routes.proposeTopic)
			})
			.catch(errorData => {
				console.log(errorData)
				toast(errorData.message)
			})
			.finally(() => setIsRequestingLogin(false))
	}

	return (
		<div className='auth-form-container'>
			<h2 className='app-container'>Student Login</h2>
			<form className='login-form' onSubmit={handleSubmit}>
				<label htmlFor='matricNo'> Matric Number </label>
				<input
					value={matricNo}
					onChange={e => setMatricNo(e.target.value)}
					type='matricNo'
					id='matricNo'
					placeholder='matric number'
					name='matricNo'
					required='required'
				/>

				<label htmlFor='password'> Password </label>
				<input
					value={password}
					onChange={e => setPassword(e.target.value)}
					type='password'
					placeholder='********'
					id='password'
					name='password'
					required='required'
				/>
				<button type='submit' disabled={isRequestingLogin}>
					Log In
				</button>
			</form>
			<Link to='/Register'>
				<button className='link-btn'>Don't have an account? Register here.</button>
			</Link>
		</div>
	)
}
