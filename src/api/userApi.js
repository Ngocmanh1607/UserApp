import axios from 'axios';
import apiClient from './apiClient';

const userApi = {
    // Hàm đăng nhập
    async loginUser(credentials) {
        try {
            const response = await apiClient.post('/auth/login', credentials);
            return response.data; // Trả về dữ liệu từ phản hồi
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    },

    // Hàm đăng ký
    async registerUser(data) {
        try {
            const response = await apiClient.post('/auth/register', data);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    },

    //API lấy location hiện tại
    async currentLocation(latitude, longitude) {
        try {
            const response = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode`, {
                params: {
                    at: `${latitude},${longitude}`,
                    lang: 'en-US',
                    apiKey: '7sef-qPLms2vVRE4COs57FGzk4LuYC20NtU6TCd13kU',
                },
            })
            const data = response.data;
            if (data.items && data.items.length > 0) {
                return {
                    latitude,
                    longitude,
                    address: data.items[0].address.label,
                };
            } else {
                throw new Error("Không thể tìm thấy vị trí");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Không thể tìm thấy vị trí");
        }
    },
    //API lấy thông tin user
    async getInfoUser(userId) {
        try {
            const response = await apiClient.get('/user', userId);
            return response.data; // Trả về dữ liệu từ phản hồi
        } catch (error) {
            console.error(error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    },
    // Hàm cập nhật thông tin người dùng
    async updateUser(userId, userData) {
        try {
            const response = await apiClient.put(`/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            console.error('Update failed:', error);
            throw error;
        }
    }
};

export default userApi;
