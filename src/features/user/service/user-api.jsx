import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROOT } from "../../../utils/global-var";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchRepos: builder.query({
      query: (username) => `/users/${username}/repos?type=all&sort=updated/`,
      providesTags: ["User"],
    }),

    register: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/auth/register/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useFetchReposQuery, useRegisterMutation } = userApi;
