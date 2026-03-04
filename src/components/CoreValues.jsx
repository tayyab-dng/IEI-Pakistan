import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const valuesData = [
    {
        id: 1,
        title: "Community-\nCentered",
        description: "We work alongside local communities, respecting their culture and wisdom while co-creating sustainable educational solutions.",
        iconType: "community"
    },
    {
        id: 2,
        title: "Volunteer-\nDriven",
        description: "Passionate volunteers from across Pakistan live and teach in remote areas, creating meaningful connections and lasting impact.",
        iconType: "volunteer"
    },
    {
        id: 3,
        title: "Innovation in\nEducation",
        description: "We integrate arts, technology, and modern teaching methods with traditional learning to create engaging educational experiences.",
        iconType: "innovation"
    },
    {
        id: 4,
        title: "Transparency &\nTrust",
        description: "We maintain open communication with all stakeholders, sharing our journey, challenges, and successes at every stage.",
        iconType: "transparency"
    }
];

// Reusable Icon Renderer based on type
const GridIcon = ({ type }) => {
    switch (type) {
        case 'community':
            // People/community (White)
            return (
                <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))' }}>
                    <circle cx="20" cy="12" r="5" fill="#ffffff" />
                    <circle cx="12" cy="16" r="4" fill="#ffffff" opacity="0.8" />
                    <circle cx="28" cy="16" r="4" fill="#ffffff" opacity="0.8" />
                    <path d="M20 20 C14 20, 8 24, 8 30 L32 30 C32 24, 26 20, 20 20 Z" fill="#ffffff" />
                </svg>
            );
        case 'volunteer':
            // Hands holding heart (White)
            return (
                <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))' }}>
                    <path d="M20 28 C10 28, 4 22, 10 22 C12 22, 16 25, 20 25 C24 25, 28 22, 30 22 C36 22, 30 28, 20 28 Z" fill="#ffffff" opacity="0.7" />
                    <path d="M20 24 C20 24, 12 16, 12 12 C12 8, 16 6, 20 10 C24 6, 28 8, 28 12 C28 16, 20 24, 20 24 Z" fill="#ffffff" />
                </svg>
            );
        case 'innovation':
            // Lightbulb (White)
            return (
                <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))' }}>
                    <circle cx="20" cy="16" r="10" fill="#ffffff" opacity="0.9" />
                    <rect x="16" y="26" width="8" height="6" rx="2" fill="#ffffff" />
                    <path d="M14 16 L26 16 M17 12 L23 12" stroke="#000" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
                    <path d="M12 8 L8 4 M28 8 L32 4 M20 4 L20 0" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        case 'transparency':
            // Trust/Communication (White)
            return (
                <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))' }}>
                    <path d="M8 12 C8 8, 12 8, 12 8 L28 8 C28 8, 32 8, 32 12 L32 24 C32 28, 28 28, 28 28 L16 28 L8 34 L8 12 Z" fill="#ffffff" opacity="0.9" />
                    <path d="M14 20 C14 14, 20 14, 20 14 L36 14 C36 14, 40 14, 40 20 L40 28 C40 32, 36 32, 36 32 L36 38 L28 32 L16 32" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
                    <circle cx="14" cy="18" r="2" fill="#000" opacity="0.4" />
                    <circle cx="20" cy="18" r="2" fill="#000" opacity="0.4" />
                    <circle cx="26" cy="18" r="2" fill="#000" opacity="0.4" />
                </svg>
            );
        default:
            return null;
    }
}

