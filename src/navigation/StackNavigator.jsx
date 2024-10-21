import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './TabNavigator';
import AuthScreen from '../screens/AuthScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import OrderDetailScreen from '../screens/DetailOrder';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/CartScreen';
import ReviewScreen2 from '../screens/Thumbnail2';
import ReviewScreen1 from '../screens/Thumbnail1';
import CompleteOrder from '../screens/CompleteOrderScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    // Kiểm tra xem ứng dụng có được mở lần đầu không
    useEffect(() => {
        const checkFirstLaunch = async () => {
            const value = await AsyncStorage.getItem('hasLaunched');
            if (value === null) {
                // Nếu chưa mở lần nào, thiết lập trạng thái lần đầu
                await AsyncStorage.setItem('hasLaunched', 'true');
                setIsFirstLaunch(true);
            } else {
                // Ứng dụng đã được mở trước đó
                setIsFirstLaunch(false);
            }
        };

        checkFirstLaunch();
    }, []);

    if (isFirstLaunch === null) {
        // Hiển thị màn hình chờ trong khi kiểm tra
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isFirstLaunch ? (
                // Hiển thị các màn hình giới thiệu nếu là lần đầu mở ứng dụng
                <>
                    <Stack.Screen name="thumbnail1" component={ReviewScreen1} />
                    <Stack.Screen name="thumbnail2" component={ReviewScreen2} />
                    <Stack.Screen name="Auth" component={AuthScreen} />
                </>
            ) : (
                // Nếu không phải lần đầu, chuyển thẳng đến màn hình chính
                <>
                    <Stack.Screen name="Auth" component={AuthScreen} />
                    <Stack.Screen name="Main" component={TabNavigator} />
                    <Stack.Screen name="RestaurantDetail" component={RestaurantScreen} />
                    <Stack.Screen name="DetailOrder" component={OrderDetailScreen} />
                    <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
                    <Stack.Screen name="CartScreen" component={CartScreen} />
                    <Stack.Screen name="CompleteOrder" component={CompleteOrder} />
                    <Stack.Screen name="OrderStatus" component={OrderStatusScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default StackNavigator;
