import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/service/auth-api";
import authSlice from "../features/auth/service/auth-slice";
import { metierApi } from "../features/metier/service/metier-api";
import { userApi } from "../features/user/service/user-api";

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [metierApi.reducerPath]: metierApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      metierApi.middleware
    ),
});
