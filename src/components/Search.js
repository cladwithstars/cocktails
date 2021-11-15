import React, { useState } from "react";
import axios from "axios";
import { formatData } from "../functions/formatData";
import { Loader } from "./Loader";
import { CocktailList } from "./CocktailList";

export const Search = () => {
  const [cocktailData, setCocktailData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleEmptySearch = () => {
    setLoading(false);
    setCocktailData(null);
    setErrorMessage("No cocktail found. Try another search...");
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  const fetchCocktailById = async (id) => {
    const { data } = await axios.get(
      `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/lookup.php?i=${id}`
    );
    return formatData(data);
  };

  const getCocktails = async (data) => {
    const cocktails = [];
    for (let i = 0; i < data.drinks.length; i++) {
      const id = data.drinks[i].idDrink;
      const cocktail = await fetchCocktailById(id);
      cocktails.push(cocktail);
    }
    setLoading(false);
    setCocktailData(cocktails);
  };

  const fetchCocktailBySearchTerm = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/search.php?s=${searchTerm}`
    );
    if (data && data.drinks) {
      getCocktails(data);
    } else {
      handleEmptySearch();
    }
  };

  const fetchCocktailByIngredient = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/filter.php?i=${searchTerm}`
    );
    if (data && data.drinks) {
      getCocktails(data);
    } else {
      handleEmptySearch();
    }
  };

  const fetchRandomCocktail = async () => {
    const { data } = await axios.get(
      `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/random.php`
    );
    if (data) {
      const formattedData = formatData(data);
      setCocktailData([formattedData]);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    if (!checked) {
      fetchCocktailBySearchTerm();
    } else {
      fetchCocktailByIngredient();
    }
  };

  const handleClick = () => {
    fetchRandomCocktail();
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleClear = () => {
    setCocktailData(null);
    setSearchTerm("");
  };

  return (
    <div className="mt-4 container">
      <div className="flex flex-wrap">
        <input
          type="text"
          value={searchTerm}
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
          class="px-3 py-3 mr-2 mt-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-1 shadow outline-none focus:outline-none focus:ring w-full border-solid border-2 border-grey-400"
        />
      </div>
      <div className="mt-1">
        <label class="items-center mt-2">
          <input
            type="checkbox"
            class="form-checkbox h-5 w-5 text-red-600"
            onChange={handleCheckboxChange}
          />
          <span class="ml-2 text-gray-700">Search by ingredient</span>
        </label>
      </div>

      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2 mr-2"
        onClick={handleSubmit}
      >
        Search
      </button>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2 mr-2"
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

      <div className="mt-2">
        {!loading && cocktailData && (
          <CocktailList cocktailData={cocktailData} />
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
