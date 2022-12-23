import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { formatData } from "../functions/formatData";
import { Loader } from "./Loader";
import { CocktailList } from "./CocktailList";
import {
  updateRandomCocktail,
  updateByIngredientCocktails,
  updateByNameCocktails,
  updateQueryString,
  updateChecked,
  setLoading,
  fetchCocktailById,
  setDisplayState,
} from "../redux/searchResultsSlice";
import {
  useGetRandomCocktailQuery,
  useGetCocktailByNameQuery,
  useGetCocktailByIngredientQuery,
  useGetCocktailByIdQuery,
} from "../redux/cocktailApi";

export const Search = () => {
  const dispatch = useDispatch();
  const {
    randomCocktail,
    byIngredientCocktails,
    byNameCocktails,
    queryString,
    checked,
    loading,
    displayState,
  } = useSelector((state) => state.searchResults);

  const [emptyFetch, setEmptyFetch] = useState(false);
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [randomCocktailToken, setRandomCocktailToken] = useState(0);
  const [ingredientToken, setIngredientToken] = useState(0);
  const [skipRandom, setSkipRandom] = useState(true);
  const [skipIngredient, setSkipIngredient] = useState(true);
  const [skipName, setSkipName] = useState(true);
  const [submittedCocktailName, setSubmittedCocktailName] = useState("");
  const [submittedCocktailIngredient, setSubmittedCocktailIngredient] =
    useState("");

  const {
    data: randomCocktailData,
    error: randomCocktailError,
    isFetching: randomCocktailLoading,
  } = useGetRandomCocktailQuery(randomCocktailToken, {
    skip: skipRandom,
  });
  const {
    data: byNameCocktailsData,
    error: byNameCocktailsError,
    isFetching: byNameCocktailsLoading,
  } = useGetCocktailByNameQuery(submittedCocktailName, {
    skip: skipName,
  });
  const {
    data: byIngredientCocktailsData,
    error: byIngredientCocktailsError,
    isFetching: byIngredientCocktailsLoading,
  } = useGetCocktailByIngredientQuery(submittedCocktailIngredient, {
    skip: skipIngredient,
  });

  const serverError =
    byNameCocktailsError || randomCocktailError || byIngredientCocktailsError;

  const fetchOngoing =
    loading || randomCocktailLoading || byNameCocktailsLoading;

  const resultsNumber = () => {
    if (displayState === "random") return 1;
    if (displayState === "name") {
      return byNameCocktails ? byNameCocktails.length : null;
    }
    return byIngredientCocktails ? byIngredientCocktails.length : null;
  };

  useEffect(() => {
    if (randomCocktailData && randomCocktailData.drinks) {
      const formattedData = formatData(randomCocktailData.drinks[0]);
      dispatch(setLoading(false));
      dispatch(updateRandomCocktail([formattedData]));
    } else if (!skipRandom) {
      dispatch(setLoading(false));
      setEmptyFetch(true);
    }
  }, [randomCocktailData, skipRandom]);

  useEffect(() => {
    if (byNameCocktailsData && byNameCocktailsData.drinks) {
      const cocktails = byNameCocktailsData.drinks.map((rawDataCocktail) =>
        formatData(rawDataCocktail)
      );
      if (cocktails.length === 0 && !skipName) {
        setEmptyFetch(true);
      } else if (emptyFetch) {
        setEmptyFetch(false);
      }
      dispatch(updateByNameCocktails(cocktails));
    } else if (!skipName) {
      setEmptyFetch(true);
      dispatch(updateByNameCocktails([]));
    }
  }, [byNameCocktailsData, skipName]);

  const fetchByIngredient = async (id) => {
    const cocktails = [];
    for (let i = 0; i < byIngredientCocktailsData.drinks.length; i++) {
      const id = byIngredientCocktailsData.drinks[i].idDrink;
      const cocktail = await fetchCocktailById(id);
      if (cocktail) {
        cocktails.push(cocktail);
      }
    }

    if (cocktails.length === 0 && !skipIngredient) {
      setEmptyFetch(true);
    }

    dispatch(updateByIngredientCocktails(cocktails));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (
      byIngredientCocktailsData?.drinks === "None Found" &&
      ingredientToken > 0
    ) {
      setEmptyFetch(true);

      dispatch(updateByIngredientCocktails([]));
      dispatch(setLoading(false));
    } else if (
      byIngredientCocktailsData &&
      byIngredientCocktailsData.drinks &&
      byIngredientCocktailsData.drinks !== "None Found"
    ) {
      dispatch(setLoading(true));
      fetchByIngredient();
    }
  }, [byIngredientCocktailsData]); // eslint-disable-line

  const handleClick = () => {
    setEmptyFetch(false);
    setEmptyInputError(false);
    dispatch(setDisplayState("random"));
    setRandomCocktailToken((prev) => prev + 1);
    if (skipRandom) {
      setSkipRandom(false);
    }
  };

  const handleSubmit = () => {
    if (!queryString) {
      setEmptyInputError(true);
      return;
    }
    if (!checked) {
      dispatch(setDisplayState("name"));

      if (skipName) {
        setSkipName(false);
      }
      setSubmittedCocktailName(queryString);
    } else if (checked) {
      if (skipIngredient) {
        setSkipIngredient(false);
      }

      setIngredientToken((prev) => prev + 1);
      dispatch(setDisplayState("ingredient"));
      setSubmittedCocktailIngredient(queryString);
    }
  };

  const handleInputChange = (e) => {
    setEmptyInputError(false);
    dispatch(updateQueryString(e.target.value));
  };

  const clearResults = () => {
    dispatch(updateRandomCocktail([]));
    dispatch(updateByIngredientCocktails([]));
    dispatch(updateByNameCocktails([]));
  };

  const handleClear = () => {
    setEmptyFetch(false);
    setEmptyInputError(false);
    clearResults();
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
      {emptyInputError && (
        <div className="mt-1 mb-1 text-red-600">Field cannot be blank</div>
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
      {!fetchOngoing && (
        <>
          <button
            type="button"
            className="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded mt-2 mr-2"
            onClick={handleSubmit}
          >
            Search
          </button>
          <button
            type="button"
            className="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded mt-2 mr-2 disabled:opacity-25 disabled:cursor-not-allowed"
            onClick={handleClick}
          >
            Get random cocktail
          </button>
          <button
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mt-2"
            onClick={handleClear}
          >
            Clear
          </button>{" "}
        </>
      )}
      {!fetchOngoing &&
        displayState !== "random" &&
        resultsNumber() !== null &&
        resultsNumber() > 1 && (
          <div className="font-semibold mt-1">
            {" "}
            Displaying {resultsNumber()} cocktails
          </div>
        )}
      {!fetchOngoing && emptyFetch && (
        <div className="font-semibold mt-1">
          {" "}
          Couldn't find any matching cocktails. Try another search
        </div>
      )}
      <div className="mt-2">
        {displayState === "random" &&
          !randomCocktailLoading &&
          randomCocktail &&
          randomCocktail.length > 0 && (
            <CocktailList cocktailData={randomCocktail} />
          )}
        {displayState === "ingredient" &&
          !loading &&
          byIngredientCocktails &&
          byIngredientCocktails.length > 0 && (
            <CocktailList cocktailData={byIngredientCocktails} />
          )}
        {displayState === "name" &&
          !byNameCocktailsLoading &&
          byNameCocktails &&
          byNameCocktails.length > 0 && (
            <CocktailList cocktailData={byNameCocktails} />
          )}

        {fetchOngoing && (
          <div>
            <Loader />
            <div className="flex justify-center items-center">
              Fetching cocktails. This may take a moment...
            </div>
          </div>
        )}
        {serverError && (
          <div className="text-red-500">Data fetch error. Try again</div>
        )}
      </div>
    </div>
  );
};
