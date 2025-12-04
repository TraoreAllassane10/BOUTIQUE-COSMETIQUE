import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice"
import { authApi } from './api/authApi';
import { categorieApi } from './api/categorieApi';
import { produitApi } from './api/produitApi';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categorieApi.reducerPath]: categorieApi.reducer,
        [produitApi.reducerPath]: produitApi.reducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware, categorieApi.middleware, produitApi.middleware);
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;