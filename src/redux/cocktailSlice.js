import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedCocktails: [],
};

export const cocktailSlice = createSlice({
  name: "cocktail",
  initialState,
  reducers: {
    addCocktail: (state, action) => {
      state.savedCocktails.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCocktail } = cocktailSlice.actions;

export default cocktailSlice.reducer;
