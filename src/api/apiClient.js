import axios from 'axios'

const apiClient = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token_here', // Nếu cần token xác thực
    },
})
// Xử lý lỗi toàn cục (optional)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

export default apiClient;