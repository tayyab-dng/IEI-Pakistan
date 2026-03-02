import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '' }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        // We use gsap.quickTo for high performance 60fps tracking without React renders
        const xTo = gsap.quickTo(containerRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(containerRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        // Slight parallax for the inner text
        const textXTo = gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const textYTo = gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = containerRef.current.getBoundingClientRect();
            const cx = left + width / 2;
            const cy = top + height / 2;

            // Calculate distance from center
            const distanceX = clientX - cx;
            const distanceY = clientY - cy;

            // Magnetic Pull (Move 30% towards the mouse)
            xTo(distanceX * 0.3);
            yTo(distanceY * 0.3);

            // Text Parallax (Move slightly less, 20%)
            textXTo(distanceX * 0.2);
            textYTo(distanceY * 0.2);
        };

        const handleMouseLeave = () => {
            // Snap back to origin
            xTo(0);
            yTo(0);
            textXTo(0);
            textYTo(0);
        };

        const handleMouseEnter = () => {
        };

        const element = containerRef.current;
        if (element) {
            element.addEventListener("mousemove", handleMouseMove);
            element.addEventListener("mouseleave", handleMouseLeave);
            element.addEventListener("mouseenter", handleMouseEnter);
        }

        return () => {
            if (element) {
                element.removeEventListener("mousemove", handleMouseMove);
                element.removeEventListener("mouseleave", handleMouseLeave);
                element.removeEventListener("mouseenter", handleMouseEnter);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative rounded-full flex items-center justify-center cursor-pointer ${className}`}
            style={{ willChange: 'transform' }}
        >
            <span ref={textRef} style={{ pointerEvents: 'none', willChange: 'transform' }}>
                {children}
            </span>
        </div>
    );
}
