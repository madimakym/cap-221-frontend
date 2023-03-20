import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/service/auth-api";
import authSlice from "../features/auth/service/auth-slice";
import { metierApi } from "../features/metier/service/metier-api";
import { userApi } from "../features/user/service/user-api";
import { wizallApi } from "../features/user/service/wizall-cash-out";
import { articleApi } from "../features/article/service/article-api";
import { authPaiementApi } from "../features/auth/service/auth-paiement-api";

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [authPaiementApi.reducerPath]: authPaiementApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [metierApi.reducerPath]: metierApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [wizallApi.reducerPath]: wizallApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      authPaiementApi.middleware,
      userApi.middleware,
      metierApi.middleware,
      wizallApi.middleware,
      articleApi.middleware
    ),
});
