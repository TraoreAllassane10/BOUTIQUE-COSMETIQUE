import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

interface CategorieData {
  nom: string
}

export const categorieApi = createApi({
  reducerPath: "categorieApi",
  baseQuery,
  endpoints: (builder) => ({

    // Recuperation de la liste des categories
    getCategories: builder.query({
      query: () => "/admin/categories",
    }),

    // Creation d'une nouvelle categorie
    createCategorie: builder.mutation({
      query: (categorieData: CategorieData) => ({
        url: "/admin/categories",
        method: "POST",
        body: categorieData,
      }),
    }),

    // Recuperation d'une categorie par son ID
    getCategorieById: builder.query({
      query: (id) => `/admin/categories/${id}`
    }),

    // Mise à jour d'une categorie par son ID
    updateCategorie: builder.mutation({
      query: ({id, nom} : {id: string, nom: string}) => ({
        url: `/admin/categories/${id}`,
        method: "PUT",
        body: {nom},
      })
    })
  }),
});

export const { useGetCategoriesQuery, useCreateCategorieMutation, useGetCategorieByIdQuery ,useUpdateCategorieMutation } =
  categorieApi;
