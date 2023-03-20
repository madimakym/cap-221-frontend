import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WIZALL_ROOT } from "../../../utils/global-var";

export const authPaiementApi = createApi({
  reducerPath: "authPaiementApi",
  baseQuery: fetchBaseQuery({ baseUrl: WIZALL_ROOT }),
  tagTypes: ["AuthPaiement"],
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: (payload) => ({
        url: `/token/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["AuthPaiement"],
    }),

    sendOTP: builder.mutation({
      query: (payload) => ({
        url: `/api/merchant/cashout/`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + payload.token,
        },
      }),
      invalidatesTags: ["AuthPaiement"],
    }),

    confirmPay: builder.mutation({
      query: (payload) => ({
        url: `/api/merchant/cashout/confirm/`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + payload.token,
        },
      }),
      invalidatesTags: ["AuthPaiement"],
    }),
  }),
});

export const {
  useGetTokenMutation,
  useConfirmPayMutation,
  useSendOTPMutation,
} = authPaiementApi;
