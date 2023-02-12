import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Login from '../components/Login'

import api from '../services/apiservice'
import { constants } from '../utils'

export default function StudentLogin() {
	const navigate = useNavigate()
	const [isRequesting, setIsRequesting] = useState(false)

	const handleSubmit = ({ id, authKey }) => {
		setIsRequesting(true)

		api.studentLogin({ matricNo: id, password: authKey })
			.then(data => {
				console.log(data)
				toast(data.message)
				navigate(constants.routes.proposeTopic)
			})
			.catch(errorData => {
				console.log(errorData)
				toast(errorData.message)
			})
			.finally(() => setIsRequesting(false))
	}

	return (
		<Login
			title='Student Login'
			handleSubmit={handleSubmit}
			actionKeyDisabled={isRequesting}
			idField={{ id: 'matricNo', placeholder: 'aa/aa/aaa/11/11111', name: 'matricNo', label: 'Matric Number' }}
			authField={{ id: 'password', placeholder: '**********', name: 'password', label: 'Password' }}
		/>
	)
}
