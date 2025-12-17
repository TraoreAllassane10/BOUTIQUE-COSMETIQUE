import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery,
  endpoints: (builder) => ({
    getDataDashboard: builder.query({
        query: () => "/admin/dashboard"
    })
  }),
});

export const {useGetDataDashboardQuery} = dashboardApi;
