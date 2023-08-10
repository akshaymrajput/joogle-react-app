import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Links } from "./Links";

import { TiDelete } from "react-icons/ti";

export const Search = () => {
  const [text, setText] = useState("Counter Strike 2");
  const { setSearchTerm } = useResultContext();
  const [debouncedValue] = useDebounce(text, 2000);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input
        value={text}
        type="text"
        className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
        placeholder="Search Joogle or type URL"
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <button
          type="button"
          className="absolute top-3 right-5 text-2xl text-gray-500"
          onClick={() => setText("")}
        >
          <TiDelete />
        </button>
      )}
      <Links />
    </div>
  );
};
