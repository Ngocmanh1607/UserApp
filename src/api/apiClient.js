import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'https://1b10dbz1-8080.asse.devtunnels.ms/',
  // baseURL: 'http://192.168.55.45:8080/v1/api/',
  baseURL: 'http://localhost:8080/v1/api/',
});
export default apiClient;
