import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/v1/api/',
    // baseURL: 'http://192.168.14.60:8080/v1/api/',
    // baseURL: 'http://192.168.55.147:8080/v1/api/',

})
export default apiClient;