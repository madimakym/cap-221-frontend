import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROOT } from "../../../utils/global-var";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ["Article"],
  endpoints: (builder) => ({
    fetchArticle: builder.query({
      query: () => `/api/v1/article/`,
      providesTags: ["Article"],
    }),

    fetchOneArticle: builder.query({
      query: (id) => `/api/v1/article/${id}`,
      providesTags: ["Article"],
    }),

    fetchByGroupe: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/article/groupe/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Article"],
    }),

    createArticle: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/article/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Article"],
    }),

    updateArticle: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/article/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Article"],
    }),

    deleteArticle: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/article/${payload}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Article"],
    }),
  }),
});

export const {
  useFetchArticleQuery,
  useFetchByGroupeMutation,
  useFetchOneArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
