import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice.js";
import paginationReducer from "./features/pagination/paginationSlice.js";

export default configureStore({
  reducer: {
    theme: themeReducer,
    pagination: paginationReducer,
  },
});
