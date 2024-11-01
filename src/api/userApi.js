import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';

const userApi = {
    // API đăng ký người dùng
    signupApi: async (email, password) => {
        try {
            const response = await apiClient.post(
                "/user/signup",
                { email, password },
                {
                    headers: {
                        "x-api-key": "d3e004aa8a4f5f2f2f0df447c397ba8024c27407563ca7809e50520f01f670b7206d42b17b6b01afc124a0f3d1d93fc9e033df72f67aba2f89da961104cb06de"
                    }
                }
            );
            const { message, metadata } = response.data;
            if (!message || !metadata) {
                console.error('Thiếu dữ liệu từ phản hồi đăng ký:', { message, metadata });
                return false;
            }

            const { accessToken, refreshToken } = metadata.tokens;
            const { email: userEmail, id: userId } = metadata.user;

            // Lưu trữ dữ liệu đăng ký vào AsyncStorage
            await AsyncStorage.multiSet([
                ['accessToken', accessToken],
                ['refreshToken', refreshToken],
                ['userEmail', userEmail],
                ['userId', userId.toString()]
            ]);

            console.log('Đăng ký thành công và lưu trữ dữ liệu thành công');
            return true;
        } catch (error) {
            console.error("Đăng ký thất bại:", error.response ? error.response.data : error.message);
            return false;
        }
    },

    loginApi: async (email, password) => {
        try {
            const response = await apiClient.post(
                "/user/login",
                { email, password },
                {
                    headers: {
                        "x-api-key": "d3e004aa8a4f5f2f2f0df447c397ba8024c27407563ca7809e50520f01f670b7206d42b17b6b01afc124a0f3d1d93fc9e033df72f67aba2f89da961104cb06de",
                    }
                }
            );

            const { message, metadata } = response.data;

            // Kiểm tra nếu không có thông tin cần thiết trong phản hồi
            if (!message || !metadata) {
                console.error('Thiếu dữ liệu từ phản hồi đăng nhập:', { message, metadata });
                return false; // Trả về false nếu có lỗi
            }

            const { accessToken, refreshToken } = metadata.tokens;
            const { email: userEmail, id: userId } = metadata.user;

            // Lưu trữ thông tin người dùng vào AsyncStorage
            await AsyncStorage.multiSet([
                ['accessToken', accessToken],
                ['refreshToken', refreshToken],
                ['userEmail', userEmail],
                ['userId', userId.toString()]
            ]);

            console.log('Đăng nhập thành công và lưu trữ dữ liệu thành công');
            return true; // Trả về true nếu thành công
        } catch (error) {
            console.error("Đăng nhập thất bại:", error.response ? error.response.data : error.message);
            return false; // Trả về false nếu có lỗi
        }
    },

    // API lấy vị trí hiện tại
    currentLocation: async (latitude, longitude) => {
        try {
            const response = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode`, {
                params: {
                    at: `${latitude},${longitude}`,
                    lang: 'en-US',
                    apiKey: '7sef-qPLms2vVRE4COs57FGzk4LuYC20NtU6TCd13kU',
                },
            });
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

    // API lấy thông tin người dùng
    getInfoUser: async (userId) => {
        try {
            const response = await apiClient.get(`/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    // API cập nhật thông tin người dùng
    updateUser: async (userId, userData) => {
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