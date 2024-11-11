import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import driverReducer from './driverSlice';
import userReducer from './userSlice';
import currentLocationReducer from './currentLocationSlice';
import cartReducer from './cartSlice';
import defaultLocationReducer from './defaultLocationSlice';
const store = configureStore({
    reducer: {
        orders: orderReducer,
        driver: driverReducer,
        user: userReducer,
        currentLocation: currentLocationReducer,
        defaultLocation: defaultLocationReducer,
        cart: cartReducer,
    },
});

export default store;