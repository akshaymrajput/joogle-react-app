import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [apiLimitReached, setApiLimitReached] = useState(false);
    const [searchTerm, setSearchTerm] = useState("Counter Strike 2");
    const [dummyData, setDummyData] = useState([]);
    const [dummyImages, setDummyImages] = useState([]);

    const getResults = async (type) => {
        try {
            setIsLoading(true);
            const encodedSearchTerm = encodeURIComponent(searchTerm);
            const url = `${baseUrl}${type}&q=${encodedSearchTerm}`;
            console.log(`Fetching results from API: ${url}`);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": new URL(baseUrl).hostname,
                    "x-rapidapi-key": import.meta.env.VITE_REACT_APP_API_KEY,
                },
            });

            console.log(`API response status: ${response.status}`);

            if (response?.status !== 200) {
                console.log(
                    "API limit reached or other error occurred. Fetching dummy data."
                );
                const dataResponse = await fetch("/data.json");
                const imagesResponse = await fetch("/images.json");

                const data = await dataResponse.json();
                const images = await imagesResponse.json();

                setDummyData(data.items);
                setDummyImages(images.items);
                setError(true);
                setIsLoading(false);
                setApiLimitReached(true);
                console.log("Showing dummy data instead.");
            } else {
                const data = await response.json();
                console.log("API response data:", data);
                setResults(data.items);
                setIsLoading(false);
                setError(false);
                setApiLimitReached(false);
            }
        } catch (e) {
            console.error("Error fetching results:", e.message);
            setError(true);
            setIsLoading(false);
        }
    };

    return (
        <ResultContext.Provider
            value={{
                getResults,
                dummyData,
                dummyImages,
                results,
                searchTerm,
                setSearchTerm,
                isLoading,
                error,
                apiLimitReached,
            }}
        >
            {children}
        </ResultContext.Provider>
    );
};

export const useResultContext = () => useContext(ResultContext);
