import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
  },
  reducers: {
    changeTheme: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
