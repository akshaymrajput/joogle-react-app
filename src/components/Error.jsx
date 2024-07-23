import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Error = () => {
    const errorRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { duration: 1, ease: "power3.out" },
        });
        tl.fromTo(
            errorRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0 }
        ).fromTo(
            textRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0 },
            "-=0.5"
        );
    }, []);

    return (
        <div className="flex flex-col justify-center items-center uppercase min-h-[calc(100vh-298px)] md:min-h-[calc(100vh-162px)]">
            <div
                ref={errorRef}
                className="text-purple-500 dark:text-gray-500 text-9xl font-extrabold tracking-wider"
            >
                <p>404</p>
            </div>
            <div
                ref={textRef}
                className="text-2xl tracking-widest dark:text-gray-200"
            >
                <p>Page Not Found</p>
            </div>
        </div>
    );
};

export default Error;
