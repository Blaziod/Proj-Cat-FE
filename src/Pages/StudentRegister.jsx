import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Multiselect } from 'multiselect-react-dropdown'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'
import apiservice from '../services/apiservice'
import { constants } from '../utils'

const semesters = [
	{ Semester: 'One', id: 1 },
	{ Semester: 'Two', id: 2 },
	{ Semester: 'Three', id: 1 },
	{ Semester: 'Four', id: 2 }
]

const departments = [
	{ departmentName: 'Computer Science', id: 1 },
	{ departmentName: 'Electrical Engineering', id: 2 }
]

function transformAndMergeErrorMessages(errs, altMessage = '') {
	if (errs && Array.isArray(errs) && errs.length > 0) {
		return (
			<div>
				{errs
					.map(err => err.replace(' - ', ': '))
					.map(str => (
						<div style={{ textAlign: 'left' }} key={str}>
							{str}
							<ul />
						</div>
					))}
			</div>
		)
	}

	return <div>{altMessage}</div>
}

export default function Register(props) {
	let navigate = useNavigate()

	const [password, setPassword] = useState('')
	const [fullName, setFullName] = useState('')
	const [matricNo, setMatricNo] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [semester, setSemester] = useState(1)
	const [departmentName, setDepartmentName] = useState('')
	const [isRequestingRegister, setIsRequestingRegister] = useState(false)

	const handleDepartmentSelected = (_, selectedValue) => {
		setDepartmentName(selectedValue.departmentName)
	}

	const handleSubmit = e => {
		e.preventDefault()
		setIsRequestingRegister(true)
		apiservice
			.studentRegister({
				password,
				fullName,
				matricNo,
				phoneNumber,
				departmentName,
				semester
			})
			.then(data => {
				toast(data.message)
				navigate(constants.routes.studentLogin)
			})
			.catch(errData => {
				toast(transformAndMergeErrorMessages(errData.body, errData.message))
			})
			.finally(() => setIsRequestingRegister(false))
	}

	return (
		<div className='auth-form-container-register'>
			<h2 className='app-container'>Student Register</h2>
			<form className='register-form' onSubmit={handleSubmit}>
				<div className='form-grid-layout'>
					<div className='input-group'>
						<label htmlFor='full-name'> Full Name </label>
						<input
							className='register-input'
							value={fullName}
							onChange={e => setFullName(e.target.value)}
							type='string'
							id='full-name'
							placeholder='full name'
							name='full-name'
							required='required'
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='matric-no'> Matric Number </label>
						<input
							className='register-input'
							value={matricNo}
							onChange={e => setMatricNo(e.target.value)}
							type='string'
							id='matric-no'
							placeholder='matric number'
							name='matric-no'
							required='required'
							pattern={`[A-Za-z]{2}\/[A-Za-z]{2}\/[A-Za-z]{3}\/\\d{2}\/\\d{5}`}
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='phone-number'> Phone Number </label>
						<input
							className='register-input'
							value={phoneNumber}
							onChange={e => setPhoneNumber(e.target.value)}
							type='string'
							id='phone-number'
							placeholder='phone number'
							name='phone-number'
							required='required'
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='password'> Password </label>
						<input
							className='register-input'
							value={password}
							onChange={e => setPassword(e.target.value)}
							type='string'
							placeholder='********'
							id='password'
							name='password'
							required='required'
						/>
					</div>

					<div className='input-group'>
						<label htmlFor='department-name'> Select your department</label>
						<Multiselect
							singleSelect={true}
							style={{
								multiselectContainer: {
									width: 200,
									height: 90,
									color: 'black'
								}
							}}
							options={departments}
							displayValue='departmentName'
							className='register-input'
							id='department-name'
							name='department-name'
							onSelect={handleDepartmentSelected}
							required='required'
						/>
					</div>

					<div className='input-group'>
						<label htmlFor='semester'> Semester </label>
						<input
							className='register-input'
							value={semester}
							onChange={e => setSemester(parseInt(e.target.value))}
							type='number'
							min={1}
							max={8}
							placeholder='********'
							id='semester'
							name='semester'
							required='required'
						/>
					</div>
				</div>

				<button className='register-submit-btn' disabled={isRequestingRegister} type='submit'>
					Register
				</button>
			</form>

			<Link to={constants.routes.studentLogin}>
				<button className='link-btn'>Already have an account? Login here</button>
			</Link>
		</div>
	)
}
