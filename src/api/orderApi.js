import { Alert } from "react-native";
import apiClient from "./apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
const apiKey = '123'
const orderApi = {
    orderApi: async (userInfo, address, cart, payMethod, price, fee, note, couponId) => {
        try {
            const convertCartToListCartItem = (cart) => {
                return cart.map(item => ({
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
                throw new Error("Phiên hết hạn");
            }
            const orderData = {
                order: {
                    listCartItem,
                    receiver_name: userInfo.profile.name,
                    address_receiver: address.address,
                    userLatitude: address.latitude,
                    userLongitude: address.longitude,
                    phone_number: userInfo.profile.phone_number,
                    order_pay: payMethod,
                    note: note,
                    price: price,
                    delivery_fee: fee,
                    coupon_id: couponId,
                    order_status: "PAID",
                    order_date: new Date().toString(),
                }
            };

            // Log order data before sending the request
            console.log("Order data to send:", orderData);
            const response = await apiClient.post('/payment',
                {
                    order:
                    {
                        listCartItem,
                        receiver_name: userInfo.name,
                        address_receiver: address.address,
                        userLatitude: address.latitude,
                        userLongitude: address.longitude,
                        phone_number: userInfo.phone_number,
                        order_pay: payMethod,
                        note: note,
                        price: price,
                        delivery_fee: fee,
                        cupon_id: couponId,
                        order_status: "PAID",
                        order_date: new Date().toString(),
                    }
                },
                {
                    headers: {
                        "x-api-key": apiKey,
                        "authorization": accessToken,
                        "x-client-id": userId,
                    }
                })
            return response.data.metadata;
        } catch (error) {
            throw error;
        }
    },
    orderCheckStatus: async (app_trans_id) => {
        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!userId || !accessToken) {
            Alert.alert(accessToken)
        }
        const messenger = await apiClient.post('checkstatus',
            {
                app_trans_id
            }, {
            headers: {
                "x-api-key": apiKey,
                "authorization": accessToken,
                "x-client-id": userId,
            }
        })
        console.log(messenger.data)
        return messenger.data.metadata;
    },
    getCoupon: async () => {
        try {
            const messenger = await apiClient.get('coupon',
                {
                    headers: {
                        "x-api-key": apiKey,
                    }
                })
            return messenger.data.metadata;
        }
        catch (error) {
            console.log(error)
        }
    },
    getOrder: async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!userId || !accessToken) {
                throw new Error("Phiên hết hạn");
            }
            console.log(userId, accessToken)
            const response = await apiClient.get('/customer/all/order',
                {
                    headers: {
                        "x-api-key": apiKey,
                        "authorization": accessToken,
                        "x-client-id": userId,
                    }
                })
            return response.data.metadata;
        } catch (error) {
            throw error;
        }
    },
    getPrice: async (userLatitude, userLongitude, restaurant_id, listCartItem) => {
        try {

            const userId = await AsyncStorage.getItem('userId');
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!userId || !accessToken) {
                Alert.alert(accessToken)
            }
            const response = await apiClient.post('/getTotal',
                {
                    userLatitude: userLatitude,
                    userLongitude: userLongitude,
                    restaurant_id: restaurant_id,
                    listCartItem: listCartItem
                },
                {
                    headers: {
                        "x-api-key": apiKey,
                        "authorization": accessToken,
                        "x-client-id": userId,
                    }
                })
            console.log(response.data.metadata);
            return response.data.metadata;
        }
        catch (error) {
            throw error;
        }
    },
    review: async (order_id, res_rating, res_comment, dri_rating, dri_comment) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!userId || !accessToken) {
                Alert.alert(accessToken)
            }
            const response = await apiClient.post(`/review/${order_id}`,
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
                        "x-api-key": apiKey,
                        "authorization": accessToken,
                        "x-client-id": userId,
                    }
                })
            return response.data.metadata;
        }
        catch (error) {
            throw error;
        }
    }
}
export { orderApi }