import { createSlice } from '@reduxjs/toolkit';

type User = {
  token: string | null;
  userDetails: {
    [key: string]: string;
  } | null;
};

const initialState: User = {
  token: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') || '').token
    : null,
  userDetails: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') || '').userDetails
    : null,
};

export const userAuth = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, userDetails } = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      state.token = token;
      state.userDetails = userDetails;
    },
    removeUser: (state) => {
      localStorage.removeItem('userInfo');
      state.token = null;
      state.userDetails = null;
    },
  },
});

export const { setUser, removeUser } = userAuth.actions;

export default userAuth.reducer;
