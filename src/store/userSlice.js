import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isLoggedIn: false,
    userInfo: {
        name: '',
        image: '',
        email: '',
        phone_number: '',
    },
    addresses: [],
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLocation: (state, action) => {
            state.location = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUserInfo: (state, action) => {
            console.log(state.userInfo);
            if (action.payload.profile) {
                state.userInfo = action.payload;
            }
        },
    }
})
export const { setUserLocation, setUserId, setUserInfo } = userSlice.actions;
export default userSlice.reducer;