import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/v1/api/',
    // headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-key': 'd3e004aa8a4f5f2f2f0df447c397ba8024c27407563ca7809e50520f01f670b7206d42b17b6b01afc124a0f3d1d93fc9e033df72f67aba2f89da961104cb06de',
    //     'Authorization': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpYXQiOjE3Mjk2OTMzNzEsImV4cCI6MTcyOTg2NjE3MX0.fIltmkbGIOS92OASIeB_Np524lIZwHPA-tQ9NiUiERRAOzApoCfdWheeAuy-dwimflAl10XjhoWltmkn6b_ouLDQOOQoUh6GCldNHIGWRyE9ZKD3PLL1FLf-cv8ZIgmdbS9mJh7ryUM1q07fyGbWLnTI54905ga-4VT_jxPepDiso7idRMfOoDoKzSrKSjD9NuGMBSFK5xRqdaVAXYdasst7f90cTMW3wh8VyZ961rD6fZuUvDdU53jXQnyQR1lpXgqOcWhektivR_qqYiFVD80XL9EjR6aVynCJxH959VrIpuTE4647as4esB49VEXnvbObcQ65pESfOyp0HH5KTQ',
    // },
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