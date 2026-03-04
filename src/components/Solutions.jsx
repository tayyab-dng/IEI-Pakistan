import React from 'react';
import { motion } from 'framer-motion';

const BackpackIcon = () => (
    <motion.svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" style={{ overflow: "visible" }}>
        <motion.g animate={{ y: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            {/* Simple Frosted Backpack */}
            <motion.path d="M 40 35 C 40 20, 60 20, 60 35" stroke="rgba(255,255,255,0.6)" strokeWidth="4" fill="none" />
            <motion.rect x="30" y="32" width="40" height="46" rx="12" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="rgba(255,255,255,0.15)" style={{ backdropFilter: "blur(4px)" }} />

            {/* Simple Core Pocket */}
            <motion.rect x="35" y="50" width="30" height="20" rx="4" fill="rgba(255,255,255,0.3)" />
            <motion.rect x="42" y="40" width="16" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
        </motion.g>
    </motion.svg>
);

const HandsIcon = () => (
    <motion.svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <motion.g animate={{ y: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            {/* Background Layer: Wireframe Heart */}
            <motion.path d="M 50 35 C 50 20, 30 20, 30 35 C 30 50, 50 65, 50 65 C 50 65, 70 50, 70 35 C 70 20, 50 20, 50 35 Z" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none"
                animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />

            {/* Middle Layer: Frosted Hands (Abstract supporting bowls) */}
            <motion.path d="M 20 60 C 30 75, 50 75, 45 60" stroke="rgba(255,255,255,0.3)" strokeWidth="8" strokeLinecap="round" fill="none"
                animate={{ y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
            <motion.path d="M 80 60 C 70 75, 50 75, 55 60" stroke="rgba(255,255,255,0.3)" strokeWidth="8" strokeLinecap="round" fill="none"
                animate={{ y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

            {/* Inner Elements: Glowing Orb of Support */}
            <motion.circle cx="50" cy="50" r="12" fill="rgba(255,255,255,0.3)"
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
            <motion.circle cx="50" cy="50" r="6" fill="rgba(255,255,255,0.9)" />

            {/* Foreground Hovering Sparkle */}
            <motion.path d="M 65 30 L 68 38 L 76 41 L 68 44 L 65 52 L 62 44 L 54 41 L 62 38 Z" fill="rgba(255,255,255,0.8)"
                animate={{ x: [0, -5, 0], y: [0, -5, 0], scale: [0.8, 1.1, 0.8], rotate: [0, 90, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.g>
    </motion.svg>
);

const WavingGirlsIcon = () => (
    <motion.svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <motion.g animate={{ y: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>

            {/* First Girl (Left) */}
            <motion.g>
                <motion.circle cx="35" cy="35" r="10" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" style={{ backdropFilter: "blur(2px)" }} />
                <motion.path d="M 25 75 C 25 55, 45 55, 45 75 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" style={{ backdropFilter: "blur(4px)" }} />
            </motion.g>

            {/* Second Girl (Right) */}
            <motion.g>
                <motion.circle cx="65" cy="40" r="9" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" style={{ backdropFilter: "blur(2px)" }} />
                <motion.path d="M 55 75 C 55 58, 75 58, 75 75 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" style={{ backdropFilter: "blur(4px)" }} />
            </motion.g>

        </motion.g>
    </motion.svg>
);

const solutionsData = [
    {
        id: '1',
        title: 'BECOME A VOLUNTEER',
        bgColor: 'bg-[#0f241a]', // Dark Green
        tags: ['Summer Programs', 'Gap Year', 'Remote Teaching'],
        description: 'Join our volunteer teaching programs and experience the adventure of a lifetime while making real impact in remote mountain communities.',
        buttonText: 'Apply Now',
        icon: <BackpackIcon />,
        topOffset: 'top-20 md:top-32'
    },
    {
        id: '2',
        title: 'DONATE & SUPPORT',
        bgColor: 'bg-[#7A101C]', // Premium Red
        tags: ['Monthly Giving', 'One-Time Donation', 'Sponsorship'],
        description: 'Your contribution directly supports students, teachers, and learning resources in remote communities. Every rupee creates lasting change.',
        buttonText: 'Donate Now',
        icon: <HandsIcon />,
        topOffset: 'top-24 md:top-40'
    },
    {
        id: '3',
        title: 'BECOME OUR PARTNER',
        bgColor: 'bg-[#A33B00]', // Premium Orange
        tags: ['CSR Programs', 'Foundations', 'Institutions'],
        description: 'Collaborate with IEI on large-scale educational initiatives and corporate social responsibility programs that create sustainable impact.',
        buttonText: 'Partner With Us',
        icon: <WavingGirlsIcon />,
        topOffset: 'top-28 md:top-48'
    }
];

export default function Solutions() {
    return (
        // No overflow-x hidden on the container itself to allow sticky to work
        <section className="relative w-full py-4 md:py-8 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-12 lg:gap-20">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 w-full">
                    <div className="flex flex-col items-start gap-5">
                        <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase border border-gray-200">
                            GET INVOLVED
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black leading-[1.05] tracking-tighter m-0 max-w-[800px]">
                            <span className="text-[#ffcc00] block">JOIN THE</span>
                            <span className="text-black block mt-1 md:mt-2">MOVEMENT</span>
                        </h2>
                    </div>
                </div>

                {/* Stacking Cards Container */}
                {/* CRITICAL: NO overflow-hidden here, otherwise sticky fails */}
                <div className="relative w-full flex flex-col gap-6 md:gap-8 pb-8 md:pb-12">
                    {solutionsData.map((card, index) => (
                        <div
                            key={card.id}
                            className={`sticky ${card.topOffset} w-full ${card.bgColor} rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row shadow-2xl border border-white/5 transition-transform duration-500`}
                        // We can use native tailwind top- classes for mobile and calc for desktop if needed, 
                        // but for simplicity the topOffset class provides the stacking offsets.
                        >
                            {/* Content Side (Top on mobile, Left on desktop) */}
                            <div className="w-full lg:w-[60%] flex flex-col justify-between z-10 min-h-[auto] lg:min-h-[400px]">
                                <div className="flex flex-col gap-6 md:gap-8">
                                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
                                        {card.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {card.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="rounded-full border border-white/20 px-4 py-1.5 text-xs md:text-sm font-medium text-white/90 bg-white/5 backdrop-blur-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-[#a0a0a0] lg:text-white/80 text-sm md:text-xl font-medium leading-[1.6] lg:leading-relaxed max-w-[100%] lg:max-w-[90%]">
                                        {card.description}
                                    </p>
                                </div>

                                <div className="mt-6 lg:mt-0 lg:absolute lg:bottom-16">
                                    <button className="bg-[#ffcc00] text-[#0a0a0a] px-6 py-2.5 rounded-[12px] font-bold tracking-wide text-sm hover:bg-[#e6b800] transition-colors w-max shadow-[0_4px_14px_rgba(255,204,0,0.25)]">
                                        {card.buttonText}
                                    </button>
                                </div>
                            </div>

                            {/* Massive Decorative Icon Side (Bottom on mobile, Right on desktop) */}
                            <div className="w-full lg:w-[40%] flex justify-center lg:justify-end items-center mt-8 md:mt-24 lg:mt-0 relative overflow-visible lg:overflow-hidden min-h-[160px] lg:min-h-[auto] z-0">
                                {/* Mobile pushes SVG into the visible flow; Desktop floats it absolute on right edge */}
                                <div className="w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] lg:w-[450px] lg:h-[450px] relative lg:absolute lg:right-[-15%] xl:right-[-10%] opacity-90 lg:opacity-50 transform group-hover:scale-105 transition-transform duration-700">
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
