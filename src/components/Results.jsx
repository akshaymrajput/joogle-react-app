import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";
import Error from "./Error";
import ApiLimitReached from "./ApiLimitReached";

export const Results = () => {
  const { results, isLoading, error, getResults, searchTerm, apiLimitReached } =
    useResultContext();
  const location = useLocation();
  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/images") {
        getResults(`/imagesearch?q=${searchTerm}`);
      } else {
        getResults(`/search?q=${searchTerm}&num=10`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  if (apiLimitReached) return <ApiLimitReached />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title, snippet }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm text-pruple-500 dark:text-gray-400">
                  {link?.length > 30 ? link.substring(0, 30) + "..." : link}
                </p>
                <p className="text-xl hover:underline dark:text-gray-300 text-black">
                  {title}
                </p>
                <p className="text-lg hover:shadow-purple-600  dark:text-gray-500 text-purple-400">
                  {snippet}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-start">
          {results?.map(({ thumbnailImageUrl, contextLink, title }, index) => (
            <a
              className="sm:p-3 p-5"
              href={contextLink}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="object-fill"
                src={thumbnailImageUrl}
                alr={title}
                loading="lazy"
                alt={title}
              />
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    default:
      return <Error />;
  }
};
