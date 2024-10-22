import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    latitude: null,
    longitude: null,
    address: "Đang lấy vị trí...",
    error: null,
};
const currentLocationSlice = createSlice({
    name: 'currentLocation',
    initialState,
    reducers: {
        setLocation(state, action) {
            const { latitude, longitude, address } = action.payload;
            state.latitude = latitude;
            state.longitude = longitude;
            state.address = address;
            state.error = null;
        },
        setError(state, action) {
            state.error = action.payload;
            state.address = "Không thể lấy vị trí";
        },
    },
});

export const { setLocation, setError } = currentLocationSlice.actions;
export default currentLocationSlice.reducer;
