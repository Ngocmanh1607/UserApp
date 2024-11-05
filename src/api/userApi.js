import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';
import { Alert } from 'react-native';

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
            const { accessToken, refreshToken } = response.data.metadata.tokens;
            const { email: userEmail, id: userId } = response.data.metadata.user;
            await AsyncStorage.multiSet([
                ['accessToken', accessToken],
                ['refreshToken', refreshToken],
                ['userEmail', userEmail],
                ['userId', userId.toString()]
            ]);

            return true;
        } catch (error) {
            Alert.alert("Vui lòng kiểm tra lại tài khoản mật khẩu. Đăng nhập thất bại")
            return false;
        }
    },
    // API lấy thông tin người dùng
    getInfoUser: async (userId) => {
        try {
            const response = await apiClient.get(`/ user / ${userId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    // API cập nhật thông tin người dùng
    updateUser: async (userId, userData) => {
        try {
            const response = await apiClient.put(`/ users / ${userId}`, userData);
            return response.data;
        } catch (error) {
            console.error('Update failed:', error);
            throw error;
        }
    }
};

export default userApi;