
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
            if (error.response) {
                const serverError = error.response.data?.message || "Có lỗi xảy ra từ phía server";
                throw new Error(serverError);
            } else if (error.request) {
                throw new Error("Không nhận được phản hồi từ server. Vui lòng kiểm tra lại kết nối mạng.");
            } else {
                throw new Error("Đã xảy ra lỗi không xác định . Vui lòng thử lại.");
            }
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
            if (error.response) {
                const serverError = error.response.data?.message || "Có lỗi xảy ra từ phía server";
                throw new Error(serverError);
            } else if (error.request) {
                throw new Error("Không nhận được phản hồi từ server. Vui lòng kiểm tra lại kết nối mạng.");
            } else {
                throw new Error("Đã xảy ra lỗi không xác định . Vui lòng thử lại.");
            }
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
            if (error.response) {
                const serverError = error.response.data?.message || "Có lỗi xảy ra từ phía server";
                throw new Error(serverError);
            } else if (error.request) {
                throw new Error("Không nhận được phản hồi từ server. Vui lòng kiểm tra lại kết nối mạng.");
            } else {
                throw new Error("Đã xảy ra lỗi không xác định . Vui lòng thử lại.");
            }
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
            if (error.response) {
                const serverError = error.response.data?.message || "Có lỗi xảy ra từ phía server";
                throw new Error(serverError);
            } else if (error.request) {
                throw new Error("Không nhận được phản hồi từ server. Vui lòng kiểm tra lại kết nối mạng.");
            } else {
                throw new Error("Đã xảy ra lỗi không xác định . Vui lòng thử lại.");
            }
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
            if (error.response) {
                const serverError = error.response.data?.message || "Có lỗi xảy ra từ phía server";
                throw new Error(serverError);
            } else if (error.request) {
                throw new Error("Không nhận được phản hồi từ server. Vui lòng kiểm tra lại kết nối mạng.");
            } else {
                throw new Error("Đã xảy ra lỗi không xác định . Vui lòng thử lại.");
            }
        }
    }
};

export default restaurantApi;
