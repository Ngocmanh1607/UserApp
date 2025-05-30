import { Alert } from 'react-native';
import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import handleApiError from './handleApiError';
const apiKey = '123';
const orderApi = {
  orderApi: async (
    userInfo,
    address,
    cart,
    payMethod,
    price,
    fee,
    note,
    listCoupon
  ) => {
    try {
      const convertCartToListCartItem = (cart) => {
        return cart.map((item) => ({
          id: item.id,
          image: item.image,
          name: item.name,
          quantity: item.quantity,
          restaurant_id: item.restaurant_id,
          toppings: item.toppings,
          price: item.price,
        }));
      };
      const listCartItem = convertCartToListCartItem(cart);
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        throw new Error('Phiên hết hạn');
      }
      const { name, phone_number } = userInfo.profile;
      const status = payMethod === 'COD' ? 'UNPAID' : 'PAID';
      console.log(status);

      const response = await apiClient.post(
        '/payment',
        {
          order: {
            listCartItem,
            receiver_name: name,
            address_receiver: address.address,
            userLatitude: address.latitude,
            userLongitude: address.longitude,
            phone_number: phone_number,
            order_pay: payMethod,
            note: note,
            list_coupon_id: listCoupon,
            price: price,
            delivery_fee: fee,
            order_status: status,
            order_date: new Date().toString(),
          },
        },
        {
          headers: {
            'x-api-key': apiKey,
            authorization: accessToken,
            'x-client-id': userId,
          },
        }
      );
      console.log(response.data);
      return {
        success: true,
        data: response.data.metadata,
      };
    } catch (error) {
      console.log(error);

      return handleApiError(error);
    }
  },
  orderCheckStatus: async (app_trans_id) => {
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!userId || !accessToken) {
      Alert.alert(accessToken);
    }
    const messenger = await apiClient.post(
      'checkstatus',
      {
        app_trans_id,
      },
      {
        headers: {
          'x-api-key': apiKey,
          authorization: accessToken,
          'x-client-id': userId,
        },
      }
    );
    return messenger.data.metadata;
  },
  getCoupon: async (total) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        throw new Error('Phiên hết hạn');
      }
      const coupons = await apiClient.get(`coupon/${total}`, {
        headers: {
          'x-api-key': apiKey,
          authorization: accessToken,
          'x-client-id': userId,
        },
      });

      return {
        success: true,
        data: coupons.data.metadata,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  getOrder: async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        throw new Error('Phiên hết hạn');
      }
      console.log(userId, accessToken);
      const response = await apiClient.get('/customer/all/order', {
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
  getPrice: async (
    userLatitude,
    userLongitude,
    restaurant_id,
    listCartItem,
    coupon
  ) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        Alert.alert(accessToken);
      }
      const response = await apiClient.post(
        '/getTotal',
        {
          userLatitude: userLatitude,
          userLongitude: userLongitude,
          restaurant_id: restaurant_id,
          listCartItem: listCartItem,
          coupon_ids: coupon,
        },
        {
          headers: {
            'x-api-key': apiKey,
            authorization: accessToken,
            'x-client-id': userId,
          },
        }
      );
      console.log(response.data.metadata);
      return {
        success: true,
        data: response.data.metadata,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  review: async (
    order_id,
    res_rating,
    res_comment,
    dri_rating,
    dri_comment
  ) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        Alert.alert(accessToken);
      }
      const response = await apiClient.post(
        `/review/${order_id}`,
        {
          reviews: {
            res_rating: res_rating,
            res_comment: res_comment,
            dri_rating: dri_rating,
            dri_comment: dri_comment,
          },
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
  submitFeedback: async (feedback) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        throw new Error('Phiên hết hạn');
      }
      const coupons = await apiClient.post(
        `/feedback`,
        {
          restaurant_id: feedback.restaurant_id,
          order_id: feedback.order_id,
          content: feedback.content,
          customer_id: feedback.customer_id,
          driver_id: feedback.driver_id,
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
        data: coupons.data.metadata,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  getFeedbackByOrderId: async (orderId) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        throw new Error('Phiên hết hạn');
      }
      const coupons = await apiClient.get(`/feedback/${orderId}/order`, {
        headers: {
          'x-api-key': apiKey,
          authorization: accessToken,
          'x-client-id': userId,
        },
      });

      return {
        success: true,
        data: coupons.data.metadata,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  sendFeedbackForAdmin: async (customer_id, id) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        throw new Error('Phiên hết hạn');
      }
      const coupons = await apiClient.post(
        `/feedback/${customer_id}/${id}/admin`,
        {},
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
        data: coupons.data.metadata,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export { orderApi };
