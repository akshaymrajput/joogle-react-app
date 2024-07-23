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
            const response = await fetch(`${baseUrl}${type}`, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": baseUrl,
                    "x-rapidapi-key": import.meta.env.VITE_REACT_APP_API_KEY,
                },
            });
            if (response?.status !== 200) {
                const dataResponse = await fetch("/data.json");
                const imagesResponse = await fetch("/images.json");
                const data = await dataResponse.json();
                const images = await imagesResponse.json();
                setDummyData(data.items);
                setDummyImages(images.items);
                setError(true);
                setIsLoading(false);
                setApiLimitReached(true);
                console.log("Monthly API Call Limit reached! :(");
                console.log("Showing dummy data instead.");
            } else {
                const data = await response.json();
                setResults(data.items);
                setIsLoading(false);
                setError(false);
            }
        } catch (e) {
            setError(true);
            setIsLoading(false);
            console.log(e.message);
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
