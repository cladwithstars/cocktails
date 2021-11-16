import React from "react";

export const CocktailCard = (props) => {
  const { name, imgUrl, instructions, formatted } = props;

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
