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

    getProduitById: builder.query({
      query: (id) => `/admin/products/${id}`,
    }),

    // Creer un nouveau produit
    createProduit: builder.mutation({
      query: (formData) => ({
        url: "/admin/products",
        method: "POST",
        body: formData,
      }),
    }),

    updateProduit: builder.mutation({
      query: ({ id, formData }) => {

        formData.append("_method", "PUT");
        
        return {
          url: `/admin/products/${id}`,
          method: "POST",
          body: formData,
        };
      },
    }),

    deleteProduit: builder.mutation({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProduitsQuery,
  useCreateProduitMutation,
  useGetProduitByIdQuery,
  useUpdateProduitMutation,
  useDeleteProduitMutation,
} = produitApi;
