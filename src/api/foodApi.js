import apiClient from './apiClient';
import handleApiError from './handleApiError';

const apiKey = '123';
const foodApi = {
  getCategories: async () => {
    try {
      const response = await apiClient.get('/categories', {
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
  getFoodInCate: async (cateId) => {
    try {
      const response = await apiClient.get(`/categories/${cateId}/products`, {
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
  getFoodTopping: async (foodId) => {
    try {
      const response = await apiClient.get(`/topping/getall/${foodId}`, {
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
  getFlashSale: async () => {
    try {
      const response = await apiClient.get(`/customer/flashsale`, {
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
};
export { foodApi };
