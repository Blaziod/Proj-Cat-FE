import React, { useEffect, useState } from 'react'
import { useLoggedIn } from '../hooks/useProtected'
import { useAppContext } from '../components/AppContext'
import * as apiservice from '../services/apiservice'
import axios from 'axios'
import { toast } from "react-toastify";

export default function studentUpload() {
	// useLoggedIn()

	const [appState] = useAppContext()
	const [file, setFile] = useState(null)
	const [project, setProject] = useState(null)

	const uploadFile = () => {
		if(project === null) return toast("Something went wrong! You may have been logged out.")

		const formdata = new FormData()
		formdata.append('doc', file)

		var reader = new FileReader();
		reader.onload = function(e) {
			// binary data
			console.log(e.target.result);
				// upload directly from here and send the upload meta to the server
			axios
			.post('https://www.filestackapi.com/api/store/S3?key=A0K2ld8g3RVeE5nhJnUz7z', {
				headers: { 'Content-Type': 'application/pdf' },
				data: e.target.result
			})
			.then(res => res.data)
			.then(data => {
				return apiservice.saveUpload({ ...data, projectId: project.id })
			})
			.then(({data}) => toast("Upload complete!" + data.message))
			.catch(err => console.log({ err }))
		};

		reader.onerror = function(e) {
			// error occurred
			console.log('Error : ' + e.type);
			toast("Cound not read file. Please try again")
		};

		reader.readAsBinaryString(file);
	}

	// get the project details 
	useEffect(() => {
		if (appState.user)
			apiservice.getStudentProposals(appState.user.matricNo).then(data => {
				const { topics, ...project } = data.body
				setProject(project)
			})
	}, [appState.user])

	return (
		<div className='auth-form-container'>
			<h1 className='app-container'>Project Upload</h1>
			<span className='bg-warning' style={{ padding: 10, borderRadius: 5, opacity: 0.4 }}>
				Files can only be in pdf or DOC format and will be automatically linked to your approved topic. You
				cannot upload a project if a topic has not been approved for you.
			</span>
			<form className='login-form'>
				<input type='file' onChange={e => setFile(e.target.files[0])} required />
			</form>
			<button type='submit' onClick={uploadFile}>
				UPLOAD FILE
			</button>
		</div>
	)
}
