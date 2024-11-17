// src/App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux'
import store from './src/store/store';
import { useDispatch } from 'react-redux';
import { loadCartFromStorage } from './src/store/cartSlice';
import messaging from '@react-native-firebase/messaging';
import Mapbox from '@rnmapbox/maps'
Mapbox.setAccessToken('sk.eyJ1IjoibmdvY21hbmgxNjA3IiwiYSI6ImNtM2N5bzY5dDFxbDIyanIxbDEycXg0bGwifQ.M2rY0iFiThl6Crjp6kr_GQ')
const App = () => {
  useEffect(() => {
    store.dispatch(loadCartFromStorage());
  }, []);
  const [fcmToken, setFCMToken] = useState(null);

  useEffect(() => {
    const fetchFcmToken = async () => {
      const permissionGranted = await requestUserPermission();
      if (!permissionGranted) return;

      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        setFCMToken(token);
      } else {
        console.log('Failed to get FCM token');
      }
    };

    fetchFcmToken();

    const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(token => {
      console.log('FCM Token refreshed:', token);
      setFCMToken(token);
    });

    return () => {
      unsubscribeOnTokenRefresh();
    };
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted.');
      return true;
    } else {
      console.log('Notification permission denied.');
      return false;
    }
  };
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;