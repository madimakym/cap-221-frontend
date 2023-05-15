import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.blog.cap221.com/" }),
  tagTypes: ["Article"],
  endpoints: (builder) => ({
    fetchCaterories: builder.query({
      query: () => `/wp-json/wp/v2/categories?per_page=100`,
      providesTags: ["Article"],
    }),

    fetchPosts: builder.query({
      query: () => `/wp-json/wp/v2/posts/?per_page=100`,
      providesTags: ["Article"],
    }),

    fetchPost: builder.query({
      query: (id) => `/wp-json/wp/v2/posts/${id}`,
      providesTags: ["Article"],
    }),

    fetchCategoryPosts: builder.query({
      query: (id) => `/wp-json/wp/v2/posts/?categories=${id}&_fields=id,title,content,excerpt&excerpt_length=10`,
      providesTags: ["Article"],
    }),

    fetchArticle: builder.query({
      query: (name) => `/api/v1/article/category/${name}`,
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
  useFetchCategoryPostsQuery,
  useFetchCateroriesQuery,
  useFetchPostQuery,
  useFetchPostsQuery,
  useFetchArticleQuery,
  useFetchByGroupeMutation,
  useFetchOneArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
