import React, { useEffect, useState } from 'react'
import { useLoggedIn } from '../hooks/useProtected'
import { useAppContext } from '../components/AppContext'
import * as apiservice from '../services/apiservice'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as filestack from 'filestack-js'

export default function StudentUpload() {
	useLoggedIn()

	const [appState] = useAppContext()
	const [file, setFile] = useState(null)
	const [project, setProject] = useState(null)
	const [isUploading, setIsUploading] = useState(false)

	const fsUpload = async () => {
		const client = filestack.init('A0K2ld8g3RVeE5nhJnUz7z')
		return client.upload(file)
	}

	const uploadFile = () => {
		if (project === null) return toast('Something went wrong! You may have been logged out.')

		if (!project.approvedTopic) return toast('No topics have been approved yet.')

		fsUpload()
			.then(res => {
				console.log({ res })
				apiservice
					.saveUpload({ ...res, topicId: project.approvedTopic.id })
					.then(data => toast('Upload complete!' + data.message))
					.catch(err => {
						console.log({ err })
						toast('An error occurred while trying to save your upload. please try again')
					})
			})
			.catch(err => {
				console.log({ err })
				toast('An error occurred while trying to upload your file. please try again')
			})
	}

	// get the project details
	useEffect(() => {
		if (appState.user)
			apiservice
				.getStudentProposals(appState.user.matricNo)
				.then(data => {
					const { topics, ...project } = data.body
					setProject(project)
				})
				.catch(err => {
					console.log({ err })
					toast('Unable to retrieve project information')
				})
	}, [appState.user])

	return (
		<div className='auth-form-container'>
			<h1 className='app-container'>Project Upload</h1>
			<span className='bg-warning' style={{ padding: 10, borderRadius: 5, opacity: 0.4 }}>
				Files can only be in pdf format and will be automatically linked to your approved topic. You
				cannot upload a project if a topic has not been approved for you.
			</span>
			<form className='login-form'>
				<input type='file' accept='application/pdf' onChange={e => setFile(e.target.files[0])} required />
			</form>
			<button disabled={isUploading} type='submit' onClick={uploadFile}>
				{isUploading ? "Uploading..." : "UPLOAD FILE"}
			</button>
		</div>
	)
}
