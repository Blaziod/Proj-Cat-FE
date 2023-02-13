import { useEffect, useState } from 'react'

/**
 *
 * This will call toString() on the val and store the string result in local storage
 * if the item is not stringifyable.
 * @param {*} anyVal - value to store in local storage
 */
function asString(anyVal) {
	let valToStore = anyVal.toString()

	if (Array.isArray(anyVal)) {
		valToStore = JSON.stringify(anyVal)
	} else if (typeof anyVal === 'object') {
		valToStore = JSON.stringify(anyVal)
	}

	return valToStore
}

/**
 * Stores an item in local storage and updates the local storage as value updates.
 * This will call toString() on the val and store the string result in local storage
 * if the item is not stringifyable.
 * @param {string} key - store item identifier
 * @param {any} state - value of store item
 * @returns
 */
export default function useLocalStorage(key, statefulValue) {
	const [_oldState] = useState(() => {
		const itemInStorage = localStorage.getItem(key)
		if (itemInStorage) {
			try {
				return JSON.parse(itemInStorage)
			} catch (e) {
				return itemInStorage
			}
		}
		return null
	})

	const clearStorage = () => {
		localStorage.removeItem(key)
	}

	const updateLocalStorage = () => {
		localStorage.setItem(key, asString(statefulValue))
	}

	useEffect(() => {
		updateLocalStorage()
	}, [statefulValue])

	return [_oldState, clearStorage]
}

export function clearStorage() {
	localStorage.clear()
}
