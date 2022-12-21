import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  queryString: "",
  checked: false,
};

export const searchResultsSlice = createSlice({
  name: "cocktail",
  initialState,
  reducers: {
    updateSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    updateChecked: (state, action) => {
      state.checked = action.payload;
    },
    updateQueryString: (state, action) => {
      state.queryString = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSearchResults, updateChecked, updateQueryString } =
  searchResultsSlice.actions;

export default searchResultsSlice.reducer;
