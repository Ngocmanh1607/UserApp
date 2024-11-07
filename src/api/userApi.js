import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';
import { Alert } from 'react-native';
import { setUserId } from '../store/cartSlice';
const apiKey = "d3e004aa8a4f5f2f2f0df447c397ba8024c27407563ca7809e50520f01f670b7206d42b17b6b01afc124a0f3d1d93fc9e033df72f67aba2f89da961104cb06de"
const userApi = {
    signupApi: async (dispatch, email, password) => {
        try {
            const response = await apiClient.post(
                "/user/signup",
                { email, password },
                {
                    headers: {
                        "x-api-key": apiKey
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

            await AsyncStorage.multiSet([
                ['accessToken', accessToken],
                ['refreshToken', refreshToken],
                ['userEmail', userEmail],
                ['userId', userId.toString()]
            ]);
            dispatch(setUserId(userId));

            console.log('Đăng ký thành công và lưu trữ dữ liệu thành công');
            return true;
        } catch (error) {
            console.error("Đăng ký thất bại:", error.response ? error.response.data : error.message);
            return false;
        }
    },

    loginApi: async (dispatch, email, password) => {
        try {
            const response = await apiClient.post(
                "/user/login",
                { email, password },
                {
                    headers: {
                        "x-api-key": apiKey,
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
            dispatch(setUserId(userId));
            return true;
        } catch (error) {
            Alert.alert("Vui lòng kiểm tra lại tài khoản mật khẩu. Đăng nhập thất bại")
            return false;
        }
    },
    getInfoUser: async () => {
        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("User not logged in");
        }
        try {
            const response = await apiClient.get(`/profile`,
                {
                    headers: {
                        "x-api-key": apiKey,
                        "authorization": accessToken,
                        "x-client-id": userId,
                    }
                }
            );
            return response.data.metadata;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateUser: async (userData) => {
        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("User not logged in");
        }
        try {
            const response = await apiClient.put(`/profile`,
                {
                    name: userData.name,
                    image: userData.image,
                    phone_number: userData.phone_number,
                    mail: userData.email,
                },
                {
                    headers: {
                        "x-api-key": apiKey,
                        "authorization": accessToken,
                        "x-client-id": userId,
                    }
                }
            );
            return response.data.metadata;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

export default userApi;