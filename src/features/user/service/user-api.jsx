import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROOT } from "../../../utils/global-var";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => `/api/v1/user/`,
      providesTags: ["User"],
    }),

    fetchGenre: builder.query({
      query: (payload) => `/api/v1/user/genre/${payload}`,
      providesTags: ["User"],
    }),

    fetchByRegion: builder.query({
      query: () => `/api/v1/user/region`,
      providesTags: ["User"],
    }),

    userCheckToken: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/user/check-token`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    userChangePassword: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/user/${payload.id}/change-password`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    userResetPassword: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/user/reset-password`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    register: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/auth/register/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    registerCheck: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/auth/register/check/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useFetchGenreQuery,
  useFetchByRegionQuery,
  useFetchUserQuery,
  useRegisterMutation,
  useRegisterCheckMutation,
  useUserCheckTokenMutation,
  useUserResetPasswordMutation,
  useUserChangePasswordMutation,
} = userApi;
