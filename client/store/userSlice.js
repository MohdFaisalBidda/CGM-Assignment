import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  followCount: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increaseFollowCount: (state) => {
      state.followCount += 1;
    },
  },
});

export const { increaseFollowCount } = userSlice.actions;


export default userSlice.reducer;