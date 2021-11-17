import React from "react";
import { useSelector } from "react-redux";
import { CocktailCard } from "./CocktailCard";

export const MyCocktails = () => {
  const myCocktails = useSelector((state) => state.savedCocktails);

  return (
    <div className="mt-4 container">
      <h1 className="flex-auto text-xl font-semibold mb-2">My Cocktails </h1>
      <ul>
        {myCocktails && myCocktails.length > 0 ? (
          myCocktails.map((cocktail) => (
            <li key={cocktail.name} className="mb-2">
              <CocktailCard
                name={cocktail.name}
                instructions={cocktail.instructions}
                imgUrl={cocktail.imgUrl}
                ingredients={cocktail.ingredients}
                measures={cocktail.measures}
                formatted={cocktail.formatted}
                saveButton={false}
              />
            </li>
          ))
        ) : (
          <div>
            {" "}
            It doesn't look like you've saved any cocktails yet! Party pooper.{" "}
          </div>
        )}
      </ul>
    </div>
  );
};
