import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categorieSlice = createSlice({
  name: "categorie",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
  },
});

const { setCategories } = categorieSlice.actions;
export default categorieSlice.reducer;

export const selectCategories = (state) => state.categorie.categories;