import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Login } from './Pages/Login'
import { ProposeTopic } from './Pages/ProposeTopic'
import { Register } from './Pages/Register'
import { LecturerRegister } from './Pages/LecturerRegister'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Page404 from './Pages/Page404'
import LecturerDashboard from './Pages/LecturerDashboard'
import { LecturerLogin } from './Pages/LecturerLogin'
import ApiTrial from './Pages/ApiTrial'
import PostApi from './Pages/PostApi'
import { ToastContainer } from 'react-toastify'
import { constants } from './utils'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
	return (
		<div className='App'>
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
				<BrowserRouter>
					<Routes>
						<Route path={constants.routes.index} element={<Layout />} />
						<Route index element={<Home />} />
						<Route path={constants.routes.proposeTopic} element={<ProposeTopic />} />
						<Route path={constants.routes.studentLogin} element={<Login />} />
						<Route path={constants.routes.studentRegister} element={<Register />} />
						<Route path={constants.routes.lecturerRegister} element={<LecturerRegister />} />
						<Route path={constants.routes.lecturerLogin} element={<LecturerLogin />} />
						<Route path={constants.routes.lecturerDash} element={<LecturerDashboard />} />
						<Route path='PostApi' element={<PostApi />} />
						<Route path='ApiTrial ' element={<ApiTrial />} />
						<Route path='*' element={<Page404 />} />
					</Routes>
				</BrowserRouter>
			}
		</div>
	)
}

export default App
