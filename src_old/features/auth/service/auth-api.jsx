import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROOT } from "../../../utils/global-var";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    authlogin: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),

    authFetchToken: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/auth`,
        method: "GET",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useAuthloginMutation, useAuthFetchTokenMutation } = authApi;
