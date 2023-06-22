import React, { useEffect, useState } from 'react'
import { useLoggedIn } from '../hooks/useProtected'
import { useAppContext } from '../components/AppContext'
import { uploadProject } from '../services/apiservice'
import axios from 'axios'

export default function studentUpload() {
	useLoggedIn()

	const [appState] = useAppContext()
	const [file, setFile] = useState(null)

	const uploadFile = () => {
		const formdata = new FormData()
		formdata.append('doc', file)

		// upload directly from here and send the upload meta to the server
		axios
			.post('https://www.filestackapi.com/api/store/S3?key=A0K2ld8g3RVeE5nhJnUz7z', {
				headers: { 'Content-Type': 'multipart/form-data' },
				data: formdata
			})
			.then(res => res.data)
			.then(data => console.log({ data }))
			.catch(err => console.log({ err }))

		// uploadProject(formdata)
		// 	.then(res => console.log({ res }))
		// 	.catch(err => console.log({ err }))
	}

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
