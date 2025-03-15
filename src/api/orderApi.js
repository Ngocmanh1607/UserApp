import { Alert } from "react-native";
import apiClient from "./apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
const apiKey = '123'
const orderApi = {
    orderApi: async (userInfo, address, cart, payMethod, price, fee, note, couponId, navigation) => {
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
            console.log(userId + accessToken);
            if (!userId || !accessToken) {
                Alert.alert("Thông báo", "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                navigation.navigate("Đăng kí thông tin");
                return;
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
                    cupon_id: couponId,
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
            if (error.response) {
                if (error.response.status === 500) {
                    await AsyncStorage.removeItem('accessToken');
                    await AsyncStorage.removeItem('userId');
                    Alert.alert("Phiên hết hạn", "Vui lòng đăng nhập lại.");
                    navigation.navigate("Đăng kí thông tin");
                    return;
                }
                const serverError = error.response.data?.message || "Có lỗi xảy ra từ phía server";
                throw new Error(serverError);
            } else if (error.request) {
                throw new Error("Không nhận được phản hồi từ server. Vui lòng kiểm tra lại kết nối mạng.");
            } else {
                throw new Error("Đã xảy ra lỗi không xác định . Vui lòng thử lại.");
            }
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
            const messenger = await apiClient.get('cupon',
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
    getOrder: async (navigation) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!userId || !accessToken) {
                Alert.alert("Thông báo", "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                navigation.navigate("Đăng kí thông tin");
                return;
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
            if (error.response) {
                if (error.response.status === 401) {
                    await AsyncStorage.removeItem('accessToken');
                    await AsyncStorage.removeItem('userId');
                    Alert.alert("Phiên hết hạn", "Vui lòng đăng nhập lại.");
                    navigation.navigate("Đăng kí thông tin");
                    return;
                }
                const serverError = error.response.data?.message || "Có lỗi xảy ra từ phía server";
                throw new Error(serverError);
            } else if (error.request) {
                throw new Error("Không nhận được phản hồi từ server. Vui lòng kiểm tra lại kết nối mạng.");
            } else {
                throw new Error("Đã xảy ra lỗi không xác định . Vui lòng thử lại.");
            }
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
            console.log(error)
        }
    },
    review: async (order_id, res_rating, res_comment, dri_rating, dri_comment,) => {
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
            console.log(error)
        }
    }
}
export { orderApi }