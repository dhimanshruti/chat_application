import axios  from "axios"

export const axiosInstance = axios.create({
    baseURL : 'https://chat-application-apk7.onrender.com/api',
    withCredentials:true
})

export default axiosInstance