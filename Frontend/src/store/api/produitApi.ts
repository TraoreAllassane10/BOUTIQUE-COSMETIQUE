import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const produitApi = createApi({
  reducerPath: "produitApi",
  baseQuery,
  endpoints: (builder) => ({

    // Recuperer tous les produits
    getProduits: builder.query<any, void>({
      query: () => "/admin/products",
    }),

  }),
});

export const { useGetProduitsQuery } = produitApi;
