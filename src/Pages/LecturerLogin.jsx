import React, { useState } from 'react'
import Login from '../components/Login'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { constants } from '../utils'
import * as apiservice from '../services/apiservice'
import { useLoggedOut } from '../hooks/useProtected'
import { actions, useAppContext } from '../components/AppContext'

export default function LecturerLogin() {
	useLoggedOut()
	const navigate = useNavigate()
	const [isRequesting, setIsRequesting] = useState(false)
	const [_appState, dispatch] = useAppContext()

	const handleSubmit = ({ id, authKey }) => {
		setIsRequesting(true)
		apiservice
			.lecturerLogin({ email: id, password: authKey })
			.then(data => {
				dispatch({ action: actions.setIsLoggedIn, payload: true })
				dispatch({ action: actions.setUser, payload: data.body })
				dispatch({ action: actions.setUserType, payload: constants.userTypes.lecturer })
				toast(data.message)
				navigate(constants.routes.lecturerDash)
			})
			.catch(errData => {
				console.log(errData)
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
