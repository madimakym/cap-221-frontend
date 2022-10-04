import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROOT } from "../../../utils/global-var";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ["Register"],
  endpoints: (builder) => ({
    fetchRepos: builder.query({
      query: (username) => `/users/${username}/repos?type=all&sort=updated/`,
      providesTags: ["Register"],
    }),
  }),
});

export const { useFetchReposQuery } = registerApi;
