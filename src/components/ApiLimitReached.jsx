import React, { useEffect, useRef } from "react";
import { IoSadOutline } from "react-icons/io5";
import gsap from "gsap";

const ApiLimitReached = () => {
    const apiLimitRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            apiLimitRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
        );
        const timer = setTimeout(() => {
            gsap.to(apiLimitRef.current, {
                opacity: 0,
                x: 20,
                duration: 0.5,
                ease: "power3.in",
                onComplete: () => {
                    apiLimitRef.current.style.display = "none";
                },
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            ref={apiLimitRef}
            className="fixed bottom-full right-0 md:right-4 p-4 bg-red-500 text-white rounded-lg shadow-lg flex items-center gap-4 z-50"
        >
            <IoSadOutline className="text-2xl" />
            <span>API Limit Reached. Showing dummy data instead.</span>
        </div>
    );
};

export default ApiLimitReached;
