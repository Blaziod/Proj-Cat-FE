import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppContext } from '../components/AppContext'
import { useLoggedIn, useProtectionCondition } from '../hooks/useProtected'
import { DashboardLayout } from '../layouts/dashboard'
import * as apiservice from '../services/apiservice'
import '../Table.css'
import { constants } from '../utils'

const LecturerDashboard = () => {
	// allow loggedin users
	useLoggedIn()

	const navigate = useNavigate()
	// allow only lecturers
	useProtectionCondition(
		state => state.userType !== constants.userTypes.lecturer,
		() => navigate(constants.routes.index)
	)

	// get application state
	const [_appState] = useAppContext()

	const [proposals, setProposals] = useState([])
	// a map of projectIds to the topic selected for that project
	// this is used to track which topic has been selected
	const [selectedTopics, setSelectedTopics] = useState({})

	const removeProject = projectId => {
		setProposals(prpsls => prpsls.filter(proj => proj.id !== projectId))
		// remove entry from selectedTopics map
		setSelectedTopics(selTops => {
			delete selTops[projectId]
			return selTops
		})
	}

	const approveTopic = projectId => {
		const selectedTopic = selectedTopics[projectId]

		apiservice
			.approveProjectTopic({ topicId: selectedTopic, lecturerId: _appState.user.id })
			.then(data => {
				toast(data.message)
				// remove the reviewed project from the table
				removeProject(projectId)
			})
			.catch(errData => {
				console.log(errData)
				toast(errData.message)
			})
	}

	const rejectAllTopics = projectId => {
		apiservice
			.rejectProjectTopics({ projectId })
			.then(data => {
				toast(data.message)
				// remove the reviewed project from the table
				removeProject(projectId)
			})
			.catch(errData => {
				console.log(errData)
				toast(errData.message)
			})
	}

	useEffect(() => {
		apiservice.getProposalsPendingReview().then(data => {
			setProposals(data.body)
		})
	}, [])

	return (
		<DashboardLayout title='Lecturer Dashboard'>
			<table>
				<thead>
					<tr>
						<th>Student Matric Number</th>
						<th>Semester</th>
						<th>Department</th>
						<th>Project Topic</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{proposals.map(({ owner, topics, ...projectDetails }) => (
						<tr key={projectDetails.id}>
							<td>{owner.matricNo}</td>
							<td>{owner.semester}</td>
							<td>{owner.departmentName}</td>
							<td>
								{topics.map(topic => {
									return (
										<div key={topic.id}>
											<input
												type='radio'
												name={projectDetails.id}
												value={topic.id}
												className='form-check-input'
												onClick={() =>
													setSelectedTopics(selTops => ({
														...selTops,
														[projectDetails.id]: topic.id
													}))
												}
											/>
											{topic.title}
										</div>
									)
								})}
							</td>
							<td>
								<button
									disabled={selectedTopics[projectDetails.id] === undefined}
									onClick={() => approveTopic(projectDetails.id)}
								>
									{' '}
									Accept Selected{' '}
								</button>
                                {" "}
								<button onClick={() => rejectAllTopics(projectDetails.id)}> Reject All </button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</DashboardLayout>
	)
}

export default LecturerDashboard
