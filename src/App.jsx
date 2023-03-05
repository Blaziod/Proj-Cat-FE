// library imports
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { constants } from './utils'

// pages imports
import Login from './Pages/StudentLogin'
import ProposeTopic from './Pages/ProposeTopic'
import Register from './Pages/StudentRegister'
import LecturerRegister from './Pages/LecturerRegister'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Page404 from './Pages/Page404'
import LecturerDashboard from './Pages/LecturerDashboard'
import LecturerLogin from './Pages/LecturerLogin'
import ApiTrial from './Pages/ApiTrial'
import PostApi from './Pages/PostApi'
import StudentDashboard from './Pages/StudentDashboard'

// components imports
import ContextProvider from './components/AppContext'
import Navbar from './components/Navbar'

// style imports
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import './common.css'

function App() {
	return (
		<ContextProvider>
			<div className='applayout'>
				<ToastContainer
					position='top-left'
					autoClose={6000}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='dark'
				/>

				{
					<>
						<BrowserRouter>
							<Navbar />
							<div className='app'>
								<Routes>
									<Route path={constants.routes.index} element={<Layout />} />
									<Route index element={<Home />} />
									<Route path={constants.routes.proposeTopic} element={<ProposeTopic />} />
									<Route path={constants.routes.studentLogin} element={<Login />} />
									<Route path={constants.routes.studentRegister} element={<Register />} />
									<Route path={constants.routes.lecturerRegister} element={<LecturerRegister />} />
									<Route path={constants.routes.lecturerLogin} element={<LecturerLogin />} />
									<Route path={constants.routes.lecturerDash} element={<LecturerDashboard />} />
									<Route path={constants.routes.studentDash} element={<StudentDashboard />} />
									<Route path='PostApi' element={<PostApi />} />
									<Route path='ApiTrial ' element={<ApiTrial />} />
									<Route path='*' element={<Page404 />} />
								</Routes>
							</div>
						</BrowserRouter>
					</>
				}
			</div>
		</ContextProvider>
	)
}

export default App
