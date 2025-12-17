import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const commandeApi = createApi({
  reducerPath: "commandeApi",
  baseQuery,
  endpoints: (builder) => ({

    // Recuperation des commandes
    getCommandes: builder.query({
      query: () => "/admin/commandes",
    }),

    // Passation d'une commande
    createCommande: builder.mutation({
      query: (commandeData) => ({
        url: "/commandes/process",
        method: "POST",
        body: commandeData,
      }),
    }),

    // Suppression d'une commande
    deleteCommande: builder.mutation({
        query: (id) => ({
            url: `/admin/commandes/${id}`,
            method: "DELETE",
        })
    })
  }),
});

export const { useCreateCommandeMutation, useGetCommandesQuery, useDeleteCommandeMutation } = commandeApi;
