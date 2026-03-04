import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const sdgCards = [
    { id: 1, url: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg', alt: 'No Poverty' },
    { id: 4, url: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-04.jpg', alt: 'Quality Education' },
    { id: 5, url: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg', alt: 'Gender Equality' },
    { id: 10, url: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg', alt: 'Reduced Inequalities' },
    { id: 13, url: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg', alt: 'Climate Action' },
];

// Repeat the array a few times so a single block is wider than even ultra-wide monitors.
// This ensures no "empty" space before the seamless looping restart happens.
const repeatedCards = [...sdgCards, ...sdgCards, ...sdgCards, ...sdgCards];

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
            duration: 90, // Slower scrolling speed
            ease: 'none'
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full py-16 md:py-24 bg-gray-100 overflow-hidden flex items-center">
            {/* 
        The flex container hold two identical blocks of cards.
        width: fit-content ensures it doesn't wrap and shrink.
      */}
            <div
                ref={textRef}
                className="flex w-max whitespace-nowrap will-change-transform"
            >
                {/* Giant Block 1 */}
                <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16">
                    {repeatedCards.map((card, idx) => (
                        <div key={`b1-${card.id}-${idx}`} className="w-32 h-32 md:w-48 md:h-48 shrink-0 shadow-lg rounded-md overflow-hidden bg-white">
                            <img src={card.url} alt={card.alt} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                {/* Giant Block 2 (Exact Duplicate for seamless loop) */}
                <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16">
                    {repeatedCards.map((card, idx) => (
                        <div key={`b2-${card.id}-${idx}`} className="w-32 h-32 md:w-48 md:h-48 shrink-0 shadow-lg rounded-md overflow-hidden bg-white">
                            <img src={card.url} alt={card.alt} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
