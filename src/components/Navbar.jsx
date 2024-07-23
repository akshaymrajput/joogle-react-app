import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Links } from "./Links";
import { Search } from "./Search";
import { FaSearch, FaRegMoon, FaRegLightbulb } from "react-icons/fa";
import gsap from "gsap";

export const Navbar = ({ darkTheme, setDarkTheme }) => {
    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const toggleButtonRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { duration: 0.5, ease: "power3.out" },
        });
        tl.fromTo(navbarRef.current, { y: -100 }, { y: 0 })
            .fromTo(
                logoRef.current,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1 },
                "-=0.3"
            )
            .fromTo(
                toggleButtonRef.current,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1 },
                "-=0.3"
            );
    }, []);

    return (
        <div
            ref={navbarRef}
            className="p-5 flex flex-col md:flex-row md:justify-between items-center border-b dark:border-gray-700 border-gray-200 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out gap-4"
        >
            <div className="flex justify-between items-center w-full md:w-auto">
                <Link to="/">
                    <div
                        ref={logoRef}
                        className="flex space-x-2 items-center text-2xl bg-purple-500 font-bold text-white py-1.5 px-2 rounded dark:bg-gray-500 dark:text-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        <span>JOOGLE</span> <FaSearch />
                    </div>
                </Link>
                <button
                    ref={toggleButtonRef}
                    type="button"
                    onClick={() =>
                        setDarkTheme((currentTheme) => !currentTheme)
                    }
                    className="text-2xl text-white bg-slate-700 dark:bg-purple-500 border rounded-full px-2 py-1.5 ml-4 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                    aria-label={
                        darkTheme ? "Toggle Light Mode" : "Toggle Dark Mode"
                    }
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
            <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-4">
                <Search />
            </div>
            <div className="w-full md:w-auto flex items-center justify-center md:justify-end mt-4 md:mt-0">
                <Links />
            </div>
        </div>
    );
};
