import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    pageInitial: 1,
    pageSelected: 1,
  },
  reducers: {
    changePageInitial: (state, action) => {
      state.pageInitial = action.payload;
    },
    changePageSelected: (state, action) => {
      state.pageSelected = action.payload;
    },
  },
});

export const { changePageInitial, changePageSelected } =
  paginationSlice.actions;

export default paginationSlice.reducer;
