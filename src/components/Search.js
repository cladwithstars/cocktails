import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { formatData } from "../functions/formatData";
import { Loader } from "./Loader";
import { CocktailList } from "./CocktailList";
import {
  updateSearchResults,
  updateQueryString,
  updateChecked,
} from "../redux/searchResultsSlice";

export const Search = () => {
  const { searchResults, queryString, checked } = useSelector(
    (state) => state.searchResults
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [emptyInputMessage, setEmptyInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleEmptySearch = () => {
    setLoading(false);
    dispatch(updateSearchResults([]));
    setErrorMessage("No cocktail found. Try another search...");
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  const fetchCocktailById = async (id) => {
    const { data } = await axios.get(
      `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/lookup.php?i=${id}`
    );
    if (data && data.drinks) {
      return formatData(data.drinks[0]);
    }
    return null;
  };

  const getCocktails = async (data) => {
    const cocktails = [];
    for (let i = 0; i < data.drinks.length; i++) {
      const id = data.drinks[i].idDrink;
      const cocktail = await fetchCocktailById(id);
      if (cocktail) {
        cocktails.push(cocktail);
      }
    }
    setLoading(false);
    dispatch(updateSearchResults(cocktails));
  };

  const fetchCocktailBySearchTerm = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/search.php?s=${queryString}`
    );
    if (data && data.drinks) {
      const cocktails = [];
      for (let i = 0; i < data.drinks.length; i++) {
        const formattedCocktail = formatData(data.drinks[i]);
        cocktails.push(formattedCocktail);
      }
      setLoading(false);
      dispatch(updateSearchResults(cocktails));
    } else {
      handleEmptySearch();
    }
  };

  const fetchCocktailByIngredient = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/filter.php?i=${queryString}`
    );
    if (data && data.drinks && data.drinks !== "None Found") {
      getCocktails(data);
    } else {
      handleEmptySearch();
    }
  };

  const fetchRandomCocktail = async () => {
    const { data } = await axios.get(
      `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/random.php`
    );
    if (data && data.drinks) {
      const formattedData = formatData(data.drinks[0]);
      dispatch(updateSearchResults([formattedData]));
    }
  };

  const handleInputChange = (e) => {
    dispatch(updateQueryString(e.target.value));
  };

  const displayEmptyInputMessage = () => {
    setEmptyInputMessage("Field cannot be blank");
    setTimeout(() => {
      setEmptyInputMessage("");
    }, 3000);
  };
  const handleSubmit = () => {
    if (!queryString) {
      displayEmptyInputMessage();
    } else if (!checked) {
      fetchCocktailBySearchTerm();
    } else {
      fetchCocktailByIngredient();
    }
  };

  const handleClick = () => {
    fetchRandomCocktail();
  };

  const handleClear = () => {
    dispatch(updateSearchResults([]));
    dispatch(updateQueryString(""));
  };

  return (
    <div className="mt-4 container">
      <div className="flex flex-wrap">
        <input
          type="text"
          value={queryString}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder={
            !checked
              ? "Search for cocktails by name..."
              : "Search for cocktails by ingredient..."
          }
          className="px-3 py-3 mr-2 mt-2 placeholder-pinkGray-300 text-pinkGray-600 relative bg-white bg-white rounded text-sm border-1 shadow outline-none focus:outline-none focus:ring w-full border-solid border-2 border-grey-400"
        />
      </div>
      {emptyInputMessage && (
        <div className="mt-1 mb-1 text-red-600">{emptyInputMessage}</div>
      )}
      <div className="mt-1">
        <label className="items-center mt-2">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-red-600"
            checked={checked}
            onChange={() => dispatch(updateChecked(!checked))}
          />
          <span className="ml-2 text-gray-700">Search by ingredient</span>
        </label>
      </div>

      <button
        className="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded mt-2 mr-2"
        onClick={handleSubmit}
      >
        Search
      </button>
      <button
        className="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded mt-2 mr-2"
        onClick={handleClick}
      >
        Get random cocktail
      </button>
      <button
        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mt-2"
        onClick={handleClear}
      >
        Clear
      </button>
      {!loading && searchResults && searchResults.length > 1 && (
        <div className="font-semibold mt-1">
          {" "}
          Displaying {searchResults.length} cocktails
        </div>
      )}
      <div className="mt-2">
        {!loading && searchResults && (
          <CocktailList cocktailData={searchResults} />
        )}

        {loading && (
          <div>
            <Loader />
            <div className="flex justify-center items-center">
              Fetching cocktails. This may take a moment...
            </div>
          </div>
        )}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </div>
    </div>
  );
};
