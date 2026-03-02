import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const valuesData = [
    {
        id: 1,
        title: "Creative\nExcellence",
        description: "We craft impactful, original designs that make your brand unforgettable and deeply resonate with your audience.",
        iconType: "creative"
    },
    {
        id: 2,
        title: "Customised\nSolutions",
        description: "Tailored strategies crafted to meet your unique business needs, ensuring your vision is brought to life with precision and purpose.",
        iconType: "custom"
    },
    {
        id: 3,
        title: "Integrated\nExpertise",
        description: "We integrate design and development to craft engaging, functional digital experiences using advanced technologies.",
        iconType: "integrated"
    },
    {
        id: 4,
        title: "Open\nCommunication",
        description: "We believe in open, honest collaboration. You'll always know where your project stands, with clear updates at every stage of the journey.",
        iconType: "open"
    }
];

// Reusable Icon Renderer based on type
const GridIcon = ({ type }) => {
    switch (type) {
        case 'creative':
            // Magic Sparkles / Stars (Orange) with gradient & shadow
            return (
                <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 8px 16px rgba(240, 124, 107, 0.4))' }}>
                    <defs>
                        <linearGradient id="grad-creative" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FAD3C3" />
                            <stop offset="1" stopColor="#F07C6B" />
                        </linearGradient>
                    </defs>
                    <path d="M19 2C19 2 21 14 33 16C21 18 19 30 19 30C19 30 17 18 5 16C17 14 19 2 19 2Z" fill="url(#grad-creative)" />
                    <path d="M31 25C31 25 32 31 37 32C32 33 31 39 31 39C31 39 30 33 25 32C30 31 31 25 31 25Z" fill="url(#grad-creative)" />
                    <path d="M11 29C11 29 12 33 15 34C12 35 11 39 11 39C11 39 10 35 7 34C10 33 11 29 11 29Z" fill="url(#grad-creative)" />
                </svg>
            );
        case 'custom':
            // Settings / Sliders (Green) with gradient & shadow
            return (
                <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 8px 16px rgba(72, 229, 155, 0.4))' }}>
                    <defs>
                        <linearGradient id="grad-custom" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#A2F5CD" />
                            <stop offset="1" stopColor="#48E59B" />
                        </linearGradient>
                    </defs>
                    <rect x="6" y="10" width="28" height="5" rx="2.5" fill="url(#grad-custom)" />
                    <rect x="6" y="25" width="28" height="5" rx="2.5" fill="url(#grad-custom)" />
                    <circle cx="15" cy="12.5" r="5" fill="#48E59B" stroke="#0a0a0a" strokeWidth="2" />
                    <circle cx="27" cy="27.5" r="5" fill="#48E59B" stroke="#0a0a0a" strokeWidth="2" />
                </svg>
            );
        case 'integrated':
            // Connected Nodes / Grid (Blue) with gradient & shadow
            return (
                <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 8px 16px rgba(120, 179, 234, 0.4))' }}>
                    <defs>
                        <linearGradient id="grad-integrated" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#BFE0FC" />
                            <stop offset="1" stopColor="#78B3EA" />
                        </linearGradient>
                    </defs>
                    <rect x="6" y="6" width="12" height="12" rx="3" fill="url(#grad-integrated)" />
                    <rect x="22" y="6" width="12" height="12" rx="3" fill="url(#grad-integrated)" />
                    <rect x="6" y="22" width="12" height="12" rx="3" fill="url(#grad-integrated)" />
                    <path d="M22 28h5a3 3 0 0 0 3 -3v-5" stroke="url(#grad-integrated)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="28" cy="28" r="5" fill="#BFE0FC" />
                </svg>
            );
        case 'open':
            // Chat Bubble (Peach) with gradient & shadow
            return (
                <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 8px 16px rgba(240, 195, 182, 0.4))' }}>
                    <defs>
                        <linearGradient id="grad-open" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F9E2DB" />
                            <stop offset="1" stopColor="#F0C3B6" />
                        </linearGradient>
                    </defs>
                    <path d="M28 6H12C8.68629 6 6 8.68629 6 12V22C6 25.3137 8.68629 28 12 28H14V34L22 28H28C31.3137 28 34 25.3137 34 22V12C34 8.68629 31.3137 6 28 6Z" fill="url(#grad-open)" />
                    <circle cx="14" cy="17" r="2.5" fill="#0A0A0A" />
                    <circle cx="20" cy="17" r="2.5" fill="#0A0A0A" />
                    <circle cx="26" cy="17" r="2.5" fill="#0A0A0A" />
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

    // Grouping words into hardcoded rows to match the reference exactly
    const textLines = [
        [
            { text: "We", tone: "dark" },
            { text: "blend", tone: "dark" },
            { text: "cutting-edge", tone: "light" },
            { text: "technology", tone: "light" },
        ],
        [
            { text: "with", tone: "dark" },
            { text: "strategic", tone: "light" },
            { text: "design", tone: "light" },
            { text: "to", tone: "dark" },
            { text: "build", tone: "dark" },
        ],
        [
            { text: "memorable", tone: "light" },
            { text: "online", tone: "light" },
            { text: "identities", tone: "light" },
            { text: "that", tone: "dark" },
        ],
        [
            { text: "capture", tone: "light" },
            { text: "hearts", tone: "light" },
            { text: "and", tone: "dark" },
            { text: "drive", tone: "light" },
            { text: "growth.", tone: "light" },
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

        // Flashlight Grid Mouse Tracking
        const xSetter = gsap.quickSetter(sectionRef.current, '--x', 'px');
        const ySetter = gsap.quickSetter(sectionRef.current, '--y', 'px');

        const handleMouseMove = (e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            xSetter(e.clientX - rect.left);
            ySetter(e.clientY - rect.top);
        };

        const maskLayer = sectionRef.current.querySelector('.corevalues-mask');
        const handleMouseEnter = () => {
            gsap.to(maskLayer, { opacity: 0.8, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        };
        const handleMouseLeave = () => {
            gsap.to(maskLayer, { opacity: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        };

        const currentRef = sectionRef.current;
        currentRef.addEventListener('mousemove', handleMouseMove);
        currentRef.addEventListener('mouseenter', handleMouseEnter);
        currentRef.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            currentRef.removeEventListener('mousemove', handleMouseMove);
            currentRef.removeEventListener('mouseenter', handleMouseEnter);
            currentRef.removeEventListener('mouseleave', handleMouseLeave);
        };

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen py-10 md:py-16 bg-[#0a0a0a] overflow-hidden flex flex-col justify-center" style={{ '--x': '50%', '--y': '50%' }}>
            {/* Flashlight CSS Mask Pattern Layer */}
            <div
                className="corevalues-mask absolute inset-0 z-[0] pointer-events-none opacity-0 mix-blend-screen"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.8) 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                    maskImage: 'radial-gradient(circle at var(--x) var(--y), rgba(0,0,0,1), transparent 25vw)',
                    WebkitMaskImage: 'radial-gradient(circle at var(--x) var(--y), rgba(0,0,0,1), transparent 25vw)',
                }}
            ></div>

            {/* Main Content Container left-aligned and fitted */}
            <div className="relative w-full max-w-[1100px] px-6 md:px-12 lg:px-24 mx-auto flex flex-col items-start z-10">

                {/* --- The Large Scroll-Animated Typography --- */}
                <div className="w-full mb-10 md:mb-16">
                    <h2
                        ref={textRef}
                        className="text-4xl md:text-5xl lg:text-[3.2rem] xl:text-[3.8rem] font-medium leading-[1.1] tracking-tight flex flex-col items-start"
                    >
                        {textLines.map((line, lineIdx) => (
                            <div key={lineIdx} className="flex flex-wrap gap-x-[0.25em] md:gap-x-[0.3em]">
                                {line.map((wordObj, wordIdx) => (
                                    <span
                                        key={wordIdx}
                                        className={`inline-block ${wordObj.tone === 'light' ? 'text-white' : 'text-[#666666]'}`}
                                    >
                                        {wordObj.text}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </h2>
                </div>


                {/* --- The 2x2 Core Values Grid --- */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-x-16 md:gap-y-12 w-full max-w-[1000px]">
                    {valuesData.map((val) => (
                        <div key={val.id} className="flex flex-col items-start text-left group cursor-pointer">
                            <div className="grid-icon-wrapper mb-5 md:mb-6 transition-transform duration-500 ease-out group-hover:scale-110 origin-left">
                                <GridIcon type={val.iconType} />
                            </div>
                            <h3 className="text-white text-2xl md:text-3xl font-medium tracking-[-0.03em] leading-[1.15] mb-3 whitespace-pre-line">
                                {val.title}
                            </h3>
                            <p className="text-[#a0a0a0] text-sm md:text-base font-normal leading-[1.6] max-w-[400px]">
                                {val.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
