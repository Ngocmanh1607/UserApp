import axios from 'axios'

const apiClient = axios.create({
    // baseURL: 'https://8aec-113-22-34-1.ngrok-free.app/v1/api/',
    // baseURL: 'https://lh30mlhb-8080.asse.devtunnels.ms/v1/api/',
    // baseURL: 'http://192.168.55.147:8080/v1/api/',
    baseURL: 'http://localhost:8080/v1/api/',
})
export default apiClient;