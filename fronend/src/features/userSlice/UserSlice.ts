import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { UserResponse } from "../../types/RegisterType";

interface UserState {
  user: UserResponse | null;
}

const initialState: UserState = {
  user: null,
};

const userSilce = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponse | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSilce.actions;

// Other code such as selectors can use the imported RootState type
export const selectUser = (state: RootState) => state.user.user;

export default userSilce.reducer;
