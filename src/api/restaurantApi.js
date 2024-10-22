import apiClient from "./apiClient";

const restaurantApi = {
    // API lấy danh sách nhà hàng
    async getRestaurants(params = {}) {
        try {
            const response = await apiClient.get('/restaurants', { params });
            return response.data; // Trả về dữ liệu từ phản hồi
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error; // Ném lỗi để xử lý bên ngoài
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
            const response = await apiClient.get('/restaurants/restaurantId', {
                params: { restaurantId: restaurantId }
            })
            return response.data
        } catch (error) {
            console.error('Error foods restaurants:', error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    }
};

export default restaurantApi;
