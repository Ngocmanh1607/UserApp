// src/App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux'
import store from './src/store/store';
import { useDispatch } from 'react-redux';
import { loadCartFromStorage } from './src/store/cartSlice';
const App = () => {
  useEffect(() => {
    store.dispatch(loadCartFromStorage());
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;