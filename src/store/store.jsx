import { configureStore, current } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import driverReducer from './driverSlice';
import userReducer from './userSlice';
import currentLocationReducer from './currentLocationSlice'
const store = configureStore({
    reducer: {
        orders: orderReducer,
        driver: driverReducer,
        user: userReducer,
        currentLocation: currentLocationReducer,
    },
});

export default store;