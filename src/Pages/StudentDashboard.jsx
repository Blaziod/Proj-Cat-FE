import React, { useEffect } from 'react'
import { useLoggedIn } from '../hooks/useProtected'
import { useState } from 'react'
import * as apiservice from '../services/apiservice'
import { useAppContext } from '../components/AppContext'
import { DashboardLayout } from '../layouts/dashboard'

export default function StudentDashboard(props) {
	useLoggedIn()

	const [appState] = useAppContext()
	const [project, setProject] = useState(null)
	const [proposalTopics, setProposalTopics] = useState([])

	const getProposalStatusText = proposal => {
		if (proposal.id === project.approvedTopic) return 'approved'
		if (proposal.reviewed === true) return 'rejected'

		return 'pending approval'
	}

	useEffect(() => {
		if (appState.user)
			apiservice.getStudentProposals(appState.user.matricNo).then(data => {
				const { topics, ...project } = data.body
				setProject(project)
				setProposalTopics(topics)
			})
	}, [appState.user])

	return (
		<DashboardLayout>
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
							{proposalTopics.map(proposal => (
								<tr key={proposal.id}>
									<td>{proposal.title}</td>
									<td>{getProposalStatusText(proposal)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</DashboardLayout>
	)
}
