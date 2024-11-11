import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    latitude: null,
    longitude: null,
    address: "Đang lấy vị trí...",
    error: null,
};
const defaultLocationSlice = createSlice({
    name: 'defaultLocation',
    initialState,
    reducers: {
        setDefaultLocation(state, action) {
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

export const { setDefaultLocation, setError } = defaultLocationSlice.actions;
export default defaultLocationSlice.reducer;
