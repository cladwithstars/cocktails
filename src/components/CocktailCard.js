import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCocktail, deleteCocktail } from "../redux/cocktailSlice";
import Modal from "./Modal";

export const CocktailCard = ({
  name,
  imgUrl,
  instructions,
  formatted,
  saveButton,
  deleteButton,
}) => {
  const savedCocktails = useSelector((state) => state.cocktails.savedCocktails);
  const [openModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    const newCocktail = { name, imgUrl, instructions, formatted };
    dispatch(addCocktail(newCocktail));
    const cocktails = [];
    savedCocktails.forEach((cocktail) => cocktails.push(cocktail));
    cocktails.push(newCocktail);
    localStorage.setItem("cocktails", JSON.stringify(cocktails));
    setOpenModal(true);
  };

  const handleDelete = () => {
    dispatch(deleteCocktail(name));
    const cocktails = savedCocktails.filter(
      (cocktail) => cocktail.name !== name
    );
    localStorage.setItem("cocktails", JSON.stringify(cocktails));
  };

  const cocktailAlreadySaved = (name) => {
    const names = savedCocktails.map((cocktail) => cocktail.name);
    if (names.includes(name)) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex border-solid border-4 border-light-pink-500 rounded-lg">
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
          {saveButton && !cocktailAlreadySaved(name) && (
            <i
              onClick={handleClick}
              className="far fa-bookmark fa-2x text-pink-500 cursor-pointer mb-2 grow"
              title="save cocktail"
            ></i>
          )}

          {saveButton && cocktailAlreadySaved(name) && (
            <i
              className="fas fa-check fa-2x text-green-500 mb-2"
              title="saved"
            ></i>
          )}
          {deleteButton && (
            <i
              onClick={handleDelete}
              className="fa fa-trash fa-2x text-red-500 mb-2 grow cursor-pointer"
              title="delete"
            ></i>
          )}
          {openModal && <Modal open={openModal} />}
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
