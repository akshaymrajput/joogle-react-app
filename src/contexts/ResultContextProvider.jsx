import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-search72.p.rapidapi.com";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [apiLimitReached, setApiLimitReached] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Counter Strike 2");

  const getResults = async (type) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}${type}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "google-search72.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VITE_REACT_APP_API_KEY,
        },
      });
      if (response?.status == 429) {
        setError(true);
        setIsLoading(false);
        setApiLimitReached(true);
        console.log("Monthly API Call Limit reached! :(");
      }
      const data = await response.json();
      setResults(data.items);
      setIsLoading(false);
      setError(false);
    } catch (e) {
      setError(true);
      console.log(e.message);
    }
  };
  return (
    <ResultContext.Provider
      value={{
        getResults,
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
