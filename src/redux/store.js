import { configureStore } from "@reduxjs/toolkit";
import cocktailReducer from "./cocktailSlice";
import searchResultsReducer from "./searchResultsSlice";

export default configureStore({
  reducer: { cocktails: cocktailReducer, searchResults: searchResultsReducer },
});
