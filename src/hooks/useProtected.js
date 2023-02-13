import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../components/AppContext'
import { constants } from '../utils'

export function useLoggedIn() {
	const [state] = useAppContext()

	const navigate = useNavigate()

	useLayoutEffect(() => {
		if (!state.isLoggedIn) {
			navigate(constants.routes.index)
		}
	}, [state])
}

export function useLoggedOut() {
	const [state] = useAppContext()

	const navigate = useNavigate()

	useLayoutEffect(() => {
		if (state.isLoggedIn && state.userType === constants.userTypes.student) {
			navigate(constants.routes.proposeTopic) // TODO should navigate to dashboard
		} else if (state.isLoggedIn && state.userType === constants.userTypes.lecturer) {
			navigate(constants.routes.lecturerDash)
		}
	}, [state])
}

export function useProtectionCondition(condition, action) {
	const [state] = useAppContext()

	useLayoutEffect(() => {
		if (condition(Object.create(null, { ...state }))) {
			action()
		}
	}, [state])
}
