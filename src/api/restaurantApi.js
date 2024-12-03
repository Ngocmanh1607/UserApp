
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./apiClient";
import { Alert } from "react-native";
const apiKey = '123'
const restaurantApi = {

    getAllRestaurant: async (address) => {
        try {
            const response = await apiClient.get(`/restaurants/${address.latitude}/${address.longitude}`, {
                headers: {
                    "x-api-key": apiKey,
                }
            });
            return response.data.metadata;
        } catch (error) {
            alert("Lỗi kết nối tới server. Vui lòng kiểm tra kết nối mạng của bạn.");
            throw error;
        }
    },
    async getInfoRestaurants(restaurant_id) {
        try {
            // const userId = await AsyncStorage.getItem('userId');
            // const accessToken = await AsyncStorage.getItem('accessToken');
            // if (!userId || !accessToken) {
            //     Alert.alert(accessToken)
            // }
            const response = await apiClient.get(`/restaurant/${restaurant_id}/llm`,
                {
                    headers: {
                        "x-api-key": apiKey,
                        // "authorization": accessToken,
                        // "x-client-id": userId,
                    }
                })
            return response.data.metadata;
        }
        catch (error) {
            console.log(error)
        }
    },
    // API tìm kiếm nhà hàng
    async searchRestaurants(searchQuery) {
        try {
            const response = await apiClient.get('/restaurants/search', {
                params: { q: searchQuery },
            });
            return response.data; // Trả về dữ liệu từ phản hồi
        } catch (error) {
            console.error('Error searching restaurants:', error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    },
    async getFoodsRestaurant(restaurantId) {
        try {
            const response = await apiClient.get(`/products/${restaurantId}/restaurantId`, {
                headers: {
                    "x-api-key": apiKey,
                }
            })
            console.log('metadat', response.data.metadata)
            return response.data.metadata
        } catch (error) {
            console.log('Error foods restaurants:', error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    },
    async getDistance(userLatitude, userLongtitude, restaurant_id) {
        try {
            const response = await apiClient.get(`/customer/${userLatitude}/${userLongtitude}/${restaurant_id}`, {
                headers: {
                    "x-api-key": apiKey,
                }
            })

            return response.data.metadata
        } catch (error) {
            console.log('Error foods restaurants:', error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    }
};

export default restaurantApi;
