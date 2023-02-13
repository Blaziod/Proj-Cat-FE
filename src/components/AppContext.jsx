import { useEffect } from 'react'
import { createContext, useReducer, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const initialState = {
	isLoggedIn: false,
	user: null,
	userProject: null,
	userType: null
}

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

export const actions = {
	setIsLoggedIn: 'setIsLoggedIn',
	setUser: 'setUser',
	setUserType: 'setUserType',
	logout: 'logout',
	setState: 'setState'
}

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
