import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";


export const commandeApi = createApi({
    reducerPath: "commandeApi",
    baseQuery,
    endpoints: (builder) => ({

        // Passation d'une commande
        createCommande: builder.mutation({
            query: (commandeData) => ({
                url: "/commandes/process",
                method: "POST",
                body: commandeData
            })
        }),


    })
});

export const {useCreateCommandeMutation} = commandeApi;