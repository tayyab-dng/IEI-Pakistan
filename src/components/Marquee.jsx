import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Marquee() {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        // The inner container needs to be translated on the x-axis infinitely.
        // We only translate by -50% to create a perfect loop because the content 
        // inside is exactly duplicated once creating two identical halves.
        gsap.to(textRef.current, {
            xPercent: -50,
            repeat: -1,
            duration: 20,
            ease: 'none'
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full py-24 bg-accent overflow-hidden flex items-center">
            {/* 
        The flex container hold two identical blocks of text.
        width: fit-content ensures it doesn't wrap and shrink.
      */}
            <div
                ref={textRef}
                className="flex w-max whitespace-nowrap will-change-transform"
            >
                {/* Block 1 */}
                <div className="flex items-center">
                    <h2 className="text-[12vw] font-bold uppercase tracking-tighter text-primary-bg leading-none px-4">
                        Creative Edge <span className="text-white px-2">•</span>
                        Digital Mastery <span className="text-white px-2">•</span>
                        Premium execution <span className="text-white px-2">•</span>
                    </h2>
                </div>
                {/* Block 2 (Exact Duplicate) */}
                <div className="flex items-center">
                    <h2 className="text-[12vw] font-bold uppercase tracking-tighter text-primary-bg leading-none px-4">
                        Creative Edge <span className="text-white px-2">•</span>
                        Digital Mastery <span className="text-white px-2">•</span>
                        Premium execution <span className="text-white px-2">•</span>
                    </h2>
                </div>
            </div>
        </section>
    );
}
