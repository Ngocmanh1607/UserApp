import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './TabNavigator';
import AuthScreen from '../screens/Authentication/AuthScreen';
import OrderDetailScreen from '../screens/Order/DetailOrder';
import FoodDetailScreen from '../screens/Home/FoodDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/Home/CartScreen';
import ReviewScreen2 from '../screens/Authentication/Thumbnail2';
import ReviewScreen1 from '../screens/Authentication/Thumbnail1';
import CompleteOrder from '../screens/Order/CompleteOrderScreen';
import OrderStatusScreen from '../screens/Order/OrderStatusScreen';
import { ActivityIndicator, View } from 'react-native';
import MessageScreen from '../screens/Chat/Message';
import MapScreen from '../screens/Home/MapScreen';
import PaymentMethodScreen from '../screens/Order/PaymentMethodScreen';
import RegisterInf from '../screens/Authentication/RegisterInf';
import CouponPage from '../screens/Order/CouponScreen';
import RestaurantScreen from '../screens/Home/RestaurantScreen';
import FoodCategory from '../screens/Home/FoodCategory';
import CartResScreen from '../screens/Home/CartResScreen';
import ReviewScreen from '../screens/Home/ReviewScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const checkFirstLaunch = async () => {
            const value = await AsyncStorage.getItem('hasLaunched');
            const token = await AsyncStorage.getItem('accessToken');
            setAccessToken(token);
            if (value === null) {
                await AsyncStorage.setItem('hasLaunched', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        };

        checkFirstLaunch();
    }, []);

    if (isFirstLaunch === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={
            isFirstLaunch
                ? 'thumbnail1'
                : (accessToken ? 'Main' : 'Auth')}>
            <Stack.Screen name="thumbnail1" component={ReviewScreen1} />
            <Stack.Screen name="thumbnail2" component={ReviewScreen2} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="FoodCategory" component={FoodCategory} options={{ headerShown: true, headerBackButtonMenuEnabled: true, title: 'Category', headerBackTitle: 'Trang chủ' }} />
            <Stack.Screen name="CartResScreen" component={CartResScreen} options={{ headerShown: true, headerBackButtonMenuEnabled: true, title: 'Giỏ hàng', headerBackTitle: 'Quay lại' }} />
            <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: true, headerBackButtonMenuEnabled: true, title: 'Địa chỉ' }} />
            <Stack.Screen name="RestaurantDetail" component={RestaurantScreen} />
            <Stack.Screen name="DetailOrder" component={OrderDetailScreen} options={{ headerShown: true, headerBackButtonMenuEnabled: true, title: 'Chi tiết đơn hàng', headerBackTitle: 'Quay lại' }} />
            <Stack.Screen name="FoodDetail" component={FoodDetailScreen} options={{ headerShown: true, title: 'Chi tiết', headerBackTitle: 'Quay lại' }} />
            <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: true, headerBackButtonMenuEnabled: true, title: 'Giỏ hàng', headerBackTitle: 'Quay lại' }} />
            <Stack.Screen name="Message" component={MessageScreen} options={{ headerShown: true }} />
            <Stack.Screen name="CompleteOrder" component={CompleteOrder} />
            <Stack.Screen name="OrderStatus" component={OrderStatusScreen} options={{ headerShown: true, headerBackButtonMenuEnabled: true, title: 'Trạng thái', headerBackTitle: 'Quay lại' }} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
            <Stack.Screen name="RegisterInf" component={RegisterInf} options={{ headerShown: true, title: 'Đăng ký thông tin', headerBackTitle: 'Quay lại' }} />
            <Stack.Screen name="CouponScreen" component={CouponPage} options={{ headerShown: true, title: 'Coupon', headerBackTitle: 'Quay lại' }} />
            <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{ headerShown: true, title: 'Đánh giá', headerBackTitle: 'Quay lại' }} />
        </Stack.Navigator>
    );
};

export default StackNavigator;