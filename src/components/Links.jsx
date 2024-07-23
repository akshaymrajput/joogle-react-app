import React from "react";
import { NavLink } from "react-router-dom";

const links = [
    { id: "1", url: "/search", text: "🔎 All" },
    { id: "2", url: "/images", text: "📸 Images" },
];

export const Links = () => {
    return (
        <div className="flex sm:justify-around justify-center items-center w-full sm:w-auto">
            {links.map(({ id, url, text }) => (
                <NavLink
                    key={id}
                    to={url}
                    className={({ isActive }) =>
                        isActive
                            ? "text-purple-700 m-2 mb-0 font-medium"
                            : "m-2 mb-0"
                    }
                >
                    {text}
                </NavLink>
            ))}
        </div>
    );
};
