import { createSlice } from '@reduxjs/toolkit';
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
      const profile = action.payload.profile;
      if (profile) {
        state.userInfo.name = profile.name;
        state.userInfo.image = profile.image;
        state.userInfo.email = profile.mail;
        state.userInfo.phone_number = profile.phone_number;
      }
    },
  },
});
export const { setUserLocation, setUserId, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
