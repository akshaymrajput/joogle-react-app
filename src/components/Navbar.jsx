import React from "react";
import { Link } from "react-router-dom";

import { Search } from "./Search";
import { FaSearch, FaRegMoon, FaRegLightbulb } from "react-icons/fa";

export const Navbar = ({ darkTheme, setDarkTheme }) => {
  return (
    <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200">
      <div className="flex justify-between items-center space-x-5 w-screen">
        <Link to="/">
          <div className="flex space-x-2 items-center text-2xl bg-purple-500 font-bold text-white py-1.5 px-2 rounded dark:bg-gray-500 dark:text-gray-900">
            <span>JOOGLE</span> <FaSearch />
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setDarkTheme((currentTheme) => !currentTheme)}
          className="text-2xl text-white bg-slate-700 dark:bg-purple-500 border rounded-full px-2 py-1.5 hover:shadow-lg"
          aria-label={darkTheme ? "Toggle Light Mode" : "Toggle Dark Mode"}
        >
          {darkTheme ? (
            <div className="flex items-center gap-x-1">
              <FaRegLightbulb />
            </div>
          ) : (
            <div className="flex items-center gap-x-1">
              <FaRegMoon />
            </div>
          )}
        </button>
      </div>
      <Search />
    </div>
  );
};
