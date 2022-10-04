import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROOT } from "../../../utils/global-var";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ["Home"],
  endpoints: (builder) => ({
    fetchRepos: builder.query({
      query: (username) => `/users/${username}/repos?type=all&sort=updated/`,
      providesTags: ["Home"],
    }),
  }),
});

export const { useFetchReposQuery } = homeApi;
