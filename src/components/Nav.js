import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="flex flex-col sm:flex-row sm:text-left sm:justify-between py-4 bg-blue-500 shadow sm:items-baseline w-full">
      <div className="container flex">
        <div className="sm:mb-0">
          <Link
            to="/"
            className="text-2xl no-underline text-white font-bold hover:text-blue-dark"
          >
            Cocktail Finder
          </Link>
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
