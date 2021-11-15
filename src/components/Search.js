import React, { useState } from "react";
import axios from "axios";
import { CocktailCard } from "./CocktailCard";
import { formatData } from "../functions/formatData";
import { Loader } from "./Loader";

export const Search = () => {
  const [cocktailData, setCocktailData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmptySearch = () => {
    setCocktailData(null);
    setErrorMessage("No cocktail found. Try another search...");
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };
  const fetchCocktailById = async (id) => {
    console.log("id is: ", id);
    const { data } = await axios.get(
      `http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    return formatData(data);
  };
  const fetchCocktailBySearchTerm = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
    if (data && data.drinks) {
      const cocktails = [];
      for (let i = 0; i < data.drinks.length; i++) {
        const id = data.drinks[i].idDrink;
        const cocktail = await fetchCocktailById(id);
        cocktails.push(cocktail);
      }
      setLoading(false);
      setCocktailData(cocktails);
    } else {
      setLoading(false);
      handleEmptySearch();
    }
  };

  const fetchCocktailByIngredient = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`
    );
    if (data && data.drinks) {
      const cocktails = [];
      for (let i = 0; i < data.drinks.length; i++) {
        const id = data.drinks[i].idDrink;
        const cocktail = await fetchCocktailById(id);
        cocktails.push(cocktail);
      }
      setLoading(false);
      setCocktailData(cocktails);
    } else {
      setLoading(false);
      handleEmptySearch();
    }
  };

  const fetchRandomCocktail = async () => {
    const { data } = await axios.get(
      "http://www.thecocktaildb.com/api/json/v1/1/random.php"
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

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
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
      <input
        type="checkbox"
        id="toggle"
        name="toggle"
        value="search by ingredient"
        onChange={handleCheckboxChange}
      />
      <label for="toggle"> Search by ingredient </label>
      <br />

      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2 mr-2"
        onClick={handleSubmit}
      >
        Search
      </button>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2"
        onClick={handleClick}
      >
        Get random cocktail
      </button>

      <div className="mt-2">
        {!loading &&
          cocktailData &&
          cocktailData.map((cocktail) => (
            <CocktailCard
              name={cocktail.name}
              instructions={cocktail.instructions}
              imgUrl={cocktail.imgUrl}
              ingredients={cocktail.ingredients}
              measures={cocktail.measures}
              formatted={cocktail.formatted}
            />
          ))}
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
