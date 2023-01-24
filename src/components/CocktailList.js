import React from "react";
import { CocktailCard } from "./CocktailCard";

export const CocktailList = ({ cocktailData }) => {
  return (
    <div class="p-4">
      <ul>
        {cocktailData &&
          cocktailData.map((cocktail) => (
            <li className="mb-2" key={cocktail.name}>
              <CocktailCard
                name={cocktail.name}
                instructions={cocktail.instructions}
                imgUrl={cocktail.imgUrl}
                ingredients={cocktail.ingredients}
                measures={cocktail.measures}
                formatted={cocktail.formatted}
                saveButton={true}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
