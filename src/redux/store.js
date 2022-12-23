import { configureStore } from "@reduxjs/toolkit";
import cocktailReducer from "./cocktailSlice";
import searchResultsReducer from "./searchResultsSlice";
import { cocktailApi } from "./cocktailApi";

export default configureStore({
  reducer: {
    cocktails: cocktailReducer,
    searchResults: searchResultsReducer,
    [cocktailApi.reducerPath]: cocktailApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cocktailApi.middleware),
});
