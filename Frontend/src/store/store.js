import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice"
import { authApi } from './api/authApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware);
    }
})