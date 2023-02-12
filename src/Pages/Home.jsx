import { Link } from 'react-router-dom'
import React from 'react'
import { constants } from '../utils'

const Home = () => {
	return (
		<div className='auth-form-container'>
			<h1 className='app-container'>Home</h1>
			<Link to={constants.routes.studentLogin}>
				<button>STUDENT LOGIN</button>
			</Link>{' '}
			<br></br> <p></p>
			<Link to={constants.routes.lecturerLogin}>
				<button>LECTURER LOGIN</button>
			</Link>
		</div>
	)
}

export default Home
