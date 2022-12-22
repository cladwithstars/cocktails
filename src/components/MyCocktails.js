import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CocktailCard } from "./CocktailCard";
import { setFilterString } from "../redux/cocktailSlice";

export const MyCocktails = () => {
  const dispatch = useDispatch();
  const { savedCocktails, filterString } = useSelector(
    (state) => state.cocktails
  );
  const filteredCocktails = useMemo(() => {
    if (filterString === "" || !savedCocktails || savedCocktails.length === 0)
      return savedCocktails;

    return savedCocktails.filter((cocktail) => {
      const { name, formatted } = cocktail;
      const lowerCaseFilterString = filterString.toLowerCase();
      return (
        name?.toLowerCase().includes(lowerCaseFilterString) ||
        formatted
          ?.reduce((acc, elem) => acc + " " + elem, "")
          .includes(lowerCaseFilterString)
      );
    });
  }, [filterString, savedCocktails]);

  const handleChange = (e) => dispatch(setFilterString(e.target.value));

  return (
    <div className="mt-4 container">
      <h1 className="flex-auto text-xl font-semibold text-pink-500 mb-2">
        My Cocktails{" "}
      </h1>
      {savedCocktails && savedCocktails.length ? (
        <input
          type="text"
          value={filterString}
          onChange={handleChange}
          placeholder={"Search my cocktails"}
          className="px-3 py-3 mr-2 mt-2 mb-2 placeholder-pinkGray-300 text-pinkGray-600 relative bg-white bg-white rounded text-sm border-1 shadow outline-none focus:outline-none focus:ring w-full border-solid border-2 border-grey-400"
        />
      ) : null}
      <ul>
        {filteredCocktails && filteredCocktails.length > 0 ? (
          filteredCocktails.map((cocktail) => (
            <li key={cocktail.name} className="mb-2">
              <CocktailCard
                name={cocktail.name}
                instructions={cocktail.instructions}
                imgUrl={cocktail.imgUrl}
                ingredients={cocktail.ingredients}
                measures={cocktail.measures}
                formatted={cocktail.formatted}
                saveButton={false}
                deleteButton={true}
              />
            </li>
          ))
        ) : (
          <div> No cocktails to display </div>
        )}
      </ul>
    </div>
  );
};
