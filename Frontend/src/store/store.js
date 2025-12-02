import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice"
import categorieReducer from "./slices/categorieSlice"
import { authApi } from './api/authApi';
import { categorieApi } from './api/categorieApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categorie: categorieReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categorieApi.reducerPath]: categorieApi.reducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware, categorieApi.middleware);
    }
})