import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../components/AppContext'
import { constants } from '../utils'

/**
 * A hook that prevents access to logged out users.
 * This hook is used in pages that should only be visited by logged in users
 */
export function useLoggedIn() {
	const [state] = useAppContext()

	const navigate = useNavigate()

	useLayoutEffect(() => {
		if (!state.isLoggedIn) {
			navigate(constants.routes.index)
		}
	}, [state])
}


/**
 * A hook that prevents access to logged in users.
 * This hook is used in pages that should only be visited by logged out users.
 */
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


/**
 * A hook that allows performs a certain action if a predicate function returns `false`.
 * The action is executed before any items are visible on the page.
 * This should be used in pages where we want to place certain restrictions.
 * 
 * @param {(any) => boolean} predicate -  access condition
 * @param {() => void} action - action to be performed when condition passes
 */
export function useProtectionCondition(condition, action) {
	const [state] = useAppContext()

	useLayoutEffect(() => {
		if (!condition(Object.create(null, { ...state }))) {
			action()
		}
	}, [state])
}


