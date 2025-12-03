import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers, {getState}) => {
        // const token = getState().auth.token;
        const token = (getState() as any).auth.token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        headers.set('Accept', 'application/json');
        return headers;
    }
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            })
        }),

        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData
            })
        }),

        getUser: builder.query({
            query: () => '/user',
        })
    })
})

export const {useLoginMutation, useRegisterUserMutation, useGetUserQuery} = authApi;