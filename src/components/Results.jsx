import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";
import Error from "./Error";
import ApiLimitReached from "./ApiLimitReached";
import gsap from "gsap";

export const Results = () => {
    const {
        results,
        dummyData,
        dummyImages,
        isLoading,
        error,
        getResults,
        searchTerm,
        apiLimitReached,
    } = useResultContext();
    const location = useLocation();
    const resultsRef = useRef(null);

    useEffect(() => {
        if (searchTerm) {
            if (location.pathname === "/images") {
                getResults(`/imagesearch?q=${searchTerm}`);
            } else {
                getResults(`/search?q=${searchTerm}&lr=en-US&num=10`);
            }
        }
    }, [searchTerm, location.pathname]);

    useEffect(() => {
        if (resultsRef.current) {
            gsap.fromTo(
                resultsRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );
        }
    }, [results, dummyData, dummyImages]);

    if (isLoading) return <Loading />;

    return (
        <div ref={resultsRef} className="p-4">
            {apiLimitReached && <ApiLimitReached />}
            {location.pathname === "/search" ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {dummyData?.map(({ link, title, snippet }, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-4"
                        >
                            <a href={link} target="_blank" rel="noreferrer">
                                <p className="text-sm text-purple-500 dark:text-gray-400 truncate">
                                    {link}
                                </p>
                                <p className="text-xl font-semibold hover:underline dark:text-gray-300 text-black">
                                    {title}
                                </p>
                                <p className="text-lg dark:text-gray-500 text-gray-700 mt-2">
                                    {snippet}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {dummyImages?.map(
                        ({ thumbnailImageUrl, contextLink, title }, index) => (
                            <a
                                className="w-full"
                                href={contextLink}
                                key={index}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-4">
                                    <img
                                        className="object-cover w-full h-48 rounded-lg"
                                        src={thumbnailImageUrl}
                                        alt={title}
                                        loading="lazy"
                                    />
                                    <p className="w-full text-sm mt-2 text-center dark:text-gray-300 text-gray-700">
                                        {title}
                                    </p>
                                </div>
                            </a>
                        )
                    )}
                </div>
            )}
        </div>
    );
};
