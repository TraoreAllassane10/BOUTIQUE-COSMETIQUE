import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice";
import { authApi } from './api/authApi';
import { categorieApi } from './api/categorieApi';
import { produitApi } from './api/produitApi';
import { commandeApi } from './api/commandeApi';
import { dashboardApi } from './api/dashboardApi';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categorieApi.reducerPath]: categorieApi.reducer,
        [produitApi.reducerPath]: produitApi.reducer,
        [commandeApi.reducerPath]: commandeApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware, categorieApi.middleware, produitApi.middleware, commandeApi.middleware, dashboardApi.middleware);
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;