import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
};

export const searchResultsSlice = createSlice({
  name: "cocktail",
  initialState,
  reducers: {
    updateSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSearchResults } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
