import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import data from '../mock-data.json'
import apiservice from '../services/apiservice'
import '../Table.css'

const LecturerDashboard = () => {
	const [proposals, setProposals] = useState([])
	// a map of projectIds to the topic selected for that project
	// this is used to track which topic has been selected
	const [selectedTopics, setSelectedTopics] = useState({})

	const approveTopic = projectId => {
		const selectedTopic = selectedTopics[projectId]

		// get the lecturerId
	}

	const removeProject = projectId => {
		setProposals(prpsls => prpsls.filter(proj => proj.id !== projectId))
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
		<div className='app-container'>
			<h2 className='app-container'>Lecturer Dashboard</h2>
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
								<p></p>
								<button onClick={() => rejectAllTopics(projectDetails.id)}> Reject All </button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default LecturerDashboard
