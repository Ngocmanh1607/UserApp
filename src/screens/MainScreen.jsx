import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './Home/HomeScreen';
import OrderScreen from './Order/OrderScreen';
import ChatboxScreen from './Chat/ChatboxScreen';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#FFFFFF', borderTopWidth: 0 },
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'perm-identity';
          } else if (route.name === 'Order') {
            iconName = 'list-alt';
          } else if (route.name === 'Chat') {
            iconName = 'chat-bubble-outline';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Chat" component={ChatboxScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <>
      <MyTabs />
    </>
  );
};

export default App;
const styles = StyleSheet.create({});
