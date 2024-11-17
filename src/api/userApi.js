import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';
import { Alert } from 'react-native';
import { setUserId } from '../store/cartSlice';
import { setUserInfo } from '../store/userSlice';
import { useDispatch } from 'react-redux';
const apiKey = "123"
const userApi = {
    signupApi: async (dispatch, email, password) => {
        try {
            const fcmToken = "1";
            const response = await apiClient.post(
                "/user/signup",
                { email, password, fcmToken },
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
                ['userId', userId.toString()],
            ]);
            dispatch(setUserId(userId));
            await userApi.getInfoUser(dispatch);
            return true;
        } catch (error) {
            console.error("Đăng ký thất bại:", error.response ? error.response.data : error.message);
            return false;
        }
    },

    loginApi: async (email, password, dispatch, fcmToken) => {
        try {
            const fcmToken = 1
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
                ['userId', userId.toString()],
            ]);
            dispatch(setUserId(userId));
            await userApi.getInfoUser(dispatch);
            return true;
        } catch (error) {
            Alert.alert("Vui lòng kiểm tra lại tài khoản mật khẩu. Đăng nhập thất bại")
            return false;
        }
    },
    logoutApi: async () => {
        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log(accessToken)
        if (!userId || !accessToken) {
            throw new Error("User not logged in");
        }
        try {
            const response = await apiClient.post(
                "/user/logout",
                {},
                {
                    headers: {
                        "x-api-key": apiKey,
                        "authorization": accessToken,
                        "x-client-id": userId,
                    }
                }
            );
            AsyncStorage.removeItem('userId');
            AsyncStorage.removeItem('accessToken');
            AsyncStorage.removeItem('refreshToken');
            AsyncStorage.removeItem('userEmail');
            return true;
        } catch (error) {
            return false;
        }
    },

    getInfoUser: async (dispatch) => {
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
            dispatch(setUserInfo(response.data.metadata));
            return response.data.metadata;
        } catch (error) {
            console.error('Error fetching user info:', error);
            throw new Error('Failed to fetch user info');
        }
    },

    updateUser: async (dispatch, userData, location) => {
        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log(accessToken)
        if (!userId || !accessToken) {
            throw new Error("User not logged in");
        }
        try {
            const response = await apiClient.put(`/profile`,
                {
                    profile: {
                        name: userData.name,
                        image: userData.image,
                        phone_number: userData.phone_number,
                        // mail: userData.email,
                    },
                    address: {
                        address_name: location.address,
                        address_x: location.latitude,
                        address_y: location.longitude,
                        is_default: true
                    }
                },
                {
                    headers: {
                        "x-api-key": apiKey,
                        "authorization": accessToken,
                        "x-client-id": userId,
                    }
                }
            );
            const userInfo = await userApi.getInfoUser(dispatch);
            return response.data.metadata;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

export default userApi;