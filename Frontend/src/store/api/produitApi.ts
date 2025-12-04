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

    // Creer un nouveau produit
    createProduit: builder.mutation({
      query: (formData) => ({
        url: "/admin/products",
        method: "POST",
        body: formData,
      }),
    }),


  }),
});

export const { useGetProduitsQuery, useCreateProduitMutation } = produitApi;
