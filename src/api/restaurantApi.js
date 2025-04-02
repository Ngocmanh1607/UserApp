import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';
import { Alert } from 'react-native';
import handleApiError from './handleApiError';
const apiKey = '123';
const restaurantApi = {
  getAllRestaurant: async (address, page) => {
    try {
      const response = await apiClient.get(
        `/restaurants/${address.latitude}/${address.longitude}/${page}`,
        {
          headers: {
            'x-api-key': apiKey,
          },
        }
      );
      return {
        success: true,
        data: response.data.metadata,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  async getInfoRestaurants(restaurant_id) {
    try {
      const response = await apiClient.get(`/restaurant/${restaurant_id}/llm`, {
        headers: {
          'x-api-key': apiKey,
        },
      });
      return {
        success: true,
        data: response.data.metadata,
      };
    } catch (error) {
      return handleApiError(error);
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
      const response = await apiClient.get(
        `/products/${restaurantId}/restaurantId`,
        {
          headers: {
            'x-api-key': apiKey,
          },
        }
      );
      return {
        success: true,
        data: response.data.metadata,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  async getDistance(userLatitude, userLongtitude, restaurant_id) {
    try {
      const response = await apiClient.get(
        `/customer/${userLatitude}/${userLongtitude}/${restaurant_id}`,
        {
          headers: {
            'x-api-key': apiKey,
          },
        }
      );

      return {
        success: true,
        data: response.data.metadata,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  async getReview(restaurantId) {
    if (!restaurantId) {
      return [];
    }
    try {
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        throw new Error('User not logged in');
      }
      const response = await apiClient.get(
        `/review/${restaurantId}/restaurant`,
        {
          headers: {
            'x-api-key': apiKey,
            authorization: accessToken,
            'x-client-id': userId,
          },
        }
      );
      return {
        success: true,
        data: response.data.metadata,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default restaurantApi;
