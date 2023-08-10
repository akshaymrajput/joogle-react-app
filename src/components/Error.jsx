import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 uppercase h-40 mt-5">
      <div className="text-purple-500 dark:text-gray-500 text-9xl font-extrabold tracking-wider">
        <p>404</p>
      </div>
      <div className="text-2xl tracking-widest">
        <p>Page Not Found</p>
      </div>
    </div>
  );
};

export default Error;
