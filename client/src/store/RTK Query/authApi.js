import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../slice/authSlice";

let BASE_URL = "http://localhost:3000";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (signUpData) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: signUpData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: "/api/auth/login",
        method: "POST",
        body: loginData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn(result.data.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginMutation, useLogoutMutation } = authApi;