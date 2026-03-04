import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticFillButton({ children, href = "#", className = "", fillColor = "bg-[#ffcc00]" }) {
    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const textInvertedRef = useRef(null);
    const fillRef = useRef(null);

    useEffect(() => {
        const btn = buttonRef.current;

        // Magnetic pull setup
        const xTo = gsap.quickTo(btn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(btn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Reduce the magnetic strength slightly for typical buttons
            xTo(x * 0.3);
            yTo(y * 0.3);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Use simple hover states with group-hover Tailwind classes for the fill and text swap, 
    // bypassing the need for complex internal GSAP timelines for hover

    return (
        <a
            href={href}
            ref={buttonRef}
            className={`relative inline-flex items-center justify-center px-8 py-4 rounded-full border border-border overflow-hidden group cursor-pointer ${className}`}
        >
            {/* Fill Animation Background */}
            <span
                ref={fillRef}
                className={`absolute inset-0 ${fillColor} translate-y-[100%] rounded-full group-hover:translate-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]`}
            ></span>

            {/* Container for Text Swap */}
            <div className="relative z-10 block overflow-hidden">
                {/* Base Text */}
                <span
                    ref={textRef}
                    className="block text-primary-fg group-hover:-translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                >
                    {children}
                </span>

                {/* Inverted Text (White/Black depending on Accent) */}
                <span
                    ref={textInvertedRef}
                    className="absolute inset-0 block text-black translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                    aria-hidden="true"
                >
                    {children}
                </span>
            </div>
        </a>
    );
}
