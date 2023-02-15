import React, { useState } from 'react'
import Login from '../components/Login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { constants } from '../utils'
import apiservice from '../services/apiservice'

export default function LecturerLogin() {
	const navigate = useNavigate()
	const [isRequesting, setIsRequesting] = useState(false)

	const handleSubmit = ({ id, authKey }) => {
		setIsRequesting(true)
		apiservice
			.lecturerLogin({
				email: id,
				password: authKey
			})
			.then(data => {
				toast(data.message)
				navigate(constants.routes.lecturerDash)
			})
			.catch(errData => {
				toast(errData.message)
			})
			.finally(() => setIsRequesting(false))
	}
	return (
		<Login
			title='Lecturer Login'
			handleSubmit={handleSubmit}
			actionKeyDisabled={isRequesting}
			idField={{ id: 'email', placeholder: 'john.doe@gmail.com', name: 'email', label: 'Email' }}
			authField={{ id: 'password', placeholder: '**********', name: 'password', label: 'Password' }}
            registerLink={constants.routes.lecturerRegister}
		/>
	)
}
