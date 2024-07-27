import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const apiUrl = "/choreo-apis/djangoreact/backend/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl
} )

api.interceptors.request.use(
    // Here the config is basically the request being sent to the server
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            // Now we are adding the jwt token to the request here 
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api