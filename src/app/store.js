import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../Auth-Slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
