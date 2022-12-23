import { createSlice } from "@reduxjs/toolkit";
import { formatData } from "../functions/formatData";
import axios from "axios";
const BASE_URL = "https://www.thecocktaildb.com/api/json/v2/";

const initialState = {
  randomCocktail: [],
  byNameCocktails: [],
  byIngredientCocktails: [],
  queryString: "",
  checked: false,
  loading: false,
  displayState: null,
};

export const fetchCocktailById = async (id) => {
  const { data } = await axios.get(
    `${BASE_URL}${process.env.REACT_APP_API_KEY}/lookup.php?i=${id}`
  );
  if (data && data.drinks) {
    return formatData(data.drinks[0]);
  }
  return null;
};

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    updateRandomCocktail: (state, action) => {
      state.randomCocktail = action.payload;
    },
    updateByNameCocktails: (state, action) => {
      state.byNameCocktails = action.payload;
    },
    updateByIngredientCocktails: (state, action) => {
      state.byIngredientCocktails = action.payload;
    },
    updateChecked: (state, action) => {
      state.checked = action.payload;
    },
    updateQueryString: (state, action) => {
      state.queryString = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDisplayState: (state, action) => {
      state.displayState = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateRandomCocktail,
  updateByIngredientCocktails,
  updateByNameCocktails,
  updateChecked,
  updateQueryString,
  setLoading,
  setDisplayState,
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
