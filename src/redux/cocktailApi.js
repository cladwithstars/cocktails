import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/`;

// Define a service using a base URL and expected endpoints
export const cocktailApi = createApi({
  reducerPath: "cocktailApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getRandomCocktail: builder.query({
      query: () => "random.php",
    }),
    getCocktailByName: builder.query({
      query: (name) => `search.php?s=${name}`,
    }),
    getCocktailByIngredient: builder.query({
      query: (ingredient) => `/filter.php?i=${ingredient}`,
    }),
    getCocktailById: builder.query({
      query: (id) => `/lookup.php?i=${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetRandomCocktailQuery,
  useGetCocktailByIngredientQuery,
  useGetCocktailByNameQuery,
  useGetCocktailByIdQuery,
} = cocktailApi;
