
import apiClient from "./apiClient";
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
