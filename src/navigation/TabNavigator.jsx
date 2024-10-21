import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrderScreen from '../screens/OrderScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Ẩn tiêu đề mặc định
                tabBarActiveTintColor: '#FF0000', // Màu sắc của tab đang hoạt động
                tabBarInactiveTintColor: 'gray', // Màu sắc của tab không hoạt động
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Trang chủ') {
                        iconName = 'home';
                    } else if (route.name === 'Thông tin') {
                        iconName = 'perm-identity';
                    } else if (route.name === 'Đơn hàng') {
                        iconName = 'list-alt';
                    } else if (route.name === 'Chat') {
                        iconName = 'chat-bubble-outline';
                    }
                    return <MaterialIcons name={iconName} size={26} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Trang chủ" component={HomeScreen} />
            <Tab.Screen name="Thông tin" component={ProfileScreen} />
            <Tab.Screen name="Đơn hàng" component={OrderScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;