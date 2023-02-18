import { useEffect } from 'react'
import { createContext, useReducer, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

/**
 * The Initial State of the application.
 */
const initialState = {
	isLoggedIn: false,
	user: null,
    // to track student project
	userProject: null,
	userType: null
}

/**
 * The Context object stores the current state of the application and makes
 * the data available - application wide.
 */
export const Context = createContext(initialState)

export function useAppContext() {
	return useContext(Context)
}

export default function ({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [previouslySetState, clearPreviouslySetState] = useLocalStorage('appstate', state)

	useEffect(() => {
		if (previouslySetState) {
			dispatch({ payload: () => previouslySetState, action: actions.setState })
		}
	}, [])

	return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
}

/**
 * Declaration of actions that change state in a predicatable way.
 */
export const actions = {
	setIsLoggedIn: 'setIsLoggedIn',
	setUser: 'setUser',
	setUserType: 'setUserType',
	logout: 'logout',
	setState: 'setState'
}

/**
 * Definition/Implementation of the state changes.
 *
 * @param {any} state -  current app state
 * @param {any} dispatchObject - the action that should be triggered and what data should change.
 * @returns the new application state
 */
function reducer(state, { action, payload }) {
	switch (action) {
		case actions.setState:
			return payload(state)
		case actions.setIsLoggedIn:
			return { ...state, isLoggedIn: payload }
		case actions.setUser:
			return { ...state, user: payload }
		case actions.setUserType:
			return { ...state, userType: payload }
		case actions.logout:
			return initialState
		default:
			return state
	}
}
