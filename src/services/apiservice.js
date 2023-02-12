import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'https://project-catalog.onrender.com/api/'
})

axiosInstance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error.response.data)
	}
)
export async function studentLogin(loginData) {
	return axiosInstance.post('/auth/login/student', loginData)
}

export async function studentRegister(registerData) {
	return axiosInstance.post('/auth/register/student', registerData)
}

export default {
	studentLogin,
	studentRegister
}
