import { Alert, Linking } from "react-native";
import apiClient from "./apiClient";
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from "react";
const apiKey = '123'
const orderApi = {
    orderApi: async (userInfo, address, cart, payMethod, sum, note, delivery_fee) => {
        try {
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
                Alert.alert(accessToken)
            }
            const orderData = {
                order: {
                    listCartItem,
                    receiver_name: userInfo.name,
                    address_receiver: address.address,
                    userLatitude: address.latitude,
                    userLongitude: address.longitude,
                    price: sum,
                    phone_number: userInfo.phone_number,
                    order_pay: payMethod,
                    note: note,
                    delivery_fee: delivery_fee,
                    order_date: new Date().toString(),
                }
            };

            // Log order data before sending the request
            console.log("Order data to send:", orderData);
            // console.log("usẻ", userInfo)
            const response = await apiClient.post('/payment',
                {
                    order:
                    {
                        listCartItem,
                        receiver_name: userInfo.name,
                        address_receiver: address.address,
                        userLatitude: address.latitude,
                        userLongitude: address.longitude,
                        price: sum,
                        phone_number: userInfo.phone_number,
                        order_pay: payMethod,
                        note: note,
                        delivery_fee: delivery_fee,
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
        }
        catch (error) {
            console.log(error)
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
    }
}
export { orderApi }