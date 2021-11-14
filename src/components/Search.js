import React, { useState } from "react";
import axios from "axios";
import { CocktailCard } from "./CocktailCard";

export const Search = () => {
  const [cocktailData, setCocktailData] = useState(null);
  const fetchData = async () => {
    const { data } = await axios.get(
      "http://www.thecocktaildb.com/api/json/v1/1/random.php"
    );

    if (data) {
      const drink = data.drinks[0];
      const {
        strDrink,
        strDrinkThumb,
        strInstructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
      } = drink;
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
      ];
      const measures = [
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
      ];

      // filter out null values
      const filteredIngredients = ingredients.filter((el) => el);
      const filteredMeasures = measures.filter((el) => el);

      const formattedList = () => {
        const res = [];
        for (let i = 0; i < filteredIngredients.length; i++) {
          const formattedString = `${filteredIngredients[i]} - ${filteredMeasures[i]}`;
          res.push(formattedString);
        }
        return res;
      };

      setCocktailData({
        name: strDrink,
        imgUrl: strDrinkThumb,
        instructions: strInstructions,
        ingredients: filteredIngredients,
        measures: filteredMeasures,
        formatted: formattedList(),
      });
    }
  };
  const handleClick = () => {
    fetchData();
  };

  return (
    <div className="mt-2 container">
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleClick}
      >
        Get random cocktail
      </button>
      <div className="mt-2">
        {cocktailData && (
          <CocktailCard
            name={cocktailData.name}
            instructions={cocktailData.instructions}
            imgUrl={cocktailData.imgUrl}
            ingredients={cocktailData.ingredients}
            measures={cocktailData.measures}
            formatted={cocktailData.formatted}
          />
        )}
      </div>
    </div>
  );
};
