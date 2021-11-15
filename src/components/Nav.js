import React from "react";

export const Nav = () => {
  return (
    <nav class="bg-blue-500 px-8 pt-2 shadow-md relative">
      <div className="container mb-2 mt-2">
        <a href="/" class="font-bold text-white text-xl">
          Cocktail Finder{" "}
        </a>

        {/* <div class="-mb-px flex justify-center">
          <a
            class="no-underline text-white border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8"
            href="/"
          >
            Home
          </a>
          <a
            class="no-underline text-white border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
            href="/"
          >
            About
          </a>
        </div> */}
      </div>
    </nav>
  );
};
