import React, { useEffect } from 'react'
import { useLoggedIn } from '../hooks/useProtected'
import { useState } from 'react'
import * as apiservice from '../services/apiservice'
import { useAppContext } from '../components/AppContext'

export default function StudentDashboard(props) {
	useLoggedIn()

	const [appState] = useAppContext()
	const [proposals, setProposals] = useState([])

	useEffect(() => {
		if (appState.user)
			apiservice.getStudentProposals(appState.user.matricNo).then(data => {
				setProposals(data.body)
			})
	}, [appState.user])

	return (
		<div className='auth-form-container'>
			<h1 className='app-container'>Student Dashboard</h1>
			<div className='app-container'>
				<table>
					<thead>
						<tr>
							<th>Project Topics</th>
							<th>Project State</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Design A website</td>
							<td>rejected</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}
