import React from "react";

export const CocktailCard = (props) => {
  const { name, imgUrl, instructions, formatted } = props;

  return (
    <div class="flex border-solid border-4 border-light-blue-500 rounded-lg">
      <div class="flex-none w-48 relative">
        <img
          src={imgUrl}
          alt="cocktail"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div class="flex-auto p-6">
        <div class="flex flex-wrap">
          <h1 class="flex-auto text-xl font-semibold">{name}</h1>
        </div>
        <p class="text-sm text-gray-500">{instructions}</p>
        <hr />
        {/* <p>{ingredients.map((ingredient) => ingredient)}</p>
        <p>{measures.map((measure) => measure)}</p> */}
        <ul>
          {formatted.map((el) => (
            <li>{el}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
