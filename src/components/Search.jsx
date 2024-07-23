import React, { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";
import { useResultContext } from "../contexts/ResultContextProvider";
import { TiDelete } from "react-icons/ti";
import gsap from "gsap";

export const Search = () => {
    const [text, setText] = useState("Counter Strike 2");
    const { setSearchTerm } = useResultContext();
    const [debouncedValue] = useDebounce(text, 2000);
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (debouncedValue) setSearchTerm(debouncedValue);
    }, [debouncedValue]);

    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { duration: 0.5, ease: "power3.out" },
        });
        tl.fromTo(
            searchRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0 }
        ).fromTo(
            inputRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1 },
            "-=0.3"
        );
    }, []);

    return (
        <div
            ref={searchRef}
            className="w-full flex flex-col md:flex-row items-center justify-center"
        >
            <div className="w-full md:w-auto relative flex items-center justify-center">
                <input
                    ref={inputRef}
                    value={text}
                    type="text"
                    className="w-full md:w-96 h-10 dark:bg-gray-200 border rounded-full shadow-md outline-none py-2 px-4 pr-10 text-black hover:shadow-lg transition-all duration-300 ease-in-out"
                    placeholder="Search Joogle or type URL"
                    onChange={(e) => setText(e.target.value)}
                />
                {text && (
                    <button
                        type="button"
                        className="absolute top-1/2 transform -translate-y-1/2 right-4 text-2xl text-gray-500"
                        onClick={() => setText("")}
                    >
                        <TiDelete />
                    </button>
                )}
            </div>
        </div>
    );
};
