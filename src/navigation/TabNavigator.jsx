import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrderScreen from '../screens/OrderScreen';
import ChatScreen from '../screens/ChatScreen';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ handleLogout }) => {
    const renderHeader = () => {
        return (
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        )
    }
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
                    } else if (route.name === 'Tin nhắn') {
                        iconName = 'chat-bubble-outline';
                    }
                    return <MaterialIcons name={iconName} size={26} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Trang chủ" component={HomeScreen} />
            <Tab.Screen name="Đơn hàng" component={OrderScreen} options={{ headerShown: true }} />
            <Tab.Screen name="Tin nhắn" component={ChatScreen} options={{ headerShown: true }} />
            <Tab.Screen name="Thông tin" component={ProfileScreen} options={() => ({
                headerShown: true,
                headerRight: () => (
                    renderHeader()
                ),
            })} />
        </Tab.Navigator>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({
    logoutButton: {
        marginRight: 15,
    },
    logoutText: {
        color: 'red',
        fontSize: 16,
        fontWeight: '500',
    },
});