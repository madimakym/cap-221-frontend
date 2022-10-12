import { configureStore } from "@reduxjs/toolkit";
import { metierApi } from "../features/metier/service/metier-api";
import { userApi } from "../features/user/service/user-api";

export default configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [metierApi.reducerPath]: metierApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, metierApi.middleware),
});
