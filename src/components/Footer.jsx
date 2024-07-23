import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            footerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    return (
        <div
            ref={footerRef}
            className="text-center p-6 border-t dark:border-gray-700 border-gray-200 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out"
        >
            <h1 className="text-lg font-semibold dark:text-gray-200">
                2024 Joogle, Inc.
            </h1>
        </div>
    );
};
