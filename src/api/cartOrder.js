import apiClient from '../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import handleApiError from './handleApiError';
import { removeItem } from '../store/cartSlice';
const apiKey = 123;
export const cart = {
  addItem: async (restaurantID, product_id, description) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        throw new Error('Phiên hết hạn');
      }
      const response = await apiClient.post(
        '/cart',
        {
          restaurant_id: restaurantID,
          product_id: product_id,
          description: description,
        },
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
  getCart: async (restaurantID) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        throw new Error('Phiên hết hạn');
      }
      const response = await apiClient.get(`/cart/${restaurantID}`, {
        headers: {
          'x-api-key': apiKey,
          authorization: accessToken,
          'x-client-id': userId,
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
  getAllCart: async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        throw new Error('Phiên hết hạn');
      }
      const response = await apiClient.get('/cart', {
        headers: {
          'x-api-key': apiKey,
          authorization: accessToken,
          'x-client-id': userId,
        },
      });
      return {
        success: true,
        data: response.data.metadata,
      };
    } catch (error) {
      console.log(error.message);

      return handleApiError(error);
    }
  },
};
