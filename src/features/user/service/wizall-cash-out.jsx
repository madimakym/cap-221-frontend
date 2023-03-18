import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WIZALL_ROOT } from "../../../utils/global-var";

export const wizallApi = createApi({
  reducerPath: "wizallApi",
  baseQuery: fetchBaseQuery({ baseUrl: WIZALL_ROOT }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: (payload) => ({
        url: `/token/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Wizall"],
    }),

    sendOTP: builder.mutation({
      query: (payload) => ({
        url: `/api/merchant/cashout/`,
        method: "POST",
        body: payload.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: payload.header,
        },
      }),
      invalidatesTags: ["Wizall"],
    }),

    confirmPay: builder.mutation({
      query: (payload) => ({
        url: `/api/merchant/cashout/confirm/`,
        method: "POST",
        body: payload.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: payload.header,
        },
      }),
      invalidatesTags: ["Wizall"],
    }),
  }),
});

export const {
  useConfirmPayMutation,
  useSendOTPMutation,
  useGetTokenMutation,
} = wizallApi;
