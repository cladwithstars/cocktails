import React from "react";

export const Nav = () => {
  return (
    <nav className="flex flex-col sm:flex-row sm:text-left sm:justify-between py-4 bg-blue-500 shadow sm:items-baseline w-full">
      <div className="container flex">
        <div className="sm:mb-0">
          <a
            href="/"
            className="text-2xl no-underline text-white font-bold hover:text-blue-dark"
          >
            Cocktail Finder
          </a>
        </div>
        {/* <div>
          <a
            href="/"
            className="text-lg no-underline text-white hover:text-blue-dark ml-2"
          >
            Home
          </a>
          <a
            href="/"
            className="text-lg no-underline text-white hover:text-blue-dark ml-2"
          >
            About
          </a>
        </div> */}
      </div>
    </nav>
  );
};
