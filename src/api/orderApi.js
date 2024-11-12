import { Alert, Linking } from "react-native";
import apiClient from "./apiClient";
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
const apiKey = '123'
const orderApi = {
    orderApi: async (userInfo, address, cart, payMethod, sum, note, delivery_fee) => {
        const convertCartToListCartItem = (cart) => {
            return cart.map(item => ({
                image: item.image,
                name: item.name,
                descriptions: item.descriptions,
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
            Alert.alert('')
        }
        try {
            const response = await apiClient.post('/payment',
                {
                    order:
                    {
                        listCartItem,
                        receiver_name: userInfo.profile.name,
                        address: address.address,
                        userLatitude: address.latitude,
                        userLongitude: address.longitude,
                        price: sum,
                        phone_number: userInfo.profile.phone_number,
                        order_pay: payMethod,
                        note: note,
                        delivery_fee: delivery_fee,
                        order_date: new Date().toString(),
                    }
                },
                {
                    headers: {
                        "x-api-key": "d3e004aa8a4f5f2f2f0df447c397ba8024c27407563ca7809e50520f01f670b7206d42b17b6b01afc124a0f3d1d93fc9e033df72f67aba2f89da961104cb06de",
                        "authorization": accessToken,
                        "x-client-id": userId,
                    }
                })
            const url = response.data.metadata;
            console.log(url);

            if (url) {
                const supported = await Linking.openURL(url);
                if (supported) {
                    await Linking.openURL(url);
                } else {
                    Alert.alert('Lỗi', 'Không thể mở liên kết');
                }
            }

            return url;

        } catch (error) {
            console.log(error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi đơn hàng');
        }
    },
}
export { orderApi }