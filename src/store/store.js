import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import driverReducer from './driverSlice';
import userReducer from './userSlice';
import currentLocationReducer from './currentLocationSlice';
import cartReducer from './cartSlice';
const store = configureStore({
    reducer: {
        orders: orderReducer,
        driver: driverReducer,
        user: userReducer,
        currentLocation: currentLocationReducer,
        cart: cartReducer,
    },
});

export default store;