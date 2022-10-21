import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROOT } from "../../../utils/global-var";

export const metierApi = createApi({
  reducerPath: "metierApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ["Metier"],
  endpoints: (builder) => ({
    fetchMetier: builder.query({
      query: () => `/api/v1/metier/`,
      providesTags: ["Metier"],
    }),

    fetchByGroupe: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/metier/groupe/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Metier"],
    }),

    createMetier: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/metier/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Metier"],
    }),

    deleteMetier: builder.mutation({
      query: (payload) => ({
        url: `/api/v1/metier/${payload}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Metier"],
    }),
  }),
});

export const {
  useFetchMetierQuery,
  useFetchByGroupeMutation,
  useCreateMetierMutation,
  useDeleteMetierMutation,
} = metierApi;
