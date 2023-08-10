import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { id: "1", url: "/search", text: "🔎 All" },
  { id: "2", url: "/images", text: "📸 Images" },
];

export const Links = () => {
  return (
    <div className="flex sm:justify-around justify-between items-center mt-4">
      {links.map(({ id, url, text }) => (
        <NavLink
          key={id}
          to={url}
          className={({ isActive }) =>
            isActive
              ? "text-purple-700 border-b-2 dark:text-gray-300 border-purple-800 pb-2 m-2 mb-0"
              : "m-2 mb-0"
          }
        >
          {text}
        </NavLink>
      ))}
    </div>
  );
};
