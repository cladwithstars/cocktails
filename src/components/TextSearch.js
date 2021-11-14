import React, { useState } from "react";
import axios from "axios";

export const TextSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cocktailData, setCocktailData] = useState(null);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const fetchData = async () => {
    const { data } = await axios.get(
      `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
    if (data && data.drinks) {
      const drink = data.drinks[0];
      setCocktailData({
        name: drink.strDrink,
        instructions: drink.strInstructions,
      });
    }
  };
  const handleSubmit = () => {
    fetchData();
  };
  return (
    <div class="container flex">
      <div class="mb-3 pt-0">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for cocktails..."
          class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        />
      </div>
      <button onClick={handleSubmit}>Search</button>
      {cocktailData && (
        <div>
          <h2> {cocktailData.name} </h2>
          <p> {cocktailData.instructions} </p>
        </div>
      )}
    </div>
  );
};
