import axios from "axios";

const baseDomainURL = "https://project-catalog.onrender.com";
// const baseDomainURL = 'http://localhost:5000'

const axiosInstance = axios.create({
  baseURL: `${baseDomainURL}/api/`,
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data);
  }
);
export async function studentLogin(loginData) {
  return axiosInstance.post("/auth/login/student", loginData);
}

export async function studentRegister(registerData) {
  return axiosInstance.post("/auth/register/student", registerData);
}

export async function lecturerLogin(loginData) {
  return axiosInstance.post("/auth/login/lecturer", loginData);
}

export async function lecturerRegister(registerData) {
  return axiosInstance.post("/auth/register/lecturer", registerData);
}

export async function proposeTopics(data) {
  return axiosInstance.post("/project/proposal/add", data);
}

export async function getProposalsPendingReview() {
  return axiosInstance.get("/project/proposal/pending");
}

export async function rejectProjectTopics(data) {
  return axiosInstance.post("/project/proposal/reject", data);
}

export async function approveProjectTopic(data) {
  return axiosInstance.post("/project/proposal/approve", data);
}

export async function getStudentProposals(matricNo) {
  return axiosInstance.get("/project/proposal", { params: { matricNo } });
}
