import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isLoggedIn: false,
    userInfo: null,
    addresses: [],
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLocation: (state, action) => {
            state.location = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        }
    }
})
export const { setUserLocation, setUserId } = userSlice.actions;
export default userSlice.reducer;