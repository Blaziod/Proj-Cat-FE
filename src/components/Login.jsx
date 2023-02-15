import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { constants } from '../utils'

export default function Login({ title, handleSubmit, actionKeyDisabled, idField, authField, registerLink }) {
	const [authKeyFieldValue, setAuthKeyFieldValue] = useState('')
	const [idFieldValue, setIdFieldValue] = useState('')

	const submit = e => {
		e.preventDefault()
		handleSubmit({ id: idFieldValue, authKey: authKeyFieldValue })
	}

	return (
		<div className='auth-form-container'>
			<h2 className='app-container'>{title}</h2>
			<form className='login-form' onSubmit={submit}>
				<label htmlFor={idField.id}> {idField.label} </label>
				<input
					value={idFieldValue}
					onChange={e => setIdFieldValue(e.target.value)}
					type='text'
					id={idField.id}
					placeholder={idField.placeholder}
					name={idField.name}
					required
				/>

				<label htmlFor={authField.id}> {authField.label} </label>
				<input
					value={authKeyFieldValue}
					onChange={e => setAuthKeyFieldValue(e.target.value)}
					type='password'
					placeholder={authField.placeholder}
					id={authField.id}
					name={authField.name}
					required
				/>
				<button type='submit' disabled={actionKeyDisabled}>
					Log In
				</button>
			</form>
			<Link to={registerLink}>
				<button className='link-btn'>Don't have an account? Register here.</button>
			</Link>
		</div>
	)
}
