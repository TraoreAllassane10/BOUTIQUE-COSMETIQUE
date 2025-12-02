import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

interface CategorieData {
  nom: string
}

export const categorieApi = createApi({
  reducerPath: "categorieApi",
  baseQuery,
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/admin/categories",
    }),

    createCategorie: builder.mutation({
      query: (categorieData: CategorieData) => ({
        url: "/admin/categories",
        method: "POST",
        body: categorieData,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategorieMutation } =
  categorieApi;
