import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Results } from "./Results";
import Error from "./Error";

export const Paths = () => {
    return (
        <div className="py-4 px-2 md:p-4 min-h-screen">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Navigate to="/search" replace />}
                ></Route>
                <Route exact path="/search" element={<Results />} />
                <Route exact path="/images" element={<Results />} />
                <Route exact path="*" element={<Error />} />
            </Routes>
        </div>
    );
};
