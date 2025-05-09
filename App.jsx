// src/App.js
import React, { StrictMode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import store from './src/store/store';
import messaging from '@react-native-firebase/messaging';
import Mapbox from '@rnmapbox/maps';
import { LogBox } from 'react-native';
Mapbox.setAccessToken(
  'sk.eyJ1IjoibmdvY21hbmgxNjA3IiwiYSI6ImNtM2N5bzY5dDFxbDIyanIxbDEycXg0bGwifQ.M2rY0iFiThl6Crjp6kr_GQ'
);
LogBox.ignoreAllLogs(true);
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
