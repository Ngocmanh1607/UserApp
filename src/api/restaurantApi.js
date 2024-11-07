import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./apiClient";
const apiKey = 'd3e004aa8a4f5f2f2f0df447c397ba8024c27407563ca7809e50520f01f670b7206d42b17b6b01afc124a0f3d1d93fc9e033df72f67aba2f89da961104cb06de'
const restaurantApi = {
    getAllRestaurant: async () => {
        try {
            const response = await apiClient.get('/restaurant/all',
                {
                    headers: {
                        "x-api-key": "d3e004aa8a4f5f2f2f0df447c397ba8024c27407563ca7809e50520f01f670b7206d42b17b6b01afc124a0f3d1d93fc9e033df72f67aba2f89da961104cb06de",
                    }
                });
            console.log(response.data.metadata)
            return response.data.metadata;
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error;
        }
    },
    async getRestaurants(params = {}) {
        try {
            const response = await apiClient.get('/restaurants', { params });
            return response.data; // Trả về dữ liệu từ phản hồi
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error;
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
    }
};

export default restaurantApi;
