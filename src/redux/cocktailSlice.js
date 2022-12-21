import { createSlice } from "@reduxjs/toolkit";

const cocktails = JSON.parse(localStorage.getItem("cocktails"));

const initialState = {
  savedCocktails: cocktails ? cocktails : [],
};

export const cocktailSlice = createSlice({
  name: "cocktail",
  initialState,
  reducers: {
    addCocktail: (state, action) => {
      state.savedCocktails.push(action.payload);
    },
    deleteCocktail: (state, action) => {
      state.savedCocktails = state.savedCocktails.filter(
        (cocktail) => cocktail.name !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCocktail, deleteCocktail } = cocktailSlice.actions;

export default cocktailSlice.reducer;
