import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import pagesReducer from "./slices/pagesSlice";
import postsReducer from "./slices/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    pages: pagesReducer,
    dashboard: dashboardReducer,
  },
});
