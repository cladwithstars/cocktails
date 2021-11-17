import React from "react";
import { useDispatch } from "react-redux";
import { addCocktail } from "../redux/cocktailSlice";

export const CocktailCard = (props) => {
  const { name, imgUrl, instructions, formatted, saveButton } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addCocktail({ name, imgUrl, instructions, formatted }));
  };

  return (
    <div className="flex border-solid border-4 border-light-blue-500 rounded-lg">
      <div className="flex-none w-3/12 relative">
        <img
          src={imgUrl}
          alt="cocktail"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-xl font-semibold">{name}</h1>
          {saveButton && (
            // <button
            //   onClick={handleClick}
            //   // className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2 mb-2"
            // >
            <i
              onClick={handleClick}
              className="far fa-bookmark fa-2x text-blue-500 cursor-pointer mb-2"
              title="save cocktail"
            ></i>
            // </button>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-2">{instructions}</p>
        <hr className="pb-2" />
        <h3 className="flex-auto pb-2 text-sm font-semibold"> Ingredients </h3>
        <ul>
          {formatted.map((el) => (
            <li className="text-sm" key={el.name}>
              {el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
