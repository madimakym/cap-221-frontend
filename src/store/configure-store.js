import { configureStore } from "@reduxjs/toolkit";
import { registerApi } from "../features/register/service/register-api";

export default configureStore({
  reducer: {
    [registerApi.reducerPath]: registerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(registerApi.middleware),
});