export default function CoreValues() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const gridRef = useRef(null);

    // Grouping words into balanced rows to fit exactly on 5 lines
    const textLines = [
        [
            { text: "We", tone: "dark" },
            { text: "bridge", tone: "dark" },
            { text: "educational", tone: "light" },
            { text: "gaps", tone: "light" },
            { text: "through", tone: "dark" },
        ],
        [
            { text: "community-driven", tone: "light" },
            { text: "programs,", tone: "light" },
            { text: "volunteer", tone: "light" },
            { text: "engagement,", tone: "light" },
            { text: "and", tone: "dark" },
        ],
        [
            { text: "innovative", tone: "light" },
            { text: "teaching", tone: "light" },
            { text: "methods", tone: "light" },
            { text: "that", tone: "dark" },
        ],
        [
            { text: "transform", tone: "dark" },
            { text: "lives", tone: "dark" },
            { text: "and", tone: "dark" },
            { text: "empower", tone: "light" },
            { text: "futures.", tone: "light" },
        ]
    ];

    useGSAP(() => {
        // --- 2. Continuous Element Floating (SVGs) ---
        gsap.to('.grid-icon-wrapper', {
            y: -12,
            duration: 2.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.3 // Randomize floating offset among icons
        });

        // --- 3. Grid Items Entrance ---
        const gridItems = gridRef.current.children;
        gsap.fromTo(gridItems,
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen py-10 md:py-16 overflow-hidden flex flex-col justify-center">

            {/* Background Image & Vignette */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src="/images/corevaluebg.jpg"
                    alt="Core Values Background"
                    className="w-full h-full object-cover"
                />
                {/* Global Vignette/Darkening Overlay for text readability */}
                <div className="absolute inset-0 bg-[#3D3300]/80 md:bg-[#3D3300]/60 z-10"></div>
                {/* Edge Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#3D3300]/40 to-[#3D3300]/90 z-20"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative w-full max-w-[1440px] px-6 md:px-12 lg:px-24 mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-between z-10 gap-12 lg:gap-8">

                {/* --- The Large Scroll-Animated Typography (Left Side) --- */}
                <div className="w-full lg:w-[45%] relative flex flex-col justify-between lg:pr-8 py-2 md:py-0">
                    {/* IEI Pakistan Logo */}
                    <div className="mb-8 md:mb-8">
                        <img
                            src="/images/iei-logo.png"
                            alt="IEI Pakistan"
                            className="h-16 md:h-20 w-auto object-contain drop-shadow-sm"
                        />
                    </div>
                    <h2
                        ref={textRef}
                        className="text-4xl md:text-5xl lg:text-[3em] xl:text-[3.75rem] font-serif leading-[1.12] tracking-[-0.02em] flex flex-col items-start relative z-10 drop-shadow-sm"
                    >
                        {textLines.map((line, lineIdx) => (
                            <div key={lineIdx} className="flex flex-wrap gap-x-[0.25em] md:gap-x-[0.3em]">
                                {line.map((wordObj, wordIdx) => (
                                    <span
                                        key={wordIdx}
                                        className={`inline-block ${wordObj.tone === 'light' ? 'text-white italic' : 'text-[#ffcc00] font-medium'}`}
                                    >
                                        {wordObj.text}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </h2>
                </div>


                {/* --- The 2x2 Core Values Grid (Right Side) --- */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-x-12 md:gap-y-8 w-full lg:w-[55%] relative z-10">
                    {valuesData.map((val) => (
                        <div key={val.id} className="flex flex-col items-start text-left group cursor-pointer relative p-6 md:p-8 rounded-[2.5rem] transition-all duration-500 hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-transparent hover:border-white/20 hover:-translate-y-2">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500 pointer-events-none"></div>
                            <div className="grid-icon-wrapper mb-5 md:mb-6 transition-transform duration-500 ease-out group-hover:scale-110 origin-left relative z-10">
                                <GridIcon type={val.iconType} />
                            </div>
                            <h3 className="text-[#ffcc00] font-serif text-2xl md:text-3xl font-medium tracking-tight leading-[1.2] mb-3 whitespace-pre-line relative z-10 drop-shadow-sm">
                                {val.title}
                            </h3>
                            <p className="text-white/90 text-sm md:text-base font-medium leading-[1.7] max-w-[400px] relative z-10">
                                {val.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
