import React, { useEffect, useRef } from "react";
import { Circles } from "react-loader-spinner";
import gsap from "gsap";

export const Loading = () => {
    const loadingRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            loadingRef.current,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
        );
    }, []);

    return (
        <div
            ref={loadingRef}
            className="flex justify-center items-center min-h-screen"
        >
            <Circles type="Puff" color="#800080" height={80} width={80} />
        </div>
    );
};
