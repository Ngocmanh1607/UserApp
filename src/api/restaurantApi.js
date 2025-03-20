
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
            throw error;
        }
    },
    async getInfoRestaurants(restaurant_id) {
        try {
            const response = await apiClient.get(`/restaurant/${restaurant_id}/llm`,
                {
                    headers: {
                        "x-api-key": apiKey,
                    }
                })
            return response.data.metadata;
        } catch (error) {
            throw error;
        }
    },
    // API tìm kiếm nhà hàng
    async searchRestaurants(searchQuery) {
        try {
            const response = await apiClient.get('/restaurants/search', {
                params: { q: searchQuery },
            });
            return response.data;
        } catch (error) {
            throw error;
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
            throw error;
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
            throw error;
        }
    },
    async getReview(restaurantId) {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!userId || !accessToken) {
                throw new Error("User not logged in");
            }
            const response = await apiClient.get(`/review/${restaurantId}/restaurant`,
                {
                    headers: {
                        "x-api-key": apiKey,
                        "authorization": accessToken,
                        'x-client-id': userId,
                    }
                }
            );
            return response.data.metadata;
        } catch (error) {
            throw error;
        }
    },
};

export default restaurantApi;
