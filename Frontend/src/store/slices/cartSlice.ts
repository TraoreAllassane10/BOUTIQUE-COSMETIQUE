import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Product {
  id: number;
  image: string;
  nom: string;
  prix: number;
  quantite: number;
}

interface State {
  cartCount: number;
  products: Product[];
}

interface Action {
  payload: any;
}

const initialState = {
  cartCount: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Ajout au panier
    addCart: (state: State, action: Action) => {
      state.cartCount += 1;
      state.products.push({ ...action.payload, quantite: 1 });
    },

    // Modification de la quantite
    updateQuantityProduct: (state: State, action) => {
      // Modification de la quantite du produit
      const productUpdate = state.products.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantite: action.payload.quantite }
          : product
      );

      // Mise à jour du panier
      state.products = productUpdate;
    },

    // Suppression d'un élément
    removeCart: (state, action) => {
      (state.cartCount -= 1),
        (state.products = state.products.filter(
          (product: Product) => product.id !== action.payload.id
        ));
    },

    // Vidage du panier
    clearCart: (state) => {
      (state.cartCount = 0), (state.products = []);
    },
  },
});

export const { addCart, updateQuantityProduct, removeCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const selectCartCount = (state: RootState) => state.cart.cartCount;
export const selectProducts = (state: RootState) => state.cart.products;
