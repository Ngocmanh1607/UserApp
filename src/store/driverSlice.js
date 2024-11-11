import { createSlice } from '@reduxjs/toolkit';

const driverSlice = createSlice({
    name: 'driver',
    initialState: {
        location: null,
        driverId: null,
    },
    reducers: {
        setDriverLocation: (state, action) => {
            state.location = action.payload;
        },
        setDriverId: (state, action) => {
            state.driverId = action.payload;
        },
    },
});

export const { setDriverLocation, setDriverId } = driverSlice.actions;
export default driverSlice.reducer;