import React from "react";

export const Nav = () => {
  return (
    <nav class="flex flex-col sm:flex-row sm:text-left sm:justify-between py-4 bg-blue-500 shadow sm:items-baseline w-full">
      <div className="container flex">
        <div class="sm:mb-0">
          <a
            href="/"
            class="text-2xl no-underline text-white font-bold hover:text-blue-dark"
          >
            Cocktail Finder
          </a>
        </div>
        {/* <div>
          <a
            href="/"
            class="text-lg no-underline text-white hover:text-blue-dark ml-2"
          >
            Home
          </a>
          <a
            href="/"
            class="text-lg no-underline text-white hover:text-blue-dark ml-2"
          >
            About
          </a>
        </div> */}
      </div>
    </nav>
  );
};
