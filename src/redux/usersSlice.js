import { createSlice } from "@reduxjs/toolkit";
import COUNTRIES from "../constants/countries.json";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    reloadUser: false,
  },
  reducers: {
    SetUser(state, action) {
      state.user = action.payload;
      state.user.countryInfo = COUNTRIES.find(
        (c) => c.countryCode === action.payload.country
      );
    },
    ReloadUser(state, action) {
      state.reloadUser = action.payload;
    },
  },
});

export const { SetUser, ReloadUser } = usersSlice.actions;
export default usersSlice.reducer;
