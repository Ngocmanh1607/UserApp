import { configureStore } from '@reduxjs/toolkit';
import driverReducer from './driverSlice';
import userReducer from './userSlice';
import currentLocationReducer from './currentLocationSlice';
import defaultLocationReducer from './defaultLocationSlice';

const store = configureStore({
  reducer: {
    driver: driverReducer,
    user: userReducer,
    currentLocation: currentLocationReducer,
    defaultLocation: defaultLocationReducer,
  },
});

export default store;
