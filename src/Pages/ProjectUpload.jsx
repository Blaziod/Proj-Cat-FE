import React, { useEffect } from 'react'
import { useState } from 'react'
import * as apiservice from '../services/apiservice'
import { useAppContext } from '../components/AppContext'
import { DashboardLayout } from '../layouts/dashboard'
import { useLoggedIn, useProtectionCondition } from '../hooks/useProtected'
import { useNavigate } from 'react-router-dom'
import { constants } from '../utils'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function ProjectUpload() {
	useLoggedIn()

	const [appState] = useAppContext()
	const [uploads, setUploads] = useState(null)

	const navigate = useNavigate()
	// allow only lecturers
	useProtectionCondition(
		state => state.userType !== constants.userTypes.lecturer,
		() => navigate(constants.routes.index)
	)

	const download = (url, topic) => {
		console.log({ url, topic })
		const fileName = topic + `.pdf`
		const link = document.createElement('a')
		link.setAttribute('href', url)
		link.setAttribute('target', '_blank')
		link.setAttribute('download', fileName || 'file')
		link.style.display = 'none'

		document.body.appendChild(link)

		link.click()

		document.body.removeChild(link)
	}

	useEffect(() => {
		if (appState.user) {
			apiservice
				.getUploads()
				.then(uploads => {
					console.log(uploads)
					setUploads(uploads.body)
				})
				.catch(err => {
					console.log({ err })
					toast('Unable to load uploaded topics')
				})
		}
	}, [])

	return (
		<DashboardLayout title='View Uploaded Files'>
			<div>
				<table>
					<thead>
						<tr>
							<th>Uploaded Project Files</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{uploads &&
							(uploads.length > 0 ? uploads.map(upload => (
								<tr key={upload.id}>
									<td>{upload.topicId.title}</td>
									<td>
										<button onClick={() => download(upload.url, upload.topicId.title)}>
											Download
										</button>
									</td>
								</tr>
							)): <tr><td>No projects have been uploaded yet!</td></tr>)
                            }
					</tbody>
				</table>

				{!uploads && <p>Fetching uploaded documents...</p>}
			</div>
		</DashboardLayout>
	)
}
