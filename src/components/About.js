import React from "react";

export const About = () => {
  return (
    <div className="container mt-2">
      <p>An app to find cocktails and save the ones you like. </p>{" "}
      <p>
        Uses{" "}
        <a
          href="https://www.thecocktaildb.com/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          thecocktaildb
        </a>
      </p>
    </div>
  );
};
