import React, { useEffect } from 'react'
import { useLoggedIn } from '../hooks/useProtected'
import { useState } from 'react'
import * as apiservice from '../services/apiservice'
import { useAppContext } from '../components/AppContext'
import { DashboardLayout } from '../layouts/dashboard'

const statusTextColorMap = {
	approved: 'bg-success',
	rejected: 'bg-error',
	'pending approval': 'bg-warning'
}

export default function StudentDashboard() {
	useLoggedIn()

	const [appState] = useAppContext()
	const [project, setProject] = useState(null)
	const [proposalTopics, setProposalTopics] = useState([])

	const getProposalStatusText = proposal => {
		if (proposal.id === project?.approvedTopic?.id) return 'approved'
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
		<DashboardLayout title='Student Dashboard'>
			<div>
				<table>
					<thead>
						<tr>
							<th>Project Topics</th>
							<th>Project State</th>
						</tr>
					</thead>
					<tbody>
						{[...proposalTopics].reverse().map(proposal => {
							const statusText = getProposalStatusText(proposal)
							return (
								<tr key={proposal.id}>
									<td>{proposal.title}</td>
									<td>
										<span className={`${statusTextColorMap[statusText]} text-sm text-bold tag`}>
											{statusText}
										</span>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</DashboardLayout>
	)
}
