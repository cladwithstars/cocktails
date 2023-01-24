import React from "react";

export const About = () => {
  return (
    <div className="container mt-20">
      <p>An app to find cocktails and save the ones you like. </p>{" "}
      <p>
        Uses{" "}
        <a
          href="https://www.thecocktaildb.com/"
          target="_blank"
          rel="noreferrer"
          className="text-pink-500 underline"
        >
          thecocktaildb
        </a>
      </p>
      <h5 className="font-bold mt-10">Technical info</h5>
      <p>
        Though there is no authentication or database, your saved cocktails will
        persist through refreshes because they are written to local storage.
        Built using React, Redux, RTK Query, and Tailwind.
      </p>
    </div>
  );
};
