import React from "react";
import { IoSadOutline } from "react-icons/io5";

const ApiLimitReached = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center uppercase p-8">
      <div className="p-2 mb-2 text-4xl tracking-wider flex flex-col items-center gap-4">
        <IoSadOutline />
        <span>API Limit Reached</span>
      </div>
    </div>
  );
};

export default ApiLimitReached;
